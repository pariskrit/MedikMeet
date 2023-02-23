import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { errorColor } from 'styles/colors'
import { formElContainerPadding, infoFontSize, infoMarginTop } from 'styles/variables'
import { wholeFormInterface } from 'ts/interfaces/formInterface'
import CheckboxEl from './Checkbox'
import DatePicker from './DatePicker'
import Dropdown from './Dropdown'
import TextInputEl from './TextInput'

const defaultProps = {
  formName: 'textinput',
  paddingHorizontal: 0,
}
const Form = (props: wholeFormInterface) => {
  const { formName, name, label, size, width, error, paddingHorizontal } = props
  // please add new form type here for the new component
  const getDynamicComponent = () => {
    switch (formName) {
      case 'textinput':
        return TextInputEl
      case 'checkbox':
        return CheckboxEl
      case 'dropdown':
        return Dropdown
      case 'datepicker':
        return DatePicker

      default:
        return null
    }
  }
  let DynamicComponent = getDynamicComponent()
  return (
    <View style={{ ...formStyles.formElContainer, paddingHorizontal: paddingHorizontal }}>
      {label &&
        formName !== 'checkbox' &&
        formName !== 'radiogroup' &&
        formName !== 'checkgroup' &&
        formName !== 'checkBoxGroup' && (
          <View>
            <MyText>{label}</MyText>
          </View>
        )}
      <View style={{ zIndex: 100 }}>
        {DynamicComponent ? <DynamicComponent {...props} /> : <MyText>'Invalid form name'</MyText>}
      </View>
      {error && (
        <View style={formStyles.errorContainer}>
          <MyText style={formStyles.error}>{error}</MyText>
        </View>
      )}
    </View>
  )
}
Form.defaultProps = defaultProps
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
})

export default Form
