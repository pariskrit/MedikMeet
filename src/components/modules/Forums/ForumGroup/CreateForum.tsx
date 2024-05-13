import ButtonEl from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import InputEl from 'components/elements/form/InputEl'
import RadioGroup from 'components/elements/form/RadioGroup'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MediaType, launchImageLibrary } from 'react-native-image-picker'
import { radioGroup } from 'ts/types'

interface ICreateForumProps {
  setShowCreateForum: Function
}
const initialState = {
  groupName: '',
  description: '',
  uploadImage: [],
  visibility: '',
  allowToInvite: false,
  requireAdminReview: false,
}
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
const CreateForum: React.FunctionComponent<ICreateForumProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialState)
  const onFormSubmit = () => {}
  const { setShowCreateForum } = props
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
  return (
    <View style={styles.addForumContainer}>
      <View style={styles.titleContainer}>
        <MyText style={styles.title} fontStyle="bold">
          Create Forum
        </MyText>
      </View>
      <InputEl
        label="Group Name"
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
        {/* <TouchableOpacity onPress={() => openGallery('video')}>
          <View style={{ ...styles.uploadContainer, backgroundColor: '#C3FCCE' }}>
            <Icon name="video" />
            <MyText>Upload Video</MyText>
          </View>
        </TouchableOpacity> */}
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
          label="Visibilty"
          error={errors.topic}
          isRequired={false}
          radioList={visibilityList}
        />
      </View>
      <View>
        <MyText style={styles.permissionText}>Permission</MyText>
        <View style={styles.permissionItem}>
          <CheckboxEl
            size={22}
            checked={formState.allowToInvite}
            onPress={() => onChange('allowToInvite', !formState.allowToInvite)}
          />
          <View>
            <MyText style={styles.permissionItemText}>
              Allow members to invite their connections
            </MyText>
            <MyText style={styles.permissionItemSubText}>
              If disable only admin will be able to invite members to the group
            </MyText>
          </View>
        </View>
        <View style={styles.permissionItem}>
          <CheckboxEl
            size={22}
            checked={formState.requireAdminReview}
            onPress={() => onChange('requireAdminReview', !formState.requireAdminReview)}
          />
          <View>
            <MyText style={styles.permissionItemText}>
              Require new posts to be reviewed by admins
            </MyText>
            <MyText style={styles.permissionItemSubText}>
              If enabled, members’ posts will require admin approval within 14 days before they
              become visible to others.
            </MyText>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 15,
          marginTop: 25,
        }}
      >
        <ButtonEl
          onPress={() => setShowCreateForum(false)}
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
  addForumContainer: {
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
  permissionText: {
    fontSize: 13,
    lineHeight: 15,
    color: '#000',
  },
  permissionItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  permissionItemText: {
    fontSize: 12,
    lineHeight: 14,
    color: '#000',
  },
  permissionItemSubText: {
    fontSize: 9,
    lineHeight: 11,
    color: '#B3B3BF',
  },
})
export default CreateForum
