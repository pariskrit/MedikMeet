import * as React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import ProfileMenu from 'components/modules/profile/ProfileMenu'
import Avatar from 'components/modules/profile/Avatar'
import { flexStyles } from 'styles/flex'
import MyText from 'components/elements/MyText'
import Button from 'components/elements/Button'
import Icon from 'components/elements/Icon'
import { NavigationProp } from '@react-navigation/native'
import { getProfileMenuItems } from 'utils'

interface IProfileProps {
  navigation: NavigationProp<any, any>
}

const Profile: React.FunctionComponent<IProfileProps> = (props) => {
  const { navigation } = props
  const profileMenuItems = getProfileMenuItems(navigation)
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
        {profileMenuItems?.map((x) => (
          <ProfileMenu
            menuTitle={x.title}
            key={x.id}
            hasMenuRightIcon={x.hasMenuRightIcon}
            menuRightText={x.menuRightText}
            disabled={x.disabled}
            onMenuClick={x.onMenuClick}
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
