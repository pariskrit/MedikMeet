import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { borderColor, primaryColor } from 'styles/colors'
import { avatarSize } from 'styles/variables'
import { isEmpty } from 'utils'

interface IAvatarProps {
  name: string
  imageUrl?: string
  backgroundColor?: string
  textColor?: string
  size?: number
}
const defaultProps = {
  imageUrl: '',
  backgroundColor: primaryColor,
  textColor: 'white',
  size: avatarSize,
}
const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  const { name, imageUrl, backgroundColor, textColor, size } = props
  return (
    <View style={styles.avatarContainer}>
      {!isEmpty(imageUrl) && <Image style={styles.avatarImage} source={{ uri: imageUrl }} />}
      {isEmpty(imageUrl) && !isEmpty(name) && (
        <View
          style={{
            ...styles.avatarTextContainer,
            backgroundColor,
            width: size,
            height: size,
            borderRadius: (size || avatarSize) / 2,
          }}
        >
          <MyText style={{ ...styles.avatarText, color: textColor }} fontStyle="extraBold">
            {name.substring(0, 2)}
          </MyText>
        </View>
      )}
    </View>
  )
}
Avatar.defaultProps = defaultProps

const styles = StyleSheet.create({
  avatarContainer: {},
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: borderColor,
    //backgroundColor: 'red',
  },
  avatarTextContainer: {
    backgroundColor: primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: borderColor,
  },
  avatarText: {
    textTransform: 'uppercase',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
})
export default Avatar
