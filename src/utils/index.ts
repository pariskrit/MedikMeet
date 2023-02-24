import { NavigationProp } from '@react-navigation/native'
import { profileMenuItem } from 'ts/types'

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

export const getProfileMenuItems = (navigation: NavigationProp<any, any>) => {
  const profileMenuItems: profileMenuItem[] = [
    {
      id: 1,
      title: 'Mobile Verification',
      hasMenuRightIcon: true,
      onMenuClick: () => navigation.navigate('VerifyUser', { name: 'email' }),
    },
    {
      id: 2,
      title: 'Email Verification',
      hasMenuRightIcon: true,
      onMenuClick: () => navigation.navigate('VerifyUser', { name: 'phone' }),
    },
    {
      id: 3,
      title: 'Linked device',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 4,
      title: 'Enable Security',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 5,
      title: 'About SoftManage App',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 6,
      title: 'FAQs',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 7,
      title: 'Terms and Conditions',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 8,
      title: 'Privacy and Policy',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 9,
      title: 'De-Activate Account',
      hasMenuRightIcon: true,
      disabled: true,
    },
    {
      id: 10,
      title: 'App Version',
      menuRightText: 'V1.00.1',
      hasMenuRightIcon: false,
      disabled: true,
    },
  ]
  return profileMenuItems
}
