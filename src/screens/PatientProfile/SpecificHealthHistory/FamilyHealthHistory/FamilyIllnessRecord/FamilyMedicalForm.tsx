import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import ButtonEl from 'components/elements/Button'
import { primaryColor } from 'styles/colors'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import {
  addPatientFamilyHealthHistory,
  updatePatientFamilyHealthHistory,
} from 'services/patientprofile/specificHealthHistory/familyHealthHistory'
import { useRoute } from '@react-navigation/native'
import { getFamilyMemberRelationship } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'

const defaultFormState = {
  family_member_id: null,
  family_member_relation: null,
  diagnosis_desc: null,
  year_diagnosed: null,
  still_on_follow_up: null,
  reason_not_follow_up: null,
  follow_up_at_center_id: null,
  follow_up_center_type_id: null,
}

const FamilyMedicalForm = (props: AppProps) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [familyRelations, setFamilyRelations] = useState([])
  const route = useRoute()

  const relationship = useMemo(() => route?.params?.relationship, [route])
  const followupCenter = useMemo(() => route?.params?.followupCenter, [route])
  const followupCenterType = useMemo(() => route?.params?.followupCenterType, [route])
  const familyHistory = useMemo(() => route?.params?.familyHistory, [route])

  const onFormSubmit = async () => {
    const res = await validateForm()
    if (res) {
      const response = familyHistory
        ? await updatePatientFamilyHealthHistory(formState)
        : await addPatientFamilyHealthHistory(formState)
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
    if (familyHistory) {
      setFormState({
        ...familyHistory,
        year_diagnosed: '' + familyHistory?.year_diagnosed,
        family_member_relation: familyHistory?.family_member?.family_member_for?.id,
        family_member_id: familyHistory?.family_member?.id,
      })
      getFamilyRelationship(familyHistory?.family_member?.family_member_for?.id)
    }
  }, [familyHistory])
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
            placeholder="Family member"
            setValue={(value: string) => onChange('family_member_id', value)}
            zIndex={100}
          />
          <InputEl
            label="Add Medical/Surgical Diagnosis"
            onChangeText={(text) => onChange('diagnosis_desc', text)}
            value={formState['diagnosis_desc']}
          />
          <InputEl
            label="Year Diagnosed"
            onChangeText={(text) => onChange('year_diagnosed', text)}
            value={formState['year_diagnosed']}
          />

          <SwitchEl
            value={formState['still_on_follow_up']}
            onChange={() => {
              onChange('still_on_follow_up', !formState['still_on_follow_up'])
            }}
            label="Currently still on treatment/follow-up?"
            style={{ marginBottom: 20 }}
          />
          {!formState['still_on_follow_up'] && <InputEl
            label="Reason not on Follow-up"
            onChangeText={(text) => onChange('reason_not_follow_up', text)}
            value={formState['reason_not_follow_up']}
          />}

          {formState['still_on_follow_up'] && (
            <>
              <Dropdown
                value={formState['follow_up_at_center_id']}
                items={followupCenter}
                error={errors['follow_up_at_center_id']}
                placeholder="Follow-up at which center?"
                setValue={(value: string) => onChange('follow_up_at_center_id', value)}
                zIndex={100}
              />
              <Dropdown
                value={formState['follow_up_center_type_id']}
                items={followupCenterType}
                error={errors['follow_up_center_type_id']}
                placeholder="Follow-up center type"
                setValue={(value: string) => onChange('follow_up_center_type_id', value)}
                zIndex={100}
              />
            </>
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

export default FamilyMedicalForm

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
