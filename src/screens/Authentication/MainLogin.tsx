import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationProp, StackActions } from '@react-navigation/native'
import { InputValidator } from 'helpers/inputValidators'
import * as React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formStyles } from 'styles/form'
import { authStyles } from 'styles/modules/auth'
import { genericObj } from 'ts/types'
import { isEmpty } from 'utils'
import { ENABLED_APP_LOCK, LOGGED_IN, PIN_KEY } from 'helpers/sharedPrefKeys'
import { Button } from 'react-native-paper'

export interface AppProps {
  navigation: NavigationProp<any, any>
}

function MainLogin(props: AppProps) {
  const [text, setText] = React.useState('')
  const [error, setError] = React.useState('')
  const [inValidPIN, setInvalidPIN] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [pin, setPIN] = React.useState('')
  const [appLockEnabled, setAppLockEnabled] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  React.useEffect(() => {
    async function getAsyncStorage() {
      const appLock = await AsyncStorage.getItem(ENABLED_APP_LOCK)
      const loggedIn = await AsyncStorage.getItem(LOGGED_IN)
      setAppLockEnabled(appLock === '1')
      setIsLoggedIn(loggedIn === '1')
    }
    getAsyncStorage()
  }, [])
  const { navigation } = props
  const login = async () => {
    setIsSubmitted(true)
    setIsLoading(true)
    const savedPIN = await AsyncStorage.getItem(PIN_KEY)
    const isValidPIN = !appLockEnabled || savedPIN === pin
    if (!isValidPIN) {
      setInvalidPIN(true)
    } else {
      setInvalidPIN(false)
    }
    if ((isLoggedIn && isValidPIN) || (!isLoggedIn && (await validateUser(text))))
      setTimeout(() => {
        setIsLoading(false)
        if (isLoggedIn) navigation.dispatch(StackActions.replace('Home'))
        else navigation.navigate('Otp', { name: 'Otp' })
      }, 1500)
    else {
      setIsLoading(false)
    }
  }
  const validateUser = async (val: string) => {
    const fieldsToValidate = {
      email: val,
      phone: val,
    }
    const formErrors: genericObj = await InputValidator(fieldsToValidate)
    const isValid = isEmpty(formErrors.email) || isEmpty(formErrors.phone)
    if (!isValid) {
      if (!isEmpty(formErrors.email) && !isEmpty(formErrors.phone)) setError(formErrors.email)
      else if (!isEmpty(formErrors.email)) setError(formErrors.email)
      else if (!isEmpty(formErrors.phone)) setError(formErrors.phone)
    } else setError('')
    return isValid
  }
  const setUser = async (val: string) => {
    setText(val)
    if (isSubmitted) await validateUser(val)
  }

  return (
    <SafeAreaView>
      <View style={authStyles.authContainer}>
        <View>
          <Text>Log in or sign up in seconds</Text>
        </View>
        <Button mode="contained" onPress={() => navigation.navigate('LoginWithEmail')}>
          CONTINUE WITH EMAIL
        </Button>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          CONTINUE WITH GOOGLE
        </Button>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          CONTINUE WITH MOBILE
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default MainLogin
