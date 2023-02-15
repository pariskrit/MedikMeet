import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Otp from 'screens/Otp'
import SignUp from 'screens/SignUp'
import Welcome from 'screens/Welcome'
import { MyTheme } from 'utils/theme'

const Stack = createNativeStackNavigator()

const Navigation = () => {
  const scheme = useColorScheme()
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'SignUp', headerShown: false }}
        />
        <Stack.Screen name="Otp" component={Otp} options={{ title: 'Otp', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
