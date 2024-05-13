import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { TextInput } from 'react-native-paper'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import DocumentPicker, { types } from 'react-native-document-picker'
import Icon from 'components/elements/Icon'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import DatePickerEl from 'components/elements/form/DatePicker'
import SwitchEl from 'components/elements/form/Switch'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { addPatientMedicalHistory, updatePatientMedicalHistory } from 'services/patientprofile'
import { useRoute } from '@react-navigation/native'
import { getFollowUpCenter, getFollowUpCenterType } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'

const defaultFormState = {
  medical_diagnosis: '',
  diagnosed_date: null,
  still_on_follow_up: false,
  reason_not_follow_up: null,
  follow_up_at_center_id: null,
  follow_up_center_type_id: null,
}

const MedicalHistoryForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)

  const dispatch = useDispatch()
  const route = useRoute()

  const medicalHistory = useMemo(() => route?.params?.medicalHistory, [route])
  const followUpCenter = useMemo(() => route?.params?.followUpCenters, [route])
  const followUpCenterType = useMemo(() => route?.params?.followUpCenterTypes, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()

    if (res) {
      try {
        dispatch(showLoading())

        const response = medicalHistory
          ? await updatePatientMedicalHistory(formState)
          : await addPatientMedicalHistory(formState)
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
    if (medicalHistory) {
      setFormState({
        ...medicalHistory,
      })
    }
  }, [medicalHistory])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Add medical Diagnosis"
            value={formState['medical_diagnosis']}
            onChangeText={(text) => onChange('medical_diagnosis', text)}
          />
          <DatePickerEl
            name="diagnosed_date"
            value={formState['diagnosed_date']}
            label="Date Diagnosed"
            error={errors.diagnosed_date}
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
              value={formState['reason_not_follow_up']}
              onChangeText={(text) => onChange('reason_not_follow_up', text)}
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

export default MedicalHistoryForm

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
