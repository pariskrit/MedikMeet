import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { errorColor, textColor } from 'styles/colors'
import { formElContainerPadding, infoFontSize, infoMarginTop } from 'styles/variables'
import { wholeFormInterface } from 'ts/interfaces/formInterface'
import CheckboxEl from './Checkbox'
import DatePicker from './DatePicker'
import Dropdown from './Dropdown'
import InputEl from './InputEl'
import TextInputEl from './TextInput'

const defaultProps = {
  type: 'textInput',
  paddingHorizontal: 0,
}
const FormInput = (props: any) => {
  const { type } = props
  // please add new form type here for the new component
  const getDynamicComponent = () => {
    switch (type) {
      case 'textInput':
        return InputEl
      // case 'checkbox':
      //   return CheckboxEl
      case 'dropdown':
        return Dropdown
      // case 'datepicker':
      //   return DatePicker

      default:
        return null
    }
  }
  let DynamicComponent = getDynamicComponent()
  return DynamicComponent ? <DynamicComponent {...props} /> : null
}
FormInput.defaultProps = defaultProps
const formStyles = StyleSheet.create({
  formElContainer: {
    paddingVertical: formElContainerPadding,
    width: '100%',
  },
  error: {
    color: errorColor,
    fontSize: infoFontSize,
  },
  errorContainer: {
    marginTop: infoMarginTop,
  },
  infoContainer: { marginTop: infoMarginTop },
  info: { color: textColor, fontSize: infoFontSize },
})

export default FormInput
