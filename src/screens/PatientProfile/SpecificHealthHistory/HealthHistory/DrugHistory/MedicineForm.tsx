import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState, useEffect, useMemo } from 'react'
import Dropdown from 'components/elements/form/Dropdown'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import SwitchSelector from 'react-native-switch-selector'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { getRouteType } from 'services/masters'
import { addPatientMedicineHistory, updatePatientMedicineHistory } from 'services/patientprofile'
import SwitchEl from 'components/elements/form/Switch'
import { useDispatch } from 'react-redux'
import { getDropdownFormat } from 'helpers/utils'

const defaultFormState = {
  is_prescribed_by_doctor: false,
  route: null,
  route_type_id: null,
  dosage: null,
  dosage_unit_id: null,
  duration: null,
  duration_id: null,
  is_pre_meal: false,
  is_post_meal: false,
  medicine: null,
  medicine_name: null,
  frequency: null,
  compliant_medication_by_doctor: null,
  reason_non_compliant: null,
}

const MedicineForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route: RouteProp<any> = useRoute()
  const [routeTypes, setRouteTypes] = useState([])

  const medicineHistory = useMemo(() => route?.params?.medicineHistory, [route])
  const routes = useMemo(() => route?.params?.route, [route])
  const routeType = useMemo(() => route?.params?.routeType, [route])
  const dosage = useMemo(() => route?.params?.dosage, [route])
  const duration = useMemo(() => route?.params?.duration, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const res = {
        ...formState,
        is_bd: formState['medicine'] === 'BD',
        is_od: formState['medicine'] === 'OD',
        is_prn: formState['medicine'] === 'PRN',
        is_qid: formState['medicine'] === 'QID',
        is_tds: formState['medicine'] === 'TDS',
        is_others: formState['medicine'] === 'others',
        isNew: true,
      }
      const response = medicineHistory
        ? await updatePatientMedicineHistory(res)
        : await addPatientMedicineHistory(res)
      console.log(formState)
      if (response.status) {
        if (res) navigation.goBack()
      }
    }
  }

  const getAllRouteTypes = async (id: number) => {
    const res = await getRouteType(id)
    setRouteTypes(getDropdownFormat(res?.data?.data?.route_type))
  }

  useEffect(() => {
    if (medicineHistory) {
      setFormState({
        ...medicineHistory,
        route: medicineHistory?.route_type?.id,
        dosage: '' + medicineHistory?.dosage,
        duration: '' + medicineHistory?.duration,
        medicine: medicineHistory?.is_bd
          ? 'BD'
          : medicineHistory?.is_od
          ? 'OD'
          : medicineHistory?.is_prn
          ? 'PRN'
          : medicineHistory?.is_qid
          ? 'QID'
          : medicineHistory?.is_tds
          ? 'TDS'
          : 'others',
      })
      getAllRouteTypes(medicineHistory?.route_type_id)
    }
  }, [medicineHistory])
  const [selectedDropdown, setSelectedDropdown] = React.useState('')
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <SwitchSelector
            initial={0}
            value={formState['is_prescribed_by_doctor'] ? 0 : 1}
            onPress={(value: any) => onChange('is_prescribed_by_doctor', value)}
            // textColor={colors.purple} //'#7a44cf'
            // selectedColor={colors.white}
            buttonColor={primaryColor}
            // borderColor={colors.purple}
            options={[
              { label: 'Prescribed by doctor', value: 'prescribed by doctor' }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { label: 'Self Prescribed', value: 'Self Prescribed' }, //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
            style={{ marginBottom: 20 }}
          />
          <InputEl
            label="Medicine Name"
            error={errors.medicine_name}
            value={formState['medicine_name']}
            onChangeText={(text) => onChange('medicine_name', text)}
          />
          <Dropdown
            value={formState['route']}
            items={routes}
            placeholder="Route"
            setValue={(value: string) => {
              onChange('route', value)
              getAllRouteTypes(+value)
            }}
            zIndex={2}
            scroll
          />

          <Dropdown
            value={formState['route_type_id']}
            items={routeTypes}
            error={errors['route_type_id']}
            placeholder="Route Type"
            setValue={(value: string) => onChange('route_type_id', value)}
            zIndex={1}
            scroll
            adjustScrollMargin
          />
          <View
            style={{
              ...styles.twoInputs,
              zIndex: selectedDropdown === 'dosage' ? 102 * 100 : 102,
              marginTop: -150,
            }}
          >
            <InputEl
              label="Dosage"
              onChangeText={(text) => onChange('dosage', text)}
              value={formState['dosage']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />
            <Dropdown
              value={formState['dosage_unit_id']}
              items={dosage}
              error={errors['dosage_unit_id']}
              placeholder="units"
              setValue={(value: string) => onChange('dosage_unit_id', value)}
              zIndex={50}
              styles={{ flex: 1, marginRight: -30 }}
              onOpen={() => setSelectedDropdown('dosage')}
            />
          </View>
          <View
            style={{
              ...styles.twoInputs,
              zIndex: selectedDropdown === 'duration' ? 101 * 100 : 101,
            }}
          >
            <InputEl
              label="Duration"
              onChangeText={(text) => onChange('duration', text)}
              value={formState['duration']}
              style={{ flex: 1 }}
              keyboardType="number-pad"
            />

            <Dropdown
              value={formState['duration_id']}
              items={duration}
              error={errors['duration_id']}
              placeholder="units"
              setValue={(value: string) => onChange('duration_id', value)}
              zIndex={50}
              styles={{ flex: 1, marginRight: -30 }}
              onOpen={() => setSelectedDropdown('duration')}
              onClose={() => setSelectedDropdown('')}
            />
          </View>

          <View
            style={{
              //marginBottom: 16,
              borderWidth: 1,
              borderColor: '#e4e4e4',
              zIndex: selectedDropdown === 'medicine' ? 100 * 100 : 100,
            }}
          >
            <View
              style={{ backgroundColor: primaryColor, paddingHorizontal: 12, paddingVertical: 12 }}
            >
              <Text style={{ color: 'white' }}>Frequency(Perday)</Text>
            </View>
            <View style={{ padding: 12, paddingBottom: 0 }}>
              <SwitchEl
                value={formState['is_pre_meal']}
                onChange={() => {
                  onChange('is_pre_meal', !formState['is_pre_meal'])
                }}
                label="Pre-Meal?"
                style={{ marginBottom: 20 }}
              />
              <SwitchEl
                value={formState['is_post_meal']}
                onChange={() => {
                  onChange('is_post_meal', !formState['is_post_meal'])
                }}
                label="Post-Meal?"
                style={{ marginBottom: 20 }}
              />
              <Dropdown
                value={formState['medicine']}
                items={[
                  { label: 'OD(1X)', value: 'OD' },
                  { label: 'BD(2X)', value: 'BD' },
                  { label: 'TDS(3X)', value: 'TDS' },
                  { label: 'QID(4X)', value: 'QID' },
                  { label: 'PRN', value: 'PRN' },
                  { label: 'Others', value: 'others' },
                ]}
                error={errors['medicine']}
                placeholder="Medicine"
                setValue={(value: string) => onChange('medicine', value)}
                zIndex={200}
                scroll
                onOpen={() => setSelectedDropdown('medicine')}
                onClose={() => setSelectedDropdown('')}
              />
              {formState['medicine'] === 'others' && (
                <InputEl
                  label="Add Frequency"
                  error={errors.frequency}
                  onChangeText={(text) => onChange('frequency', text)}
                  keyboardType="number-pad"
                  style={{ marginTop: -160 }}
                />
              )}
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 12,
              paddingBottom: 0,
              zIndex: selectedDropdown === 'compliant_medication_by_doctor' ? 100 * 100 : 100,
              marginTop: -160,
            }}
          >
            <Dropdown
              value={formState['compliant_medication_by_doctor']}
              items={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
              error={errors['compliant_medication_by_doctor']}
              placeholder="Compliant to medications prescribed by doctor?"
              setValue={(value: string) => onChange('compliant_medication_by_doctor', value)}
              zIndex={10}
              onOpen={() => setSelectedDropdown('compliant_medication_by_doctor')}
              onClose={() => setSelectedDropdown('')}
            />
          </View>
          {formState['compliant_medication_by_doctor'] === 'no' && (
            <View
              style={{
                paddingHorizontal: 12,
                zIndex: 100,
              }}
            >
              <InputEl
                label="Reason not compliant to prescription"
                error={errors.frequency}
                onChangeText={(text) => onChange('reason_non_compliant', text)}
              />
            </View>
          )}
          <View
            style={{
              paddingHorizontal: 12,
              zIndex: 100,
            }}
          >
            <ButtonEl
              onPress={onFormSubmit}
              style={{ marginVertical: 20 }}
              btnTextColor={primaryColor}
            >
              Save
            </ButtonEl>
          </View>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

export default MedicineForm

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  twoInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
  },
})
