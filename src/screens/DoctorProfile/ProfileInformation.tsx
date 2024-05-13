import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import CameraIcon from 'react-native-vector-icons/Entypo'
import { headerColor, primaryColor, textColor } from 'styles/colors'
import { List } from 'react-native-paper'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import MyText from 'components/elements/MyText'
import { fontFamilyType } from 'helpers/constants'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useFocusEffect } from '@react-navigation/native'
import { getDoctorProfile, uploadDoctorProfilePicture } from 'services/doctorprofile'
import { getCurrentUser } from 'services/users/userAuth'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { setDoctorProfile } from 'redux/reducer/drProfileSlice'
import Icon from 'components/elements/Icon'
import { fetchUserAction } from 'redux/actions/drProfileActions'

const ProfileInformation = ({ navigation }: AppProps) => {
  const [expanded, setExpanded] = React.useState(false)
  const [expandedBlock, setExpandedBlock] = React.useState('')
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.drProfile)
  // const handlePress = () => setExpanded(!expanded)

  useFocusEffect(
    React.useCallback(() => {
      navigation?.getParent('LeftDrawer' as any)?.setOptions({ headerShown: true })

      return () => {
        navigation?.getParent('LeftDrawer' as any)?.setOptions({ headerShown: false })
      }
    }, [])
  )

  const navigateTo = (screenName: string) => {
    navigation?.navigate(screenName)
  }

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' })

    if (result?.assets) {
      const formData = new FormData()
      formData.append('profile_picture', {
        uri: result?.assets[0].uri,
        name: result?.assets[0].fileName,
        type: result?.assets[0]?.type,
      })
      const res = await uploadDoctorProfilePicture(formData)
      if (res?.status) {
        dispatch(fetchUserAction())
      }
    }
  }

  // const fetchUser = async () => {
  //   try {
  //     const res = await getCurrentUser()
  //     const profile = await getDoctorProfile()
  //     dispatch(setDoctorProfile({ ...profile?.data?.data, ...res?.data?.data }))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

  const borderLeftStyle = {
    borderLeftColor: primaryColor,
    borderLeftWidth: 5,
  }

  console.log({ profile })
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <MyText style={{ color: '#000' }}>User ID</MyText>
            <MyText style={styles.doctorid}>{profile?.id_number || ''}</MyText>
          </View>
          <View style={styles.avatarContainer}>
            {profile?.profile_picture ? (
              <Image
                source={{
                  uri: profile?.profile_picture,
                }}
                style={styles.profileImage}
              />
            ) : (
              <EvilIcons size={140} name="user" color={textColor} />
            )}
            <TouchableOpacity style={styles.camera} onPress={openGallery}>
              <CameraIcon size={16} name="camera" color="white" />
            </TouchableOpacity>
            <MyText style={styles.userName}>{`Dr ${profile?.first_name || ''} ${
              profile?.last_name
            }`}</MyText>
          </View>
          <View style={styles.profileInfoHeader}>
            <MyText style={{ ...styles.profileInfoContent, textDecorationLine: 'underline' }}>
              {profile?.email}
            </MyText>
            <MyText style={styles.profileInfoContent}>
              {profile?.country_dial_code + '-' + profile?.mobile_number}
            </MyText>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <List.Section title="">
            <List.Accordion
              title="Doctor Profile"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Doctor Profile' ? borderLeftStyle : {}),
              }}
              left={(props) => (
                <Image {...props} source={require('../../assets/images/contact.png')} />
              )}
              // expanded={expanded}
              onPress={() => {
                setExpanded(!expanded)
                setExpandedBlock('Doctor Profile')
              }}
            >
              <List.Item
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  // ...borderLeftStyle,
                  // borderLeftColor: '#030229',
                }}
                titleStyle={styles.itemStyle}
                title="Personal Info"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('ContactBasicInfo')}
              />
              <List.Item
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  // ...borderLeftStyle,
                  // borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                title="Interest"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('Interest')}
              />
            </List.Accordion>

            <List.Accordion
              title="Education & Achievements"
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Education & Achievements'
                  ? borderLeftStyle
                  : {}),
              }}
              titleStyle={styles.titleStyle}
              left={(props) => (
                <Image {...props} source={require('../../assets/images/education.png')} />
              )}
              onPress={() => {
                setExpanded(!expanded)
                setExpandedBlock('Education & Achievements')
              }}
            >
              <List.Item
                title="Basic"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('EducationalInfo')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title={'Postgraduate Qualifications/Specialization/Masters'}
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={{ ...styles.itemStyle }}
                onPress={() => navigateTo('PostgraduateQualifications')}
                right={() => <Icon name="right-arrow" size={14} />}
                titleNumberOfLines={2}
              />
              <List.Item
                title="Fellowships"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('Fellowships')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Other Qualifications"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('OtherQualifications')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Awards & Achievements"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('AwardsAndAchievements')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
            </List.Accordion>

            <List.Accordion
              title="Professional"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Professional' ? borderLeftStyle : {}),
              }}
              left={(props) => (
                <Image {...props} source={require('../../assets/images/professional.png')} />
              )}
              onPress={() => {
                setExpanded(!expanded)
                setExpandedBlock('Professional')
              }}
            >
              <List.Item
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                title="About You"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('AboutYou')}
              />
              <List.Item
                title="Speciality/SubSpeciality"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('specialty')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Experience"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('EducationalInfo')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Membership/Association"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('EducationalInfo')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
            </List.Accordion>

            <List.Accordion
              title="Work"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Education & Achievements'
                  ? borderLeftStyle
                  : {}),
              }}
              left={(props) => (
                <Image {...props} source={require('../../assets/images/work.png')} />
              )}
              onPress={() => navigateTo('Work')}
              children={[]}
            />
          </List.Section>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfileInformation

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.4,
  },
  doctorid: {
    fontWeight: '700',
    color: '#000000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    position: 'absolute',
    backgroundColor: primaryColor,
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderColor: 'white',
    borderWidth: 2,
    left: '55%',
    bottom: 60,
  },
  userName: {
    color: primaryColor,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 30,
  },
  profileInformation: {
    textAlign: 'center',
    fontWeight: '800',
    color: '#303658',
    fontFamily: fontFamilyType['extraBold'],
  },
  bottomContainer: {
    flex: 1,
  },
  accordion: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8FF',
    paddingLeft: 20,
  },
  accordionItem: {
    paddingLeft: 30,
    backgroundColor: '#ffffff',
    // height:60,
    paddingVertical: 15,
  },
  titleStyle: { color: '#171766', fontFamily: fontFamilyType['bold'], fontSize: 14 },
  itemStyle: { fontFamily: fontFamilyType['bold'], color: primaryColor, fontSize: 13 },
  profileInfoHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  profileInfoContent: {
    color: '#B3B3BF',
    fontWeight: '600',
    fontFamily: fontFamilyType['extraBold'],
  },
})
