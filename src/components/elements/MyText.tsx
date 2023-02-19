import { fontFamilyType } from 'helpers/constants'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

interface IMyTextProps {
  children: string
  fontSize?: number
  style?: Object
  fontStyle?: string
}
const defaultProps = {
  fontSize: undefined,
  style: {},
  fontStyle: 'regular',
}
// do not use default Text component directly use MyText component instead
const MyText: React.FunctionComponent<IMyTextProps> = (props) => {
  const { children, style, fontStyle } = props
  return (
    <Text style={{ ...style, fontFamily: fontFamilyType[fontStyle || 'regular'] }}>{children}</Text>
  )
}
MyText.defaultProps = defaultProps

const textStyle = StyleSheet.create({})
export default MyText
