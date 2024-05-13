import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import { AppProps } from 'screens/Authentication/Welcome'
import DatePickerEl from 'components/elements/form/DatePicker'
import UploadFile from 'components/elements/form/UploadFile'
import { useRoute } from '@react-navigation/native'
import {
  addPatientMedicalDocuments,
  updatePatientMedicalDocuments,
  uploadPatientMedicalDocuments,
} from 'services/patientprofile/medicalDocuments'

const defaultFormState = {
  document_name: null,
  document_type: null,
  description: null,
  Document_date: null,
}

const MedicalDocumentsForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [file, setFile] = useState<any>({})

  const route = useRoute()

  const medicalDocument = useMemo(() => route?.params?.medicalDocument, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const formData = new FormData()
      let response = null

      if (!medicalDocument) {
        response = await addPatientMedicalDocuments({ ...formState, id: null, isNew: true })
        formData.append('document', {
          uri: file?.uri,
          name: file?.name,
          type: file?.type,
        })
        const documentRes = await uploadPatientMedicalDocuments(response?.data?.data?.id, formData)
      } else {
        response = await updatePatientMedicalDocuments(formState)

        if (file?.uri) {
          formData.append('document', {
            uri: file?.uri,
            name: file?.name,
            type: file?.type,
          })
          const documentRes = await uploadPatientMedicalDocuments(medicalDocument?.id, formData)
        }
      }
      if (response.status) {
        props?.navigation.goBack()
      }
    }
  }
  useEffect(() => {
    if (medicalDocument) {
      setFormState({ ...medicalDocument })
      setFile({
        name: medicalDocument?.Document ? medicalDocument?.Document?.split('/').at(-1) : '',
      })
    }
  }, [medicalDocument])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Document Name"
            onChangeText={(text) => onChange('document_name', text)}
            value={formState['document_name']}
          />
          <InputEl
            label="Document Type"
            onChangeText={(text) => onChange('document_type', text)}
            value={formState['document_type']}
          />

          <InputEl
            label="Description"
            onChangeText={(text) => onChange('description', text)}
            value={formState['description']}
          />
          <UploadFile
            name="Document"
            onChange={(name, uploadFile) => setFile(uploadFile)}
            value={file?.name}
            label="Select File"
          />
          <DatePickerEl
            name="Document_date"
            value={formState['Document_date']}
            label="Document Date"
            error={errors.Document_date}
            onChange={onChange}
          />

          <ButtonEl
            onPress={onFormSubmit}
            style={{ marginVertical: 20 }}
          >
            Save
          </ButtonEl>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

export default MedicalDocumentsForm

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
