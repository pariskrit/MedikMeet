import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { primaryColor } from 'styles/colors'
import ProfileHeader from 'components/modules/Profileheader'
import Alcohol from './Alcohol'
import Caffinated from './Caffinated'
import Tobacco from './Tobacco'
import Others from './Others'
import {
  addPatientSocialHistory,
  getPatientSocialHistory,
} from 'services/patientprofile/specificHealthHistory/socialHistory'
import { useFocusEffect } from '@react-navigation/native'
import {
  getConsumptionType,
  getDuration,
  getHourRange,
  getLivingDwellingType,
  getOccupantMember,
} from 'services/masters'
import { getDropdownFormat, handleTabArrowClick } from 'helpers/utils'
import Icon from 'components/elements/Icon'
import { renderTabBar } from '../HealthHistory'
import ChemicalDustExposure from './ChemicalDustExposure'

const FirstRoute = (props: any) => <Alcohol {...props} />
const SecondRoute = (props: any) => <Caffinated {...props} />
const ThirdRoute = (props: any) => <Tobacco {...props} />
const FourthRoute = (props: any) => <ChemicalDustExposure {...props} />
const FifthRoute = (props: any) => <Others {...props} />

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
//   fourth: FourthRoute,
// })


const SocialHistory = ({ navigation }: AppProps) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Alcohol' },
    { key: 'second', title: 'Caffinated/Carbonated' },
    { key: 'third', title: 'Tobacco' },
    { key: 'fourth', title: 'Chemical or Dust Exposure' },
    { key: 'fifth', title: 'Others' },
  ])
  const [socialHistory, setSocialHistory] = useState([])
  const [consumptionType, setConsumptionType] = useState([])
  const [duration, setDuration] = useState([])
  const [hourRange, setHourRange] = useState([])
  const [dwellingType, setDwellingType] = useState([])
  const [occupantMember, setOccupantMember] = useState([])

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute socialHistory={socialHistory} consumptionType={consumptionType} />
      case 'second':
        return (
          <SecondRoute
            socialHistory={socialHistory}
            consumptionType={consumptionType}
            onEdit={handleEdit}
          />
        )
      case 'third':
        return (
          <ThirdRoute
            socialHistory={socialHistory}
            consumptionType={consumptionType}
            onEdit={handleEdit}
            duration={duration}
          />
        )
      case 'fourth':
        return (
          <FourthRoute
            socialHistory={socialHistory}
            consumptionType={consumptionType}
            onEdit={handleEdit}

          />
        )
      case 'fifth':
        return (
          <FifthRoute
            socialHistory={socialHistory}
            consumptionType={consumptionType}
            onEdit={handleEdit}
            hourRange={hourRange}
            dwellingType={dwellingType}
            occupantMember={occupantMember}
          />
        )
      default:
        return null
    }
  }

  const fetchSocialHistory = useCallback(async () => {
    try {
      const response = await getPatientSocialHistory()
      if (response?.status) {
        setSocialHistory(response?.data?.data?.history)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleEdit = async (formState: any) => {
    try {
      const response = await addPatientSocialHistory(formState)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchDropdownItems = async () => {
    try {
      const res = await getConsumptionType()
      const res2 = await getDuration()
      const res3 = await getHourRange()
      const res4 = await getLivingDwellingType()
      const res5 = await getOccupantMember()

      if (res.status && res2.status && res3?.status && res4?.status) {
        setConsumptionType(getDropdownFormat(res.data.data.consumption_type))
        setDuration(getDropdownFormat(res2.data.data.duration))
        setHourRange(getDropdownFormat(res3.data.data.hour_range))
        setDwellingType(getDropdownFormat(res4.data.data.living_dwelling_type))
        setOccupantMember(getDropdownFormat(res5.data.data.occupant_member))
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
      fetchSocialHistory()
    }, [])
  )
  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <ProfileHeader
        title={`Social History`}
        onBackPress={() => navigation?.navigate('PatientProfileMain')}
      />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => renderTabBar(props, (arrow: any) => handleTabArrowClick(index, arrow, setIndex, routes))}

        />
      </View>
    </View>
  )
}

export default SocialHistory

const styles = StyleSheet.create({
  numbersContainer: {},
})
