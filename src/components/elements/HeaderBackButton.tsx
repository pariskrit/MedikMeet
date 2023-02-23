import { NavigationProp } from '@react-navigation/native'
import * as React from 'react'
import { Pressable } from 'react-native'
import Icon from './Icon'

interface IHeaderBackButtonProps {
  navigation: NavigationProp<any, any>
}

const HeaderBackButton: React.FunctionComponent<IHeaderBackButtonProps> = (props) => {
  const { navigation } = props
  return (
    <Pressable {...props} onPress={() => navigation.goBack()} style={{ marginRight: 20 }}>
      <Icon name="go-back" size={30} />
    </Pressable>
  )
}

export default HeaderBackButton
