import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { TextInput } from 'react-native-paper'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import DocumentPicker, { DocumentPickerResponse, types } from 'react-native-document-picker'
import Icon from 'components/elements/Icon'
import { AppProps } from 'screens/Authentication/Welcome'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  addDoctorProfileAward,
  updateDoctorProfileAward,
  addDoctorProfileAwardDocument,
} from 'services/doctorprofile'
import { formatDate } from 'helpers/utils'

const defaultFormState = {
  awardName: '',
  receivedFrom: '',
  receivedYear: '',
  description: '',
  document: '',
}

const AwardsAndAchievementsForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const [awardDocument, setAwardDocument] = useState<null | DocumentPickerResponse | FormData>(null)

  const route = useRoute()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const { profile } = useAppSelector((state) => state.drProfile)

  const award = useMemo(() => route?.params?.award, [route])

  useEffect(() => {
    if (award) {
      setFormState({
        awardName: award?.award_name,
        receivedFrom: award?.received_from,
        receivedYear: award?.received_year,
        description: award?.description,
        document: award?.award_document,
      })
    }
  }, [award])

  const openFileDirectory = (name: string) => {
    DocumentPicker.pickMultiple({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => {
        console.log(res[0])
        onChange(name, res[0].name ?? '')
        const formData = new FormData()
        formData.append('award_document', {
          name: res[0]?.name,
          size: res[0]?.size,
          type: res[0]?.type,
          uri: res[0]?.uri,
        })
        setAwardDocument(formData)
      })
      .catch((err) => console.log(err))
  }

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      try {
        dispatch(showLoading())

        const payload = {
          doctor_profile_id: profile?.id,
          award_name: formState?.awardName,
          received_from: formState?.receivedFrom,
          received_year: formState?.receivedYear,
          description: formState?.description,
          award_document: formState?.document,
        }
        const response = award
          ? await updateDoctorProfileAward({
              award_name: award?.award_name,
              received_from: award?.received_from,
              received_year: award?.received_year,
              payload,
            })
          : await addDoctorProfileAward(payload)
        if (response?.status) {
          if (awardDocument) {
            const res = await addDoctorProfileAwardDocument({
              payload: awardDocument,
              doctor_profile_id: profile?.id,
              award_name: formState?.awardName,
              received_from: formState?.receivedFrom,
              received_year: formState?.receivedYear,
              description: formState?.description,
            })
          }
          if (res) navigation.navigate('AwardsAndAchievements' as never)
        }
      } catch (error) {
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    onChange('receivedYear', formatDate(date))
    hideDatePicker()
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Award/Achievement Name"
            error={errors.awardName}
            onChangeText={(text) => onChange('awardName', text)}
            value={formState['awardName']}
          />

          <InputEl
            label="Received From"
            error={errors.receivedFrom}
            onChangeText={(text) => onChange('receivedFrom', text)}
            value={formState['receivedFrom']}
          />

          <View>
            <InputEl
              value={formState['receivedYear']}
              label="Date of Exam Passed"
              error={errors.receivedYear}
              onChangeText={(text) => onChange('receivedYear', text)}
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
          <InputEl
            label="Description"
            error={errors.description}
            onChangeText={(text) => onChange('description', text)}
            value={formState['description']}
          />

          <InputEl
            value={formState['document']}
            label="Upload Document"
            error={errors.document}
            right={<TextInput.Icon icon={() => <Icon name="document" />} />}
            showKeyboard={false}
            onFocus={() => openFileDirectory('document')}
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

export default AwardsAndAchievementsForm

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
})
