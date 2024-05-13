import ButtonEl from 'components/elements/Button'
import MyText from 'components/elements/MyText'
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { primaryColor, textColor } from 'styles/colors'

function Confirmation() {
  const onConfirm = async () => {}

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image style={styles.logo} source={require('assets/images/Logo2.png')} />
        <MyText style={styles.content_title}>
          Your Profile has been submitted for review. Please wait until the same got approved.
        </MyText>
        <MyText style={styles.sub_title}>Thanks for signing up!</MyText>
      </View>

      <ButtonEl onPress={onConfirm} style={{ marginVertical: 20 }} btnTextColor={primaryColor}>
        Save
      </ButtonEl>
    </View>
  )
}

export default Confirmation

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 40,
  },
  content_title: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 18,
    color: textColor,
  },
  sub_title: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 14,
    color: textColor,
  },
})
