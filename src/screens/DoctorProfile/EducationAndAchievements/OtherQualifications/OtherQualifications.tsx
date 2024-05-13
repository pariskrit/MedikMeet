import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { deleteDoctorProfileEducation, getDoctorProfileEducation } from 'services/doctorprofile'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch } from 'redux/hook'

const OtherQualifications = ({ navigation }: AppProps) => {
  const [education, setEducation] = useState([])

  const dispatch = useAppDispatch()

  const fetchEducation = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getDoctorProfileEducation()
      if (response?.status) {
        setEducation(response?.data?.data?.message?.filter((x: any) => x.degree_title === '4'))
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

  const handleEducationDelete = async (id: any) => {
    try {
      dispatch(showLoading())
      const response = await deleteDoctorProfileEducation(id)
      if (response?.status) {
        await fetchEducation()
      }
    } catch (error) {
    } finally {
      dispatch(hideLoading())
    }
  }

  const handleEducationEdit = async (id: any) => {
    const idToEdit = education.find((ed: any) => ed.id === id)
    navigation?.navigate('OtherQualificationsForm', { education: idToEdit })
  }
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ButtonEl
        onPress={() => navigation?.navigate('OtherQualificationsForm')}
        style={{ marginVertical: 20 }}
      >
        Add Details
      </ButtonEl>
      <ScrollView>
        {education?.map((ed: any) => (
          <InfoBox
            id={ed.id}
            leftColumn={[
              'University/College/Institution Name',
              'Duration of Course',
              'Country',
              'Qualification Name ',
              'Date of completion',
              'Upload certificate',
            ]}
            rightColumn={[
              ed?.university_name ?? '',
              ed?.duration + ' ' + ed?.duration_unit?.name ?? '',
              ed?.country?.name ?? '',
              ed?.institute_name ?? '',
              ed?.year_of_completion ?? '',
              ed?.certificate?.split('/')?.at(-1) ?? '',
            ]}
            onDelete={handleEducationDelete}
            onEdit={handleEducationEdit}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default OtherQualifications

const styles = StyleSheet.create({})
