import { StyleSheet } from 'react-native'
import { textColor } from 'styles/colors'
export const authStyles = StyleSheet.create({
  authContainer: {
    marginTop: 114,
    paddingHorizontal: 60,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  formHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
    //fontWeight: 'bold',
    color: textColor,
  },
  signUpContainer: {
    marginTop: 80,
  },
  otpContainer: {
    paddingTop: 114,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    marginTop: 40,
  },
})
