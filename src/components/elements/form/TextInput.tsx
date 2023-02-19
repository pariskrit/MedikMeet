import * as React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput, View, Text } from 'react-native'
import { borderColor, errorColor } from 'styles/colors'
import { inputBorderRadius, inputHeight, inputPadding, inputWidth } from 'styles/variables'
import { flexStyles } from 'styles/flex'


type TextInputProps = {
  styles?: Object
  onChangeText?: Function
  value?: string
  placeholder?: string
  keyboardType?: KeyboardTypeOptions
  hasIcon?: boolean
  iconToLeft: boolean
  icon?: React.ReactElement
  error?: boolean
}
const defaultProps = {
  onChangeText: (value: string) => {},
  styles: {},
  placeholder: '',
  keyboardType: 'default',
  iconToLeft: true,
  error: false,
  value: '',
}
function TextInputEl(props: TextInputProps & typeof defaultProps) {
  const {
    styles,
    onChangeText,
    value,
    placeholder,
    keyboardType,
    hasIcon,
    iconToLeft,
    icon,
    error,
  } = props
  return (
    <View
      style={{
        ...inputStyles.inputContainer,
        ...(!iconToLeft && flexStyles.justifyBetween),
        borderColor: error ? errorColor : borderColor,
      }}
    >
      <>
        {hasIcon && iconToLeft ? <View style={inputStyles.iconContainer}>{icon}</View> : null}
        <TextInput
          style={{ ...inputStyles.input, ...styles }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          inlineImageLeft={'message'}
        />
        {hasIcon && !iconToLeft ? <View style={inputStyles.iconContainer}>{icon}</View> : null}
      </>
    </View>
  )
}

TextInputEl.defaultProps = defaultProps
const inputStyles = StyleSheet.create({
  inputContainer: {
    width: inputWidth,
    height: inputHeight,
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: borderColor,
    borderRadius: inputBorderRadius,
    paddingHorizontal: inputPadding,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0,
    height: inputHeight,
  },
  iconContainer: {
    height: inputHeight,
    paddingVertical: inputPadding,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
export default TextInputEl
