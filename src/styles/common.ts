import { StyleSheet } from 'react-native'
import { primaryColor } from './colors'
export const commonStyles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
  boldText: {
    fontWeight: '900',
    color: 'black',
  },
  textPrimaryColor: {
    color: primaryColor,
  },
  centerAuthForms: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
})
