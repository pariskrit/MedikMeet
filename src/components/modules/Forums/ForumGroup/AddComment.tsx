import * as React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface IAddCommentProps {
  value: string
  onChange: (text: string) => void
}

const AddComment: React.FunctionComponent<IAddCommentProps> = (props) => {
  const { value, onChange } = props
  return (
    <View style={styles.addCommentContainer}>
      <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
      <View style={styles.inputContainer}>
        <TextInput onChangeText={onChange} value={value} placeholder="" />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  addCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#B3B3BF',
    borderBottomWidth: 0.5,
    gap: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
  },
})
export default AddComment
