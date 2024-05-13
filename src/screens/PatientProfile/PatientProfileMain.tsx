import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import CameraIcon from 'react-native-vector-icons/Entypo'
import { primaryColor, textColor } from 'styles/colors'
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
import { uploadPatientProfilePicture } from 'services/patientprofile'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'

const PatientProfileMain = ({ navigation }: AppProps) => {
  const [expanded, setExpanded] = React.useState(false)
  const [expandedBlock, setExpandedBlock] = React.useState('')
  const dispatch = useAppDispatch()
  const { profile } = useAppSelector((state) => state.patientProfile)
  // const handlePress = () => setExpanded(!expanded)

  useFocusEffect(
    React.useCallback(() => {
      navigation?.getParent('LeftDrawer' as never)?.setOptions({ headerShown: true })

      return () => {
        navigation?.getParent('LeftDrawer' as never)?.setOptions({ headerShown: false })
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
      const res = await uploadPatientProfilePicture(formData)

      if (res.status)
        dispatch(
          updatePatientProfileDetails({ ...profile, profile_picture: result?.assets[0].uri })
        )
    }
  }

  const borderLeftStyle = {
    borderLeftColor: primaryColor,
    borderLeftWidth: 5,
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.topContainer}>
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <MyText>User ID</MyText>
            <MyText style={styles.doctorid}>C123456789</MyText>
          </View>
          <View style={styles.avatarContainer}>
            {profile?.profile_picture ? (
              // {false ? (
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
            <MyText style={styles.userName}>Dr TJ</MyText>
          </View>
          <View style={styles.emailNumber}>
            <Text style={styles.emailText}>kin@mailsac.com</Text>
            <Text style={styles.numberText}>+60-111111</Text>
          </View>
          {/* <MyText style={styles.profileInformation}>Profile Information</MyText> */}
        </View>
        <View style={styles.bottomContainer}>
          <List.Section title="">
            <List.Accordion
              title="Profile Information"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                paddingLeft: 30,
                ...(expanded && expandedBlock === 'Contact & Basic Info' ? borderLeftStyle : {}),
              }}
              left={(props) => <Icon name="contact" size={30} />}
              // expanded={expanded}
              // onPress={handlePress}
              onPress={() => {
                setExpanded(!expanded)
                setExpandedBlock('Contact & Basic Info')
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
                title="Personal Information"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('ContactInfoForm')}
              />
              {/* <List.Item
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  // ...borderLeftStyle,
                  // borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                title="Basic Info"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('BasicInfoForm')}
              /> */}
              <List.Item
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  // ...borderLeftStyle,
                  // borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                title="Interests"
                right={() => <Icon name="right-arrow" size={14} />}
                onPress={() => navigateTo('InterestsForm')}
              />
            </List.Accordion>

            <List.Accordion
              title="General Health History"
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'General Health History' ? borderLeftStyle : {}),
              }}
              titleStyle={styles.titleStyle}
              left={(props) => <Icon name="health-history" size={44} />}
              onPress={() => navigateTo('GeneralHealthHistory')}
            >
              {/* <List.Item
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
              /> */}
            </List.Accordion>
            <List.Accordion
              title="Specific Health History"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Specific Health History' ? borderLeftStyle : {}),
              }}
              left={(props) => <Icon name="health-history" size={44} />}
              onPress={() => {
                setExpanded(!expanded)
                setExpandedBlock('Specific Health History')
              }}
            >
              <List.Item
                title="Health History"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('HealthHistory')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Social History"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('SocialHistory')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
              <List.Item
                title="Family Health History"
                style={{
                  ...styles.accordion,
                  ...styles.accordionItem,
                  ...borderLeftStyle,
                  borderLeftColor: 'transparent',
                }}
                titleStyle={styles.itemStyle}
                onPress={() => navigateTo('FamilyHealthHistory')}
                right={() => <Icon name="right-arrow" size={14} />}
              />
            </List.Accordion>
            <List.Accordion
              title="Medical Documents"
              titleStyle={styles.titleStyle}
              style={{
                ...styles.accordion,
                ...(expanded && expandedBlock === 'Medical Documents' ? borderLeftStyle : {}),
              }}
              left={(props) => <Icon name="medical-document" size={44} />}
              onPress={() => navigateTo('MedicalDocuments')}
              children={[]}
            />
          </List.Section>
        </View>
      </ScrollView>
    </View>
  )
}

export default PatientProfileMain

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.4,
  },
  doctorid: {
    fontWeight: '700',
    color: 'black',
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
  emailNumber: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  emailText:{
    color:'#B3B3BF',
    textDecorationLine:'underline'
  },
  numberText:{
    color:'#B3B3BF',

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
})
