import React, { useState } from 'react'
import { HelperText, TextInput } from 'react-native-paper'
import { errorColor } from 'styles/colors'

type PasswordInputPropTypes = {
  onChange: (text: string) => void
  error?: string
}

const PasswordInput = ({ onChange, error }: PasswordInputPropTypes) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={!showPassword}
        onChangeText={onChange}
        theme={{
          colors: { primary: Boolean(error) ? errorColor : 'grey' },
          roundness: 30,
        }}
        autoFocus={false}
        right={
          <TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={handleShowPassword} />
        }
      />
      {Boolean(error) && (
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
      )}
    </>
  )
}

export default PasswordInput
