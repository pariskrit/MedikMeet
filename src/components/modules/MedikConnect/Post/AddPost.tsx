import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import InputEl from 'components/elements/form/InputEl'
import RadioGroup from 'components/elements/form/RadioGroup'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { MediaType, launchImageLibrary } from 'react-native-image-picker'
import { primaryColor } from 'styles/colors'
import { formStyles } from 'styles/form'
import { radioGroup } from 'ts/types'

interface IAddPostProps {
  setShowAddPost: Function
}

const initialState = {
  title: '',
  description: '',
  uploadImage: [],
  uploadVideo: [],
  topic: '',
  visibility: '',
}
const topicList: radioGroup[] = [
  {
    id: 1,
    value: 'general',
    label: 'General',
  },
  {
    id: 2,
    value: 'educational',
    label: 'Educational',
  },
]
const visibilityList: radioGroup[] = [
  {
    id: 1,
    value: 'followers',
    label: 'Followers',
  },
  {
    id: 2,
    value: 'everyone',
    label: 'Everyone',
  },
]
const onFormSubmit = () => {}
const AddPost: React.FunctionComponent<IAddPostProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialState)
  const { setShowAddPost } = props
  const openGallery = async (mediaType: MediaType) => {
    const result = await launchImageLibrary({ mediaType: mediaType, selectionLimit: 10 })

    if (result?.assets) {
      onChange(mediaType === 'photo' ? 'uploadImage' : 'uploadVideo', result.assets)
    }
  }
  const removeImageVideo = (file: any, mediaType: MediaType) => {
    if (mediaType === 'photo') {
      const images = formState.uploadImage?.filter((x: any) => x.fileName !== file.fileName)
      console.log('images', images)
      onChange('uploadImage', images)
      setFormState({ ...formState, uploadImage: images })
    } else if (mediaType === 'video') {
      const videos = formState.uploadVideo?.filter((x: any) => x.fileName !== file.fileName)
      onChange('uploadVideo', videos)
    }
  }
  console.log('formState', formState)
  return (
    <View style={styles.addPostContainer}>
      <View style={styles.titleContainer}>
        <MyText style={styles.title} fontStyle="bold">
          Create New Post
        </MyText>
      </View>
      <InputEl
        label="Title"
        error={errors.title}
        value={formState.title}
        onChangeText={(text: string) => onChange('title', text)}
        isRequired
      />
      <InputEl
        multiLine={true}
        numberOfLines={5}
        error={errors.description}
        label={'Description'}
        value={formState.description}
        onChangeText={(text: string) => onChange('description', text)}
        borderRadius={10}
        // disabled
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => openGallery('photo')}>
          <View style={{ ...styles.uploadContainer, backgroundColor: '#FFEEBC' }}>
            <Icon name="image" />
            <MyText>Upload Image</MyText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openGallery('video')}>
          <View style={{ ...styles.uploadContainer, backgroundColor: '#C3FCCE' }}>
            <Icon name="video" />
            <MyText>Upload Video</MyText>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal>
        <View style={styles.imageViewContainer}>
          {formState?.uploadImage?.map((x: any) => (
            <View style={styles.imageContainer} key={x.fileName}>
              <Image
                key={x.uri}
                source={{ uri: x.uri }}
                style={{ width: 100, height: 90, resizeMode: 'cover', borderRadius: 7 }}
              />
              <Pressable onPress={() => removeImageVideo(x, 'photo')}>
                <View style={styles.closeIcon}>
                  <Icon name="cross" size={18} color="#ffffff" />
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <View>
        <RadioGroup
          value={formState.topic}
          setValue={(text: string) => onChange('topic', text)}
          label="Topic"
          error={errors.topic}
          isRequired={false}
          radioList={topicList}
        />
      </View>
      <View>
        <RadioGroup
          value={formState.topic}
          setValue={(text: string) => onChange('topic', text)}
          label="Visibilty"
          error={errors.topic}
          isRequired={false}
          radioList={visibilityList}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 15,
          marginTop: 10,
        }}
      >
        <ButtonEl
          onPress={() => setShowAddPost(false)}
          style={{
            width: '50%',
            backgroundColor: '#FFFFFF',
            borderColor: '#00000033',
            borderWidth: 1,
          }}
          btnTextColor={'#B3B3BF'}
          paddingHorizontal={0}
        >
          Cancel
        </ButtonEl>
        <ButtonEl
          onPress={onFormSubmit}
          style={{ width: '50%' }}
          //btnTextColor={primaryColor}
          paddingHorizontal={0}
        >
          Publish Post
        </ButtonEl>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  addPostContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleContainer: {
    marginBottom: 15,
  },
  uploadContainer: {
    flexDirection: 'row',
    gap: 5,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    lineHeight: 17,
    color: '#4CC2CB',
  },
  imageViewContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
    gap: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    gap: 5,
    position: 'relative',
  },
  closeIcon: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#2f3337',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 5,
  },
})

export default AddPost
