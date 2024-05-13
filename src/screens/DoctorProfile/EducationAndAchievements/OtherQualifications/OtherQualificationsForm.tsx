import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Dropdown from 'components/elements/form/Dropdown'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { TextInput } from 'react-native-paper'
import { formatDate, getDropdownFormat } from 'helpers/utils'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker'
import Icon from 'components/elements/Icon'
import { AppProps } from 'screens/Authentication/Welcome'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { getCountry, getDuration } from 'services/masters'
import DatePickerEl from 'components/elements/form/DatePicker'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import {
  addDoctorProfileEducation,
  addDoctorProfileEducationDocument,
  updateDoctorProfileEducation,
} from 'services/doctorprofile'

const defaultFormState = {
  universityName: { isRequired: true, value: '' },
  durationOfCourse: '',
  duration: '',
  country: { isRequired: true, value: '' },
  qualificationName: { isRequired: true, value: '' },
  dateOfCompletion: '',
  certificate: '',
}

const OtherQualificationsForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [country, setCountry] = useState([])
  const [durations, setDurations] = useState([])
  const [certificateDoc, setCertificateDoc] = useState<null | DocumentPickerResponse>(null)

  const navigation = useNavigation()
  const route: RouteProp<any> = useRoute()
  const dispatch = useAppDispatch()

  const education = useMemo(() => route?.params?.education, [route])

  useEffect(() => {
    if (education) {
      setFormState({
        universityName: { isRequired: true, value: education?.university_name },
        durationOfCourse: education?.duration,
        duration: education?.duration_unit_id,
        country: { isRequired: true, value: education?.country?.id },
        qualificationName: { isRequired: true, value: education?.institute_name },
        dateOfCompletion: education?.year_of_completion,
        certificate: education?.certificate,
      })
    }
  }, [education])

  const { profile } = useAppSelector((state) => state.drProfile)

  useEffect(() => {
    const fetchDegreeType = async () => {
      try {
        const [response, response1] = await Promise.all([getCountry(), getDuration()])
        setCountry(getDropdownFormat(response?.data?.data?.countries))
        setDurations(getDropdownFormat(response1?.data?.data?.duration))
      } catch (error) {}
    }
    fetchDegreeType()
  }, [])

  const openFileDirectory = (name: string) => {
    DocumentPicker.pickMultiple({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => {
        onChange(name, res[0].name ?? '')
        setCertificateDoc(res?.[0])
      })
      .catch((err) => console.log(err))
  }

  const onFormSubmit = async () => {
    const res = await validateForm()

    if (!res) return

    try {
      dispatch(showLoading())

      const payload = {
        country_id: formState.country.value,
        doctor_profile_id: profile?.id,
        university_name: formState.universityName.value,
        institute_name: formState.qualificationName?.value,
        year_of_completion: formState?.dateOfCompletion,
        degree_title: '4',
        duration: formState?.durationOfCourse,
        duration_unit_id: formState?.duration,
      }

      const response = education
        ? await updateDoctorProfileEducation(education?.id, payload)
        : await addDoctorProfileEducation(payload)
      if (response.status) {
        if (certificateDoc) {
          const certDoc = new FormData()
          certDoc.append('certificate', certificateDoc)

          const docResponse = await addDoctorProfileEducationDocument(
            education ? education?.id : response?.data?.message?.id,
            certDoc
          )
        }
        navigation.navigate('OtherQualifications' as never)
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="University/College/Institution Name"
            error={errors.universityName}
            value={formState['universityName'].value}
            onChangeText={(text) => onChange('universityName', text)}
            isRequired
          />

          <View style={{ ...styles.duration, zIndex: 10001 }}>
            <InputEl
              label="Duration of Course"
              onChangeText={(text: any) => onChange('durationOfCourse', text)}
              value={formState['durationOfCourse']?.toString()}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['duration']}
              items={durations}
              error={errors['duration']}
              placeholder="Duration"
              setValue={(value: string) => onChange('duration', value)}
              zIndex={1000}
              styles={{ flex: 0.6 }}
            />
          </View>

          <Dropdown
            value={formState['country'].value}
            items={country}
            error={errors['country']}
            placeholder="Country"
            setValue={(value: string) => onChange('country', value)}
            styles={{ marginVertical: 10 }}
            zIndex={1}
            isRequired
            searchable
            scroll
          />

          <View style={{ marginTop: -160, zIndex: 99 }}>
            <InputEl
              label="Qualification Title"
              error={errors.qualificationName}
              onChangeText={(text) => onChange('qualificationName', text)}
              value={formState['qualificationName'].value}
              isRequired
            />
          </View>

          <View style={{ zIndex: 100 }}>
            <DatePickerEl
              name="dateOfCompletion"
              value={formState['dateOfCompletion']}
              label="Date of Completion"
              error={errors.dateOfCompletion}
              onChange={(_, date) => {
                setFormState({
                  ...formState,
                  dateOfCompletion: date,
                })
              }}
            />
          </View>

          <InputEl
            value={formState['certificate']}
            label="Upload Certificate"
            error={errors.certificate}
            right={<TextInput.Icon icon={() => <Icon name="document" />} />}
            showKeyboard={false}
            onPressIn={() => openFileDirectory('certificate')}
          />

          <ButtonEl
            onPress={onFormSubmit}
            style={{ marginVertical: 20 }}
            btnTextColor={primaryColor}
          >
            Save
          </ButtonEl>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

export default OtherQualificationsForm

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  duration: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 5,
    width: '100%',
    zIndex: 100,
  },
})
