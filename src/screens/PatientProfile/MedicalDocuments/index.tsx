import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SwitchEl from 'components/elements/form/Switch'
import {
  deletePatientMedicalDocuments,
  getPatientMedicalDocuments,
} from 'services/patientprofile/medicalDocuments'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const MedicalDocuments = () => {
  const navigation = useNavigation()
  const [medicalDocuments, setMedicalDocuments] = useState([])

  const fetchMedicalDocuments = useCallback(async () => {
    try {
      const response = await getPatientMedicalDocuments()
      if (response?.status) {
        setMedicalDocuments(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientMedicalDocuments(id)
      if (response?.status) {
        fetchMedicalDocuments()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = medicalDocuments?.find((ed: any) => ed.id === id)
    navigation?.navigate('MedicalDocumentsForm', {
      medicalDocument: idToEdit,
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicalDocuments()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() => navigation?.navigate('MedicalDocumentsForm')}
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}
          >
            Upload Documents
          </ButtonEl>
          {medicalDocuments?.map((med: any) => (
            <InfoBox
              key={med?.id}
              leftColumn={['Document Name', 'Document Type', 'Description', 'Document Date']}
              rightColumn={[
                med?.document_name,
                med?.document_type,
                med?.description,
                med?.Document_date,
              ]}
              id={med?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default MedicalDocuments

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
