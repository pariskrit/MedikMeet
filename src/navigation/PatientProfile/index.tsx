import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  BasicInfoForm,
  Confirmation,
  ContactInfoForm,
  GeneralHealthHistory,
  GeneralHealthHistoryForm,
  HealthHistory,
  InterestForm,
  MedicalDocuments,
  MedicalDocumentsForm,
} from 'screens/PatientProfile'
import ProfileHeader from 'components/modules/Profileheader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { PatientProfileMain } from 'screens/PatientProfile'
import HeaderWithTabs from 'components/modules/HeaderWithTabs'
import {
  AllergyForm,
  AllergyHistory,
  ContraceptiveHistoryForm,
  DeathHistoryForm,
  FamilyHealthHistory,
  FamilyMedicalForm,
  HospitalAdmissionHistoryForm,
  MedicalHistoryForm,
  MedicineForm,
  PregnancyHistory,
  PregnancyHistoryForm,
  SocialHistory,
  SurgicalForm,
  TraditionalMedicationForm,
} from 'screens/PatientProfile/SpecificHealthHistory'

const Stack = createNativeStackNavigator()
// do not use default Text component directly use MyText component instead
const PatientProfile = () => {
  const navigation = useNavigation()

  const goBack = () => {
    navigation.navigate('PatientProfileMain')
  }
  return (
    <Stack.Navigator initialRouteName="PatientProfileMain">
      <Stack.Screen
        name="PatientProfileMain"
        component={PatientProfileMain}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactInfoForm"
        component={ContactInfoForm}
        options={{
          headerTitle: () => <ProfileHeader title="Contact Info" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="BasicInfoForm"
        component={BasicInfoForm}
        options={{
          headerTitle: () => <ProfileHeader title="Basic Info" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="InterestsForm"
        component={InterestForm}
        options={{
          headerTitle: () => <ProfileHeader title="Interests" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="GeneralHealthHistory"
        component={GeneralHealthHistory}
        options={{
          headerTitle: () => <ProfileHeader title="General Health History" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="GeneralHealthHistoryForm"
        component={GeneralHealthHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Health Details"
              onBackPress={() => navigation.navigate('GeneralHealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="HealthHistory"
        component={HealthHistory}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MedicalHistoryForm"
        component={MedicalHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Medical History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="SurgicalForm"
        component={SurgicalForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Surgical History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="HospitalAdmissionHistoryForm"
        component={HospitalAdmissionHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Hospital Admission History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MedicineForm"
        component={MedicineForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Medicine"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="TraditionalMedicationForm"
        component={TraditionalMedicationForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Traditional Medication"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AllergyHistory"
        component={AllergyHistory}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Allergy History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="AllergyForm"
        component={AllergyForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Allergy History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PregnancyHistory"
        component={PregnancyHistory}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Pregnancy History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="PregnancyHistoryForm"
        component={PregnancyHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Pregnancy History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ContraceptiveHistoryForm"
        component={ContraceptiveHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Contraceptive History"
              onBackPress={() => navigation.navigate('HealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="SocialHistory"
        component={SocialHistory}
        options={{
          headerShown: false,

          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="FamilyHealthHistory"
        component={FamilyHealthHistory}
        options={{
          headerShown: false,

          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="FamilyMedicalForm"
        component={FamilyMedicalForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Family Medical/Surgical History"
              onBackPress={() => navigation.navigate('FamilyHealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="DeathHistoryForm"
        component={DeathHistoryForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Add Death History"
              onBackPress={() => navigation.navigate('FamilyHealthHistory')}
            />
          ),
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MedicalDocuments"
        component={MedicalDocuments}
        options={{
          headerTitle: () => <ProfileHeader title="Medical Documents" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MedicalDocumentsForm"
        component={MedicalDocumentsForm}
        options={{
          headerTitle: () => (
            <ProfileHeader
              title="Medical Documents"
              onBackPress={() => navigation.navigate('MedicalDocuments')}
            />
          ),
          headerBackVisible: false,
        }}
      />

      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          headerTitle: () => <ProfileHeader heading="Confirmation" title="" onBackPress={goBack} />,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default PatientProfile
