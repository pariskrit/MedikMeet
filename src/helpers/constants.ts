import { dropdownItems, profileMenuItem } from './../ts/types/index'
export const BASE_URL = ''

type fontFamilyOptions = {
  [key: string]: string
}
export const fontFamilyType: fontFamilyOptions = {
  light: 'Montserrat-Light',
  regular: 'Montserrat-Regular',
  bold: 'Montserrat-SemiBold',
  extraBold: 'Montserrat-ExtraSemiBold',
}

export const maxOTPCodeLength = 4

export const genderOptions: dropdownItems[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
]

export const medicConnectSearchTypes: dropdownItems[] = [
  {
    value: 'doctor',
    label: 'Doctors',
  },
  {
    value: 'topics',
    label: 'Topics',
  },
]
export const medicPostTypes: dropdownItems[] = [
  {
    value: 'allPosts',
    label: 'All Posts',
    icon: 'users',
  },
  {
    value: 'myPosts',
    label: 'Only My Posts',
    icon: 'user',
  },
]

export const appointmentSearchTypes: dropdownItems[] = [
  {
    value: 'doctor',
    label: 'Doctors',
  },
  {
    value: 'topics',
    label: 'Topics',
  },
]

export const buttonBackgroundPrimaryColor = '#4CC2CB'