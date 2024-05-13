import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import LoginInWithGoogle from 'screens/Authentication/LoginInWithGoogle'
import LoginWithEmail from 'screens/Authentication/LoginWithEmail'
import LoginWithNumber from 'screens/Authentication/LoginWithNumber'
import LoginWithPassword from 'screens/Authentication/LoginWithPassword'
import MainLogin from 'screens/Authentication/MainLogin'
import Otp from 'screens/Authentication/Otp'
import SignUp from 'screens/Authentication/SignUp'
import UpdatePassword from 'screens/Authentication/UpdatePassword'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const Authentication = () => {
  const scheme = useColorScheme()
  return (
    <Stack.Navigator initialRouteName="MainLogin">
      <Stack.Screen name="MainLogin" component={MainLogin} options={{ headerShown: false }} />
      <Stack.Screen
        name="LoginWithEmail"
        component={LoginWithEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginWithPassword"
        component={LoginWithPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginWithMobile"
        component={LoginWithNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginWithGoogle"
        component={LoginInWithGoogle}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="otp" component={Otp} options={{ headerShown: false }} />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Authentication
