import React, { useState } from 'react'
import { Keyboard, Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PhoneInput from 'react-native-phone-number-input'
import AuthHeader from 'components/modules/AuthHeader'
import { AppProps } from './Home'
import { commonStyles } from 'styles/common'
import ButtonEl from 'components/elements/Button'
import { cardColor } from 'styles/colors'
import FlagInput from 'components/elements/PhoneInput'
import { validateUser } from 'services/users/userAuth'
import InputEl from 'components/elements/form/InputEl'
import { genericObj } from 'ts/types'
import { InputValidator } from 'helpers/inputValidators'
import { isEmpty } from 'utils'
import Loading from 'components/elements/ActivityIndicator'

const LoginWithNumber = (props: AppProps) => {
  const [countryCode, setCountryCode] = useState('MY')
  const [countryNum, setCountryNum] = useState('60')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [errors, setErrors] = React.useState({
    phone: '',
  })
  const [loading, setLoading] = useState(false)

  const { navigation } = props

  const handleSelectFlag = (flag: any) => {
    setCountryCode(flag.cca2)
    setCountryNum(flag.callingCode[0])
  }

  const onChange = async (text: string) => {
    setPhoneNumber(text)
    const formErrors: genericObj = await InputValidator({ phone: text })
    setErrors({
      ...errors,
      phone: formErrors['phone'],
    })
  }

  const validateForm = async (e: any) => {
    const fieldsToValidate = {
      phone: phoneNumber,
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    return isEmpty(formErrors)
  }

  const LogIn = async () => {
    if (await validateForm(phoneNumber)) {
      try {
        setLoading(true)
        // validate if phone number exists in the system
        const response = await validateUser({
          country_dial_code: '+' + countryNum,
          mobile_number: phoneNumber,
        })

        if (response?.status) {
          if (response?.data?.data?.availability) {
            // navigate to sign up screen  (phone number is not available)
            navigation.navigate('Signup', {
              phone: phoneNumber,
              phoneCode: countryNum,
              countryCode: countryCode,
            })
          } else {
            // navigate to login screen
            navigation.navigate('LoginWithPassword', {
              phone: phoneNumber,
              phoneCode: '+' + countryNum,
              countryCode: countryCode,
            })
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cardColor }}>
      <Loading show={loading} />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={commonStyles.centerAuthForms}>
          <AuthHeader
            title="Log in with Mobile"
            subtitle={
              "We'll check if you have an account. You can't sign up with a mobile number in your current location."
            }
            goBack={() => navigation.goBack()}
          />
          <View style={styles.form}>
            <View style={styles.phoneInput}>
              <FlagInput
                countryCode={countryCode}
                styles={{ ...styles.flag, marginTop: -18 }}
                onSelect={handleSelectFlag}
              />

              <InputEl
                label="Mobile Number"
                keyboardType="number-pad"
                style={styles.input}
                error={errors.phone}
                onChangeText={(text) => onChange(text)}
              />
            </View>
            <ButtonEl onPress={LogIn}>Continue</ButtonEl>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default LoginWithNumber

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    gap: 30,
  },
  phoneInput: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    flex: 0.2,
    alignSelf: 'center',
    borderColor: 'grey',
    borderWidth: 1.5,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 0.8,
  },
})
