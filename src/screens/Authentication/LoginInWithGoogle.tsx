import React from 'react'
import { View, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'

function LoginInWithGoogle() {
  return (
    <WebView
      userAgent={
        Platform.OS === 'android'
          ? 'Chrome/18.0.1025.133 Mobile Safari/535.19'
          : 'AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75'
      }
      source={{ uri: 'https://Medikmeet-be.softdevels.com/api/v1/users/login_with_google' }}
      startInLoadingState={true}
      style={{
        flex: 1,
      }}
    />
  )
}

export default LoginInWithGoogle
