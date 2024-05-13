import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import InputEl from 'components/elements/form/InputEl'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import {
  getBloodGroups,
  getBloodSugarUnit,
  getHba1cUnit,
  getTemperatureUnit,
} from 'services/masters'
import { useFocusEffect } from '@react-navigation/native'
import { getDropdownFormat } from 'helpers/utils'
import {
  deletePatientHealthDetail,
  getPatientHealthDetails,
  updatePatientProfile,
} from 'services/patientprofile'
import { useAppSelector } from 'redux/hook'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const GeneralHealthHistory = ({ navigation }: AppProps) => {
  const dispatch = useDispatch()
  const [bloodGroups, setBloodGroups] = useState()
  const [healthDetails, setHealthDetails] = useState<any[]>([])
  const [temperatureTypes, setTemperatureTypes] = useState([])
  const [hba1cTypes, setHba1cTypes] = useState([])
  const [bloodSugarTypes, setBloodSugarTypes] = useState([])
  const { profile } = useAppSelector((state) => state.patientProfile)

  const fetchBloodGroups = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getBloodGroups()
      if (response?.status) {
        setBloodGroups(getDropdownFormat(response?.data?.data?.blood_group))
        setSelectedBloodGroup(profile?.blood_group_id)
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }, [])
  const fetchHealthDetails = useCallback(async () => {
    try {
      const response = await getPatientHealthDetails()
      if (response?.status) {
        setHealthDetails(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updateBloodGroup = async (value: string) => {
    try {
      const response = await updatePatientProfile({ blood_group_id: value })
      if (response?.status) {
        dispatch(updatePatientProfileDetails({ ...profile, blood_group_id: value }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleHealthDetailDelete = async (id: any) => {
    try {
      dispatch(showLoading())
      const response = await deletePatientHealthDetail(id)

      if (response?.status) {
        fetchHealthDetails()
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleHealthDetailEdit = async (id: any) => {
    const healthDetail = healthDetails.find((ed: any) => ed.id === id)
    navigation?.navigate('GeneralHealthHistoryForm', {
      healthDetail,
      temperatureTypes,
      hba1cTypes,
      bloodSugarTypes,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getTemperatureUnit()
      const res2 = await getHba1cUnit()
      const res3 = await getBloodSugarUnit()

      setTemperatureTypes(getDropdownFormat(res?.data?.data?.temperature_unit))
      setHba1cTypes(getDropdownFormat(res2?.data?.data?.hba1c_unit))
      setBloodSugarTypes(getDropdownFormat(res3?.data?.data?.blood_sugar))
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchHealthDetails()
    }, [])
  )

  useEffect(() => {
    fetchBloodGroups()
    fetchDropdownItems()
  }, [])
  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <KeyboardDismiss>
          <>
            <Dropdown
              value={profile?.blood_group_id}
              items={bloodGroups}
              placeholder="Blood Group"
              setValue={(value: string) => updateBloodGroup(value)}
            />
            <ButtonEl
              onPress={() =>
                navigation.navigate('GeneralHealthHistoryForm', {
                  temperatureTypes,
                  hba1cTypes,
                  bloodSugarTypes,
                })
              }
              style={{ marginBottom: 20 }}
              buttonColor={buttonBackgroundPrimaryColor}

            >
              Add Health Details
            </ButtonEl>
            {healthDetails?.map((detail: any) => (
              <InfoBox
                key={detail?.id}
                leftColumn={[
                  'Date',
                  'Weight',
                  'Height',
                  'Systolic Blood Pressure',
                  'Diastolic Blood Pressure',
                  'Heart Rate',
                  'Temperature',
                  'Fasting Blood Sugar',
                  'Random Blood Sugar',
                  'hbA1c',
                  'SPO2(pulse Oximeter',
                ]}
                rightColumn={[
                  detail?.date,
                  detail?.weight ? `${detail?.weight} kg` : '',
                  detail?.height ? `${detail?.height} cm` : '',
                  detail?.systolic_blood_pressure ? `${detail?.systolic_blood_pressure} mmHg` : '',
                  detail?.diastolic_blood_pressure
                    ? `${detail?.diastolic_blood_pressure} mmHg`
                    : '',
                  detail?.heart_rate ? `${detail?.heart_rate} bpm` : '',
                  detail?.temperature ? `${detail?.temperature} C` : '',
                  detail?.fasting_blood_sugar
                    ? `${detail?.fasting_blood_sugar} ${bloodSugarTypes?.find(
                      (type: any) => type?.value === detail?.fasting_blood_sugar_unit_id
                    )?.label
                    }`
                    : '',
                  detail?.random_blood_sugar
                    ? `${detail?.random_blood_sugar} ${bloodSugarTypes?.find(
                      (type: any) => type?.value === detail?.random_blood_sugar_unit_id
                    )?.label
                    }`
                    : '',
                  detail?.hba1c
                    ? `${detail?.hba1c} ${hba1cTypes?.find((type: any) => type?.value === detail?.hba1c_unit_id)
                      ?.label
                    }`
                    : '',
                  detail?.spo2 ? `${detail?.spo2}%` : '',
                ]}
                id={detail?.id}
                onDelete={handleHealthDetailDelete}
                onEdit={handleHealthDetailEdit}
              />
            ))}
          </>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

export default GeneralHealthHistory

const styles = StyleSheet.create({
  numbersContainer: {},
})
