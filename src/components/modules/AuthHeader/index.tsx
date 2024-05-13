import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureResponderEvent } from 'react-native-modal'
import { primaryColor, textColor } from 'styles/colors'

interface AuthHeaderProps {
  goBack: (e: GestureResponderEvent) => void
  title: string
  subtitle: string
  customStyle?: object
  showBack?: boolean
}

function AuthHeader(props: AuthHeaderProps) {
  const { goBack, title, subtitle, customStyle, showBack = true } = props

  return (
    <View style={customStyle}>
      <View style={styles.header}>
        {showBack && (
          <View onTouchEnd={goBack} style={{ marginLeft: -15 }}>
            <Icon name="go-back" size={55} />
          </View>
        )}
        <View>
          <MyText style={styles.headerText}>{title}</MyText>
        </View>
      </View>
      <View>
        <MyText style={{ color: textColor }}>{subtitle} </MyText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: primaryColor,
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
})

export default AuthHeader
