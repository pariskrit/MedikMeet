import { NavigationProp, RouteProp } from '@react-navigation/native'
import { View, StyleSheet, Pressable, Keyboard, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import { changePassword } from 'services/users/userAuth'
import Loading from 'components/elements/ActivityIndicator'
import { showErrorDialoge } from 'redux/reducer/commonSlice'
import { useAppDispatch } from 'redux/hook'

export interface AppProps {
  navigation: NavigationProp<any, any>
  route: RouteProp<any, any>
}

const UpdatePassword = (props: AppProps) => {
  const [formState, setFormState] = React.useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = React.useState({
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const { route } = props

  const routeParams = {
    email: route?.params?.email,
    phone: route?.params?.phone,
    phoneCode: route?.params?.phoneCode,
    token: route?.params?.token,
  }

  const onChange = async (name: string, val: string) => {
    setFormState({
      ...formState,
      [name]: val,
    })
    const formErrors: genericObj = await InputValidator({ [name]: val })
    setErrors({
      ...errors,
      [name]: formErrors[name],
    })
    if (name === 'confirmPassword') {
      if (formState.password !== val) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Must match to password' }))
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }))
      }
    }
  }

  const checkPasswordValidation = async () => {
    if (await validateForm(password)) {
      if (formState.password !== formState.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Must match to password' }))
        return
      }
      try {
        setLoading(true)
        const response = await changePassword(
          { password },
          { headers: { Authorization: 'Bearer ' + routeParams?.token?.access_token } }
        )
        if (response?.data?.status) {
          navigation.navigate('LoginWithPassword', {
            email: route?.params?.email,
            phone: route?.params?.phone,
            phoneCode: route?.params?.phoneCode,
          })
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

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }
  const { password, confirmPassword } = formState
  const { navigation } = props
  return (
    <SafeAreaView style={{ backgroundColor: cardColor, flex: 1 }}>
      <Loading show={loading} />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={commonStyles.centerAuthForms}>
          <AuthHeader
            title="OK, you can update password here...!"
            subtitle={`using ${routeParams.email || routeParams.phone}`}
            goBack={() => navigation.goBack()}
            customStyle={{ marginVertical: 20, rowGap: 20 }}
          />
          <View>
            <View style={{ marginBottom: 15 }}>
              <TextInput
                mode="outlined"
                label="New Password"
                placeholder="New Password"
                secureTextEntry={!showPassword}
                onChangeText={(val) => onChange('password', val)}
                theme={{
                  colors: { primary: Boolean(errors.password) ? errorColor : textColor },
                  roundness: 30,
                }}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
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
            </View>

            <View>
              <TextInput
                mode="outlined"
                label="Confirm Password"
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                onChangeText={(val) => onChange('confirmPassword', val)}
                theme={{
                  colors: { primary: Boolean(errors.confirmPassword) ? errorColor : textColor },
                  roundness: 30,
                }}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={handleShowConfirmPassword}
                  />
                }
              />
              {Boolean(errors.confirmPassword) && (
                <HelperText type="error" visible={Boolean(errors.confirmPassword)}>
                  {errors.confirmPassword}
                </HelperText>
              )}
              <HelperText type="info" visible={true}>
                At least 8 characters
              </HelperText>
            </View>
            <View style={{ height: 120, marginVertical: 20, justifyContent: 'space-between' }}>
              <ButtonEl onPress={checkPasswordValidation} style={{ backgroundColor: buttonColor }}>
                UPDATE PASSWORD
              </ButtonEl>
            </View>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default UpdatePassword
