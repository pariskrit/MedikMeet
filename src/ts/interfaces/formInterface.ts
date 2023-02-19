import { KeyboardTypeOptions } from 'react-native'
import { ReactElement } from 'react'

export interface basicInputInterface {
  name?: string
  value?: any
  onChange?: Function
  onChangeText?: Function & ((value: string) => void)
  onPress?: Function & (() => void)
  label?: string
  placeholder?: string
  size?: number
  width?: string
  disabled?: boolean
  onKeyUp?: Function
  onBlur?: Function
  options?: any[]
  error?: any
  className?: string
  icon?: ReactElement
  styles?: Object
  paddingHorizontal?: number
}

export interface otherInputInterface extends basicInputInterface {
  minValue?: string
  maxValue?: string
  type?: string
  autoFocus?: boolean
  innerLabel?: string
  hasIcon?: boolean
  iconToLeft?: boolean
  keyboardType?: KeyboardTypeOptions
}

export interface otherTimePickerInterface extends basicInputInterface {
  time?: string
  defaultMeridiem?: string
}
export interface reactSelectInterface extends basicInputInterface {
  isArray?: boolean
  isArrayKeys?: boolean
  isAbove?: boolean
  multiple?: boolean
  loading?: boolean
  loadingType?: string
}

export interface checkRadioInterface extends basicInputInterface {
  checked?: boolean
  labelPosition?: string
}

export interface dateRangeInterface extends otherInputInterface {
  startDate?: any
  endDate?: any
}

export interface textEditorInterface extends basicInputInterface {
  toolbarId?: string
}

export interface singleDocsInterface extends basicInputInterface {
  btnText?: string
  extraClassName?: string
}

export interface ydmInputCommonInterface extends basicInputInterface {
  monthValue?: string | number
  yearValue?: string | number
  dayValue?: string | number
  inputShow?: any
  // inputShow?:string[] | 'all' | 'months' | 'years' | 'days',
}

export interface ydmWholeInterface extends ydmInputCommonInterface {
  value: ydmValueProps
  inputShow?: string[] | 'all' | 'months' | 'years' | 'days'
}

interface ydmValueProps {
  month?: string | number
  year?: string | number
  day?: string | number
}

export interface checkdGroupProps extends basicInputInterface {
  checkGroupArray?: any[]
  checkedGroupValue?: any[]
}

export interface chipsInputProps extends basicInputInterface {
  chipsArray?: []
  badgeColor?: string
  multiple?: boolean
}
export interface wholeFormInterface
  extends singleDocsInterface,
    checkRadioInterface,
    reactSelectInterface,
    otherInputInterface,
    textEditorInterface,
    dateRangeInterface,
    checkdGroupProps,
    chipsInputProps,
    ydmInputCommonInterface {
  formName:
    | 'textinput'
    | 'textarea'
    | 'reactselect'
    | 'checkBoxGroup'
    | 'dateinput'
    | 'customdateinput'
    | 'chipsinput'
    | 'singledocumentinput'
    | 'checkgroup'
    | 'asyncautoselect'
    | 'reactdaterange'
    | 'reactcalendar'
    | 'searchInput'
    | 'timepicker'
    | 'radiogroup'
    | 'ydmInput'
    | 'selectInput'
    | 'texteditor'
    | 'dragAndDropUpload'
    | 'switch'
    | 'dragAndDropUpload'
    | 'datepicker'
    | 'checkbox'
  alignment?: string
  validators?: any
  isNepali?: boolean
  isDateRange?: boolean
  minDate?: string
  maxDate?: string
  isFullDetails?: boolean
  isTextInNepali?: boolean
  leftLabel?: any
  rightLabel?: any
}
