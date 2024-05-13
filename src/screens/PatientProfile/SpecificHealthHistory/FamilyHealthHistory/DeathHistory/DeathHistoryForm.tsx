import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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
import {
  addPatientFamilyDeathHistory,
  updatePatientFamilyDeathHistory,
} from 'services/patientprofile/specificHealthHistory/deathHistory'
import { getFamilyMemberRelationship } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'

const defaultFormState = {
  family_member_relation: null,
  family_member_id: null,
  year_of_death: null,
  cause_of_death: null,
}

const DeathHistoryForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const route = useRoute()
  const [familyRelations, setFamilyRelations] = useState([])

  const relationship = useMemo(() => route?.params?.relationship, [route])
  const deathHistory = useMemo(() => route?.params?.deathHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = deathHistory
        ? await updatePatientFamilyDeathHistory(formState)
        : await addPatientFamilyDeathHistory(formState)
      if (response.status) {
        props?.navigation.goBack()
      }
    }
  }

  const getFamilyRelationship = async (id: number) => {
    const res = await getFamilyMemberRelationship(id)
    setFamilyRelations(getDropdownFormat(res?.data?.data?.family_member_relationship))
  }

  useEffect(() => {
    if (deathHistory) {
      setFormState({
        ...deathHistory,
        family_member_relation: deathHistory?.family_member?.family_member_for?.id,
        family_member_id: deathHistory?.family_member?.id,
      })
      getFamilyRelationship(deathHistory?.family_member?.family_member_for?.id)
    }
  }, [deathHistory])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.form}>
        <KeyboardDismiss>
          <Dropdown
            value={formState['family_member_relation']}
            items={relationship}
            error={errors['family_member_relation']}
            placeholder="Family member relationship"
            setValue={(value: string) => {
              onChange('family_member_relation', value)
              getFamilyRelationship(+value)
            }}
            zIndex={200}
          />
          <Dropdown
            value={formState['family_member_id']}
            items={familyRelations}
            error={errors['family_member_id']}
            placeholder="Family Member"
            setValue={(value: string) => onChange('family_member_id', value)}
            zIndex={200}
          />

          <DatePickerEl
            name="year_of_death"
            value={formState['year_of_death']}
            label="Year of death"
            error={errors.year_of_death}
            onChange={onChange}
          />
          <InputEl
            label="Cause of death"
            onChangeText={(text) => onChange('cause_of_death', text)}
            value={formState['cause_of_death']}
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

export default DeathHistoryForm

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
