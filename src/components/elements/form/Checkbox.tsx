import * as React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { commonStyles } from 'styles/common'
import { flexStyles } from 'styles/flex'
import { checkboxSize } from 'styles/variables'
import { isEmpty } from 'utils'
import MyText from 'components/elements/MyText'

import { CheckBoxButton } from '../CheckBoxButton'
import { borderColor } from 'styles/colors'
interface ICheckboxProps {
  checked?: boolean
  onPress?: Function & (() => void)
  label?: string
  styles?: Object
  size?: number
  borderColor?: string
}
const defaultProps = {
  onPress: () => {},
  size: checkboxSize,
  label: '',
  styles: {},
  checked: false,
  borderColor: borderColor,
}
const CheckboxEl: React.FunctionComponent<ICheckboxProps> = (props) => {
  const { checked, onPress, label, styles, size, borderColor } = props
  return (
    <View
      style={{
        ...flexStyles.flex,
        ...styles,
        ...flexStyles.flexDirectionRow,
        justifyContent: 'flex-start',
      }}
    >
      <CheckBoxButton checked={checked} onPress={onPress} size={size} borderColor={borderColor} />
      {!isEmpty(label) && (
        <MyText style={{ ...commonStyles.link, ...checkboxStyles.label }}>{label || ''}</MyText>
      )}
    </View>
  )
}
CheckboxEl.defaultProps = defaultProps

const checkboxStyles = StyleSheet.create({
  label: {
    marginLeft: 10,
    //textAlign:'start'
  },
})
export default CheckboxEl
