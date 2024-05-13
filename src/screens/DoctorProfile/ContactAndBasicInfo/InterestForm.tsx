import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { DropdownInterface } from 'ts/interfaces/formInterface'
import { getDropdownFormat } from 'helpers/utils'
import { useAppDispatch } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'

const Fields = [
  {
    label: 'General',
    name: 'general',
    type: 'dropdown',
    zIndex: 200,
    items: [
      { label: 'Readin', value: 'Readin' },
      { label: 'Music', value: 'Music' },
      { label: 'Watching TV', value: 'Watching TV' },
    ],
  },
  {
    label: 'Work Related Topics',
    name: 'workRelatedTopics',
    type: 'dropdown',
    items: [{ label: 'Blood, Heart and Circulation', value: 'Blood, Heart and Circulation' }],
  },
]

const defaultFormState = {
  general: [],
  workRelatedTopics: [],
}

const InterestForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [generals, setGenerals] = useState<dropdownItems[]>()
  const [topics, setTopics] = useState<dropdownItems[]>()
  const [isGTLoading, setGTLoading] = useState<boolean>(true)
  const [isHTLoading, setHTLoading] = useState<boolean>(true)

  const navigation = useNavigation()
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
        const generalRes = await addInterestGeneral({ value: formState['general'] })
        const topicRes = await addInterestTopic({ value: formState['workRelatedTopics'] })

        dispatch(hideLoading())

        if (generalRes.status && topicRes.status) navigation.navigate('ProfileMain' as never)
      } catch (error) {
        console.log(error)
        dispatch(hideLoading())
      }
    }
  }

  const fetchGenerals = async () => {
    try {
      const res = await getGenerals()
      const res2 = await getInterestGeneral()
      onChange('general', res2?.data?.data?.generals?.map((x: any) => x?.generals_master_id) || [])
      setGenerals(getDropdownFormat(res.data.data.generals))
    } catch (error) {
      console.log(error)
    } finally {
      setGTLoading(false)
    }
  }

  const fetchTopics = async () => {
    try {
      const res = await getTopics()
      const res2 = await getInterestTopic()
      onChange(
        'workRelatedTopics',
        res2.data?.data?.topics?.map((x: any) => x?.topic_master_id) ?? []
      )
      setTopics(getDropdownFormat(res?.data?.data?.topics || []))
    } catch (error) {
      console.log(error)
    } finally {
      setHTLoading(false)
    }
  }

  useEffect(() => {
    fetchGenerals()
    fetchTopics()
  }, [])

  const onDropdownChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value })
  }
  return (
    <View style={styles.form}>
      <KeyboardDismiss>
        <Dropdown
          value={formState['general']}
          items={generals}
          error={errors['general']}
          placeholder="General"
          isLoading={isGTLoading}
          setValue={(value: string) => onDropdownChange('general', value)}
          zIndex={2}
          mutiple={true}
          scroll
        />
        <Dropdown
          value={formState['workRelatedTopics']}
          items={topics}
          error={errors['workRelatedTopics']}
          placeholder="Work Related Topics"
          isLoading={isHTLoading}
          setValue={(value: string) => onDropdownChange('workRelatedTopics', value)}
          zIndex={1}
          mutiple={true}
          scroll
          adjustScrollMargin
        />
        <View style={{ marginTop: -150, zIndex: 101 }}>
          <ButtonEl onPress={onFormSubmit} btnTextColor={primaryColor}>
            Save
          </ButtonEl>
        </View>
      </KeyboardDismiss>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
})

export default InterestForm
