import AsyncStorage from '@react-native-async-storage/async-storage'
import Button from 'components/elements/Button'
import FormGroup from 'components/elements/form'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formStyles } from 'styles/form'
import { authStyles } from 'styles/modules/auth'
import { inputWidth } from 'styles/variables'
import { isEmpty } from 'utils'
import { InputValidator } from 'helpers/inputValidators'
import { PIN_KEY } from 'helpers/sharedPrefKeys'
import { genericObj } from 'ts/types'

function SignUp(props: any) {
  const [pin, setPIN] = React.useState('')
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formState, setFormState] = React.useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    termsAndConditions: false,
  })
  const [errors, setErrors] = React.useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    termsAndConditions: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const { navigation } = props
  const signUp = async () => {
    setIsLoading(true)
    setIsSubmitted(true)
    if (await validateForm(email, phone)) {
      if (!isEmpty(pin)) {
        const savedPIN = await AsyncStorage.getItem(PIN_KEY)
        if (!isEmpty(savedPIN)) await AsyncStorage.removeItem(PIN_KEY)
        await AsyncStorage.setItem(PIN_KEY, pin)
      }
      setTimeout(() => {
        setIsLoading(false)
        navigation.navigate('Otp', { name: 'Otp' })
      }, 1500)
    } else {
      setIsLoading(false)
    }
  }
  const validateForm = async (e: any, p: any) => {
    const fieldsToValidate = {
      email,
      phone,
      firstName,
      lastName,
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    return isEmpty(formErrors)
  }

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
  const { email, phone, firstName, lastName, termsAndConditions } = formState
  return (
    <SafeAreaView>
      <View style={{ ...authStyles.authContainer, ...authStyles.signUpContainer }}>
        <View style={formStyles.formRow}>
          <MyText style={authStyles.formHeader}>Sign Up</MyText>
          <View>
            <FormGroup
              formName="textinput"
              onChangeText={(value: string) => onChange('firstName', value)}
              error={errors.firstName}
              value={firstName}
              hasIcon
              icon={<Icon name="user" />}
              placeholder="First Name"
            />
          </View>
          <View>
            <FormGroup
              formName="textinput"
              onChangeText={(value: any) => onChange('lastName', value)}
              error={errors.lastName}
              value={lastName}
              hasIcon
              icon={<Icon name="user" />}
              placeholder="Last Name"
            />
          </View>
          <View>
            <FormGroup
              formName="textinput"
              onChangeText={(value: any) => onChange('email', value)}
              error={errors.email}
              value={email}
              hasIcon
              icon={<Icon name="message" />}
              placeholder="Email"
            />
          </View>
          <View>
            <FormGroup
              formName="textinput"
              onChangeText={(value: any) => onChange('phone', value)}
              error={errors.phone}
              value={phone}
              hasIcon
              icon={<Icon name="phone" />}
              placeholder="Mobile"
            />
          </View>
          {/* <View style={formStyles.formRow}>
            <TextInput
              label="PIN"
              keyboardType="numeric"
              left={<TextInput.Icon icon="lock" />}
              value={pin}
              onChangeText={(value: any) => setPIN(value)}
            />
          </View> */}
        </View>
        <View>
          <FormGroup
            formName="checkbox"
            onPress={() => onChange('termsAndConditions', !termsAndConditions)}
            checked={termsAndConditions}
            label="Terms and Conditions"
            size={22}
          />
        </View>
        <View style={formStyles.formRow}>
          <Button
            hasIcon
            icon={<Icon name="arrow-circle-right-fill" />}
            onPress={() => signUp()}
            loading={isLoading}
            title=" Sign Up"
            disabled={!termsAndConditions}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({})
export default SignUp
