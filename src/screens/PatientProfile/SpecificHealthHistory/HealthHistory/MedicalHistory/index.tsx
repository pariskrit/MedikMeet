import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  deletePatientHospitalHistory,
  deletePatientMedicalHistory,
  deletePatientSurgicalHistory,
  getPatientHospitalHistory,
  getPatientMedicalHistory,
  getPatientSurgicalHistory,
} from 'services/patientprofile'
import { getFollowUpCenter, getFollowUpCenterType } from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const MedicalHistory = () => {
  const navigation = useNavigation()
  const [medicalHistory, setMedicalHistory] = useState<any[]>()
  const [surgicalHistory, setSurgicalHistory] = useState<any[]>()
  const [hospitalHistory, setHospitalHistory] = useState<any[]>()
  const [followUpCenter, setFollowUpCenter] = useState([])
  const [followUpCenterType, setFollowUpCenterType] = useState([])

  const fetchMedicalHistory = useCallback(async () => {
    try {
      const response = await getPatientMedicalHistory()
      if (response?.status) {
        setMedicalHistory(response?.data?.data?.history)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchSurgicalHistory = useCallback(async () => {
    try {
      const response = await getPatientSurgicalHistory()
      if (response?.status) {
        setSurgicalHistory(response?.data?.data?.history)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchHospitalHistory = useCallback(async () => {
    try {
      const response = await getPatientHospitalHistory()
      if (response?.status) {
        setHospitalHistory(response?.data?.data?.history)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientMedicalHistory(id)

      if (response?.status) {
        fetchMedicalHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSurgicalDelete = async (id: any) => {
    try {
      const response = await deletePatientSurgicalHistory(id)

      if (response?.status) {
        fetchSurgicalHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleHospitalDelete = async (id: any) => {
    try {
      const response = await deletePatientHospitalHistory(id)

      if (response?.status) {
        fetchHospitalHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = medicalHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('MedicalHistoryForm', {
      medicalHistory: idToEdit,
      followUpCenters: followUpCenter,
      followUpCenterTypes: followUpCenterType,
    })
  }
  const handleSurgicalEdit = async (id: any) => {
    const idToEdit = surgicalHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('SurgicalForm', {
      surgicalHistory: idToEdit,
      followUpCenters: followUpCenter,
      followUpCenterTypes: followUpCenterType,
    })
  }
  const handleHospitalEdit = async (id: any) => {
    const idToEdit = hospitalHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('HospitalAdmissionHistoryForm', {
      hospitalHistory: idToEdit,
      followUpCenters: followUpCenter,
      followUpCenterTypes: followUpCenterType,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getFollowUpCenter()
      const res2 = await getFollowUpCenterType()
      if (res.status && res2.status) {
        setFollowUpCenter(getDropdownFormat(res.data.data.follow_up_at_center))
        setFollowUpCenterType(getDropdownFormat(res2.data.data.follow_up_center_type))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDropdownItems()
  }, [medicalHistory])

  useFocusEffect(
    React.useCallback(() => {
      fetchMedicalHistory()
      fetchSurgicalHistory()
      fetchHospitalHistory()
    }, [])
  )
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('MedicalHistoryForm', {
                followUpCenters: followUpCenter,
                followUpCenterTypes: followUpCenterType,
              })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Medical History
          </ButtonEl>
          {medicalHistory?.map((med: any) => (
            <InfoBox
              key={med?.id}
              leftColumn={[
                'Medical Diagnosis',
                'Date Diagnosed',
                'Currently still on Follow-up?',
                'Follow-Up Centre',
                'Follow-Up Centre Type',
                'Reason not on Follow-up',
              ]}
              rightColumn={[
                med?.medical_diagnosis,
                med?.diagnosed_date,
                med?.still_on_follow_up ? 'Yes' : 'No',

                followUpCenter?.find((center: any) => center.value === med?.follow_up_at_center_id)
                  ?.label,

                followUpCenterType?.find(
                  (center: any) => center.value === med?.follow_up_center_type_id
                )?.label,

                med?.reason_not_follow_up,
              ]}
              id={med?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </View>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('SurgicalForm', {
                followUpCenters: followUpCenter,
                followUpCenterTypes: followUpCenterType,
              })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Surgical History
          </ButtonEl>
          {surgicalHistory?.map((item) => (
            <InfoBox
              key={item?.id}
              leftColumn={[
                'Surgical Diagnosis',
                'Date Diagnosed',
                'Name of surgical procedure',
                'Date of surgical procedure',
                'Currently still on Follow-Up?',
                'Follow-up center',
                'Follow-up center type',
                'Reason not on Follow-up',
              ]}
              rightColumn={[
                item?.surgical_diagnosis,
                item?.diagnosed_date,
                item?.procedure_description,
                item?.procedure_date,
                item?.still_on_follow_up ? 'Yes' : 'No',

                followUpCenter?.find((center: any) => center.value === item?.follow_up_at_center_id)
                  ?.label,

                followUpCenterType?.find(
                  (center: any) => center.value === item?.follow_up_center_type_id
                )?.label,

                item?.reason_not_follow_up,
              ]}
              id={item?.id}
              onDelete={handleSurgicalDelete}
              onEdit={handleSurgicalEdit}
            />
          ))}
        </View>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('HospitalAdmissionHistoryForm', {
                followUpCenters: followUpCenter,
                followUpCenterTypes: followUpCenterType,
              })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Hospital Admission History
          </ButtonEl>
          {hospitalHistory?.map((item) => (
            <InfoBox
              key={item?.id}
              leftColumn={[
                'Date of hospital admission',
                'Reason for hospital admission',
                'Completed treatment during hospital admission?',
                'Reason treatment not completed',
                'Currently still on Follow-Up?',
                'Follow-up center',
                'Follow-up center type',
                'Reason not on Follow-up',
              ]}
              rightColumn={[
                item?.adm_date,
                item?.adm_reason,
                item?.is_treatment_completed ? 'Yes' : 'No',
                item?.reason_not_treated,
                item?.still_on_follow_up ? 'Yes' : 'No',

                followUpCenter?.find((center: any) => center.value === item?.follow_up_at_center_id)
                  ?.label,

                followUpCenterType?.find(
                  (center: any) => center.value === item?.follow_up_center_type_id
                )?.label,

                item?.reason_not_follow_up,
              ]}
              id={item?.id}
              onDelete={handleHospitalDelete}
              onEdit={handleHospitalEdit}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default MedicalHistory

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 24,
  },
})
