import * as React from 'react'
import { View, Text, Button } from 'react-native'
import Message from 'assets/svgs/Message.svg'
import ArrowCircleFillRight from 'assets/svgs/ArrowCircleFillRight.svg'
import CheckFill from 'assets/svgs/check.svg'
import User from 'assets/svgs/User.svg'
import Phone from 'assets/svgs/Phone.svg'
import GoBackArrow from 'assets/svgs/GoBackArrow.svg'
import ArrowCircleWhiteRight from 'assets/svgs/ArrowCircleWhiteRight.svg'
import EditPen from 'assets/svgs/EditRectangle.svg'
import Logout from 'assets/svgs/Logout.svg'
import Calendar from 'assets/svgs/Calendar.svg'
import Gender from 'assets/svgs/Gender.svg'

interface IIconProps {
  size?: number
  name: string
  containerStyles?: Object
}

const defaultProps = {
  size: 20,
}
const Icon: React.FunctionComponent<IIconProps> = (props) => {
  const { size, name, containerStyles } = props
  const getIcon = () => {
    switch (name) {
      case 'message':
        return Message
      case 'arrow-circle-right-fill':
        return ArrowCircleFillRight
      case 'check-fill':
        return CheckFill
      case 'phone':
        return Phone
      case 'user':
        return User
      case 'go-back':
        return GoBackArrow
      case 'arrow-circle-right-white':
        return ArrowCircleWhiteRight
      case 'edit':
        return EditPen
      case 'logout':
        return Logout
      case 'calendar':
        return Calendar
      case 'gender':
        return Gender
      default:
        return null
    }
  }
  let IconComp = getIcon()
  return (
    <View style={containerStyles}>
      {IconComp ? <IconComp width={size} height={size} /> : 'Invalid  name'}
    </View>
  )
}
Icon.defaultProps = defaultProps

export default Icon
