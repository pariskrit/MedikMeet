import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import SwitchEl from 'components/elements/form/Switch'
import {
  deletePatientMedicineHistory,
  deletePatientTraditionalMedicineHistory,
  getPatientMedicineHistory,
  getPatientTraditionalMedicineHistory,
} from 'services/patientprofile'
import { getDosage, getDuration, getRoute, getRouteType } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import { useAppSelector } from 'redux/hook'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const DrugHistory = () => {
  const navigation = useNavigation()
  const [isOnMedication, setIsOnMedication] = useState<string | boolean | undefined>()

  const [medicineHistory, setMedicineHistory] = useState<any[]>()
  const [traditionalMedicineHistory, setTraditionalMedicineHistory] = useState<any[]>()

  const [route, setRoute] = useState([])
  const [routeType, setRouteType] = useState([])
  const [dosage, setDosage] = useState([])
  const [duration, setDuration] = useState([])
  const { profile } = useAppSelector((state) => state.patientProfile)

  const fetchMedicineHistory = useCallback(async () => {
    try {
      const response = await getPatientMedicineHistory()
      if (response?.status) {
        setMedicineHistory(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchTraditionalMedicineHistory = useCallback(async () => {
    try {
      const response = await getPatientTraditionalMedicineHistory()
      if (response?.status) {
        setTraditionalMedicineHistory(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientMedicineHistory(id)
      console.log(response)
      if (response?.status) {
        fetchMedicineHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleTraditionMedicineDelete = async (id: any) => {
    try {
      const response = await deletePatientTraditionalMedicineHistory(id)

      if (response?.status) {
        fetchTraditionalMedicineHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = medicineHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('MedicineForm', {
      medicineHistory: idToEdit,
      route: route,
      routeType: routeType,
      dosage,
      duration,
    })
  }
  const handleTradMedicineEdit = async (id: any) => {
    const idToEdit = traditionalMedicineHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('TraditionalMedicationForm', {
      traditionalMedicineHistory: idToEdit,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getRoute()
      const res2 = await getRouteType()
      const res3 = await getDosage()
      const res4 = await getDuration()
      if (res.status && res2.status) {
        setRoute(getDropdownFormat(res.data.data.route))
        setRouteType(getDropdownFormat(res2.data.data.route_type))
        setDosage(getDropdownFormat(res3.data.data.dosage))
        setDuration(getDropdownFormat(res4.data.data.duration))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDropdownItems()
    setIsOnMedication(profile?.on_any_medication)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicineHistory()
      fetchTraditionalMedicineHistory()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <SwitchEl
          value={isOnMedication as boolean}
          onChange={() => {
            setIsOnMedication((prev) => !prev)
          }}
          label="On any medication currently?"
          style={{ marginBottom: 20 }}

        />

        {isOnMedication ? (
          <>
            <View style={styles.singleContainer}>
              <ButtonEl
                onPress={() =>
                  navigation?.navigate('MedicineForm', {
                    route: route,
                    routeType: routeType,
                    dosage,
                    duration,
                  })
                }
                style={{ marginBottom: 20 }}
                buttonColor={buttonBackgroundPrimaryColor}

              >
                Add Medicine/Drug
              </ButtonEl>
              {medicineHistory?.map((med) => (
                <InfoBox
                  key={med?.id}
                  leftColumn={[
                    'Medicine Name',
                    'Prescribed by?',
                    'Route',
                    'Dosage',
                    'Duration',
                    'Frequency(per day)',
                    'Compliant to medications prescribed by doctor?',
                    'Reason not compliant',
                  ]}
                  rightColumn={[
                    med?.medicine_name,
                    med?.is_prescribed_by_doctor ? 'Yes' : 'No',
                    routeType?.find((center: any) => center.value === med?.route_type_id)?.label,
                    `${med?.dosage} ${dosage?.find((center: any) => center.value === med?.dosage_unit_id)?.label
                    }`,
                    `${med?.duration} ${duration?.find((center: any) => center.value === med?.duration_id)?.label
                    }`,

                    `${med?.is_pre_meal ? 'Pre-Meal' : ''} ${med?.is_bd ? 'BD(2x)' : ''} ${med?.is_od ? 'OD(1X)' : ''
                      } ${med?.is_prn ? 'PRN' : ''} ${med?.is_qid ? 'QID(4X)' : ''} ${med?.is_tds ? 'TDS(3X)' : ''
                      }`.trim(),
                    med?.compliant_medication_by_doctor ? 'Yes' : 'No',
                    med?.reason_non_compliant,
                  ]}
                  id={med?.id}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </View>
            <View style={styles.singleContainer}>
              <ButtonEl
                onPress={() => navigation?.navigate('TraditionalMedicationForm')}
                style={{ marginBottom: 20 }}
                buttonColor={buttonBackgroundPrimaryColor}

              >
                Add Traditional Medication
              </ButtonEl>
              {traditionalMedicineHistory?.map((med) => (
                <InfoBox
                  key={med?.id}
                  leftColumn={[
                    'Medication Name',
                    'Medication Description',
                    'Compliant to medication taken?',
                    'Reason not compliant to prescription',
                  ]}
                  rightColumn={[
                    med?.medicine_name,
                    med?.medicine_description,
                    med?.compliant_medication_by_doctor ? 'Yes' : 'No',
                    med?.reason_non_compliant,
                  ]}
                  id={med?.id}
                  onDelete={handleTraditionMedicineDelete}
                  onEdit={handleTradMedicineEdit}
                />
              ))}
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  )
}

export default DrugHistory

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
