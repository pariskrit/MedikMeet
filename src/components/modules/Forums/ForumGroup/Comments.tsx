import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import AddComment from './AddComment'
import Comment from './Comment'
import MyText from 'components/elements/MyText'
import Icon from 'components/elements/Icon'

interface ICommentsProps {
  comment: string
  setComment: (text: string) => void
}

const Comments: React.FunctionComponent<ICommentsProps> = (props) => {
  const { comment, setComment } = props
  const [showAddComment, setShowAddComment] = React.useState(false)
  return (
    <View style={styles.commentsContainer}>
      <AddComment value={comment} onChange={setComment} />
      <Comment />
      <View style={styles.actionContainer}>
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
      </View>
      <MyText style={styles.loadMoreText}>Load more comments</MyText>
    </View>
  )
}
const styles = StyleSheet.create({
  commentsContainer: { gap: 10 },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
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
  loadMoreText: {
    fontSize: 11,
    lineHeight: 15,
    //textAlign:'center',
    marginVertical: 10,
    marginLeft: 10,
  },
})
export default Comments
