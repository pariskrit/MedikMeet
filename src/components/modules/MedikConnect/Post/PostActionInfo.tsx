import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface IPostActionInfoProps {
  setShowComments: Function
}

const PostActionInfo: React.FunctionComponent<IPostActionInfoProps> = (props) => {
  const { setShowComments } = props
  return (
    <View style={styles.postActionInfoContainer}>
      <View style={styles.actionBlock}>
        <Icon name="like" size={20} color="#4CC2CB" />
        <MyText style={styles.actionText}>12</MyText>
      </View>
      <View style={{ flexDirection: 'row', gap: 30, marginRight: 10 }}>
        <Pressable onPress={() => setShowComments(true)}>
          <View style={styles.actionBlock}>
            <Icon name="comment" size={20} color="#4CC2CB" />
            <MyText style={styles.actionText}>12</MyText>
          </View>
        </Pressable>
        <View style={styles.actionBlock}>
          <Icon name="share" size={20} color="#4CC2CB" />
          <MyText style={styles.actionText}>12</MyText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  postActionInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#B3B3BF',
    borderBottomWidth: 0.5,
  },
  actionBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 9,
    lineHeight: 11,
  },
})
export default PostActionInfo
