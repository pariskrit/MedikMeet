import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import Home from 'screens/Authentication/Home'
import Login from 'screens/Authentication/Login'
import Otp from 'screens/Authentication/Otp'
import SignUp from 'screens/Authentication/SignUp'
import Welcome from 'screens/Authentication/Welcome'
import { MyTheme } from 'utils/theme'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const Navigation = () => {
  const scheme = useColorScheme()
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      {/* Authentication */}
      <Stack.Navigator initialRouteName="Welcome">
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
