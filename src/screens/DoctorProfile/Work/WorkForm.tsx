import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Dropdown from 'components/elements/form/Dropdown'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { TextInput } from 'react-native-paper'
import { formatDate, getDropdownFormat } from 'helpers/utils'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import Icon from 'components/elements/Icon'
import { AppProps } from 'screens/Authentication/Welcome'
import { getCity, getCountry, getStateMaster, getWorkRelation, getWorkType } from 'services/masters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { JWT_KEY } from 'helpers/sharedPrefKeys'
import SwitchEl from 'components/elements/form/Switch'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { hideLoading, showErrorDialoge, showLoading } from 'redux/reducer/commonSlice'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import {
  addDoctorProfileWork,
  addDoctorProfileWorkDocument,
  updateDoctorProfileWork,
} from 'services/doctorprofile'

const defaultFormState = {
  workPlaceName: { isRequired: true, value: '' },
  type: { isRequired: true, value: '' },
  relation: '',
  address: '',
  country: '',
  state: '',
  city: '',
  postalCode: '',
  workingCurrently: false,
  startDate: '',
  endDate: '',
  appointmentLetter: '',
}

const WorkForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [certificateDoc, setCertificateDoc] = useState<null | DocumentPickerResponse>(null)
  const [workTypes, setWorkTypes] = useState([])
  const [workRelations, setWorkRelations] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [isStartDateVisible, setStartDateVisibility] = useState(false)
  const [isEndDateVisible, setEndDateVisibility] = useState(false)

  const route: RouteProp<any> = useRoute()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const work = useMemo(() => route?.params?.work, [route])

  const { profile } = useAppSelector((state) => state.drProfile)

  useEffect(() => {
    if (work) {
      setFormState({
        workPlaceName: { isRequired: true, value: work?.establishment_name },
        type: { isRequired: true, value: work?.work_type_id },
        relation: work?.work_relation_id,
        address: work?.work_address,
        country: work?.work_country_id,
        state: work?.work_state_id,
        city: work?.work_city_id,
        postalCode: work?.work_pincode,
        workingCurrently: work?.are_you_working_currently,
        startDate: work?.start_date,
        endDate: work?.end_date,
        appointmentLetter: work?.doctor_appointment_letter,
      })
    }
  }, [work])

  useEffect(() => {
    const fetchFormData = async () => {
      const jwt = await AsyncStorage.getItem(JWT_KEY)
      const parsedJwt = JSON.parse(jwt || '{}')
      const header = {
        headers: { Authorization: 'Bearer ' + parsedJwt?.access_token },
      }
      const [response, response1, country, city, state] = await Promise.all([
        getWorkType(header),
        getWorkRelation(header),
        getCountry(header),
        getCity(header),
        getStateMaster(header),
      ])
      if (response?.status) {
        setWorkTypes(
          response?.data?.data?.work_types?.map((x: any) => ({ ...x, label: x.name, value: x.id }))
        )
        setWorkRelations(
          response1?.data?.data?.work_relations?.map((x: any) => ({
            ...x,
            label: x.name,
            value: x.id,
          }))
        )

        setCities(getDropdownFormat(city?.data?.data?.cities))
        setCountries(getDropdownFormat(country?.data?.data?.countries))
        setStates(getDropdownFormat(state?.data?.data?.states))
      }
    }
    fetchFormData()
  }, [])

  const openFileDirectory = (name: string) => {
    DocumentPicker.pickMultiple({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => {
        onChange(name, res[0].name ?? '')
        setCertificateDoc(res?.[0])
      })
      .catch((err) => console.log(err))
  }

  const onFormSubmit = async () => {
    const res = await validateForm()

    if (!res) return

    try {
      dispatch(showLoading())

      let payload: any = {
        establishment_name: formState?.workPlaceName.value,
        work_type_id: formState?.type?.value,
        work_relation_id: formState?.relation,
        work_address: formState?.address,
        work_country_id: formState?.country,
        work_state_id: formState.state,
        work_city_id: formState.city,
        work_pincode: formState.postalCode,
        are_you_working_currently: formState.workingCurrently,
        start_date: formState.startDate,
        doctor_appointment_letter: formState.appointmentLetter,
        doctor_profile_id: profile?.id,
        work_contact_number: work?.work_contact_number || '9867676767',
      }

      if (!formState.workingCurrently) {
        payload = { ...payload, end_date: formState?.endDate }
      }

      const response = work
        ? await updateDoctorProfileWork(work?.id, payload)
        : await addDoctorProfileWork(payload)
      if (response?.data?.status) {
        if (certificateDoc) {
          const certDoc = new FormData()
          certDoc.append('doctor_appointment_letter', certificateDoc)
          const docResponse = await addDoctorProfileWorkDocument(
            work ? work?.id : response?.data?.data?.message?.id,
            certDoc
          )
        }
        navigation.navigate('Work' as never)
      } else {
        dispatch(showErrorDialoge(response?.data?.message))
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }

  const showStartDatePicker = () => {
    setStartDateVisibility(true)
  }

  const handleStartDateConfirm = (date: any) => {
    onChange('startDate', formatDate(date))
    hideStartDatePicker()
  }

  const hideStartDatePicker = () => {
    setStartDateVisibility(false)
  }

  const showEndDatePicker = () => {
    setEndDateVisibility(true)
  }

  const handleEndDateConfirm = (date: any) => {
    onChange('endDate', formatDate(date))
    hideEndDatePicker()
  }

  const hideEndDatePicker = () => {
    setEndDateVisibility(false)
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <InputEl
            label="Work Place Name"
            error={errors.workPlaceName}
            isRequired
            value={formState['workPlaceName'].value}
            onChangeText={(text) => onChange('workPlaceName', text)}
          />
          <Dropdown
            value={formState['type'].value}
            items={workTypes}
            error={errors['type']}
            placeholder="Type"
            setValue={(value: string) => onChange('type', value)}
            zIndex={200}
            isRequired
            index={5}
          />
          <Dropdown
            value={formState['relation']}
            items={workRelations}
            error={errors['relation']}
            placeholder="Relation"
            setValue={(value: string) => onChange('relation', value)}
            index={4}
          />
          <InputEl
            label="Address"
            value={formState['address']}
            error={errors.address}
            onChangeText={(text) => onChange('address', text)}
          />
          <Dropdown
            value={formState['country']}
            items={countries}
            error={errors['country']}
            placeholder="Country"
            setValue={(value: string) => onChange('country', value)}
            searchable
            scroll
            index={3}
            zIndex={95}
          />
          <Dropdown
            value={formState['state']}
            items={states}
            error={errors['state']}
            placeholder="State"
            setValue={(value: string) => onChange('state', value)}
            searchable
            scroll
            adjustScrollMargin
            index={2}
            zIndex={94}
          />
          <Dropdown
            value={formState['city']}
            items={cities}
            error={errors['city']}
            placeholder="City"
            setValue={(value: string) => onChange('city', value)}
            searchable
            scroll
            adjustScrollMargin
            index={1}
          />

          <View style={{ marginTop: -160, zIndex: 20000 }}>
            <InputEl
              label="Postal Code"
              error={errors.postalCode}
              onChangeText={(text) => onChange('postalCode', text)}
              value={formState['postalCode']}
            />
          </View>
          <View style={{ zIndex: 20000 }}>
            <SwitchEl
              value={formState['workingCurrently']}
              onChange={() => {
                onChange('workingCurrently', !formState['workingCurrently'])
              }}
              label="Working Currently ?"
            />
          </View>
          <View style={styles.dateFields}>
            <InputEl
              label="Start Date"
              error={errors.startDate}
              onChangeText={(text) => onChange('startDate', text)}
              style={{ marginVertical: 10, flex: 1 }}
              value={formState['startDate']}
              onPressIn={showStartDatePicker}
            />
            <DateTimePickerModal
              isVisible={isStartDateVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
            />
            {!formState['workingCurrently'] && (
              <>
                <InputEl
                  label="End Date"
                  error={errors.endDate}
                  onChangeText={(text) => onChange('endDate', text)}
                  style={{ marginVertical: 10, flex: 1 }}
                  value={formState['endDate']}
                  onPressIn={showEndDatePicker}
                />
                <DateTimePickerModal
                  isVisible={isEndDateVisible}
                  mode="date"
                  onConfirm={handleEndDateConfirm}
                  onCancel={hideEndDatePicker}
                />
              </>
            )}
          </View>
          <View style={{ marginVertical: -20 }}>
            <InputEl
              value={formState['appointmentLetter']}
              label="Appointment Letter"
              error={errors.appointmentLetter}
              right={<TextInput.Icon icon={() => <Icon name="document" />} />}
              showKeyboard={false}
              onPressIn={() => openFileDirectory('appointmentLetter')}
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
    </ScrollView>
  )
}

export default WorkForm

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateFields: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    zIndex: 20000,
  },
})
