import { NavigationProp } from '@react-navigation/native'
import Button from 'components/elements/Button'
import FormGroup from 'components/elements/form'
import Icon from 'components/elements/Icon'
import { genderOptions } from 'helpers/constants'
import { InputValidator } from 'helpers/inputValidators'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formStyles } from 'styles/form'
import { genericObj } from 'ts/types'
import { isEmpty } from 'utils'

interface IEditProfileProps {
  navigation: NavigationProp<any, any>
}

const EditProfile: React.FunctionComponent<IEditProfileProps> = (props) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [formState, setFormState] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    pinCode: '',
  })
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    pinCode: '',
  })
  const [isLoading, setIsLoading] = React.useState(false)

  const { navigation } = props
  const editProfile = async () => {
    setIsLoading(true)
    setIsSubmitted(true)
    if (await validateForm()) {
      setTimeout(() => {
        setIsLoading(false)
        navigation.navigate('Profile', { name: 'Profile' })
      }, 1500)
    } else {
      setIsLoading(false)
    }
  }
  const validateForm = async () => {
    const fieldsToValidate = {
      firstName,
      lastName,
      gender,
      dob,
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
    if (isSubmitted) {
      const formErrors: genericObj = await InputValidator({ [name]: val })
      setErrors({
        ...errors,
        [name]: formErrors[name],
      })
    }
  }
  const { firstName, lastName, gender, dob, pinCode } = formState
  return (
    <SafeAreaView>
      <View style={styles.formContainer}>
        <View style={formStyles.formRow}>
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
          <View style={{ zIndex: 100 }}>
            <FormGroup
              formName="dropdown"
              setValue={(value: any) => onChange('gender', value)}
              error={errors.gender}
              value={gender}
              hasIcon
              placeholder="Gender"
              items={genderOptions}
              prefixIcon={<Icon name="gender" />}
            />
          </View>
          <View>
            <FormGroup
              formName="datepicker"
              placeholder="DOB      MM/DD/YYYY"
              value={dob}
              error={errors.dob}
              onDateChange={(value: any) => onChange('dob', value)}
            />
          </View>

          <View>
            <FormGroup
              formName="textinput"
              onChangeText={(value: any) => onChange('pinCode', value)}
              error={errors.pinCode}
              value={pinCode}
              hasIcon
              icon={<Icon name="phone" />}
              placeholder="Pin Code"
            />
          </View>
        </View>
        <View style={formStyles.formRow}>
          <Button
            hasIcon
            icon={<Icon name="arrow-circle-right-fill" />}
            onPress={() => editProfile()}
            loading={isLoading}
            title="Save"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
})
export default EditProfile
