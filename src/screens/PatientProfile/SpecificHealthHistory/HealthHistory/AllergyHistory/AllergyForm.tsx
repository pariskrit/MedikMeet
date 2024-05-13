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
import { useRoute } from '@react-navigation/native'
import { addPatientAllergyHistory, updatePatientAllergyHistory } from 'services/patientprofile'

const defaultFormState = {
  allergy_type_id: null,
  allergy_description: null,
  allergy_other_description: null,
  allergy_discovery: null,
  allergy_discovery_unit_id: null,
}

const AllergyForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)

  const route = useRoute()

  const allergyType = useMemo(() => route?.params?.allergyType, [route])
  const duration = useMemo(() => route?.params?.duration, [route])
  const allergyHistory = useMemo(() => route?.params?.allergyHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = allergyHistory
        ? await updatePatientAllergyHistory(formState)
        : await addPatientAllergyHistory(formState)
      if (response.status) {
        navigation.goBack()
      }
    }
  }

  useEffect(() => {
    if (allergyHistory) {
      setFormState({
        ...allergyHistory,
        allergy_discovery: '' + allergyHistory?.allergy_discovery,
      })
    }
  }, [allergyHistory])
  return (
    <View style={styles.form}>
      <KeyboardDismiss>
        <Dropdown
          value={formState['allergy_type_id']}
          items={allergyType}
          error={errors['allergy_type_id']}
          placeholder="Allergy Type"
          setValue={(value: string) => onChange('allergy_type_id', value)}
          zIndex={1}
          scroll
        />
        {formState['allergy_type_id'] === 6 && (
          <InputEl
            label="Describe Others"
            onChangeText={(text) => onChange('allergy_other_description', text)}
            value={formState['allergy_other_description']}
            style={{ marginTop: -160, zIndex: 101 }}
          />
        )}
        <InputEl
          label="Describe allergy reaction"
          onChangeText={(text) => onChange('allergy_description', text)}
          value={formState['allergy_description']}
          style={{ marginTop: formState['allergy_type_id'] === 6 ? 0 : -160, zIndex: 101 }}
        />
        <View style={styles.allergy}>
          <InputEl
            label="At what age known to be allergy?"
            onChangeText={(text) => onChange('allergy_discovery', text)}
            value={formState['allergy_discovery']}
            style={{ flex: 1 }}
            keyboardType="number-pad"
          />
          <Dropdown
            value={formState['allergy_discovery_unit_id']}
            items={duration}
            error={errors['allergy_discovery_unit_id']}
            placeholder="Duration"
            setValue={(value: string) => onChange('allergy_discovery_unit_id', value)}
            zIndex={200}
            styles={{ flex: 0.5, marginRight: -30 }}
          />
        </View>

        <ButtonEl
          onPress={onFormSubmit}
          style={{ marginVertical: 20, zIndex: 0 }}
          btnTextColor={primaryColor}
        >
          Save
        </ButtonEl>
      </KeyboardDismiss>
    </View>
  )
}

export default AllergyForm

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
  allergy: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    zIndex: 200,
  },
})
