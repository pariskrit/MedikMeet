import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type HomeStackNavigatorParamList = {
  Home: undefined
  Details: {
    name: string
    birthYear: string
  }
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Details'
>

export type genericObj = {
  [key: string]: any
}

export type dropdownItems = {
  label: string
  value: string | boolean
  icon?: any
}

export type profileMenuItem = {
  id: number
  title: string
  hasMenuRightIcon?: boolean
  menuRightIcon?: React.ReactElement
  menuRightText?: string
  onMenuClick?: Function
  disabled?: boolean
}

export type radioGroup = {
  id: number
  value: string
  label: string
}
