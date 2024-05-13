import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface IPostActionHeaderProps {
  post: any
}

const PostActionHeader: React.FunctionComponent<IPostActionHeaderProps> = (props) => {
  const { post } = props
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.headerLeftContent}>
        <Avatar.Image size={25} source={require('assets/images/Logo2.png')} />
        <View style={styles.headerTextContainer}>
          <MyText style={styles.postedBy} fontStyle="bold">
            Ananad Kumar
          </MyText>
          <MyText style={styles.actionInfo}>Likes this post</MyText>
        </View>
      </View>
      <MyText style={styles.postedDate}>8th Dec, 2022 at 10:38 PM</MyText>
    </View>
  )
}
const styles = StyleSheet.create({
  postHeaderContainer: {
    width: '100%',
    borderBottomColor: '#B3B3BF',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    //alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  headerLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    gap: 7,
    alignItems:'center'
  },
  postedBy: {
    fontSize: 10,
    lineHeight: 14,
  },
  postedDate: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 9,
    color: '#B3B3BF',
  },
  actionInfo: {
    fontSize: 8,
    lineHeight: 9,
    color: '#88878A',
  },
})
export default PostActionHeader
