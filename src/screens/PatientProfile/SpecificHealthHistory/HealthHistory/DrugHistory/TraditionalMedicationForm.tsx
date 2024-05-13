import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import DatePickerEl from 'components/elements/form/DatePicker'
import SwitchEl from 'components/elements/form/Switch'
import {
  addPatientTraditionalMedicineHistory,
  updatePatientTraditionalMedicineHistory,
} from 'services/patientprofile'
import { useRoute } from '@react-navigation/native'

const defaultFormState = {
  medicine_name: null,
  medicine_description: null,
  compliant_medication_by_doctor: null,
  reason_non_compliant: null,
}

const TraditionalMedicationForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)

  const route = useRoute()

  const medicineHistory = useMemo(() => route?.params?.traditionalMedicineHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = medicineHistory
        ? await updatePatientTraditionalMedicineHistory(formState)
        : await addPatientTraditionalMedicineHistory(formState)
      console.log(response)
      if (response.status) {
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    if (medicineHistory) {
      setFormState({
        ...medicineHistory,
      })
    }
  }, [medicineHistory])

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Medicine Name"
            onChangeText={(text) => onChange('medicine_name', text)}
            value={formState['medicine_name']}
          />
          <InputEl
            label="Medication Description"
            onChangeText={(text) => onChange('medicine_description', text)}
            value={formState['medicine_description']}
          />

          <Dropdown
            value={formState['compliant_medication_by_doctor']}
            items={[
              { label: 'YES', value: true },
              { label: 'NO', value: false },
            ]}
            error={errors['compliant_medication_by_doctor']}
            placeholder="Compliant to medications prescribed by practioner"
            setValue={(value: string) => onChange('compliant_medication_by_doctor', value)}
            zIndex={100}
          />
          {formState['compliant_medication_by_doctor'] ? null : (
            <InputEl
              label="Please state reason not compliant to prescription"
              onChangeText={(text) => onChange('reason_non_compliant', text)}
              value={formState['reason_non_compliant']}
            />
          )}

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

export default TraditionalMedicationForm

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
