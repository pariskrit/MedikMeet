import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { primaryColor } from 'styles/colors'
import Icon from 'react-native-vector-icons/Fontisto'
import BottomTabs from 'navigation/BottomTabs'

const Drawer = createDrawerNavigator()

const NavDrawer = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerTintColor: primaryColor,
          headerTitle: '',

          headerShown: false,
        }}
        id="LeftDrawer"
      >
        <Drawer.Screen name="BottomTabs" component={BottomTabs} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    </>
  )
}

export default NavDrawer
