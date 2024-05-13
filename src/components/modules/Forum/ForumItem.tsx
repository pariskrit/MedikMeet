import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import MyText from 'components/elements/MyText'
import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'

interface IForumItemProps {}

export default function ForumItem(props: IForumItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Image size={50} source={require('assets/images/Logo2.png')} />
        <View style={{ gap: 5 }}>
          <MyText style={styles.forumName}>Medical Health Group</MyText>
          <MyText style={{ color: '#B3B3BF' }}>317,423 members</MyText>
          <Icon name="manager" />
        </View>
      </View>
      <View>
        <Text>left</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  forumName: {
    color: '#171766',
    fontWeight: '700',
    fontSize: 14,
  },
})
