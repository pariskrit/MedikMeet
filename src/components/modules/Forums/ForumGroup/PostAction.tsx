import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface IPostActionProps {
  setShowAddComment: Function
}

const PostAction: React.FunctionComponent<IPostActionProps> = (props) => {
  const { setShowAddComment } = props
  return (
    <View style={styles.postActionContainer}>
      <View style={styles.actionBlock}>
        <MyText style={styles.actionText}>Like</MyText>
        <Icon name="like" size={20} color="#B3B3BF" />
      </View>
      <Pressable onPress={() => setShowAddComment(true)}>
        <View style={styles.actionBlock}>
          <MyText style={styles.actionText}>Comment</MyText>
          <Icon name="comment" size={20} color="#B3B3BF" />
        </View>
      </Pressable>
      <View style={styles.actionBlock}>
        <MyText style={styles.actionText}>Share</MyText>
        <Icon name="share" size={20} color="#B3B3BF" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  postActionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 30,
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
export default PostAction
