import * as React from 'react'
import { GestureResponderEvent } from 'react-native'
import { buttonColor } from 'styles/colors'
import { btnWidth, btnHeight } from 'styles/variables'
import { Button } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

export interface ButtonProps {
  onPress: (e: GestureResponderEvent) => void
  buttonColor?: string
  style?: Object
  btnTextColor?: string
  btnWidth?: number
  btnHeight?: number
  hasIcon?: boolean
  icon?: IconSource
  loading?: boolean
  disabled?: boolean
  iconToLeft?: boolean
  btnTextBold?: boolean
  fontSize?: number
  children: string
  paddingHorizontal?: number
}
const defaultProps = {
  buttonColor: buttonColor,
  style: { borderRadius: 200 },
  btnTextColor: 'white',
  btnWidth: btnWidth,
  btnHeight: btnHeight,
  hasIcon: false,
  icon: null,
  loading: false,
  disabled: false,
  iconToLeft: false,
  btnTextBold: true,
  fontSize: 16,
  children: null,
  paddingHorizontal: 55,
}
function ButtonEl(props: ButtonProps) {
  const {
    buttonColor,
    style,
    onPress,
    btnTextColor = 'white',
    btnWidth,
    hasIcon,
    icon,
    loading,
    btnHeight,
    disabled,
    iconToLeft,
    btnTextBold,
    fontSize,
    children,
    paddingHorizontal,
  } = props
  return (
    <Button
      icon={icon}
      buttonColor={buttonColor}
      mode="contained"
      onPress={onPress}
      uppercase
      style={style}
      theme={{ roundness: 20 }}
      contentStyle={{
        justifyContent: icon ? 'space-between' : 'center',
        paddingHorizontal: paddingHorizontal,
        height: btnHeight,
      }}
      textColor={btnTextColor}
    >
      {children}
    </Button>
  )
}

ButtonEl.defaultProps = defaultProps
export default ButtonEl
