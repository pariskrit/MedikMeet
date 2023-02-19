import * as React from 'react'
import { Pressable, View, TextInput } from 'react-native'
import { borderColor, errorColor } from 'styles/colors'
import { isEmpty } from 'utils'
import MyText from '../MyText'
import { otpInputStyles } from './otpInputStyles'

interface IOTPInputProps {
  code: string
  setCode: Function
  maxLength: number
  setIsPinReady: Function
  error?: boolean
}

const OTPInput: React.FunctionComponent<IOTPInputProps> = (props) => {
  const { code, setCode, maxLength, setIsPinReady, error } = props
  const boxArray = new Array(maxLength).fill(0)
  const inputRef = React.useRef<TextInput>(null)
  const {
    splitBoxText,
    splitBoxes,
    splitBoxesFocused,
    splitOTPBoxContainer,
    btnContainer,
    btnText,
    otpInputContainer,
    textInputHidden,
  } = otpInputStyles

  const [isInputBoxFocused, setIsInputBoxFocused] = React.useState(false)
  const [text, setText] = React.useState('')

  const handleOnPress = () => {
    //setText("focused")
    setIsInputBoxFocused(true)
    if (!isEmpty(inputRef)) inputRef.current?.focus()
  }

  const handleOnBlur = () => {
    setIsInputBoxFocused(false)
  }

  React.useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maxLength)
    // clean up function
    return () => {
      setIsPinReady(false)
    }
  }, [code])
  const boxDigit = (_: number, index: number) => {
    const emptyInput = ''
    const digit = code[index] || emptyInput

    const isCurrentValue = index === code.length
    const isLastValue = index === maxLength - 1
    const isCodeComplete = code.length === maxLength

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete)
    const splitBoxStyle =
      isInputBoxFocused && isValueFocused ? { ...splitBoxes, ...splitBoxesFocused } : splitBoxes
    return (
      <View key={index} style={{ ...splitBoxStyle, borderColor: error ? errorColor : borderColor }}>
        <MyText style={splitBoxText} fontStyle="bold">
          {digit}
        </MyText>
      </View>
    )
  }

  return (
    <View style={otpInputContainer}>
      <Pressable style={splitOTPBoxContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={textInputHidden}
        value={code}
        onChangeText={(text) => setCode(text)}
        maxLength={maxLength}
        ref={inputRef}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
      />
    </View>
  )
}

export default OTPInput
