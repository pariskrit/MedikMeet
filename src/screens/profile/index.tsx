import * as React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import ProfileMenu from 'components/modules/profile/ProfileMenu'
import Avatar from 'components/modules/profile/Avatar'
import { flexStyles } from 'styles/flex'
import MyText from 'components/elements/MyText'
import Button from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import { NavigationProp } from '@react-navigation/native'

interface IProfileProps {
  navigation: NavigationProp<any, any>
}

const profileMenus = [
  {
    id: 1,
    title: 'Mobile Verification',
    hasMenuRightIcon: true,
  },
  {
    id: 2,
    title: 'Email Verification',
    hasMenuRightIcon: true,
  },
  {
    id: 3,
    title: 'Linked device',
    hasMenuRightIcon: true,
  },
  {
    id: 4,
    title: 'Enable Security',
    hasMenuRightIcon: true,
  },
  {
    id: 5,
    title: 'About SoftManage App',
    hasMenuRightIcon: true,
  },
  {
    id: 6,
    title: 'FAQs',
    hasMenuRightIcon: true,
  },
  {
    id: 7,
    title: 'Terms and Conditions',
    hasMenuRightIcon: true,
  },
  {
    id: 8,
    title: 'Privacy and Policy',
    hasMenuRightIcon: true,
  },
  {
    id: 9,
    title: 'De-Activate Account',
    hasMenuRightIcon: true,
  },
  {
    id: 10,
    title: 'App Version',
    menuRightText: 'V1.00.1',
    hasMenuRightIcon: false,
  },
]
const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const { navigation } = props
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...flexStyles.flex, ...styles.avatarContainer }}>
        <Avatar name={'Narasimha Rao Gummadi'} />
        <MyText style={styles.username} fontStyle="bold">
          Narasimha Rao Gummadi
        </MyText>
        <Button
          hasIcon
          icon={<Icon name="edit" />}
          onPress={() => navigation.navigate('EditProfile', { name: 'EditProfile' })}
          title="Edit Profile"
          iconToLeft
          btnWidth={180}
          color="#EFEFEF"
          btnTextColor="#5669FF"
          btnTextBold={false}
          fontSize={13}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {profileMenus?.map((x) => (
          <ProfileMenu
            menuTitle={x.title}
            key={x.id}
            hasMenuRightIcon={x.hasMenuRightIcon}
            menuRightText={x.menuRightText}
          />
        ))}
      </ScrollView>
      <View style={{ ...flexStyles.flex, marginBottom: 20 }}>
        <Button
          hasIcon
          icon={<Icon name="logout" />}
          onPress={() => {}}
          title="Sign Out"
          iconToLeft
          btnWidth={180}
          color="#EFEFEF"
          btnTextColor="#5669FF"
          btnTextBold={false}
          fontSize={13}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 42,
  },
  avatarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  username: {
    paddingVertical: 20,
    color: '#000',
  },
})

export default Profile
