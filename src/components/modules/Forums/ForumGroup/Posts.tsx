import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import PostActionInfo from './PostActionInfo'
import PostAction from './PostAction'
import AddComment from './AddComment'
import Comments from './Comments'
import Poll from './Poll'

interface IPostsProps {
  post: any
}
const poll = {
  pollTitle: 'Immediate Therapies recommended for Shoulder Injuries',
  pollItems: [
    { id: 1, pollItemName: 'Yes,definetly', percentage: '75%' },
    { id: 2, pollItemName: 'Not at all', percentage: '10%' },
    { id: 3, pollItemName: 'May be', percentage: '15%' },
  ],
}
const Posts: React.FunctionComponent<IPostsProps> = (props) => {
  const [showAddComment, setShowAddComment] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)
  const [comment, setComment] = React.useState('')
  const { post } = props
  return (
    <View style={styles.postsContainer}>
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
        <View style={styles.headerTextContainer}>
          <MyText style={styles.postedBy} fontStyle="bold">
            Joh Leider
          </MyText>
          <MyText style={styles.postedDate}>Doctor</MyText>
        </View>
      </View>
      <View>
        {post.isPollItem ? (
          <Poll poll={poll} />
        ) : (
          <MyText numberOfLines={2} style={styles.postText}>
            Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases
            are type invalid as well
          </MyText>
        )}
      </View>
      <View>
        <PostActionInfo
          setShowComments={(val: boolean) => {
            setShowAddComment(false)
            setShowComments(val)
          }}
        />
        <PostAction
          setShowAddComment={(val: boolean) => {
            setShowComments(false)
            setShowAddComment(val)
          }}
        />
      </View>
      {showAddComment && <AddComment value={comment} onChange={setComment} />}
      {showComments && <Comments comment={comment} setComment={setComment} />}
    </View>
  )
}
const styles = StyleSheet.create({
  headerTextContainer: {
    // marginLeft: 15,
  },
  postedBy: {
    fontSize: 12,
    lineHeight: 15,
    color: ' #171766',
  },
  postedDate: {
    marginTop: 3,
    fontSize: 10,
    lineHeight: 10,
    color: '#171766',
  },
  postsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    marginBottom: 15,
  },
  postText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#000',
  },
})
export default Posts
