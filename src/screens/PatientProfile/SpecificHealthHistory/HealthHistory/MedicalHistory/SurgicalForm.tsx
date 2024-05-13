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
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { addPatientSurgicalHistory, updatePatientSurgicalHistory } from 'services/patientprofile'

const defaultFormState = {
  surgical_diagnosis: '',
  diagnosed_date: null,
  procedure_date: null,
  procedure_description: null,
  still_on_follow_up: false,
  reason_not_follow_up: null,
  follow_up_at_center_id: null,
  follow_up_center_type_id: null,
}

const SurgicalForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const dispatch = useDispatch()

  const route = useRoute()

  const surgicalHistory = useMemo(() => route?.params?.surgicalHistory, [route])
  const followUpCenter = useMemo(() => route?.params?.followUpCenters, [route])
  const followUpCenterType = useMemo(() => route?.params?.followUpCenterTypes, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()

    if (res) {
      try {
        dispatch(showLoading())

        const response = surgicalHistory
          ? await updatePatientSurgicalHistory(formState)
          : await addPatientSurgicalHistory(formState)
        if (response.status) {
          navigation.navigate('HealthHistory')
        }
      } catch (error) {
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  useEffect(() => {
    if (surgicalHistory) {
      setFormState({
        ...surgicalHistory,
      })
    }
  }, [surgicalHistory])

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Add Surgical Diagnosis"
            onChangeText={(text) => onChange('surgical_diagnosis', text)}
            value={formState['surgical_diagnosis']}
          />
          <DatePickerEl
            name="diagnosed_date"
            value={formState['diagnosed_date']}
            label="Date Diagnosed"
            error={errors.diagnosed_date}
            onChange={onChange}
          />
          <InputEl
            label="Describe surgical procedure performed"
            onChangeText={(text) => onChange('procedure_description', text)}
            value={formState['procedure_description']}
          />
          <DatePickerEl
            name="procedure_date"
            value={formState['procedure_date']}
            label="Select date of surgical procedure performed"
            error={errors.procedure_date}
            onChange={onChange}
          />

          <SwitchEl
            value={formState['still_on_follow_up']}
            onChange={() => {
              onChange('still_on_follow_up', !formState['still_on_follow_up'])
            }}
            label="Currently Still on Follow-Up?"
            style={{ marginBottom: 20 }}
          />
          {formState['still_on_follow_up'] ? (
            <>
              <Dropdown
                value={formState['follow_up_at_center_id']}
                items={followUpCenter}
                error={errors['follow_up_at_center_id']}
                placeholder="Follow-up at which centre?"
                setValue={(value: string) => onChange('follow_up_at_center_id', value)}
                zIndex={100}
              />
              <Dropdown
                value={formState['follow_up_center_type_id']}
                items={followUpCenterType}
                error={errors['follow_up_center_type_id']}
                placeholder="Follow-up center type"
                setValue={(value: string) => onChange('follow_up_center_type_id', value)}
                zIndex={50}
              />
            </>
          ) : (
            <InputEl
              label="Reason not on Follow-Up?"
              onChangeText={(text) => onChange('reason_not_follow_up', text)}
              value={formState['reason_not_follow_up']}
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

export default SurgicalForm

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
