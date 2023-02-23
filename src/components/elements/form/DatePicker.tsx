import { fontFamilyType } from 'helpers/constants'
import * as React from 'react'
import { Pressable, View } from 'react-native'
import Modal from 'react-native-modal'
import DatePicker, { ModernDatepickerProps } from 'react-native-modern-datepicker'
import { borderColor, errorColor, primaryColor, textColor } from 'styles/colors'
import { isEmpty } from 'utils'
import Icon from '../Icon'
import TextInput from './TextInput'
import { useColorScheme } from 'react-native'
import { DarkTheme } from '@react-navigation/native'

interface IDatePickerProps {
  value: string
  placeholder?: string
  onDateChange?: Function
  mode?: 'datepicker' | 'calendar' | 'monthYear' | 'time'
  datePickerOptions?: Object
  error?: string
}

const defaultProps = {
  placeholder: '',
  onDateChange: () => {},
  mode: undefined,
  datePickerOptions: {},
  error: '',
}
const DatePickerEl: React.FunctionComponent<IDatePickerProps> = (props) => {
  const { value, placeholder, onDateChange, mode, datePickerOptions, error } = props
  const [modalVisible, setModalVisible] = React.useState(false)
  const scheme = useColorScheme()

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <View pointerEvents="none">
          <TextInput
            value={value}
            hasIcon
            icon={<Icon name="calendar" />}
            placeholder={placeholder}
            error={error}
          />
        </View>
      </Pressable>
      <Modal
        isVisible={modalVisible}
        style={{ paddingHorizontal: 10 }}
        animationIn="slideInUp"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        animationOutTiming={300}
        backdropTransitionOutTiming={0}
        hideModalContentWhileAnimating
        backdropTransitionInTiming={1000}
        onBackdropPress={() => setModalVisible(false)}
        backdropColor={scheme === 'dark' ? '#0c0c0c' : '#5e5d5d'}
      >
        <DatePicker
          {...props}
          selected={value}
          options={{
            defaultFont: fontFamilyType.light,
            headerFont: fontFamilyType.bold,
            ...datePickerOptions,
            borderColor: 'transparent',
            mainColor: scheme === 'dark' ? '#ffffff' : primaryColor,
            textDefaultColor: textColor,
            backgroundColor: scheme === 'dark' ? DarkTheme.colors.background : '#ffffff',
          }}
          mode={mode || 'calendar'}
          onDateChange={(date: string) => {
            if (onDateChange) onDateChange(date)
            setModalVisible(false)
          }}
          style={{ borderRadius: 12, borderColor: borderColor }}
        />
      </Modal>
    </View>
  )
}

DatePickerEl.defaultProps = defaultProps
export default DatePickerEl
