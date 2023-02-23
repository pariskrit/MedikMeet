import { NavigationContainer, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HeaderBackButton from 'components/elements/HeaderBackButton'
import Icon from 'components/elements/Icon'
import { fontFamilyType } from 'helpers/constants'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import Home from 'screens/authentication/Home'
import Login from 'screens/authentication/Login'
import Otp from 'screens/authentication/Otp'
import SignUp from 'screens/authentication/SignUp'
import Welcome from 'screens/authentication/Welcome'
import Profile from 'screens/profile'
import EditProfile from 'screens/profile/EditProfile'
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

        {/* Profile */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile', headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ navigation, route }) => ({
            title: 'Edit Profile',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTitleStyle: {
              color: 'black',
              fontFamily: fontFamilyType['bold'],
            },
            headerLeft: (props) => <HeaderBackButton {...props} navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
