import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import { useRoute } from '@react-navigation/native'
import {
  addPatientContraceptiveHistory,
  updatePatientContraceptiveHistory,
} from 'services/patientprofile'

const defaultFormState = {
  date_started_on: null,
  duration_been_on: null,
  contraceptive_type_id: null,
  contraceptive_name: null,
  duration_been_on_unit_id: null,
}

const ContraceptiveHistoryForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const route = useRoute()

  const contraceptiveType = useMemo(() => route?.params?.contraceptiveType, [route])
  const duration = useMemo(() => route?.params?.duration, [route])
  const contraceptiveHistory = useMemo(() => route?.params?.contraceptiveHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = contraceptiveHistory
        ? await updatePatientContraceptiveHistory(formState)
        : await addPatientContraceptiveHistory(formState)
      if (response.status) {
        props?.navigation.goBack()
      }
    }
  }

  useEffect(() => {
    if (contraceptiveHistory) {
      setFormState({
        ...contraceptiveHistory,
        duration_been_on: contraceptiveHistory?.duration_been_on
          ? '' + contraceptiveHistory?.duration_been_on
          : '',
      })
    }
  }, [contraceptiveHistory])
  return (
    <View style={styles.form}>
      <KeyboardDismiss>
        <Dropdown
          value={formState['contraceptive_type_id']}
          items={contraceptiveType}
          error={errors['contraceptive_type_id']}
          placeholder="Contraceptive Type"
          setValue={(value: string) => onChange('contraceptive_type_id', value)}
          zIndex={100}
        />
        <InputEl
          label="Generic Name"
          onChangeText={(text) => onChange('contraceptive_name', text)}
          value={formState['contraceptive_name']}
        />
        <InputEl
          label="Date started"
          onChangeText={(text) => onChange('date_started_on', text)}
          value={formState['date_started_on']}
        />
        <View style={styles.container}>
          <InputEl
            label="Time Period"
            onChangeText={(text) => onChange('duration_been_on', text)}
            value={formState['duration_been_on']}
            style={{ flex: 1 }}
            keyboardType="number-pad"
          />
          <Dropdown
            value={formState['duration_been_on_unit_id']}
            items={duration}
            error={errors['duration_been_on_unit_id']}
            placeholder="Unit"
            setValue={(value: string) => onChange('duration_been_on_unit_id', value)}
            zIndex={150}
            styles={{ flex: 0.4, marginRight: -30 }}
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
  )
}

export default ContraceptiveHistoryForm

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 0.6,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    zIndex: 200,
  },
})
