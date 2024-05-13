import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Loading from 'components/elements/ActivityIndicator'
import * as React from 'react'
import { useColorScheme } from 'react-native'
import { useAppSelector } from 'redux/hook'
import Welcome from 'screens/Authentication/Welcome'
import { MyTheme } from 'utils/theme'
import Authentication from './Authentication'
import NavDrawer from './NavDrawer'
import TeleConnect from 'screens/TeleConnect'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const Navigation = () => {
  const scheme = useColorScheme()
  const { isLoading } = useAppSelector((state) => state.common)

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Loading show={isLoading} />
      {/* Authentication */}
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NavDrawer"
          component={NavDrawer}
          options={{ title: 'Home', headerShown: false }}
        />
        <Stack.Screen
          name="TeleConnect"
          component={TeleConnect}
          options={{ title: 'TeleConnect', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
