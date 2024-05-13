import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import ButtonEl from 'components/elements/Button'
import InfoBox from 'components/elements/InfoBox'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { useFocusEffect } from '@react-navigation/native'
import { deleteDoctorProfileEducation, getDoctorProfileEducation } from 'services/doctorprofile'

const QualificationInfo = ({ navigation }: AppProps) => {
  const [education, setEducation] = useState([])

  const dispatch = useAppDispatch()

  const loading = useAppSelector((state) => state?.common?.isLoading)

  const fetchEducation = useCallback(async () => {
    try {
      dispatch(showLoading())

      const response = await getDoctorProfileEducation()
      if (response?.status) {
        //console.log(response?.data?.data?.message?.filter((x: any) => x.degree_title === '2')[0])
        setEducation(
          response?.data?.data?.message?.filter((x: any) => x?.degree_title === '2') ?? []
        )
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
    navigation?.navigate('PostgraduateQualificationsForm', { education: idToEdit })
  }

  return (
    <ScrollView>
      <View style={{ padding: 20, flex: 1 }}>
        <ButtonEl
          onPress={() => navigation?.navigate('PostgraduateQualificationsForm')}
          style={{ marginVertical: 20 }}
        >
          Add Details
        </ButtonEl>
        {loading
          ? null
          : education?.map((ed: any) => (
              <InfoBox
                id={ed?.id}
                leftColumn={[
                  'Qualification Type',
                  'University/College/Institution Name',
                  'Duration of Course',
                  'Country',
                  'Title of Postgraudate/Masters/\nSpecialization',
                  'Date of completion',
                  'Upload certificate',
                ]}
                rightColumn={[
                  ed?.degree_type?.domain ?? '',
                  ed?.university_name ?? '',
                  `${ed?.duration}  ${ed?.duration_unit?.name}` ?? '',
                  ed?.country?.name ?? '',
                  ed?.institute_name ?? '',
                  ed?.year_of_completion ?? '',
                  ed?.certificate?.split('/')?.at(-1) ?? '',
                ]}
                onDelete={handleEducationDelete}
                onEdit={handleEducationEdit}
              />
            ))}
      </View>
    </ScrollView>
  )
}

export default QualificationInfo

const styles = StyleSheet.create({})
