import React from 'react'
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import Toast from 'react-native-toast-message'
import Navigation from 'navigation'
import store from 'redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { errorColor } from 'styles/colors'
import ErrorDialog from 'components/elements/ErrorDialog'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
    error: errorColor,
  },
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider style={backgroundStyle}>
          <SafeAreaView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              />
              <Navigation />
              <ErrorDialog />
            </PaperProvider>
          </SafeAreaView>
        </SafeAreaProvider>
        <Toast />
      </Provider>
    </>
  )
}

export default App
