import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import InputEl from 'components/elements/form/InputEl'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface ICreatePostProps {}
const initialState = {
  title: '',
  description: '',
  uploadImage: [],
  uploadVideo: [],
  tags: [],
  polls: [],
}
const CreatePost: React.FunctionComponent<ICreatePostProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialState)
  const onFormSubmit = () => {}
  return (
    <View>
      <View>
        <InputEl
          multiLine={true}
          numberOfLines={4}
          error={errors.description}
          label={'Write Something'}
          value={formState.description}
          onChangeText={(text: string) => onChange('description', text)}
          borderRadius={10}
          style={{ marginBottom: 0, paddingBottom: 0 }}
          // disabled
        />
      </View>
      <View style={styles.actionContainer}>
        <Pressable>
          <View style={styles.iconContainer}>
            <Icon name="poll" size={20} />
            <MyText style={styles.actionText}>Create Poll</MyText>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.iconContainer}>
            <Icon name="tag" size={20} />
            <MyText style={styles.actionText}>Tag a friend</MyText>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.iconContainer}>
            <Icon name="panaroma" size={20} />
            <MyText style={styles.actionText}>Photo</MyText>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.iconContainer}>
            <Icon name="video-play" size={20} />
            <MyText style={styles.actionText}>Video</MyText>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.iconContainer}>
            <Icon name="edit-property" size={20} />
            <MyText style={styles.actionText}>Write Article</MyText>
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'flex-end',
          marginBottom: 15,
          marginTop: 10,
        }}
      >
        <View
          style={{
            ...styles.btnContainer,
            backgroundColor: '#4CC2CB',
          }}
        >
          <MyText style={{ color: '#ffffff' }}>Post</MyText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -10,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  btnContainer: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
  },
  actionText: {
    fontSize: 8,
    lineHeight: 7,
    color: '#000000',
  },
})
export default CreatePost
