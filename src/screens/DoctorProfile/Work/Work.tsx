import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import InputEl from 'components/elements/form/InputEl'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { useFocusEffect } from '@react-navigation/native'
import { deleteDoctorProfileWork, getDoctorProfileWork } from 'services/doctorprofile'
import { updateDoctorProfile } from 'services/doctorprofile'
import { updateDoctorMmcNumber } from 'redux/reducer/drProfileSlice'

const Work = ({ navigation }: AppProps) => {
  const [works, setWorks] = useState([])
  const [mmc, setMmc] = useState('')
  const [apc, setApc] = useState('')
  const [nsr, setNsr] = useState('')

  const { profile } = useAppSelector((state) => state.drProfile)

  const dispatch = useAppDispatch()

  const fetchWork = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getDoctorProfileWork()
      if (response?.status) {
        setWorks(response?.data?.data?.message)
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }, [])

  useEffect(() => {
    if (profile) {
      setMmc(profile?.mmc_number || '')
      setApc(profile?.apc_number || '')
      setNsr(profile?.nsr_number || '')
    }
  }, [profile])

  useFocusEffect(
    React.useCallback(() => {
      fetchWork()
    }, [])
  )

  const handleEducationDelete = async (id: any) => {
    try {
      dispatch(showLoading())
      const response = await deleteDoctorProfileWork(id)
      if (response?.status) {
        await fetchWork()
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleEducationEdit = async (id: any) => {
    const idToEdit = works.find((ed: any) => ed.id === id)
    navigation?.navigate('WorkForm', { work: idToEdit })
  }

  const handleSaveWork = async () => {
    try {
      if (mmc) {
        const response = await updateDoctorProfile({
          nsr_number: nsr,
          apc_number: apc,
          mmc_number: mmc,
        })
        if (response.status) {
          dispatch(updateDoctorMmcNumber(response?.data?.data))
          navigation?.navigate('confirmation')
        } else {
          setMmc(profile?.mmc_number || '')
          setApc(profile?.apc_number || '')
          setNsr(profile?.nsr_number || '')
        }
      } else {
        return
      }
    } catch (error) {}
  }
  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <KeyboardDismiss>
          <>
            <View style={{ display: 'flex', gap: 15, marginBottom: 25 }}>
              <InputEl
                label="MMC/MDC Number"
                isRequired
                onChangeText={(text) => {
                  setMmc(text)
                }}
                value={mmc}
                error={mmc ? '' : 'error'}
                helperText="Medik Connect, Education and Chat service will be available once MMC number approved by Medikmeet compliance team"
              />
              <InputEl
                label="APC No"
                value={apc}
                onChangeText={(text) => {
                  setApc(text)
                }}
                helperText="Appointment, Tele and Ask a Dr service will be available once APC number approved by Medikmeet compliance team"
              />
              <InputEl
                label="NSR Number"
                value={nsr}
                onChangeText={(text) => {
                  setNsr(text)
                }}
                helperText="Specialized Dr Who doesn't have NSR number but can have certificates, they can send the info/document for Medikmeet compliance team verification by email or Contact"
              />
            </View>
            <ButtonEl onPress={() => navigation?.navigate('WorkForm')} style={{ marginBottom: 20 }}>
              Add Work Place Details
            </ButtonEl>
            {works?.map((ed: any) => (
              <InfoBox
                key={ed.id}
                id={ed.id}
                leftColumn={[
                  'Type',
                  'Relation',
                  'Address',
                  'Country',
                  'State',
                  'City',
                  'Postal Code',
                  'Contact Number',
                  'Working Currently',
                  'Start Date',
                  'End Date',
                  'Appointment Letter',
                ]}
                rightColumn={[
                  ed?.work_type?.name,
                  ed?.work_relation?.name,
                  ed?.work_address,
                  ed?.work_country?.name,
                  ed?.work_state?.name,
                  ed?.work_city?.name,
                  ed?.work_pincode,
                  ed?.work_contact_number,
                  ed?.are_you_working_currently?.toString(),
                  ed?.start_date,
                  ed?.end_date,
                  ed?.doctor_appointment_letter?.split('/')?.at(-1),
                ]}
                onDelete={handleEducationDelete}
                onEdit={handleEducationEdit}
              />
            ))}

            <ButtonEl onPress={() => handleSaveWork()} style={{ marginVertical: 20 }}>
              SAVE AND PROCEED
            </ButtonEl>
          </>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

export default Work

const styles = StyleSheet.create({
  numbersContainer: {},
})
