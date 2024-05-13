import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'
import { Keyboard, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formStyles } from 'styles/form'
import { authStyles } from 'styles/modules/auth'
import { inputWidth } from 'styles/variables'
import { isEmpty } from 'utils'
import { InputValidator } from 'helpers/inputValidators'
import { PIN_KEY } from 'helpers/sharedPrefKeys'
import { genericObj } from 'ts/types'
import { commonStyles } from 'styles/common'
import AuthHeader from 'components/modules/AuthHeader'
import { TextInput } from 'react-native-paper'
import PasswordInput from 'components/elements/form/PasswordInput'
import InputEl from 'components/elements/form/InputEl'
import ButtonEl from 'components/elements/Button'
import FlagInput from 'components/elements/PhoneInput'
import { backgroundColor, textColor } from 'styles/colors'
import { generateOTP, signUpUser } from 'services/users/userAuth'
import Loading from 'components/elements/ActivityIndicator'
import { showErrorDialoge } from 'redux/reducer/commonSlice'
import { useAppDispatch } from 'redux/hook'

const userTypeList = [
  {
    label: 'I am a Doctor',
    value: 'Doctor',
  },
  {
    label: 'Looking for a Doctor',
    value: 'Patient',
  },
]

function SignUp(props: any) {
  const { navigation, route } = props
  const { params } = route

  const [pin, setPIN] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formState, setFormState] = React.useState({
    password: '',
    phone: params.phone ? params.phone : '',
    firstName: '',
    lastName: '',
    userType: { label: '', value: '' },
    email: params.email ? params.email : '',
  })
  const [errors, setErrors] = React.useState({
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    userType: '',
    email: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [countryCode, setCountryCode] = useState(params.countryCode ? params.countryCode : 'MY')
  const [countryNum, setCountryNum] = useState(params.phoneCode ? params.phoneCode : '60')
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [items, setItems] = useState(userTypeList)

  const dispatch = useAppDispatch()

  const signUp = async () => {
    setIsLoading(true)
    setIsSubmitted(true)
    if (await validateForm(password, phone)) {
      try {
        const payload = {
          email: params.email ? params.email : formState.email,
          first_name: formState.firstName,
          last_name: formState.lastName,
          mobile_number: formState.phone,
          country_dial_code: '+' + countryNum,
          user_type: formState.userType.value,
          password: formState.password,
          is_without_password: false,
        }
        const response = await signUpUser(payload)

        if (response?.data?.status) {
          const otpResponse = await generateOTP({
            email: params.email,
            mobile_number: formState.phone,
            country_dial_code: '+' + countryNum,
          })
          if (otpResponse?.data?.status) {
            navigation.navigate('otp', {
              email: params.email,
              phone: formState.phone,
              phoneCode: '+' + countryNum,
            })
          } else {
            dispatch(showErrorDialoge(otpResponse?.data?.message))
          }
        } else {
          dispatch(showErrorDialoge(response?.data?.message))
        }
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }
  const validateForm = async (e: any, p: any) => {
    const fieldsToValidate = {
      password,
      phone,
      firstName,
      lastName,
      email,
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    return isEmpty(formErrors)
  }

  const onChange = async (name: string, val: string | boolean | ItemType<string>) => {
    setFormState({
      ...formState,
      [name]: val,
    })
    const formErrors: genericObj = await InputValidator({ [name]: val })
    setErrors({
      ...errors,
      [name]: formErrors[name],
    })
  }

  const handleSelectFlag = (flag: any) => {
    setCountryCode(flag.cca2)
    setCountryNum(flag.callingCode[0])
  }
  const { password, phone, firstName, lastName, userType, email } = formState
  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, paddingBottom: 10 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loading show={isLoading} />
        <Pressable onPress={() => Keyboard.dismiss()}>
          <View style={commonStyles.centerAuthForms}>
            <View style={formStyles.formRow}>
              <AuthHeader
                title="Let's Sign up"
                subtitle="Seems you are not yet registered with us. Let's do it now!"
                goBack={() => navigation.goBack()}
                customStyle={{ marginVertical: 20 }}
              />
              <View style={{ minHeight: 350 }}>
                <View style={{ zIndex: 100, marginBottom: errors.firstName ? 20 : 25 }}>
                  <DropDownPicker
                    open={open}
                    value={userType.value}
                    items={items}
                    setOpen={setOpen}
                    onSelectItem={(value) => onChange('userType', value)}
                    setItems={setItems}
                    style={{ borderRadius: 30, borderColor: textColor }}
                    placeholder="User Type"
                  />
                </View>
                <View>
                  <InputEl
                    label="First Name"
                    error={errors.firstName}
                    onChangeText={(text) => onChange('firstName', text)}
                  />
                </View>
                <View>
                  <InputEl
                    label="Last Name"
                    error={errors.lastName}
                    onChangeText={(text) => onChange('lastName', text)}
                  />
                </View>
                <View>
                  <InputEl
                    value={formState.email}
                    label="Email ID"
                    disabled={params.email ? true : false}
                    error={errors.email}
                    onChangeText={(text) => onChange('email', text)}
                  />
                </View>
                <View style={{ marginBottom: errors.password ? 10 : 30 }}>
                  <PasswordInput
                    onChange={(value: any) => onChange('password', value)}
                    error={errors.password}
                  />
                </View>
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
                    onChangeText={(text) => onChange('phone', text)}
                    disabled={params.phone ? true : false}
                    value={formState.phone}
                  />
                </View>
              </View>
            </View>

            <View style={formStyles.formRow}>
              <ButtonEl onPress={signUp}>Continue</ButtonEl>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

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
    marginTop: 4,
  },
  input: {
    flex: 0.8,
  },
})
export default SignUp
