import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SwitchEl from 'components/elements/form/Switch'
import {
  deletePatientFamilyHealthHistory,
  getPatientFamilyHealthHistory,
} from 'services/patientprofile/specificHealthHistory/familyHealthHistory'
import {
  getFamilyMemberRelationship,
  getFamilyMemberRelationshipFor,
  getFollowUpCenter,
  getFollowUpCenterType,
} from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const FamilyIllnessRecord = () => {
  const navigation = useNavigation()

  const [familyHealthHistory, setFamilyHealthHistory] = useState([])

  const [relationship, setRelationship] = useState([])
  const [followupCenter, setFollowupCenter] = useState([])
  const [followupCenterType, setFollowupCenterType] = useState([])

  const fetchFamilyhealthHistory = useCallback(async () => {
    try {
      const response = await getPatientFamilyHealthHistory()
      if (response?.status) {
        setFamilyHealthHistory(response?.data?.data?.history)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientFamilyHealthHistory(id)
      if (response?.status) {
        fetchFamilyhealthHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = familyHealthHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('FamilyMedicalForm', {
      relationship,
      followupCenter,
      followupCenterType,
      familyHistory: idToEdit,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getFamilyMemberRelationshipFor()
      const res2 = await getFollowUpCenter()
      const res3 = await getFollowUpCenterType()

      if (res.status && res2.status) {
        setRelationship(getDropdownFormat(res.data.data.family_relationship_for))
        setFollowupCenter(getDropdownFormat(res2.data.data.follow_up_at_center))
        setFollowupCenterType(getDropdownFormat(res3.data.data.follow_up_center_type))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDropdownItems()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchFamilyhealthHistory()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('FamilyMedicalForm', {
                relationship,
                followupCenter,
                followupCenterType,
              })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Family Medical/Surgical History
          </ButtonEl>
          {familyHealthHistory?.map((health: any) => (
            <InfoBox
              key={health?.id}
              leftColumn={[
                'Family relationship',
                'Family Member',
                'Medical/Surgical Diagnosis',
                'Year Diagnosed',
                'Currently on treatment',
                'Follow-up center',
                'Follow-up center type',
              ]}
              rightColumn={[
                health?.family_member?.family_member_for?.name,
                health?.family_member?.name,
                health?.diagnosis_desc,
                health?.year_diagnosed,
                health?.still_on_follow_up ? 'Yes' : 'No',
                followupCenter?.find(
                  (follow: any) => follow?.value === health?.follow_up_at_center_id
                )?.label,
                followupCenterType?.find(
                  (follow: any) => follow?.value === health?.follow_up_center_type_id
                )?.label,
              ]}
              id={health?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default FamilyIllnessRecord

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
