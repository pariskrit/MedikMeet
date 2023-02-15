import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { ENABLED_APP_LOCK, LOGGED_IN } from 'helpers/sharedPrefKeys'
import { flexStyles } from 'styles/flex'
import { useTheme } from '@react-navigation/native'

export interface AppProps {
  navigation: any
}

function Welcome(props: AppProps) {
  const { navigation } = props
  const { colors } = useTheme()
  useEffect(() => {
    setTimeout(() => {
      async function getAsyncStorage() {
        const appLock = await AsyncStorage.getItem(ENABLED_APP_LOCK)
        const loggedIn = await AsyncStorage.getItem(LOGGED_IN)
        if (loggedIn === '1') {
          if (appLock === '1') navigation.navigate('Login', { name: 'Login' })
          else navigation.dispatch(StackActions.replace('Home'))
        } else {
          navigation.navigate('Login', { name: 'Login' })
        }
      }
      getAsyncStorage()
    }, 1500)
  }, [])

  return (
    <View style={{ ...styles.container, ...flexStyles.flex, ...flexStyles.flex_1 }}>
      <Text style={{ ...styles.label, color: colors.primary }}>Welcome</Text>
      <Text style={{ ...styles.label, color: colors.primary }}>To</Text>
      <Text style={{ ...styles.label, color: colors.primary }}>SoftManage</Text>
      <Image style={styles.logo} source={require('assets/SM-Logo.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 40,
    letterSpacing: 1.5,
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 40,
  },
})

export default Welcome
