import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { borderColor } from 'styles/colors'
import {
  checkboxActiveSize,
  checkboxBorderRadius,
  checkboxBorderWidth,
  checkboxSize,
} from 'styles/variables'
import Icon from './Icon'

interface IProps {
  checked?: boolean
  onPress?: Function
  size?: number
  backgroundColor?: string
  borderColor?: string
}

const defaultProps = {
  onPress: () => {},
  checked: false,
  size: checkboxSize,
  borderColor: borderColor,
}
export const CheckBoxButton = (props: IProps & typeof defaultProps) => {
  const { checked, onPress, size, backgroundColor, borderColor } = props

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.checkBoxContainer,
        {
          height: size || checkboxSize,
          width: size || checkboxSize,
          backgroundColor: checked ? backgroundColor : 'transparent',
          borderColor: borderColor,
          borderWidth: 2,
        },
      ]}
      onPress={onPress}
    >
      {checked ? <Icon name="check-fill" /> : <></>}
    </TouchableOpacity>
  )
}
CheckBoxButton.defaultProps = defaultProps
const styles = StyleSheet.create({
  activeIcon: {
    width: checkboxActiveSize,
    height: checkboxActiveSize,
    tintColor: '#fffff',
  },
  checkBoxContainer: {
    borderRadius: checkboxBorderRadius,
    borderWidth: checkboxBorderWidth,
  },
})
