import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import Home from 'screens/Authentication/Home'
import LoginWithEmail from 'screens/Authentication/LoginWithEmail'
import MainLogin from 'screens/Authentication/MainLogin'
import Otp from 'screens/Authentication/Otp'
import SignUp from 'screens/Authentication/SignUp'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const Authentication = () => {
  const scheme = useColorScheme()
  return (
      <Stack.Navigator initialRouteName="Login">
       
        <Stack.Screen
          name="MainLogin"
          component={MainLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginWithEmail"
          component={LoginWithEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginWithGoogle"
          component={MainLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginWithMobile"
          component={MainLogin}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp', headerShown: false }}
        />
        <Stack.Screen name="Otp" component={Otp} options={{ title: 'Otp', headerShown: false }} /> */}

      </Stack.Navigator>
  )
}

export default Authentication
