import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Forum from 'screens/Forums'

const Stack = createNativeStackNavigator()
const Forums = () => {
  return (
    <Stack.Navigator initialRouteName="ForumMain">
      <Stack.Screen name="ForumMain" component={Forum} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Forums
