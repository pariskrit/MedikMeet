import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import CreatePost from './CreatePost'
import Posts from './Posts'
import { ScrollView } from 'react-native-gesture-handler'
import Poll from './Poll'

interface IForumGroupProps {}

const ForumGroup: React.FunctionComponent<IForumGroupProps> = (props) => {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3, isPollItem: true }]

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <View style={styles.postHeaderContainer}>
          <MyText style={{ color: '#000' }}>Create Post</MyText>
        </View>
        <View style={styles.postBodyContainer}>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
            <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
            <View style={styles.headerTextContainer}>
              <MyText style={styles.postedBy} fontStyle="bold">
                Joh Leider
              </MyText>
              <MyText style={styles.postedDate}>Doctor</MyText>
            </View>
          </View>
          <CreatePost />
        </View>
      </View>
      <View style={styles.postsListContainer}>
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: 10,
    borderColor: '#FAFAFA',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  postsListContainer: {
    marginHorizontal: 10,
    borderColor: '#FAFAFA',
    borderWidth: 1,
    marginBottom: 10,
  },
  postHeaderContainer: {
    width: '100%',
    borderBottomColor: '#E5E8FF',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  postBodyContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    // marginLeft: 15,
  },
  postedBy: {
    fontSize: 12,
    lineHeight: 15,
    color: '#171766',
  },
  postedDate: {
    marginTop: 3,
    fontSize: 10,
    lineHeight: 10,
    color: '#171766',
  },
})
export default ForumGroup
