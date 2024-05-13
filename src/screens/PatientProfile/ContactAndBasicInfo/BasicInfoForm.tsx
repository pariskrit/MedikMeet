import { View, StyleSheet, ScrollView } from 'react-native'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'
import InputEl from 'components/elements/form/InputEl'
import { getKnownLanguages } from 'services/masters'
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
import DatePickerEl from 'components/elements/form/DatePicker'
import { updatePatientProfile } from 'services/patientprofile'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'

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
    label: 'gender',
    type: 'dropdown',
    name: 'gender',
    isRequired: true,
    items: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
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
]

const defaultFormState = {
  first_name: { isRequired: true, value: '' },
  last_name: { isRequired: true, value: '' },
  gender: { isRequired: true, value: '' },
  martial_status: { isRequired: false, value: '' },
  date_of_birth: { isRequired: true, value: '' },
  number_of_kids: { isRequired: false, value: '' },
  designation: { isRequired: false, value: '' },
}

const BasicInfoForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
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

  useEffect(() => {
    setFormState({
      ...defaultFormState,
      ...profile,
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
          {formFields.map((field) =>
            field.type === 'textInput' ? (
              <InputEl
                key={field.name}
                label={field.label}
                error={field.error}
                value={formState[field.name]?.value}
                onChangeText={(text: string) => onChange(field.name, text)}
                isRequired={field.isRequired}
              />
            ) : field.type === 'dropdown' ? (
              <Dropdown
                key={field.name}
                value={formState[field.name]?.value ?? formState[field.name]}
                items={field.items}
                error={field.error}
                placeholder={field.label}
                setValue={(value: string) => onChange(field.name, value)}
                isRequired={field.isRequired}
                zIndex={field.name === 'nationality' ? 3000 : 2000}
                zIndexInverse={field.name === 'nationality' ? 1000 : 2000}
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

export default BasicInfoForm
