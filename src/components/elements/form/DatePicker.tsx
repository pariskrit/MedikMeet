import * as React from 'react'
import InputEl from './InputEl'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { TextInput } from 'react-native-paper'
import { formatDate } from 'helpers/utils'
import { View } from 'react-native'
import Icon from '../Icon'

interface IDatePickerProps {
  name: string
  value: string
  label: string
  error: string
  onChange: (parm1: string, param2: string | boolean) => void
  showKeyboard?: boolean
  onFocus?: () => void
  style?: Record<string, string | number>
}

const defaultProps = {
  value: '',
  onDateChange: () => {},
  error: undefined,
  label: '',
}
const DatePickerEl: React.FunctionComponent<IDatePickerProps> = (props) => {
  const { value, label, error, onChange, style, name } = props
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: any) => {
    onChange(name, formatDate(date))
    hideDatePicker()
  }

  return (
    <View style={style}>
      <InputEl
        value={value}
        label={label}
        error={error}
        right={<TextInput.Icon icon={() => <Icon name="calendar" />} />}
        showKeyboard={false}
        onFocus={showDatePicker}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={value ? new Date(value) : new Date()}
      />
    </View>
  )
}

DatePickerEl.defaultProps = defaultProps
export default DatePickerEl
