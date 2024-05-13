import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import useForm from 'hooks/useForm'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import ButtonEl from 'components/elements/Button'
import { updatePatientSocialHistory } from 'services/patientprofile/specificHealthHistory/socialHistory'
import Loading from 'components/elements/ActivityIndicator'

const defaultFormState = {
  does_consume_alcohol: '',
  alcohol_consumption_type_id: '',
}

const Alcohol = (props: { socialHistory: Record<string, string>[]; consumptionType: any[] }) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async () => {
    setIsLoading(true)
    try {
      const response = await updatePatientSocialHistory(formState)
      console.log(response, formState)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setFormState({
      ...props.socialHistory?.[0],
    })
  }, [props.socialHistory])

  return (
    <View style={styles.form}>
      <Loading show={isLoading} />
      <SwitchEl
        value={formState['does_consume_alcohol']}
        onChange={() => {
          onChange('does_consume_alcohol', !formState['does_consume_alcohol'])
        }}
        label="Do you consume alcohol?"
        style={{ marginBottom: 20 }}
      />
      {formState['does_consume_alcohol'] && (
        <Dropdown
          value={formState['alcohol_consumption_type_id']}
          items={props.consumptionType?.slice(0, 2)}
          error={errors['alcohol_consumption_type_id']}
          placeholder="Consumption Type"
          setValue={(value: string) => onChange('alcohol_consumption_type_id', value)}
          zIndex={200}
        />
      )}
      <ButtonEl onPress={handleEdit} style={{ marginBottom: 20 }}>
        Update
      </ButtonEl>
    </View>
  )
}

export default Alcohol

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
