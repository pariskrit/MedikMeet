import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { getDoctorProfileEducation, deleteDoctorProfileEducation } from 'services/doctorprofile'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { useAppDispatch } from 'redux/hook'
import { useFocusEffect } from '@react-navigation/native'

const EducationInfo = ({ navigation }: AppProps) => {
  const [education, setEducation] = useState([])

  const dispatch = useAppDispatch()

  const fetchEducation = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getDoctorProfileEducation()
      if (response?.status) {
        setEducation(response?.data?.data?.message?.filter((x: any) => x.degree_title === '1'))
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
    navigation?.navigate('BasicDegreeForm', { education: idToEdit })
  }

  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <ButtonEl
          onPress={() => navigation?.navigate('BasicDegreeForm')}
          style={{ marginVertical: 20 }}
        >
          Add Details
        </ButtonEl>
        {education?.map((ed: any) => (
          <InfoBox
            key={ed.id}
            id={ed.id}
            leftColumn={[
              'Qualification Type',
              'Basic degree qualification type',
              'University/College/Institution Name',
              'Recognization',
              'Country',
              'Date of Exam Passed',
            ]}
            rightColumn={[
              ed?.degree_type?.name,
              ed?.degree_type?.domain,
              ed?.university_name,
              ed?.recognition_type?.name,
              ed?.country?.name,
              ed?.year_of_completion,
            ]}
            onDelete={handleEducationDelete}
            onEdit={handleEducationEdit}
          />
        ))}
      </View>
    </ScrollView>
  )
}

export default EducationInfo

const styles = StyleSheet.create({})
