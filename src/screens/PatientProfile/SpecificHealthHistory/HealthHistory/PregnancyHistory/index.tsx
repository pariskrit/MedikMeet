import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import {
  deletePatientContraceptiveHistory,
  deletePatientPregnancyHistory,
  getPatientContraceptiveHistory,
  getPatientPregnancyHistory,
  updatePatientProfile,
} from 'services/patientprofile'
import {
  getDeliveryType,
  getMenstrualCycleType,
  getContraceptiveType,
  getDuration,
} from 'services/masters'
import { getDropdownFormat } from 'helpers/utils'
import SwitchEl from 'components/elements/form/Switch'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'
import { buttonBackgroundPrimaryColor } from 'helpers/constants'

const PregnancyHistory = () => {
  const navigation = useNavigation()
  const [pregnancyHistory, setPregnancyHistory] = useState<any[]>()
  const [contraceptiveHistory, setContraceptiveHistory] = useState<any[]>()
  const { profile } = useAppSelector(state => state.patientProfile)
  const [isOnContraceptive, setIsOnContraceptive] = useState(profile?.on_any_contraceptive);

  const [menstrualCycleType, setMenstrualCycleType] = useState([])
  const [deliveryType, setDeliveryType] = useState([])
  const [contraceptiveType, setContraceptiveType] = useState([])
  const [duration, setDuration] = useState([])
  const dispatch = useAppDispatch();

  const fetchPregnancyHistory = useCallback(async () => {
    try {
      const response = await getPatientPregnancyHistory()
      if (response?.status) {
        setPregnancyHistory(response?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const fetchContraceptiveHistory = useCallback(async () => {
    try {
      const response2 = await getPatientContraceptiveHistory()
      if (response2?.status) {
        setContraceptiveHistory(response2?.data?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleDelete = async (id: any) => {
    try {
      const response = await deletePatientPregnancyHistory(id)
      if (response?.status) {
        fetchPregnancyHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleContraceptiveDelete = async (id: any) => {
    try {
      const response = await deletePatientContraceptiveHistory(id)

      if (response?.status) {
        fetchContraceptiveHistory()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: any) => {
    const idToEdit = pregnancyHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('PregnancyHistoryForm', {
      pregnancyHistory: idToEdit,
      menstrualCycleType,
      deliveryType,
    })
  }
  const handleContraceptiveEdit = async (id: any) => {
    const idToEdit = contraceptiveHistory?.find((ed: any) => ed.id === id)
    navigation?.navigate('ContraceptiveHistoryForm', {
      contraceptiveHistory: idToEdit,
      contraceptiveType,
      duration,
    })
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getMenstrualCycleType()
      const res2 = await getDeliveryType()
      const res3 = await getContraceptiveType()
      const res4 = await getDuration()
      if (res.status && res2.status && res3.status && res4.status) {
        setMenstrualCycleType(getDropdownFormat(res.data.data.menstrual_cycle_type))
        setDeliveryType(getDropdownFormat(res2.data.data.delivery_method))
        setContraceptiveType(getDropdownFormat(res3.data.data.contraceptive_type))
        setDuration(getDropdownFormat(res4.data.data.duration))
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
      fetchPregnancyHistory()
      fetchContraceptiveHistory()
    }, [])
  )

  const onHandleContraceptiveChange = async () => {


    try {
      const res = await updatePatientProfile({ isNew: false, on_any_contraceptive: !isOnContraceptive })
      dispatch(updatePatientProfileDetails({ ...profile, on_any_contraceptive: !isOnContraceptive }))

      setIsOnContraceptive((prev: boolean) => !prev)

    } catch (err) {
      console.log(err)
    }

  }
  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('PregnancyHistoryForm', { menstrualCycleType, deliveryType })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Pregnancy History
          </ButtonEl>
          {pregnancyHistory?.map((pregnancy) => (
            <InfoBox
              key={pregnancy?.id}
              leftColumn={[
                'Menstrual cycle',
                'Been pregnant?',
                'Year Delivered',
                'Delivery Method',
                'History of abortion',
                'Abortion count',
              ]}
              rightColumn={[
                menstrualCycleType?.find(
                  (men: any) => men?.value === pregnancy?.menstrual_cycle_type_id
                )?.label,
                pregnancy?.have_pregnancy_history ? 'Yes' : 'No',
                pregnancy?.year_delivered,
                deliveryType?.find((men: any) => men?.value === pregnancy?.delivery_method_id)
                  ?.label,
                pregnancy?.have_abortion_history ? 'Yes' : 'No',
                pregnancy?.abortion_count,
              ]}
              id={pregnancy?.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
          <View style={{ marginRight: 40, marginVertical: 20 }}>
            <SwitchEl
              value={isOnContraceptive}
              onChange={onHandleContraceptiveChange}
              label="Are You Presently using any Contraceptive or were you using any in the past?"
              style={{ marginBottom: 20 }}
            />

          </View>

        </View>

        {isOnContraceptive && <View style={styles.singleContainer}>
          <ButtonEl
            onPress={() =>
              navigation?.navigate('ContraceptiveHistoryForm', { contraceptiveType, duration })
            }
            style={{ marginBottom: 20 }}
            buttonColor={buttonBackgroundPrimaryColor}

          >
            Add Contraceptive History
          </ButtonEl>
          {contraceptiveHistory?.map((contraceptive) => (
            <InfoBox
              key={contraceptive?.id}
              leftColumn={[
                'Date started on contraceptive',
                'Duration been on contraceptive',
                'Contraceptive Type',
                'name of contraceptive',
              ]}
              rightColumn={[
                contraceptive?.date_started_on,
                contraceptive?.duration_been_on,
                contraceptiveType?.find(
                  (type: any) => type.value === contraceptive?.contraceptive_type_id
                )?.label,
                contraceptive?.contraceptive_name,
              ]}
              id={contraceptive?.id}
              onDelete={handleContraceptiveDelete}
              onEdit={handleContraceptiveEdit}
            />
          ))}
        </View>}
      </View>
    </ScrollView>
  )
}

export default PregnancyHistory

const styles = StyleSheet.create({
  numbersContainer: {},
  singleContainer: {
    marginVertical: 14,
  },
})
