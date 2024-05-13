import { NavigationProp } from '@react-navigation/native'
import MyText from 'components/elements/MyText'
import Dropdown from 'components/elements/form/Dropdown'
import AppointmentRequest from 'components/modules/Appointment/AppointmentRequest'
import DoctorSearch from 'components/modules/Appointment/DoctorSearch'
import PatientInformation from 'components/modules/Appointment/PatientInformation'
import Slot from 'components/modules/Appointment/Slot'
import TopicList from 'components/modules/Appointment/TopicList'
import SearchResult from 'components/modules/common/Search/SearchResult'
import { appointmentSearchTypes } from 'helpers/constants'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Modal } from 'react-native-paper'

interface IAppointmentProps {
  navigation: NavigationProp<any, any>
}
const initialFormState = {
  doctorType: 'male',
  speciality: '',
  subSpeciality: '',
  sorting: '',
}

const Appointment: React.FunctionComponent<IAppointmentProps> = (props) => {
  const { navigation } = props
  const [searchText, setSearchText] = React.useState('')
  const [showAddPost, setShowAddPost] = React.useState(false)
  const [showMyCircle, setShowMyCircle] = React.useState(false)
  const [showSearchResult, setShowSearchResult] = React.useState(true)
  const [selectedSearchType, setSelectedSearchType] = React.useState(appointmentSearchTypes[0])
  const [showSearchTypes, setShowSearchTypes] = React.useState(false)
  const onSearch = (val: string) => {
    setShowMyCircle(false)
    setShowAddPost(false)
    setShowSearchResult(true)
    setShowSearchTypes(false)
  }
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialFormState)
  const [selectedStep, setSelectedStep] = React.useState(1)
  const [showAppointMentModel, setShowAppointMentModel] = React.useState(false)
  return (
    <View style={styles.appointmentContainer}>
      <View style={{ ...styles.topBar, zIndex: showAddPost ? 0 : 100 }}>
        <DoctorSearch
          value={searchText}
          onSearchChange={(text) => setSearchText(text)}
          onSearch={(val) => onSearch(val)}
          selectedSearchType={selectedSearchType.label}
          setSelectedSearchType={setSelectedSearchType}
          showSearchTypes={showSearchTypes}
          setShowSearchTypes={setShowSearchTypes}
        />
        {/* <View style={styles.iconContainer}>
          <Pressable
            onPress={() => {
              setShowMyCircle(true)
              setShowAddPost(false)
              setShowSearchResult(false)
              setShowSearchTypes(false)
            }}
          >
            <Icon name="users" size={25} color="#4CC2CB" />
          </Pressable>
          <Pressable
            onPress={() => {
              setShowMyCircle(false)
              setShowAddPost(true)
              setShowSearchResult(false)
              setShowSearchTypes(false)
            }}
          >
            <Icon name="add-circle" size={25} />
          </Pressable>
        </View> */}
      </View>
        {showSearchResult && (
          <SearchResult
            searchType={selectedSearchType.value as string}
            goBack={() => setShowSearchResult(false)}
            showAppointmentBtn
            showTeleConsultBtn
            topicListComponent={<TopicList />}
            onAppointmentClick={() => setShowAppointMentModel(true)}
            onTeleConnectClick={() => navigation.navigate('TeleConnect')}
          />
        )}
      <Modal
        visible={showSearchTypes}
        onDismiss={() => setShowSearchTypes(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <View>
          <View>
            <MyText style={styles.filterTitle}>Filter</MyText>
          </View>
          <View style={{ marginTop: 10 }}>
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              <Pressable
                onPress={() => onChange('doctorType', 'male')}
                style={{
                  ...styles.btnContainer,
                  flex: 1,
                  backgroundColor: formState['doctorType'] === 'male' ? '#171766' : '#ffffff',
                  borderWidth: 1,
                  borderColor: '#B3B3BF',
                }}
              >
                <View>
                  <MyText
                    style={{ color: formState['doctorType'] === 'male' ? '#ffffff' : '#B3B3BF' }}
                  >
                    Male Doctor
                  </MyText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => onChange('doctorType', 'female')}
                style={{
                  ...styles.btnContainer,
                  flex: 1,
                  backgroundColor: formState['doctorType'] === 'female' ? '#171766' : '#ffffff',
                  borderWidth: 1,
                  borderColor: '#B3B3BF',
                }}
              >
                <View>
                  <MyText
                    style={{ color: formState['doctorType'] === 'female' ? '#ffffff' : '#B3B3BF' }}
                  >
                    Female Doctor
                  </MyText>
                </View>
              </Pressable>
            </View>

            <Dropdown
              value={formState['speciality']}
              items={[
                { label: 'Surgeon', value: 'Surgeon' },
                { label: 'Physio', value: 'Physio' },
              ]}
              error={errors['speciality']}
              placeholder="Speciality"
              setValue={(value: string) => onChange('speciality', value)}
              zIndex={200}
            />
            <Dropdown
              value={formState['subSpeciality']}
              items={[
                { label: 'Surgeon', value: 'Surgeon' },
                { label: 'Physio', value: 'Physio' },
              ]}
              error={errors['subSpeciality']}
              placeholder="Sub Speciality"
              setValue={(value: string) => onChange('subSpeciality', value)}
              zIndex={100}
            />
            <Dropdown
              value={formState['sorting']}
              items={[
                { label: 'Value1', value: 'Value1' },
                { label: 'Value2', value: 'Value2' },
              ]}
              error={errors['sorting']}
              placeholder="Sorting"
              setValue={(value: string) => onChange('sorting', value)}
              zIndex={99}
            />

            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
              <Pressable
                style={{
                  ...styles.btnContainer,
                  width: 118,
                  backgroundColor: '#ffffff',
                  borderWidth: 1,
                  borderColor: '#B3B3BF',
                }}
                onPress={() => setShowSearchTypes(false)}
              >
                <MyText style={{ color: '#B3B3BF', fontSize: 12 }}>Cancel</MyText>
              </Pressable>
              <Pressable
                style={{
                  ...styles.btnContainer,
                  width: 135,
                }}
              >
                <MyText style={{ color: '#ffffff', fontSize: 12 }}>Search Doctors</MyText>
              </Pressable>
            </View>
          </View>
          <View></View>
        </View>
      </Modal>
      <Modal
        visible={showAppointMentModel}
        onDismiss={() => setShowAppointMentModel(false)}
        contentContainerStyle={styles.containerStyle}
      >
        {selectedStep === 1 ? (
          <Slot />
        ) : selectedStep === 2 ? (
          <PatientInformation />
        ) : (
          <AppointmentRequest />
        )}
        <View style={styles.footer}>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              paddingVertical: 12,
              borderColor: '#B3B3BF',
              borderWidth: 1,
              backgroundColor: 'transparent',
              borderRadius: 100,
            }}
            onPress={() => {
              selectedStep > 1 && setSelectedStep(selectedStep - 1)
            }}
          >
            <MyText style={{ color: '#B3B3BF', fontSize: 12 }}>Back</MyText>
          </Pressable>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              backgroundColor: '#171766',
              paddingVertical: 12,
              borderRadius: 100,
            }}
            onPress={() => {
              selectedStep < 3 && setSelectedStep(selectedStep + 1)
            }}
          >
            <MyText style={{ color: '#ffffff', fontSize: 12 }}>Next</MyText>
          </Pressable>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  appointmentContainer: {
    paddingHorizontal: 15,
    //paddingVertical: 10,
    //marginBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 20,
    //zIndex: 100,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: 10,
    alignItems: 'center',
    //backgroundColor:'red'
  },
  containerStyle: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 7,
    zIndex: 250,
  },
  btnContainer: {
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    backgroundColor: '#171766',
    marginTop: 10,
  },
  filterTitle: {
    fontSize: 20,
    lineHeight: 30,
    color: '#000',
  },
  footer: {
    paddingBottom: 10,
    flexDirection: 'row',
    gap: 20,
  },
})
export default Appointment
