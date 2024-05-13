import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DoctorProfile from 'navigation/DoctorProfile'
import Forums from 'navigation/Forums'
import PatientProfile from 'navigation/PatientProfile'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { useAppDispatch } from 'redux/hook'
import { hideLoading } from 'redux/reducer/commonSlice'
import { setDoctorProfile } from 'redux/reducer/drProfileSlice'
import { setPatientProfile } from 'redux/reducer/patientProfileSlice'
import Appointment from 'screens/Appointment'
import AskADr from 'screens/AskADr'
import MedikConnect from 'screens/MedikConnect'
import { getDoctorProfile } from 'services/doctorprofile'
import { getPatientProfile } from 'services/patientprofile'
import { getCurrentUser } from 'services/users/userAuth'
import { primaryColor } from 'styles/colors'

const Tab = createBottomTabNavigator()

function BottomTabs() {
  const dispatch = useAppDispatch()
  const [isDoctor, setIsDoctor] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser()
      if (res?.data?.data?.user_type === 'Doctor') {
        const profile = await getDoctorProfile()
        dispatch(setDoctorProfile({ ...profile?.data?.data, ...res?.data?.data }))
      } else {
        const profile = await getPatientProfile()
        dispatch(
          setPatientProfile({
            ...profile?.data?.data?.message,
            ...res?.data?.data,

            patient_generals: profile?.data?.data?.message?.patient_generals?.map(
              (gen: any) => gen.generals_master_id
            ),
            patient_topics: profile?.data?.data?.message?.patient_topics?.map(
              (gen: any) => gen.topic_master_id
            ),
          })
        )

        console.log(profile)
      }

      setIsDoctor(res?.data?.data?.user_type === 'Doctor')

      dispatch(hideLoading())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  const Profile = isDoctor ? DoctorProfile : PatientProfile
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveBackgroundColor: '#303658',
        tabBarActiveBackgroundColor: '#353D69',
        // tabBarActiveTintColor: primaryColor,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarItemStyle: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/images/home.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/images/appointment.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Ask a Dr"
        component={AskADr}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/images/askdr.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={MedikConnect}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/images/social.png')} />
          ),
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Forums}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../../assets/images/forum.png')} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
