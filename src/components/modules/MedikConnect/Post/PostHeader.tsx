import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface IPostHeaderProps {
  post: any
}

const PostHeader: React.FunctionComponent<IPostHeaderProps> = (props) => {
  const { post } = props
  return (
    <View style={styles.postHeaderContainer}>
      <View style={styles.headerLeftContent}>
        <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
        <View style={styles.headerTextContainer}>
          <MyText style={styles.postedBy} fontStyle="bold">
            Elon Musk
          </MyText>
          <MyText style={styles.postedDate}>8th Dec, 2022 at 10:38 PM</MyText>
        </View>
      </View>
      {post.postedByMe && <MyText style={styles.postedDate}>Posted By Me</MyText>}
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
    justifyContent:'space-between'
  },
  headerLeftContent:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  postedBy: {
    fontSize: 11,
    lineHeight: 15,
  },
  postedDate: {
    marginTop: 5,
    fontSize: 9,
    lineHeight: 9,
    color: '#B3B3BF',
  },
})
export default PostHeader
