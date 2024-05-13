import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostActionInfo from './PostActionInfo'
import PostAction from './PostAction'
import AddComment from './AddComment'
import Comments from './Comments'
import PostActionHeader from './PostActionHeader'

interface IPostProps {}

const posts = [
  { id: 1, postedByMe: false },
  { id: 2, postedByMe: true, isActionPost: true },
  { id: 3, postedBYMe: false },
]
const Post: React.FunctionComponent<IPostProps> = (props) => {
  const [comment, setComment] = React.useState('')
  const [showAddComment, setShowAddComment] = React.useState(false)
  const [showComments, setShowComments] = React.useState(false)
  return (
    <View style={styles.postsContainer}>
      {posts.map((post) => (
        <View style={styles.postContainer} key={post.id}>
          {post.isActionPost && <PostActionHeader post={post} />}
          <PostHeader post={post} />
          <PostBody post={post} />
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
          {showAddComment && <AddComment value={comment} onChange={setComment} />}
          {showComments && <Comments comment={comment} setComment={setComment} />}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  postsContainer: {},
})
export default Post
