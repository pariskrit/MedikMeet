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
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { addPatientHealthDetails, updatePatientHealthDetails } from 'services/patientprofile'
import { RouteProp, useRoute } from '@react-navigation/native'

const defaultFormState = {
  date: null,
  weight: null,
  height: null,
  systolic_blood_pressure: null,
  diastolic_blood_pressure: null,
  heart_rate: null,
  temperature: null,
  temperature_unit_id: null,
  random_blood_sugar: null,
  random_blood_sugar_unit_id: null,
  fasting_blood_sugar: null,
  fasting_blood_sugar_unit_id: null,
  hba1c: null,
  hba1c_unit_id: null,
  spo2: null,
}

const GeneralHealthHistoryForm = ({ navigation }: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const dispatch = useDispatch()
  const route: RouteProp<any> = useRoute()

  const temperatureTypes = useMemo(() => route?.params?.temperatureTypes, [route])
  const hba1cTypes = useMemo(() => route?.params?.hba1cTypes, [route])
  const bloodSugarTypes = useMemo(() => route?.params?.bloodSugarTypes, [route])
  const healthDetail = useMemo(() => route?.params?.healthDetail, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()

    if (res) {
      try {
        dispatch(showLoading())

        const response = healthDetail
          ? await updatePatientHealthDetails(formState)
          : await addPatientHealthDetails(formState)
        if (response.status) {
          navigation.navigate('GeneralHealthHistory')
        }
      } catch (error) {
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  useEffect(() => {
    if (healthDetail) {
      setFormState({
        ...healthDetail,
        weight: healthDetail?.weight ? '' + healthDetail?.weight : null,
        height: healthDetail?.height ? '' + healthDetail?.height : null,
        systolic_blood_pressure: healthDetail?.systolic_blood_pressure
          ? '' + healthDetail?.systolic_blood_pressure
          : null,
        diastolic_blood_pressure: healthDetail?.diastolic_blood_pressure
          ? '' + healthDetail?.diastolic_blood_pressure
          : null,
        heart_rate: healthDetail?.heart_rate ? '' + healthDetail?.heart_rate : null,
        temperature: healthDetail?.temperature ? '' + healthDetail?.temperature : null,
        random_blood_sugar: healthDetail?.random_blood_sugar
          ? '' + healthDetail?.random_blood_sugar
          : null,
        fasting_blood_sugar: healthDetail?.fasting_blood_sugar
          ? '' + healthDetail?.fasting_blood_sugar
          : null,
      })
    }
  }, [healthDetail])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <DatePickerEl
            name="date"
            value={formState['date']}
            label="Date"
            error={errors.date}
            onChange={onChange}
          />

          <InputEl
            label="Weight"
            error={errors.weight}
            value={formState['weight']}
            onChangeText={(text) => onChange('weight', text)}
            keyboardType="number-pad"
            right="kg"
          />
          <InputEl
            label="Height"
            value={formState['height']}
            error={errors.height}
            onChangeText={(text) => onChange('height', text)}
            keyboardType="number-pad"
            right="cm"
          />
          <InputEl
            value={formState['systolic_blood_pressure']}
            label="Systolic Blood Pressure"
            error={errors.systolic_blood_pressure}
            keyboardType="number-pad"
            onChangeText={(text) => onChange('systolic_blood_pressure', text)}
            right="mmHg"
          />

          <InputEl
            value={formState['diastolic_blood_pressure']}
            label="Diastolic Blood Pressure"
            error={errors.diastolic_blood_pressure}
            keyboardType="number-pad"
            onChangeText={(text) => onChange('diastolic_blood_pressure', text)}
            right="mmHg"
          />
          <InputEl
            label="Heart Rate"
            value={formState['heart_rate']}
            error={errors.heart_rate}
            keyboardType="number-pad"
            onChangeText={(text) => onChange('heart_rate', text)}
            right="bpm"
          />
          <View style={{ ...styles.twoInputs, zIndex: 300 }}>
            <InputEl
              label="Temperature"
              onChangeText={(text) => onChange('temperature', text)}
              value={formState['temperature']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['temperature_unit_id']}
              items={temperatureTypes}
              error={errors['temperature_unit_id']}
              placeholder="Units"
              setValue={(value: string) => onChange('temperature_unit_id', value)}
              zIndex={300}
              styles={{ flex: 0.4, marginRight: -30 }}
            />
          </View>
          <View style={{ ...styles.twoInputs, zIndex: 200 }}>
            <InputEl
              label="Random Blood Sugar"
              onChangeText={(text) => onChange('random_blood_sugar', text)}
              value={formState['random_blood_sugar']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['random_blood_sugar_unit_id']}
              items={bloodSugarTypes}
              error={errors['random_blood_sugar_unit_id']}
              placeholder="Units"
              setValue={(value: string) => onChange('random_blood_sugar_unit_id', value)}
              zIndex={200}
              styles={{ flex: 0.4, marginRight: -30 }}
            />
          </View>
          <View style={{ ...styles.twoInputs, zIndex: 101 }}>
            <InputEl
              label="Fasting Blood Sugar"
              onChangeText={(text) => onChange('fasting_blood_sugar', text)}
              value={formState['fasting_blood_sugar']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['fasting_blood_sugar_unit_id']}
              items={bloodSugarTypes}
              error={errors['fasting_blood_sugar_unit_id']}
              placeholder="Units"
              setValue={(value: string) => onChange('fasting_blood_sugar_unit_id', value)}
              zIndex={100}
              styles={{ flex: 0.4, marginRight: -30 }}
            />
          </View>
          <View style={{ ...styles.twoInputs, zIndex: 50 }}>
            <InputEl
              label="hba1c"
              onChangeText={(text) => onChange('hba1c', text)}
              value={formState['hba1c']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['hba1c_unit_id']}
              items={hba1cTypes}
              error={errors['hba1c_unit_id']}
              placeholder="Units"
              setValue={(value: string) => onChange('hba1c_unit_id', value)}
              zIndex={50}
              styles={{ flex: 0.4, marginRight: -30 }}
            />
          </View>

          <InputEl
            label="SPO2(Pulse Oximeter"
            error={errors.spo2}
            value={formState['spo2']}
            onChangeText={(text) => onChange('spo2', text)}
            keyboardType="number-pad"
            right="%"
          />

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

export default GeneralHealthHistoryForm

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
  twoInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
  },
})
