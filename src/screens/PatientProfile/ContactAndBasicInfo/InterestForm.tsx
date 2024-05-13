import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'
import { getGenerals, getTopics } from 'services/masters'
import { dropdownItems } from 'ts/types'
import {
  addInterestGeneral,
  addInterestTopic,
  getInterestGeneral,
  getInterestTopic,
} from 'services/doctorprofile'
import { getDropdownFormat } from 'helpers/utils'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import SwitchEl from 'components/elements/form/Switch'
import InputEl from 'components/elements/form/InputEl'
import { getPatientGeneral, getPatientTopics, updatePatientProfile } from 'services/patientprofile'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'

const defaultFormState = {
  patient_generals: [],
  patient_topics: [],
  is_insurance_covered: '',
  want_insurance: '',
  insurance_company_name: '',
  type_of_insurance_plan: '',
  type_of_insurance_card: '',
}

const InterestForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [generals, setGenerals] = useState<dropdownItems[]>()
  const [topics, setTopics] = useState<dropdownItems[]>()
  const { profile } = useAppSelector((state) => state.patientProfile)
  const [isGTLoading, setGTLoading] = useState<boolean>(true)
  const [isHTLoading, setHTLoading] = useState<boolean>(true)

  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const onFormSubmit = async () => {
    const isValidated = await validateForm()

    if (isValidated) {
      dispatch(showLoading())

      try {
        const generalRes = await addInterestGeneral({ value: formState['general'] })
        const topicRes = await addInterestTopic({ value: formState['workRelatedTopics'] })
        const res2 = await updatePatientProfile(formState)

        dispatch(hideLoading())

        if (generalRes.status && topicRes.status && res2.status) {
          dispatch(updatePatientProfileDetails(formState))

          navigation.navigate('PatientProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchGenerals = async () => {
    try {
      setGTLoading(true)
      const res = await getGenerals()

      if (res.status) {
        setGenerals(getDropdownFormat(res.data.data.generals))
      }
      setGTLoading(false)
    } catch (error) {
      console.log(error)
      setGTLoading(false)
    }
  }

  const fetchTopics = async () => {
    try {
      setHTLoading(true)
      const res = await getTopics()

      if (res.status) {
        setTopics(getDropdownFormat(res.data.data.topics))
      }
      setHTLoading(false)
    } catch (error) {
      setHTLoading(false)
    }
  }

  const onDropdownChange = (name: string, value: string) => {
    let newArray = null
    // const isItemAlreadyPresent = formState[name]?.find((item: number) => item === +value)
    // if (isItemAlreadyPresent) newArray = [...formState[name].filter((item: any) => item !== +value)]
    // else newArray = [...formState[name], ...value]

    setFormState({ ...formState, [name]: value })
  }

  useEffect(() => {
    fetchGenerals()
    fetchTopics()
    setFormState({
      ...defaultFormState,
      ...profile,
    })
  }, [])
  return (
    <ScrollView style={styles.form}>
      <KeyboardDismiss>
        <Dropdown
          value={formState['patient_generals']}
          items={generals}
          error={errors['patient_generals']}
          placeholder="General Topics"
          setValue={(value: string) => onDropdownChange('patient_generals', value)}
          zIndex={200}
          mutiple={true}
          isLoading={isGTLoading}
          scroll
          index={3}
        />

        <Dropdown
          value={formState['patient_topics']}
          items={topics}
          error={errors['patient_topics']}
          placeholder="Health Topics"
          setValue={(value: string) => onDropdownChange('patient_topics', value)}
          zIndex={100}
          mutiple={true}
          isLoading={isHTLoading}
          scroll
          adjustScrollMargin
          index={2}
        />

        <Dropdown
          value={formState['is_insurance_covered']}
          items={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          error={errors['is_insurance_covered']}
          placeholder="Are you covered by Insurance (Health/Life/Personal Accident)"
          setValue={(value: string) => onChange('is_insurance_covered', value)}
          zIndex={100}
          adjustScrollMargin
        />
        {!formState['is_insurance_covered'] && (
          <View style={{ zIndex: 10000 }}>
            <SwitchEl
              value={formState['want_insurance']}
              onChange={() => {
                onChange('want_insurance', !formState['want_insurance'])
              }}
              label="Do you want to be covered by insurance (Health/Life/Personal Accident) ?"
            />
          </View>
        )}
        {formState['is_insurance_covered'] && (
          <View style={{ zIndex: 10000 }}>
            <InputEl
              label="Insurance Company Name"
              value={formState['insurance_company_name']}
              onChangeText={(text: string) => onChange('insurance_company_name', text)}
            />
            <InputEl
              label="Type Of Insurance Plan"
              value={formState['type_of_insurance_plan']}
              onChangeText={(text: string) => onChange('type_of_insurance_plan', text)}
            />
            <InputEl
              label="Type Of Insurance Card"
              value={formState['type_of_insurance_card']}
              onChangeText={(text: string) => onChange('type_of_insurance_card', text)}
            />
          </View>
        )}
        <ButtonEl onPress={onFormSubmit} style={{ marginVertical: 20 }} btnTextColor={primaryColor}>
          Save
        </ButtonEl>
      </KeyboardDismiss>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
})

export default InterestForm
