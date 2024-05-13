import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Image } from 'react-native'
import { Pressable, StyleSheet, View } from 'react-native'

interface IPostBodyProps {
  post: any
}

const PostBody: React.FunctionComponent<IPostBodyProps> = (props) => {
  const { post } = props
  return (
    <View style={styles.postBodyContainer}>
      <View style={styles.bodyTextContainer}>
        <MyText numberOfLines={2} style={styles.postText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled
        </MyText>
        <Pressable>
          <MyText style={styles.viewMore}>View more</MyText>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.postImage}
          source={{
            uri: 'https://images.unsplash.com/photo-1600091474842-83bb9c05a723?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  postBodyContainer: {
    width: '100%',
    borderBottomColor: '#B3B3BF',
    borderBottomWidth: 0.5,
    //flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bodyTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#000',
  },
  imageContainer: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    minHeight: 350,
    minWidth: 350,
  },
  viewMore: {
    fontSize: 10,
    lineHeight: 12,
    color: '#4CC2CB',
  },
})
export default PostBody
