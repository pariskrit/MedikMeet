import { NavigationProp, StackActions, useTheme } from '@react-navigation/native'
import Button from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import OTPInput from 'components/elements/otpInput'
import { maxOTPCodeLength } from 'helpers/constants'
import * as React from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import { formStyles } from 'styles/form'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyText from 'components/elements/MyText'
import { authStyles } from 'styles/modules/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LOGGED_IN } from 'helpers/sharedPrefKeys'

export interface AppProps {
  navigation: NavigationProp<any, any>
}

function Otp(props: AppProps) {
  const { navigation } = props
  const [otpCode, setOTPCode] = React.useState('')
  const [isPinReady, setIsPinReady] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [inValidCode, setInvalidCode] = React.useState(false)
  const verifyOTP = async () => {
    setInvalidCode(otpCode !== '1234')
    if (otpCode === '1234') {
      await AsyncStorage.setItem(LOGGED_IN, '1')
      navigation.dispatch(StackActions.replace('Home'))
    }
  }

  React.useEffect(() => {
    if (otpCode.length == maxOTPCodeLength) Keyboard.dismiss()
  }, [otpCode])
  return (
    <SafeAreaView>
      <View>
        <View style={styles.goBack} onTouchEnd={() => navigation.goBack()}>
          <Icon name="go-back" size={30} />
        </View>
        <Pressable style={authStyles.otpContainer} onPress={Keyboard.dismiss}>
          <View style={formStyles.formRow}>
            <MyText style={authStyles.formHeader}>OTP Verification</MyText>
          </View>
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
          <View style={{ marginTop: 60 }}>
            <Button
              hasIcon
              icon={<Icon name="arrow-circle-right-fill" />}
              onPress={() => verifyOTP()}
              title="Verify"
              disabled={!isPinReady}
              loading={isLoading}
              btnWidth={290}
            />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  goBack: {
    marginTop: 30,
    marginLeft: 30,
  },
})
export default Otp
