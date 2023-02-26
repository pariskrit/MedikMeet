import * as React from 'react'
import { KeyboardTypeOptions, StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { borderColor, errorColor } from 'styles/colors'
import { flexStyles } from 'styles/flex'
import { inputBorderRadius, inputHeight, inputPadding, inputWidth } from 'styles/variables'
import { isEmpty } from 'utils'

type TextInputElProps = {
  styles?: Object
  onChangeText?: Function
  value?: string
  placeholder?: string
  keyboardType?: KeyboardTypeOptions
  hasIcon?: boolean
  iconToLeft: boolean
  icon?: React.ReactElement
  error?: string
  onFocus?: Function
  onBlur?: Function
  borderColor?: string
  height?: number
}
const defaultProps = {
  onChangeText: (value: string) => {},
  onFocus: () => {},
  onBlur: () => {},
  styles: {},
  placeholder: '',
  keyboardType: 'default',
  iconToLeft: true,
  error: '',
  value: '',
  height: inputHeight,
  borderColor: borderColor,
}
function TextInputEl(props: TextInputElProps & typeof defaultProps & TextInputProps) {
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
    borderColor,
    height,
  } = props
  return (
    <View
      style={{
        ...inputStyles.inputContainer,
        ...(!iconToLeft && flexStyles.justifyBetween),
        borderColor: !isEmpty(error) ? errorColor : borderColor,
        height: height,
      }}
    >
      <>
        {hasIcon && iconToLeft ? <View style={inputStyles.iconContainer}>{icon}</View> : null}
        <TextInput
          {...props}
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
    marginRight: 5,
  },
})
export default TextInputEl
