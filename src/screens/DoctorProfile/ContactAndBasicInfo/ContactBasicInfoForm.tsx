import { View, StyleSheet, ScrollView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import FormInput from 'components/elements/form'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'
import DatePickerEl from 'components/elements/form/DatePicker'
import InputEl from 'components/elements/form/InputEl'
import { getKnownLanguages } from 'services/masters'
import { dropdownItems } from 'ts/types'
import { DropdownInterface } from 'ts/interfaces/formInterface'
import { getDropdownFormat } from 'helpers/utils'
import {
  addKnownLanguages,
  getDoctorKnownLanguages,
  updateDoctorProfile,
  updateKnownLanguages,
} from 'services/doctorprofile'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { updateDoctorProfileDetails } from 'redux/reducer/drProfileSlice'

const Fields = [
  {
    label: 'First Name',
    type: 'textInput',
    name: 'firstName',
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: 'textInput',
  },
  {
    label: 'Gender',
    type: 'dropdown',
    name: 'gender',
    items: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
    ],
  },
  { label: 'Date Of Birth', name: 'dob', type: 'date' },
  {
    label: 'Email',
    type: 'textInput',
    name: 'email',
  },
  {
    label: 'Mobile',
    type: 'textInput',
    name: 'mobile',
  },
  {
    label: 'Known Languages',
    name: 'knownLanguages',
    type: 'dropdown',
    items: [
      { label: 'English', value: 'English' },
      { label: 'Hindi', value: 'Hindi' },
      { label: 'Nepali', value: 'Nepali' },
    ],
  },
  {
    label: 'Nationality',
    name: 'nationality',
    type: 'dropdown',
    items: [{ label: 'Malay', value: 1 }],
  },
]

const defaultFormState = {
  firstName: '',
  lastName: '',
  gender: 'Male',
  dob: '',
  email: '',
  mobile: '',
  knownLanguages: '',
  nationality: 1,
}

const ContactBasicInfoForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [knownLanguages, setKnownLanguages] = useState<dropdownItems[]>()
  const [previousValues, setPreviousValues] = useState()
  const navigation = useNavigation()
  // const { currentUser } = useAppSelector((state) => state.user)
  const { profile } = useAppSelector((state) => state.drProfile)
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
        const res2 = await addKnownLanguages({ value: formState['knownLanguages'] })

        const res3 = await updateDoctorProfile({
          date_of_birth: formState['dob'],
          gender: formState['gender'],
          nationality_id: formState['nationality'],
        })

        if (res2.status && res3.status) {
          dispatch(updateDoctorProfileDetails(formState))
          dispatch(hideLoading())

          navigation.navigate('ProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchKnownLanguages = async () => {
    try {
      const [res, res2] = await Promise.all([getKnownLanguages(), getDoctorKnownLanguages()])
      onChange('knownLanguages', res2.data.data.known_languages[0].known_language_master_id)
      setKnownLanguages(getDropdownFormat(res.data.data.known_languages))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchKnownLanguages()
    setFormState({
      ...defaultFormState,
      ...profile,
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
                disabled
                label={field.label}
                error={field.error}
                value={formState[field.name]}
                onChangeText={(text: string) => onChange(field.name, text)}
              />
            ) : field.type === 'dropdown' ? (
              <Dropdown
                key={field.name}
                value={formState[field.name]}
                items={field.name === 'knownLanguages' ? knownLanguages : field.items}
                error={field.error}
                placeholder={field.label}
                setValue={(value: string) => onChange(field.name, value)}
                zIndex={field.name === 'knownLanguages' ? 3000 : 2000}
                zIndexInverse={field.name === 'knownLanguages' ? 1000 : 2000}
              />
            ) : (
              <Fragment key={field.name}>
                <DatePickerEl
                  name={field.name}
                  value={formState[field.name]}
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

export default ContactBasicInfoForm
