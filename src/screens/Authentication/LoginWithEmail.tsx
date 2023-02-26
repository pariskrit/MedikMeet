import { NavigationProp } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { View, Text, StyleSheet, Pressable, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { borderColor, buttonColor, cardColor, primaryColor, textColor } from 'styles/colors'
import FormGroup from 'components/elements/form'
import { InputValidator } from 'helpers/inputValidators'
import { genericObj } from 'ts/types'
import { isEmpty } from 'utils'

export interface AppProps {
  navigation: NavigationProp<any, any>
}

const LoginWithEmail = (props: AppProps) => {
  const [formState, setFormState] = React.useState({
    email: '',
  })
  const [errors, setErrors] = React.useState({
    email: '',
  })
  const [focus, setFocus] = useState(false)

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
      setTimeout(() => {
        navigation.navigate('MainLogin', { email: email })
      }, 1500)
    } else {
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
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View onTouchEnd={() => navigation.goBack()}>
              <Icon name="go-back" size={55} />
            </View>
            <View>
              <MyText style={styles.headerText}>Continue with Email</MyText>
            </View>
          </View>
          <View>
            <MyText style={{ color: textColor }}>
              We'll check if you have an account, and help crrate one if you don't.
            </MyText>
          </View>

          <View>
            <View>
              <FormGroup
                formName="textinput"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChangeText={(value: any) => onChange('email', value)}
                error={errors.email}
                value={email}
                placeholder="Email"
                styles={{ padding: 0, paddingLeft: 3, width: '100%', color: textColor }}
                placeholderTextColor={textColor}
                height={40}
                borderColor={focus ? primaryColor : borderColor}
              />
            </View>
            <Button
              mode="contained"
              onPress={checkEmailValidation}
              style={{ backgroundColor: buttonColor }}
            >
              CONTINUE
            </Button>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
})

export default LoginWithEmail
