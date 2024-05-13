import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useForm from 'hooks/useForm'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import InputEl from 'components/elements/form/InputEl'
import ButtonEl from 'components/elements/Button'
import { updatePatientSocialHistory } from 'services/patientprofile/specificHealthHistory/socialHistory'
import Loading from 'components/elements/ActivityIndicator'

const defaultFormState = {
  does_consume_tobacco: '',
  tobacco_consumption_type_id: '',
  no_of_sticks_per_day: '',
  smoking_for: '',
  smoking_for_unit_id: '',
  intention_to_quit: '',

}

const Tobacco = (props: {
  socialHistory: Record<string, string>[]
  consumptionType: any[]
  onEdit: (param: any) => void
  duration: any[]
}) => {
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
      smoking_for: '' + props?.socialHistory?.[0]?.smoking_for,
    })
  }, [props.socialHistory])
  return (
    <ScrollView style={{ flex: 1 }}>
      <Loading show={isLoading} />

      <View style={styles.form}>
        <SwitchEl
          value={formState['does_consume_tobacco']}
          onChange={() => {
            onChange('does_consume_tobacco', !formState['does_consume_tobacco'])
          }}
          label="Tobacco consumption"
          style={{ marginBottom: 20 }}
        />
        {formState['does_consume_tobacco'] && (
          <Dropdown
            value={formState['tobacco_consumption_type_id']}
            items={props.consumptionType?.slice(2, 4)}
            error={errors['tobacco_consumption_type_id']}
            placeholder="Tobacco Consumption Type"
            setValue={(value: string) => onChange('tobacco_consumption_type_id', value)}
            zIndex={200}
          />
        )}
        {formState['tobacco_consumption_type_id'] === 8 && (
          <>
            <Dropdown
              value={formState['no_of_sticks_per_day']}
              items={[
                { label: '10-15 sticks', value: '10-15 sticks' },
                { label: '1-5 sticks', value: '1-5 sticks' },
                { label: '5-10 sticks', value: '5-10 sticks' },
                { label: '15-20 sticks', value: '15-20 sticks' },
                { label: 'over 20 sticks', value: 'over 20 sticks' },
                { label: '1-5 sticks/week', value: '1-5 sticks/week' },
                { label: '5-10 sticks/week', value: '5-10 sticks/week' },
              ]}
              error={errors['no_of_sticks_per_day']}
              placeholder="Number of sticks per day"
              setValue={(value: string) => onChange('no_of_sticks_per_day', value)}
              zIndex={100}
              scroll
            />
            <View style={{ ...styles.allergy, marginTop: -140, zIndex: 101 }}>
              <InputEl
                label="How long have you been smoking?"
                onChangeText={(text) => onChange('smoking_for', text)}
                value={formState['smoking_for']}
                style={{ flex: 1 }}
                keyboardType="number-pad"
              />
              <Dropdown
                value={formState['smoking_for_unit_id']}
                items={props?.duration}
                error={errors['smoking_for_unit_id']}
                placeholder="Day's"
                setValue={(value: string) => onChange('smoking_for_unit_id', value)}
                zIndex={200}
                styles={{ flex: 0.5, marginRight: -30 }}
              />
            </View>

            <SwitchEl
              value={formState['intention_to_quit']}
              onChange={() => {
                onChange('intention_to_quit', !formState['intention_to_quit'])
              }}
              label="Intention to Quit?"
              style={{ marginBottom: 20 }}
            />
          </>
        )}


      </View>
      <ButtonEl onPress={handleEdit} style={{ marginBottom: 20 }}>
        Update
      </ButtonEl>
    </ScrollView>
  )
}

export default Tobacco

const styles = StyleSheet.create({
  form: {
    padding: 10,
    flex: 1,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  allergy: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
  },
})
