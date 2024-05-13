import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useAppDispatch } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { useFocusEffect } from '@react-navigation/native'
import { deleteDoctorProfileAward, getDoctorProfileAwards } from 'services/doctorprofile'
import { ScrollView } from 'react-native'

const AwardsAndAchievements = ({ navigation }: AppProps) => {
  const [awards, setAwards] = useState([])

  const dispatch = useAppDispatch()

  const fetchEducation = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getDoctorProfileAwards()
      if (response?.status) {
        setAwards(response?.data?.data?.message)
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchEducation()
    }, [])
  )

  const handleAwardDelete = async (id: any) => {
    try {
      dispatch(showLoading())
      const response = await deleteDoctorProfileAward(id)
      if (response?.status) {
        await fetchEducation()
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleAwardEdit = async (id: any) => {
    const idToEdit = awards.find((ed: any) => ed.id === id)
    navigation?.navigate('AwardsAndAchievementsForm', { award: idToEdit })
  }
  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <ButtonEl
          onPress={() => navigation?.navigate('AwardsAndAchievementsForm')}
          style={{ marginVertical: 20 }}
        >
          Add Award Details
        </ButtonEl>
        {awards?.map((ed: any) => (
          <InfoBox
            key={ed.id}
            id={ed.id}
            leftColumn={[
              'Award/Achievement Name',
              'Received From',
              'Received Year',
              'Description',
              'Upload Document',
            ]}
            rightColumn={[
              ed?.award_name ?? '',
              ed?.received_from ?? '',
              ed?.received_year ?? '',
              ed?.description ?? '',
              ed?.award_document?.split('/')?.at(-1) ?? '',
            ]}
            onDelete={handleAwardDelete}
            onEdit={handleAwardEdit}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default AwardsAndAchievements

const styles = StyleSheet.create({})
