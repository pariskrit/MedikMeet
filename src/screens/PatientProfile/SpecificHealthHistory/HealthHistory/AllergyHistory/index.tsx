import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SwitchEl from 'components/elements/form/Switch'
import { deletePatientAllergyHistory, getPatientAllergyHistory } from 'services/patientprofile'
import { getAllergyType, getDuration } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const AllergyHistory = () => {
  const navigation = useNavigation()
  const [allergyHistory, setAllergyHistory] = useState([])
  const [allergyType, setAllergyType] = useState([])
  const [duration, setDuration] = useState([])

  const fetchMedicineHistory = useCallback(async () => {
    try {
      const response = await getPatientAllergyHistory()
      if (response?.status) {
        setAllergyHistory(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientAllergyHistory(id)
      console.log(response)
      if (response?.status) {
        fetchMedicineHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = allergyHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('AllergyForm', {
      allergyHistory: idToEdit,
      allergyType,
      duration,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getAllergyType()
      const res2 = await getDuration()

      if (res.status && res2.status) {
        setAllergyType(getDropdownFormat(res.data.data.allergy_type))
        setDuration(getDropdownFormat(res2.data.data.duration))
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
      fetchMedicineHistory()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('AllergyForm', {
                allergyType,
                duration,
              })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Allergy History
          </ButtonEl>
          {allergyHistory?.map((history: any) => (
            <InfoBox
              key={history?.id}
              leftColumn={[
                'Allergy Type',
                'Describe Others',
                'Describe Allergy Reaction',
                'At what age known to be allergy',
              ]}
              rightColumn={[
                allergyType?.find((center: any) => center.value === history?.allergy_type_id)
                  ?.label,
                history?.allergy_type_id,
                history?.allergy_description,
                `${history?.allergy_discovery} ${duration?.find(
                  (center: any) => center.value === history?.allergy_discovery_unit_id
                )?.label
                }`,
              ]}
              id={history?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default AllergyHistory

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
