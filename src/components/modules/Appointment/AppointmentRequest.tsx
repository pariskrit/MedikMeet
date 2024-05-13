import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import Dropdown from 'components/elements/form/Dropdown'
import InputEl from 'components/elements/form/InputEl'
import { error } from 'console'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import DocumentPicker, { types } from 'react-native-document-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { isEmpty } from 'utils'
interface IAppointmentRequestProps {}
const initialState = {
  signsSymptoms: '',
  description: '',
  upload: '',
}
const AppointmentRequest: React.FunctionComponent<IAppointmentRequestProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialState)
  const { signsSymptoms, description, upload } = formState
  const openFileDirectory = () => {
    DocumentPicker.pickSingle({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => onChange('upload', res ?? ''))
      .catch((err) => console.log(err))
  }
  return (
    <View>
      <View style={styles.header}>
        <MyText style={styles.headerText}>Appointment Request</MyText>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <MyText style={{ color: '#B3B3BF', fontSize: 14, lineHeight: 16 }}>
            Please describe your health concerns and upload any relevant documents from box provided
            below
          </MyText>
          <View style={{ marginTop: 10 }}>
            <InputEl
              multiLine={true}
              numberOfLines={5}
              error={errors.signsSymptoms}
              label={'Signs & Symptoms'}
              value={signsSymptoms}
              onChangeText={(text: string) => onChange('signsSymptoms', text)}
              borderRadius={10}
              // disabled
            />
            <InputEl
              multiLine={true}
              numberOfLines={5}
              error={errors.description}
              label={'Further Description'}
              value={description}
              onChangeText={(text: string) => onChange('description', text)}
              borderRadius={10}
              // disabled
            />
            <View style={{ marginTop: 10 }}>
              <Pressable onPress={() => openFileDirectory()}>
                <View style={styles.uploadContainer}>
                  <MyText style={{ color: '#B3B3BF' }}>Upload relevant document</MyText>
                  <Icon name="upload" />
                </View>
              </Pressable>
              {isEmpty(upload) ? (
                <MyText style={{ color: '#B3B3BF' }}>(Optional)</MyText>
              ) : (
                <MyText style={{ color: '#B3B3BF' }}>{upload.name}</MyText>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#4CC2CB',
    fontSize: 18,
    lineHeight: 22,
  },
  body: {
    paddingTop: 10,
  },
  bodyRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  btnContainer: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    marginTop: 10,
    borderColor: '#B3B3BF',
    borderWidth: 1,
  },
  uploadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 5,
  },
})
export default AppointmentRequest
