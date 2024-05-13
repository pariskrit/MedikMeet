import { Platform, StyleSheet } from 'react-native'

export const otpInputStyles = StyleSheet.create({
  otpInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputHidden: {
    width: 300,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 50,
    color: 'white',
    position: 'absolute',
    opacity: 0,
  },
  splitOTPBoxContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: Platform.OS === 'ios' ? 100 : 0,
  },
  splitBoxes: {
    borderColor: '#E4DFDF',
    borderWidth: 2,
    borderRadius: 5,
    padding: 12,
    minWidth: 50,
    width: 56,
    height: 56,
  },
  splitBoxText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  splitBoxesFocused: {
    borderColor: '#d0d0d0',
    backgroundColor: '#e4e4e4',
  },
  btnContainer: {
    backgroundColor: '#000000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginTop: 30,
  },
  btnText: {
    color: 'black',
    fontSize: 20,
  },
})
