import {
  View,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Animated,
  Pressable,
  Easing,
} from 'react-native'
import React, { useState } from 'react'
import { HelperText } from 'react-native-paper'
import { backgroundColor, disabledColor, errorColor, primaryColor, textColor } from 'styles/colors'
import Icon from '../Icon'
import { isEmpty } from 'utils'

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
  right?: React.ReactNode | string
  showKeyboard?: boolean
  onPressIn?: () => void
  onFocus?: () => void
  editable?: boolean
  borderRadius?: number
  textInputStyle?: Record<string, string | number>
  isRequired?: boolean
  numberOfLines?: number
  multiLine?: boolean
  helperText?: string
}

const InputEl = ({
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
  helperText = '',
}: InputElType) => {
  const [isFocused, setIsFocused] = useState(false)
  const labelTranslateY = React.useRef(new Animated.Value(isEmpty(value) ? 0 : -25)).current
  const labelTranslateX = React.useRef(new Animated.Value(isEmpty(value) ? 0 : 10)).current
  const inputRef = React.useRef<any>()

  const onInputFocus = () => {
    Animated.timing(labelTranslateY, {
      toValue: -25,
      duration: 100,
      useNativeDriver: true,
    }).start()
    Animated.timing(labelTranslateX, {
      toValue: 10,
      duration: 100,
      useNativeDriver: true,
    }).start()
    setIsFocused(true)
    onFocus && onFocus()
  }

  const onInputBlur = () => {
    setIsFocused(false)
    if (isEmpty(value)) {
      Animated.timing(labelTranslateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
      Animated.timing(labelTranslateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
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
            borderRadius,
          },
        ]}
      >
        <Animated.View
          style={{
            ...styles.labelContainer,
            // ...(isFocused ? styles.labelContainerToTop : {}),
            //top: labelTop,
            transform: [
              { translateY: isEmpty(value) ? labelTranslateY : -25 },
              { translateX: isEmpty(value) ? labelTranslateX : 10 },
            ],
          }}
        >
          <Pressable onPress={() => inputRef.current?.focus()} style={{ flexDirection: 'row' }}>
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
                    : isEmpty(value)
                    ? textColor
                    : '#171766',
                },
              ]}
            >
              {label}
            </Text>
            {isRequired && (isFocused || !isEmpty(value)) && <Text style={styles.required}>*</Text>}
          </Pressable>
        </Animated.View>

        <TextInput
          style={{ ...styles.input, color: disabled ? disabledColor : 'black' }}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          showSoftInputOnFocus={showKeyboard}
          editable={!disabled}
          cursorColor={primaryColor}
          multiline={multiLine}
          numberOfLines={numberOfLines}
          onPressIn={onPressIn}
          ref={inputRef}
        />
        <View
          style={{
            marginRight: typeof right === 'string' ? 20 : 45,
            marginBottom: typeof right === 'string' ? 3 : 22,
          }}
        >
          {typeof right === 'string' ? <Text style={styles.rightText}>{right}</Text> : right}
        </View>
      </View>
      {helperText ? (
        <HelperText type="info" style={{ opacity: 0.8, fontStyle: 'italic' }}>
          {helperText}
        </HelperText>
      ) : (
        <HelperText type="error" visible={Boolean(error)}>
          {error}
        </HelperText>
      )}
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
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: 15,
    left: 16,
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
  rightText: {
    fontSize: 14,
  },
  labelContainerToTop: {
    position: 'absolute',
    //top: -20,
    //top: 0,
    left: 30,
  },
})

export default InputEl
