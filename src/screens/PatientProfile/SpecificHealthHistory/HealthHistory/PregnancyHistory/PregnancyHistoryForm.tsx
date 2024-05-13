import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import { useRoute } from '@react-navigation/native'
import { addPatientPregnancyHistory, updatePatientPregnancyHistory } from 'services/patientprofile'
import { getAidedHistory, getPregnancyMethod } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'

const defaultFormState = {
  menstrual_cycle_type_id: null,
  have_pregnancy_history: null,
  is_treatment_for_irregularity: null,
  treatment_description: null,
  delivery_method_id: null,
  aided_method_id: null,
  year_delivered: null,
  have_abortion_history: null,
  abortion_count: null,
}

const PregnancyHistoryForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const route = useRoute()
  const [pregnancyMethod, setPregnancyMethod] = useState([])
  const [aided, setAided] = useState([])

  const menstrualCycleType = useMemo(() => route?.params?.menstrualCycleType, [route])
  const deliveryType = useMemo(() => route?.params?.deliveryType, [route])
  const pregnancyHistory = useMemo(() => route?.params?.pregnancyHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = pregnancyHistory
        ? await updatePatientPregnancyHistory(formState)
        : await addPatientPregnancyHistory(formState)
      console.log(formState, 'Response')
      if (response.status) {
        navigation.goBack()
      }
    }
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getPregnancyMethod()
      const res2 = await getAidedHistory()
      if (res.status && res2.status) {
        setPregnancyMethod(getDropdownFormat(res.data.data.pregnancy_method))
        setAided(getDropdownFormat(res2.data.data.aided_method))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (pregnancyHistory) {
      setFormState({
        ...pregnancyHistory,
        year_delivered: pregnancyHistory?.year_delivered
          ? '' + pregnancyHistory?.year_delivered
          : '',
        abortion_count: pregnancyHistory?.abortion_count
          ? '' + pregnancyHistory?.abortion_count
          : '',
      })
    }
  }, [pregnancyHistory])

  useEffect(() => {
    fetchDropdownItems()
  }, [])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <Dropdown
            value={formState['menstrual_cycle_type_id']}
            items={menstrualCycleType}
            error={errors['menstrual_cycle_type_id']}
            placeholder="Menstrual Cycle"
            setValue={(value: string) => onChange('menstrual_cycle_type_id', value)}
            zIndex={200}
          />
          {formState['menstrual_cycle_type_id'] === 2 && (
            <SwitchEl
              value={formState['is_treatment_for_irregularity']}
              onChange={() => {
                onChange(
                  'is_treatment_for_irregularity',
                  !formState['is_treatment_for_irregularity']
                )
              }}
              label="Treatment taken for Irregularity?"
              style={{ marginBottom: 20 }}
            />
          )}
          {formState['is_treatment_for_irregularity'] && (
            <InputEl
              label="Describe what kind of treatment"
              onChangeText={(text) => onChange('treatment_description', text)}
              value={formState['treatment_description']}
            />
          )}
          <SwitchEl
            value={formState['have_pregnancy_history']}
            onChange={() => {
              onChange('have_pregnancy_history', !formState['have_pregnancy_history'])
            }}
            label="History of Pregnancy"
            style={{ marginBottom: 20 }}
          />
          {formState['have_pregnancy_history'] && (
            <>
              <Dropdown
                value={formState['pregnancy_method_id']}
                items={pregnancyMethod}
                error={errors['pregnancy_method_id']}
                placeholder="Pregnancy Method"
                setValue={(value: string) => onChange('pregnancy_method_id', value)}
                zIndex={100}
              />
              {formState['pregnancy_method_id'] === 2 && (
                <Dropdown
                  value={formState['aided_method_id']}
                  items={aided}
                  error={errors['aided_method_id']}
                  placeholder="Aided method"
                  setValue={(value: string) => onChange('aided_method_id', value)}
                  zIndex={50}
                />
              )}
              <InputEl
                label="Year Delivered"
                onChangeText={(text) => onChange('year_delivered', text)}
                value={formState['year_delivered']}
                keyboardType="number-pad"
              />
              {formState['year_delivered'] && (
                <Dropdown
                  value={formState['delivery_method_id']}
                  items={deliveryType}
                  error={errors['delivery_method_id']}
                  placeholder="Delivery Method"
                  setValue={(value: string) => onChange('delivery_method_id', value)}
                  zIndex={100}
                />
              )}

              <SwitchEl
                value={formState['have_abortion_history']}
                onChange={() => {
                  onChange('have_abortion_history', !formState['have_abortion_history'])
                }}
                label="History of Abortion/misscarriage?"
                style={{ marginBottom: 20 }}
              />
              {formState['have_abortion_history'] && (
                <InputEl
                  label="Abortion Count"
                  onChangeText={(text) => onChange('abortion_count', text)}
                  value={formState['abortion_count']}
                />
              )}
            </>
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

export default PregnancyHistoryForm

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
