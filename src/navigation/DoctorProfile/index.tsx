import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  AboutYouForm,
  AwardsAndAchievements,
  AwardsAndAchievementsForm,
  BasicDegreeForm,
  Confirmation,
  ContactBasicInfoForm,
  EducationInfo,
  Fellowships,
  FellowshipsForm,
  InterestForm,
  OtherQualifications,
  OtherQualificationsForm,
  ProfileInformation,
  QualificationInfo,
  QualificationsForm,
  SpecialtyForm,
  Work,
  WorkForm,
} from 'screens/DoctorProfile'
import ProfileHeader from 'components/modules/Profileheader'
import { useNavigation, useRoute } from '@react-navigation/native'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const DoctorProfile = () => {
  const navigation = useNavigation()

  const goBack = () => {
    navigation.navigate('ProfileMain')
  }
  return (
    <Stack.Navigator initialRouteName="ProfileMain">
      <Stack.Screen
        name="ProfileMain"
        component={ProfileInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactBasicInfo"
        component={ContactBasicInfoForm}
        options={{
          headerTitle: () => <ProfileHeader title="Personal Info" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AboutYou"
        component={AboutYouForm}
        options={{
          headerTitle: () => <ProfileHeader title="About You" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Interest"
        component={InterestForm}
        options={{
          headerTitle: () => <ProfileHeader title="Interest" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="EducationalInfo"
        component={EducationInfo}
        options={{
          headerTitle: () => <ProfileHeader title="Educational Info" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="BasicDegreeForm"
        component={BasicDegreeForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="New Basic Degree"
              onBackPress={() => navigation.navigate('EducationalInfo')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PostgraduateQualifications"
        component={QualificationInfo}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Postgraduate Qualifications/ Specialization"
              onBackPress={goBack}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PostgraduateQualificationsForm"
        component={QualificationsForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title={`New Postgraduate\n Qualifications/specialization/\nMasters`}
              onBackPress={goBack}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Fellowships"
        component={Fellowships}
        options={{
          headerTitle: () => <ProfileHeader title="Fellowships" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="FellowshipsForm"
        component={FellowshipsForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="New Fellowship"
              onBackPress={() => navigation.navigate('Fellowships')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="OtherQualifications"
        component={OtherQualifications}
        options={{
          headerTitle: () => <ProfileHeader title="Other Qualifications" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="OtherQualificationsForm"
        component={OtherQualificationsForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="New Qualification"
              onBackPress={() => navigation.navigate('OtherQualifications')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AwardsAndAchievements"
        component={AwardsAndAchievements}
        options={{
          headerTitle: () => <ProfileHeader title="Awards & Achievements" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AwardsAndAchievementsForm"
        component={AwardsAndAchievementsForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="New Award/Achievement"
              onBackPress={() => navigation.navigate('AwardsAndAchievements')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Work"
        component={Work}
        options={{
          headerTitle: () => <ProfileHeader title="Profile - Work" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="WorkForm"
        component={WorkForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Profile - New Work Place"
              onBackPress={() => navigation.navigate('Work')}
            />
          ),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="confirmation"
        component={Confirmation}
        options={{
          headerTitle: () => <ProfileHeader heading="Confirmation" title="" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="specialty"
        component={SpecialtyForm}
        options={{
          headerTitle: () => (
            <ProfileHeader title="Speciality/SubSpeciality" onBackPress={goBack} />
          ),
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default DoctorProfile
