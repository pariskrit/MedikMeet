import { NavigationProp } from '@react-navigation/native'
import * as React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ButtonEl from 'components/elements/Button'
import { mainLoginStyles } from 'styles/modules/mainlogin'
import { commonStyles } from 'styles/common'
import AuthHeader from 'components/modules/AuthHeader'
import { backgroundColor, textColor } from 'styles/colors'
import WebView from 'react-native-webview'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'

export interface AppProps {
  navigation: NavigationProp<any, any>
}

function MainLogin(props: AppProps) {
  const [googleSignIn, setGoogleSignIn] = React.useState(false)
  const { navigation } = props

  const handleGoogleLogin = async () => {
    console.log('google sinin clicked')
    const andoridClientId =
      '775116125870-gpr0pqt3gmsjfgg06q3otvgs9kj04ihj.apps.googleusercontent.com'
    try {
      GoogleSignin.configure({
        webClientId: '861583375759-8j808f3lhujcesfqfemek1beb3lfacru.apps.googleusercontent.com',
        offlineAccess: true,
      })
      console.log('logged in')
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('fsdfsd', JSON.stringify(error))
      }
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <View style={commonStyles.centerAuthForms}>
        <AuthHeader
          title="Log in or sign up in seconds"
          subtitle="Use your email or another service to continue with Medikmeet (it's free)!"
          goBack={() => navigation.goBack()}
          showBack={false}
        />
        <View style={mainLoginStyles.buttonsContainer}>
          <ButtonEl icon="email-outline" onPress={() => navigation.navigate('LoginWithEmail')}>
            CONTINUE WITH EMAIL
          </ButtonEl>
          <ButtonEl
            icon="google"
            onPress={() => {
              handleGoogleLogin()
            }}
          >
            CONTINUE WITH GOOGLE
          </ButtonEl>
          <ButtonEl icon="phone" onPress={() => navigation.navigate('LoginWithMobile')}>
            CONTINUE WITH MOBILE
          </ButtonEl>
        </View>
        <View>
          <Text style={{ textAlign: 'center', lineHeight: 20, color: textColor }}>
            By continuing, you agree to <Text style={commonStyles.boldText}>Medikmeet's</Text>{' '}
            <Text style={commonStyles.textPrimaryColor}>Terms of Use</Text>(opens in a new tab or
            windows). read our <Text style={commonStyles.textPrimaryColor}>Privacy policy</Text>
            (opens in a new tab or window).
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MainLogin
