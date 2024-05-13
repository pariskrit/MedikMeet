import {
  View,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  TextInput,
  Platform,
} from 'react-native'
import React, { useState } from 'react'
import { HelperText, RadioButton } from 'react-native-paper'
import { disabledColor, errorColor, primaryColor, textColor } from 'styles/colors'
import Icon from '../Icon'
import MyText from '../MyText'
import { radioGroup } from 'ts/types'

type InputElType = {
  // onChange: (text: string) => void
  value?: string
  label: string
  disabled?: boolean
  error?: string
  keyboardType?: KeyboardTypeOptions
  mode?: 'outlined' | 'flat' | undefined
  onChangeText?: (text: string) => void
  style?: Record<string, string | number>
  right?: React.ReactNode
  showKeyboard?: boolean
  onPressIn?: () => void
  onFocus?: () => void
  editable?: boolean
  borderRadius?: number
  textInputStyle?: Record<string, string | number>
  isRequired?: boolean
  numberOfLines?: number
  multiLine?: boolean
  setValue: Function
  radioList: radioGroup[]
}

const RadioGroup = ({
  value,
  label,
  disabled = false,
  error,
  keyboardType,
  mode = 'outlined',
  onChangeText,
  style,
  right,
  showKeyboard = true,
  onPressIn,
  onFocus,
  editable = true,
  borderRadius = 30,
  textInputStyle,
  isRequired,
  numberOfLines = 1,
  multiLine = false,
  setValue,
  radioList,
}: InputElType) => {
  const [isFocused, setIsFocused] = useState(false)

  const onInputFocus = () => {
    setIsFocused(true)
    onFocus && onFocus()
  }

  const onInputBlur = () => {
    setIsFocused(false)
  }
  return (
    <View style={style}>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor:
              isFocused && !Boolean(error) ? primaryColor : Boolean(error) ? 'red' : '#B3B3BF',
            backgroundColor: Boolean(error) && !isFocused ? 'rgba(240, 128, 128,0.2)' : 'white',
          },
        ]}
      >
        <View style={[styles.labelContainer]}>
          <Text
            style={[
              styles.label,
              textInputStyle,
              {
                color: disabled
                  ? disabledColor
                  : isFocused && !Boolean(error)
                  ? primaryColor
                  : Boolean(error)
                  ? 'red'
                  : '#171766',
              },
            ]}
          >
            {label}
          </Text>
          {isRequired && <Text style={styles.required}>*</Text>}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}
        >
          {radioList?.map((x) => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }} key={x.id}>
                <RadioButton
                  value={x.value}
                  status={value === x.value ? 'checked' : 'unchecked'}
                  onPress={() => setValue(x.value)}
                />
                <MyText>{x.label}</MyText>
              </View>
            )
          })}
        </View>
        <View style={{ marginRight: 45, marginBottom: 22 }}>{right}</View>
      </View>
      <HelperText type="error" visible={Boolean(error)}>
        {error}
      </HelperText>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  labelContainer: {
    position: 'absolute',
    top: -10,
    left: 30,
    zIndex: 100,
    fontSize: 12,
    fontWeight: '400',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  label: {},
  input: {
    flex: 0.95,
    color: 'black',
  },
  required: {
    color: 'red',
    marginLeft: 2,
  },
})

export default RadioGroup
