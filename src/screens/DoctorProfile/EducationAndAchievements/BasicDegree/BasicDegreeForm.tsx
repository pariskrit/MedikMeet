import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
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
import SwitchSelector from 'react-native-switch-selector'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { getCountry, getDegreeTypes, getRecongnitionypes } from 'services/masters'
import {
  addDoctorProfileEducation,
  addDoctorProfileEducationDocument,
  updateDoctorProfileEducation,
} from 'services/doctorprofile'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { showLoading, hideLoading } from 'redux/reducer/commonSlice'

const defaultFormState = {
  qualificationType: 'medical',
  basicDegreeQualificationType: { isRequired: true, value: '' },
  universityName: { isRequired: true, value: '' },
  recognization: '',
  country: { isRequired: true, value: '' },
  dateOfExamPassed: '',
  certificate: '',
  localEntranceExam: '',
}

const BasicDegreeForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [certificateDoc, setCertificateDoc] = useState<null | DocumentPickerResponse>(null)
  const [localEntranceExamDoc, setlocalEntranceExamDoc] = useState<null | DocumentPickerResponse>(
    null
  )

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [degreeTypes, setDegreeTypes] = useState([])
  const [recognizationTypes, setRecognizationTypes] = useState([])
  const [country, setCountry] = useState([])
  const navigation = useNavigation()
  const route: RouteProp<any, any> = useRoute()
  const dispatch = useAppDispatch()

  const education = useMemo(() => route?.params?.education, [route])

  useEffect(() => {
    if (education) {
      setFormState({
        qualificationType: education?.degree_type?.domain,
        basicDegreeQualificationType: { isRequired: true, value: education?.degree_type?.id },
        universityName: { isRequired: true, value: education?.university_name },
        recognization: education?.recognition_type?.id,
        country: { isRequired: true, value: education?.country?.id },
        dateOfExamPassed: education?.year_of_completion,
        certificate: education?.certificate,
        localEntranceExam: education?.local_entrance_exm_proof,
      })
    }
  }, [education])

  const { profile } = useAppSelector((state) => state.drProfile)

  useEffect(() => {
    const fetchDegreeType = async () => {
      try {
        const [response, response1, response2] = await Promise.all([
          getDegreeTypes(),
          getRecongnitionypes(),
          getCountry(),
        ])
        setDegreeTypes(response?.data?.data?.degree_types)
        setRecognizationTypes(getDropdownFormat(response1?.data?.data?.degree_recognition_type))
        setCountry(getDropdownFormat(response2?.data?.data?.countries))
      } catch (error) {}
    }
    fetchDegreeType()
  }, [])

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }
  const openFileDirectory = (name: string) => {
    DocumentPicker.pickMultiple({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => {
        onChange(name, res[0].name ?? '')
        name === 'certificate' ? setCertificateDoc(res?.[0]) : setlocalEntranceExamDoc(res?.[0])
      })
      .catch((err) => console.log(err))
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    onChange('dateOfExamPassed', formatDate(date))
    hideDatePicker()
  }

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      try {
        dispatch(showLoading())

        const payload = {
          country_id: formState.country.value,
          degree_type: formState.qualificationType,
          degree_type_id: formState.basicDegreeQualificationType.value,
          doctor_profile_id: profile?.id,
          university_name: formState.universityName.value,
          year_of_completion: formState.dateOfExamPassed,
          recognition_type_id: formState.recognization,
          degree_title: '1',
        }

        const response = education
          ? await updateDoctorProfileEducation(education?.id, payload)
          : await addDoctorProfileEducation(payload)
        if (response.status) {
          if (certificateDoc) {
            const certDoc = new FormData()
            certDoc.append('certificate', certificateDoc)
            if (localEntranceExamDoc) {
              certDoc.append('local_entrance_exm_proof', localEntranceExamDoc)
            }
            const docResponse = await addDoctorProfileEducationDocument(
              education ? education?.id : response?.data?.message?.id,
              certDoc
            )
          }
          if (res) navigation.navigate('EducationalInfo' as never)
        }
      } catch (error) {
      } finally {
        dispatch(hideLoading())
      }
    }
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <SwitchSelector
            initial={0}
            onPress={(value: any) => onChange('qualificationType', value)}
            // textColor={colors.purple} //'#7a44cf'
            // selectedColor={colors.white}
            buttonColor={primaryColor}
            // borderColor={colors.purple}
            options={[
              { label: 'Medical', value: 'medical' }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: 'Dental', value: 'dental' }, //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
            value={formState['qualificationType']?.toLowerCase() === 'dental' ? 1 : 0}
            style={{ marginBottom: 20 }}
          />
          <Dropdown
            value={formState['basicDegreeQualificationType'].value}
            items={getDropdownFormat(
              degreeTypes?.filter(
                (d: any) =>
                  d?.domain?.toLowerCase() === formState['qualificationType']?.toLowerCase()
              )
            )}
            error={errors['basicDegreeQualificationType']}
            placeholder="Basic Degree Qualification Type"
            setValue={(value: string) => onChange('basicDegreeQualificationType', value)}
            styles={{ marginVertical: 10 }}
            isRequired
          />
          <InputEl
            label="University/College/Institution Name"
            error={errors.universityName}
            onChangeText={(text) => onChange('universityName', text)}
            isRequired
            value={formState['universityName'].value}
          />

          <Dropdown
            value={formState['recognization']}
            items={recognizationTypes}
            error={errors['recognization']}
            placeholder="Recognization"
            setValue={(value: string) => onChange('recognization', value)}
            styles={{ marginVertical: 10 }}
            zIndex={99}
          />

          <Dropdown
            value={formState['country'].value}
            items={country}
            error={errors['country']}
            placeholder="Country"
            setValue={(value: string) => onChange('country', value)}
            styles={{ marginVertical: 10 }}
            zIndex={98}
            isRequired
            scroll
            searchable
          />
          <View style={{ marginTop: -150, zIndex: 100 }}>
            <InputEl
              value={formState['dateOfExamPassed']}
              label="Date of Exam Passed"
              error={errors.dateOfExamPassed}
              onChangeText={(text) => onChange('dateOfExamPassed', text)}
              showKeyboard={false}
              onPressIn={showDatePicker}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <View>
            <InputEl
              value={formState['certificate']}
              label="Upload Certificate"
              error={errors.certificate}
              right={<TextInput.Icon icon={() => <Icon name="document" />} />}
              showKeyboard={false}
              onFocus={() => openFileDirectory('certificate')}
            />
          </View>
          <View>
            <InputEl
              value={formState['localEntranceExam']}
              label="Upload proof of local entrance exam"
              error={errors.localEntranceExam}
              right={<TextInput.Icon icon={() => <Icon name="document" />} />}
              showKeyboard={false}
              onFocus={() => openFileDirectory('localEntranceExam')}
            />
          </View>
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

export default BasicDegreeForm

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
})
