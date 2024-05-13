import { NavigationProp } from '@react-navigation/native'
import { View, StyleSheet, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { borderColor, cardColor, errorColor, primaryColor, textColor } from 'styles/colors'
import FormGroup from 'components/elements/form'
import { InputValidator } from 'helpers/inputValidators'
import { genericObj } from 'ts/types'
import AuthHeader from 'components/modules/AuthHeader'
import { isEmpty } from 'utils'
import { commonStyles } from 'styles/common'
import ButtonEl from 'components/elements/Button'
import { validateUser } from 'services/users/userAuth'
import Loading from 'components/elements/ActivityIndicator'

export interface AppProps {
  navigation?: NavigationProp<any, any>
}

const LoginWithEmail = (props: AppProps) => {
  const [formState, setFormState] = React.useState({
    email: '',
  })
  const [errors, setErrors] = React.useState({
    email: '',
  })
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = async (name: string, val: string | boolean) => {
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

  const checkEmailValidation = async () => {
    if (await validateForm(email)) {
      setLoading(true)
      try {
        // validate if email exists in the system
        const response = await validateUser({ email })

        if (response?.status) {
          if (response?.data?.data?.availability) {
            // navigate to sign up screen  (email is not available)
            navigation?.navigate('Signup', { email: email })
          } else {
            // navigate to login screen
            navigation?.navigate('LoginWithPassword', { email: email })
          }
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false)
      }
    }
  }
  const validateForm = async (e: any) => {
    const fieldsToValidate = {
      email,
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    return isEmpty(formErrors)
  }

  const { email } = formState
  const { navigation } = props

  return (
    <SafeAreaView style={{ backgroundColor: cardColor, flex: 1 }}>
      <Loading show={loading} />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={commonStyles.centerAuthForms}>
          <AuthHeader
            title="Continue with Email"
            subtitle={"We'll check if you have an account, and help create one if you don't."}
            goBack={() => navigation?.goBack()}
          />
          <View style={styles.form}>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              <FormGroup
                formName="textinput"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={(value: any) => onChange('email', value)}
                error={errors.email}
                value={email}
                placeholder="Email"
                label="Email"
                styles={{
                  padding: 0,
                  paddingLeft: 3,
                  width: '100%',
                  color: textColor,
                }}
                placeholderTextColor={errors.email ? errorColor : textColor}
                height={40}
                borderColor={focus ? primaryColor : borderColor}
              />
            </View>
            <ButtonEl onPress={checkEmailValidation}>CONTINUE</ButtonEl>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 100,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 10,
  },
})

export default LoginWithEmail
