import { DefaultTheme } from '@react-navigation/native'
import {
  backgroundColor,
  borderColor,
  cardColor,
  primaryColor,
  textColor,
  notificationColor,
  secondaryColor,
} from '../styles/colors'

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    card: cardColor,
    text: textColor,
    border: borderColor,
    notification: notificationColor,
  },
}
