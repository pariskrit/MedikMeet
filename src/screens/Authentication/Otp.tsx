import { NavigationProp, RouteProp, StackActions, useTheme } from '@react-navigation/native'
// import Button from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import OTPInput from 'components/elements/OTPInput'
import { maxOTPCodeLength } from 'helpers/constants'
import * as React from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import { formStyles } from 'styles/form'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyText from 'components/elements/MyText'
import { authStyles } from 'styles/modules/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { JWT_KEY, LOGGED_IN } from 'helpers/sharedPrefKeys'
import { Button } from 'react-native-paper'
import { buttonColor, cardColor, primaryColor, textColor } from 'styles/colors'
import AuthHeader from 'components/modules/AuthHeader'
import { commonStyles } from 'styles/common'
import ButtonEl from 'components/elements/Button'
import { generateOTP, validateOTP } from 'services/users/userAuth'
import Loading from 'components/elements/ActivityIndicator'
import { showErrorDialoge } from 'redux/reducer/commonSlice'
import { useAppDispatch } from 'redux/hook'

export interface AppProps {
  navigation: NavigationProp<any, any>
  route: RouteProp<any, any>
}

function Otp(props: AppProps) {
  const { navigation, route } = props
  const [otpCode, setOTPCode] = React.useState('')
  const [isPinReady, setIsPinReady] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [inValidCode, setInvalidCode] = React.useState(false)

  const dispatch = useAppDispatch()

  const routeParams = {
    email: route?.params?.email,
    phone: route?.params?.phone,
    phoneCode: route?.params?.phoneCode,
    updatePassword: route?.params?.updatePassword,
  }

  const verifyOTP = async () => {
    if (otpCode.length !== maxOTPCodeLength) {
      setInvalidCode(true)
      return
    }
    setInvalidCode(false)
    try {
      setLoading(true)
      const payload = routeParams.email
        ? {
            email: routeParams.email ? routeParams.email : '',
            otp: parseInt(otpCode),
          }
        : {
            otp: parseInt(otpCode),
            country_dial_code: routeParams.phoneCode,
            mobile_number: routeParams.phone,
          }
      const response = await validateOTP(payload)
      if (response?.data?.status) {
        if (routeParams.updatePassword) {
          navigation.navigate('UpdatePassword', { ...routeParams, token: response.data.data })
        } else {
          await AsyncStorage.setItem(JWT_KEY, JSON.stringify(response.data.data))
          navigation.navigate('NavDrawer')
        }
      } else {
        dispatch(showErrorDialoge(response?.data?.message))
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (otpCode.length == maxOTPCodeLength) {
      Keyboard.dismiss()
    }
  }, [otpCode])

  const handleResendCode = async () => {
    try {
      const repsonse = await generateOTP({
        email: routeParams.email ? routeParams.email : '',
        country_dial_code: routeParams.phoneCode,
        mobile_number: routeParams.phone,
      })
    } catch (error) {}
  }

  return (
    <SafeAreaView style={{ backgroundColor: cardColor, flex: 1 }}>
      <Loading show={loading} />
      <Pressable onPress={Keyboard.dismiss}>
        <View style={commonStyles.centerAuthForms}>
          <AuthHeader
            title="OK, we sent you an OTP!"
            subtitle="Please enter the OTP we sent to within the next 10 minutes."
            goBack={() => navigation.goBack()}
          />
          <View style={{ ...formStyles.formRow, width: '100%', marginTop: 40 }}>
            <OTPInput
              code={otpCode}
              setCode={(text: string) => {
                setOTPCode(text)
                setInvalidCode(false)
              }}
              maxLength={maxOTPCodeLength}
              setIsPinReady={setIsPinReady}
              error={inValidCode}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <ButtonEl onPress={verifyOTP}>CONTINUE</ButtonEl>
          </View>
          <View style={styles.bottom}>
            <MyText style={{ color: textColor }}>Didn't get the code? </MyText>
            <Pressable onPress={handleResendCode}>
              <MyText style={{ color: primaryColor }}>Resend code</MyText>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 100,
    backgroundColor: '#fff',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
})
export default Otp
