import { NavigationProp, RouteProp } from '@react-navigation/native'
import { View, StyleSheet, Pressable, Keyboard, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  borderColor,
  buttonColor,
  cardColor,
  errorColor,
  primaryColor,
  textColor,
} from 'styles/colors'
import FormGroup from 'components/elements/form'
import { InputValidator } from 'helpers/inputValidators'
import { genericObj } from 'ts/types'
import AuthHeader from 'components/modules/AuthHeader'
import { isEmpty } from 'utils'
import { commonStyles } from 'styles/common'
import MyText from 'components/elements/MyText'
import ButtonEl from 'components/elements/Button'
import { Divider, HelperText, TextInput } from 'react-native-paper'
import { generateOTP, logInUser } from 'services/users/userAuth'
import Loading from 'components/elements/ActivityIndicator'
import { JWT_KEY } from 'helpers/sharedPrefKeys'
import { useAppDispatch } from 'redux/hook'
import { showErrorDialoge, showLoading } from 'redux/reducer/commonSlice'

export interface AppProps {
  navigation: NavigationProp<any, any>
  route: RouteProp<any, any>
}

const LoginWithPassword = (props: AppProps) => {
  const [formState, setFormState] = React.useState({
    password: '',
  })
  const [errors, setErrors] = React.useState({
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const { navigation, route } = props

  const routeParams = {
    email: route?.params?.email,
    phone: route?.params?.phone,
    phoneCode: route?.params?.phoneCode,
  }

  const onChange = async (name: string) => {
    setFormState({
      ...formState,
      password: name,
    })
    const formErrors: genericObj = await InputValidator({ password: name })
    setErrors({
      ...errors,
      password: formErrors[name],
    })
  }

  const checkPasswordValidation = async () => {
    if (await validateForm(password)) {
      setLoading(true)
      try {
        const payload = routeParams.email
          ? {
              email: routeParams.email,
              password: formState.password,
            }
          : {
              password: formState.password,
              country_dial_code: routeParams.phoneCode,
              mobile_number: routeParams.phone,
            }
        const response = await logInUser(payload)
        if (response?.data?.status) {
          await AsyncStorage.setItem(JWT_KEY, JSON.stringify(response.data.data))
          dispatch(showLoading())
          navigation.navigate('NavDrawer')
        } else {
          dispatch(showErrorDialoge(response?.data?.message))
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    } else {
    }
  }
  const validateForm = async (e: any) => {
    const fieldsToValidate = {
      password,
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    return isEmpty(formErrors)
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleOtpLogin = async (updatePassword: boolean) => {
    try {
      setLoading(true)
      const response = await generateOTP({
        email: routeParams.email,
        country_dial_code: routeParams.phoneCode,
        mobile_number: routeParams.phone,
      })
      if (response?.data?.status) {
        navigation.navigate(
          'otp',
          updatePassword ? { ...routeParams, updatePassword } : routeParams
        )
      } else {
        dispatch(showErrorDialoge(response?.data?.message))
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const { password } = formState
  return (
    <SafeAreaView style={{ backgroundColor: cardColor, flex: 1 }}>
      <Loading show={loading} />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={commonStyles.centerAuthForms}>
          <AuthHeader
            title="Log in to your account"
            subtitle={`using ${routeParams.email || routeParams.phone}`}
            goBack={() => navigation.goBack()}
            customStyle={{ marginVertical: 20 }}
          />
          <View>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              theme={{
                colors: { primary: Boolean(errors.password) ? errorColor : textColor },
                roundness: 30,
              }}
              autoFocus={true}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye' : 'eye-off'}
                  onPress={handleShowPassword}
                />
              }
            />
            {Boolean(errors.password) && (
              <HelperText type="error" visible={Boolean(errors.password)}>
                {errors.password}
              </HelperText>
            )}
            <HelperText type="info" visible={true}>
              At least 8 characters
            </HelperText>
            <View style={{ marginVertical: 20, justifyContent: 'space-between', gap: 10 }}>
              <ButtonEl onPress={checkPasswordValidation}>Log in</ButtonEl>
              <Divider />
              <ButtonEl
                onPress={() => handleOtpLogin(false)}
                style={{ backgroundColor: primaryColor }}
              >
                Log in with otp instead
              </ButtonEl>
            </View>

            <MyText>Go passwordless! We'll send you an OTP</MyText>
          </View>
          <Pressable onPress={() => handleOtpLogin(true)}>
            <MyText style={{ color: primaryColor, marginVertical: 20 }}>
              Forgot | Update Password?
            </MyText>
          </Pressable>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default LoginWithPassword
