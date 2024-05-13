import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface ICommentProps {}

const Comment: React.FunctionComponent<ICommentProps> = (props) => {
  return (
    <View style={styles.commentContainer}>
      <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
      <View style={{width:'90%'}}>
        <MyText style={styles.commentByText}>Mohammad Ahmed</MyText>
        <MyText style={styles.commentText}>
          Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases
          are type invalid as well. Turns out
        </MyText>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F7F7F8',
    borderRadius: 7,
    gap: 10,
    paddingHorizontal:10
  },
  commentByText: {
    fontSize: 12,
    lineHeight: 15,
    color:'#000'
  },
  commentText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#B3B3BF',
    marginTop: 5,
    flexWrap:'wrap',
  },
})
export default Comment
