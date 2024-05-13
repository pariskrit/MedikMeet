import { View, StyleSheet, ScrollView } from 'react-native'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'
import InputEl from 'components/elements/form/InputEl'
import { getCity, getCountry, getIdTypes, getKnownLanguages } from 'services/masters'
import { dropdownItems } from 'ts/types'
import { getDropdownFormat } from 'helpers/utils'
import {
  addKnownLanguages,
  getDoctorKnownLanguages,
  updateDoctorProfile,
} from 'services/doctorprofile'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { updateDoctorProfileDetails } from 'redux/reducer/drProfileSlice'
import { Fragment, useEffect, useState } from 'react'
import { updatePatientProfile } from 'services/patientprofile'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'
import DatePickerEl from 'components/elements/form/DatePicker'

const Fields = [
  {
    label: 'First Name',
    type: 'textInput',
    name: 'first_name',
    isRequired: true,
  },
  {
    label: 'Last name',
    name: 'last_name',
    type: 'textInput',
    isRequired: true,
  },
  {
    label: 'Gender',
    type: 'dropdown',
    name: 'gender',
    isRequired: true,
  },
  {
    label: 'Marital Status',
    name: 'martial_status',
    type: 'textInput',
  },
  {
    label: 'Date of Birth',
    type: 'date',
    name: 'date_of_birth',
    isRequired: true,
  },
  {
    label: 'No. of Children',
    type: 'textInput',
    name: 'number_of_kids',
  },

  {
    label: 'Profession',
    type: 'textInput',
    name: 'designation',
  },
  // {
  //   label: 'Email',
  //   type: 'textInput',
  //   name: 'email',
  //   isDisabled: true,
  //   isRequired: true,
  // },
  // {
  //   label: 'Mobile',
  //   name: 'mobile',
  //   type: 'textInput',
  //   isDisabled: true,
  //   isRequired: true,
  // },
  {
    label: 'Address',
    type: 'textInput',
    name: 'address',
    isRequired: true,
  },
  {
    label: 'City/Town',
    name: 'city_name',
    type: 'textInput',
    isRequired: true,
  },
  {
    label: 'Postal Code',
    type: 'textInput',
    name: 'pincode',
    isRequired: true,
  },
  {
    label: 'Country',
    type: 'dropdown',
    items: [{ label: 'Malaysia', value: 'Malaysia' }],
    zIndex: 200,
    name: 'country_id',
    isRequired: true,
  },
]

const defaultFormState = {
  first_name: { isRequired: true, value: '' },
  last_name: { isRequired: true, value: '' },
  gender: { isRequired: true, value: '' },
  martial_status: { isRequired: false, value: '' },
  date_of_birth: { isRequired: true, value: '' },
  number_of_kids: { isRequired: false, value: '' },
  designation: { isRequired: false, value: '' },
  email: '',
  mobile: '',
  address: { isRequired: true, value: '' },
  city_name: '',
  pincode: { isRequired: true, value: '' },
  country_id: { isRequired: true, value: '' },
  id_type_id: '',
  id_number: '',
  passport: '',
}

const ContactInfoForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [dropdownItems, setDropdownItems] = useState<Record<string, dropdownItems[]>>()
  const navigation = useNavigation()
  const { profile } = useAppSelector((state) => state.patientProfile)
  const dispatch = useAppDispatch()

  const formFields = Fields.map((field) => ({
    ...field,
    error: errors[field.name],
    value: formState[field.name],
  }))

  const onFormSubmit = async () => {
    const isValidated = await validateForm()
    if (isValidated) {
      dispatch(showLoading())
      try {
        const data = {
          ...formState,
          address: formState['address']?.value,
          country_id: formState['country_id']?.value,
          id_type_id: formState['id_type_id'],
          id_number: formState['id_number'],
          first_name: formState['first_name']?.value,
          last_name: formState['last_name']?.value,
          gender: formState['gender']?.value,
          date_of_birth: formState['date_of_birth']?.value,
          martial_status: formState['martial_status']?.value,
          designation: formState['designation']?.value,
          number_of_kids: formState['number_of_kids']?.value,
        }
        const res2 = await updatePatientProfile(data)

        if (res2.status) {
          dispatch(updatePatientProfileDetails(data))
          dispatch(hideLoading())

          navigation.navigate('PatientProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchMastersData = async () => {
    const cities = await getCity()
    const countries = await getCountry()
    const idTypes = await getIdTypes()
    setDropdownItems({
      country_id: getDropdownFormat(countries.data.data.countries),
      id_type_id: getDropdownFormat(idTypes.data.data.id_types),
      gender: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ],
    })
  }

  useEffect(() => {
    fetchMastersData()
    setFormState({
      ...defaultFormState,
      ...profile,
      address: { isRequired: true, value: profile?.address },
      country_id: { isRequired: true, value: profile?.country_id },
      id_type_id: profile?.id_type_id,
      id_number: profile?.id_number,
      first_name: { isRequired: true, value: profile?.first_name },
      last_name: { isRequired: true, value: profile?.last_name },
      gender: { isRequired: true, value: profile?.gender },
      date_of_birth: { isRequired: true, value: profile?.date_of_birth },
      martial_status: { isRequired: true, value: profile?.martial_status },
      designation: { isRequired: true, value: profile?.designation },
      number_of_kids: { isRequired: false, value: '' + profile?.number_of_kids },
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <KeyboardDismiss>
          {formFields.map((field: any) =>
            field.type === 'textInput' ? (
              <View
                style={{ marginTop: field?.label === 'Postal Code' ? 0 : 0, zIndex: 100 }}
                key={field.name}
              >
                <InputEl
                  disabled={field?.isDisabled}
                  label={field.label}
                  error={field.error}
                  value={formState[field.name]?.value ?? formState[field.name]}
                  onChangeText={(text: string) => onChange(field.name, text)}
                  isRequired={field.isRequired}
                />
              </View>
            ) : field.type === 'dropdown' ? (
              <Dropdown
                key={field.name}
                value={formState[field.name]?.value ?? formState[field.name]}
                items={dropdownItems?.[field.name]}
                error={field.error}
                placeholder={field.label}
                setValue={(value: string) => onChange(field.name, value)}
                isRequired={field.isRequired}
                zIndex={100}
                zIndexInverse={50}
                scroll={field.name !== 'gender'}
                searchable={field.name !== 'gender'}
              />
            ) : (
              <Fragment key={field.name}>
                <DatePickerEl
                  name={field.name}
                  value={formState[field.name].value}
                  label={field.label}
                  error={errors.dob}
                  onChange={onChange}
                />
              </Fragment>
            )
          )}

          <Dropdown
            value={formState['id_type_id']}
            items={dropdownItems?.['id_type_id']}
            placeholder="ID Type"
            setValue={(value: string) => onChange('id_type_id', value)}
            zIndex={1000}
            zIndexInverse={3000}
            name="id_type_id"
            adjustScrollMargin
          />

          {formState['id_type_id'] === 1 ? (
            <InputEl
              label="NRIC Number"
              value={formState['id_number']}
              onChangeText={(text: string) => onChange('id_number', text)}
              style={{ zIndex: 10001 }}
            />
          ) : (
            <InputEl
              label="Passport Number"
              value={formState['passport']}
              onChangeText={(text: string) => onChange('passport', text)}
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

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
})

export default ContactInfoForm
