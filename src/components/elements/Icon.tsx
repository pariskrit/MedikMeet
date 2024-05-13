import Calendar from 'assets/images/calendar.svg'
import Contact from 'assets/images/contact.svg'
import Document from 'assets/images/document.svg'
import HealthHistory from 'assets/images/health-history.svg'
import MedicalDocument from 'assets/images/medical-document.svg'
import RightArrow from 'assets/images/right-arrow.svg'
import ArrowCircleFillRight from 'assets/svgs/ArrowCircleFillRight.svg'
import ArrowCircleWhiteRight from 'assets/svgs/ArrowCircleWhiteRight.svg'
import Comment from 'assets/svgs/Comment.svg'
import Delete from 'assets/svgs/Delete.svg'
import Edit from 'assets/svgs/Edit.svg'
import EditPen from 'assets/svgs/EditRectangle.svg'
import Gender from 'assets/svgs/Gender.svg'
import GoBackArrow from 'assets/svgs/GoBackArrow.svg'
import Like from 'assets/svgs/Like.svg'
import Logout from 'assets/svgs/Logout.svg'
import Message from 'assets/svgs/Message.svg'
import Phone from 'assets/svgs/Phone.svg'
import Share from 'assets/svgs/Share.svg'
import User from 'assets/svgs/User.svg'
import CheckFill from 'assets/svgs/check.svg'
import * as React from 'react'
import { View } from 'react-native'
import { defaultIconColor, defaultIconFillColor } from 'styles/colors'
import MyText from './MyText'
import Users from 'assets/svgs/Users.svg'
import AddCircle from 'assets/svgs/AddCircle.svg'
import Search from 'assets/svgs/Search.svg'
import Image from 'assets/svgs/Image.svg'
import Video from 'assets/svgs/Video.svg'
import Cross from 'assets/svgs/Cross.svg'
import Pin from 'assets/svgs/Pin.svg'
import Degree from 'assets/svgs/Degree.svg'
import Certified from 'assets/svgs/Certified.svg'
import ChevronDown from 'assets/svgs/ChevronDown.svg'
import ChevronUp from 'assets/svgs/ChevronUp.svg'
import Manager from 'assets/svgs/Manager.svg'
import Poll from 'assets/svgs/Poll.svg'
import Tag from 'assets/svgs/Tag.svg'
import Panaroma from 'assets/svgs/Panaroma.svg'
import EditProperty from 'assets/svgs/EditProperty.svg'
import VideoPlay from 'assets/svgs/VideoPlay.svg'
import EllipseCircle from 'assets/svgs/EllipseCircle.svg'
import FilterHorizontal from 'assets/svgs/FilterHorizontal.svg'
import ArrowCircleLeft from 'assets/svgs/ArrowCircleLeft.svg'
import ArrowCircleRight from 'assets/svgs/ArrowCircleRight.svg'
import Upload from 'assets/svgs/Upload.svg'
import LeftArrowCircle from 'assets/svgs/LeftArrowCircle.svg'
import RightArrowCircle from 'assets/svgs/RightArrowCircle.svg'
import LeftArrowCircleDisabled from 'assets/svgs/LeftArrowCircleDisabled.svg'
import Plus from 'assets/svgs/Plus.svg'

interface IIconProps {
  size?: number
  name: string
  containerStyles?: Object
  color?: string
  fill?: string
  isFill?: boolean
}

const defaultProps = {
  size: 20,
  color: defaultIconColor,
  isFil: false,
  fill: defaultIconFillColor,
}
const Icon: React.FunctionComponent<IIconProps> = (props) => {
  const { size, name, containerStyles, color, fill, isFill } = props
  const getIcon = () => {
    switch (name) {
      case 'document':
        return Document
      case 'contact':
        return Contact
      case 'health-history':
        return HealthHistory
      case 'medical-document':
        return MedicalDocument
      case 'right-arrow':
        return RightArrow
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
      case 'delete':
        return Delete
      case 'edit-black':
        return Edit
      case 'like':
        return Like
      case 'message':
        return Message
      case 'share':
        return Share
      case 'comment':
        return Comment
      case 'users':
        return Users
      case 'search':
        return Search
      case 'add-circle':
        return AddCircle
      case 'image':
        return Image
      case 'video':
        return Video
      case 'cross':
        return Cross
      case 'degree':
        return Degree
      case 'pin':
        return Pin
      case 'certified':
        return Certified
      case 'chevron-down':
        return ChevronDown
      case 'chevron-up':
        return ChevronUp
      case 'manger':
        return Manager
      case 'poll':
        return Poll
      case 'tag':
        return Tag
      case 'panaroma':
        return Panaroma
      case 'edit-property':
        return EditProperty
      case 'video-play':
        return VideoPlay
      case 'ellipse-circle':
        return EllipseCircle
      case 'filter-horizontal':
        return FilterHorizontal
      case 'arrow-circle-right':
        return ArrowCircleRight
      case 'arrow-circle-left':
        return ArrowCircleLeft
      case 'upload':
        return Upload
      case 'left-arrow-circle':
        return LeftArrowCircle
      case 'right-arrow-circle':
        return RightArrowCircle
      case 'left-arrow-circle-disabled':
        return LeftArrowCircleDisabled
      case 'plus':
        return Plus
      default:
        return null
    }
  }
  let IconComp = getIcon()
  return (
    <View style={containerStyles}>
      {IconComp ? (
        isFill ? (
          <IconComp width={size} height={size} color={color} fill={fill} />
        ) : (
          <IconComp width={size} height={size} color={color} />
        )
      ) : (
        <MyText>Invalid icon</MyText>
      )}
    </View>
  )
}
Icon.defaultProps = defaultProps

export default Icon
