import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SwitchEl from 'components/elements/form/Switch'
import {
  deletePatientFamilyDeathHistory,
  getPatientFamilyDeathHistory,
} from 'services/patientprofile/specificHealthHistory/deathHistory'
import { getFamilyMemberRelationship, getFamilyMemberRelationshipFor } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const DeathHistory = () => {
  const navigation = useNavigation()
  const [isDeathsInFamily, setIsDeathsInFamily] = useState(false)

  const [familyDeathHistory, setFamilyDeathHistory] = useState([])

  const [relationship, setRelationship] = useState([])

  const fetchFamilyDeathHistory = useCallback(async () => {
    try {
      const response = await getPatientFamilyDeathHistory()
      if (response?.status) {
        setFamilyDeathHistory(response?.data?.data?.message)
        setIsDeathsInFamily(response?.data?.data?.message?.[0]?.is_active)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientFamilyDeathHistory(id)
      if (response?.status) {
        fetchFamilyDeathHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = familyDeathHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('DeathHistoryForm', {
      relationship,

      deathHistory: idToEdit,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getFamilyMemberRelationshipFor()

      if (res.status) {
        setRelationship(getDropdownFormat(res.data.data.family_relationship_for))
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
      fetchFamilyDeathHistory()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.singleContainer}>
          <SwitchEl
            value={isDeathsInFamily}
            onChange={() => {
              setIsDeathsInFamily((prev) => !prev)
            }}
            label="Any deaths in family?"
            style={{ marginBottom: 20 }}
          />
          <ButtonEl
            onPress={() => navigation?.navigate('DeathHistoryForm', { relationship })}
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}
          >
            Add death in family
          </ButtonEl>
          {familyDeathHistory?.map((family: any) => (
            <InfoBox
              key={family?.id}
              leftColumn={[
                'Family member relationship',
                'Family member',
                'Year of death',
                'Cause of death',
              ]}
              rightColumn={[
                family?.family_member?.family_member_for?.name,
                family?.family_member?.name,
                family?.year_of_death,
                family?.cause_of_death,
              ]}
              id={family?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default DeathHistory

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
