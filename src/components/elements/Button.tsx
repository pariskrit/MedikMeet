import * as React from 'react'
import { View, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { primaryColor } from 'styles/colors'
import { btnBorderRadius, btnWidth, btnHeight, defaultFontSize } from 'styles/variables'
import MyText from 'components/elements/MyText'

export interface ButtonProps {
  title: string
  onPress: Function
  color?: string
  styles?: Object
  btnTextColor?: string
  btnWidth?: number
  btnHeight?: number
  hasIcon?: boolean
  icon?: React.ReactElement
  loading?: boolean
  disabled?: boolean
}
const defaultProps = {
  color: primaryColor,
  styles: {},
  btnTextColor: 'white',
  btnWidth: btnWidth,
  btnHeight: btnHeight,
  hasIcon: false,
  icon: null,
  loading: false,
  disabled: false,
}
function ButtonEl(props: ButtonProps) {
  const {
    title,
    color,
    styles,
    onPress,
    btnTextColor,
    btnWidth,
    hasIcon,
    icon,
    loading,
    btnHeight,
    disabled,
  } = props
  return (
    <Pressable
      style={{
        ...btnStyles.button,
        ...styles,
        backgroundColor: color,
        width: btnWidth,
        height: btnHeight,
        opacity: disabled ? 0.7 : 1,
      }}
      onPress={() => onPress()}
      disabled={disabled || loading}
    >
      <MyText style={{ ...btnStyles.text, color: btnTextColor }} fontStyle="bold">
        {title}
      </MyText>
      {hasIcon && !loading ? <View style={btnStyles.iconContainer}>{icon}</View> : null}
      {loading && <ActivityIndicator size="small" color="#fff" />}
    </Pressable>
  )
}
const btnStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: btnBorderRadius,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    fontSize: defaultFontSize,
    lineHeight: 21,
    letterSpacing: 0.25,
    textAlign: 'center',
    flex: 1,
  },
  iconContainer: {},
})
ButtonEl.defaultProps = defaultProps
export default ButtonEl
