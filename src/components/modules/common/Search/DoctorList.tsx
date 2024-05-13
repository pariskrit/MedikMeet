import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface IDoctorProfileProps {
  showFollowBtn?: boolean
  showTeleConsultBtn?: boolean
  showAppointmentBtn?: boolean
  onFollowClick?: () => void
  onAppointmentClick?: () => void
  onTeleConnectClick?: () => void
}
const docList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
const DoctorList: React.FunctionComponent<IDoctorProfileProps> = (props) => {
  const {
    showTeleConsultBtn,
    showAppointmentBtn,
    showFollowBtn,
    onFollowClick,
    onAppointmentClick,
    onTeleConnectClick,
  } = props
  return (
    <ScrollView>
      <View style={styles.docListContainer}>
        {docList.map((doc) => (
          <View style={styles.docList} key={doc.id}>
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <Avatar.Image size={100} source={require('assets/images/Logo2.png')} />
              <View>
                <MyText style={styles.docName}>Dr. Sarath Pal</MyText>
                <View
                  style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}
                >
                  <Icon name="degree" size={15} />
                  <View>
                    <MyText style={styles.docDetail}>General Physician</MyText>
                    <MyText style={styles.docDetail}>18 years Experience</MyText>
                  </View>
                </View>
                <View
                  style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}
                >
                  <Icon name="pin" size={15} />
                  <MyText style={styles.docDetail}>Segambut, Kuala Lumpur | Chisel Dental</MyText>
                </View>
                <View
                  style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 10 }}
                >
                  <Icon name="certified" size={15} />
                  <MyText style={styles.docDetail}>Medical Registration Verified</MyText>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 15,
              }}
            >
              {showFollowBtn && (
                <Pressable onPress={() => onFollowClick && onFollowClick()}>
                  <View
                    style={{
                      ...styles.statusContainer,
                    }}
                  >
                    <MyText style={{ color: '#ffffff', fontSize: 11 }}>Follow</MyText>
                  </View>
                </Pressable>
              )}
              {showTeleConsultBtn && (
                <Pressable onPress={() => onTeleConnectClick && onTeleConnectClick()}>
                  <View
                    style={{
                      ...styles.statusContainer,
                      width: 109,
                    }}
                  >
                    <MyText style={{ color: '#ffffff', fontSize: 11 }}>Tele-Consult</MyText>
                  </View>
                </Pressable>
              )}
              {showAppointmentBtn && (
                <Pressable onPress={() => onAppointmentClick && onAppointmentClick()}>
                  <View
                    style={{
                      ...styles.statusContainer,
                      width: 118,
                    }}
                  >
                    <MyText style={{ color: '#ffffff', fontSize: 11 }}>Appointment</MyText>
                  </View>
                </Pressable>
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  docListContainer: {
    marginBottom: 60,
  },
  docList: {
    //flexDirection: 'row',
    //alignItems: 'center',
    //justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
  },
  statusContainer: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    backgroundColor: '#4CC2CB',
    marginTop: 10,
  },
  docName: {
    color: '#4CC2CB',
    fontSize: 14,
    lineHeight: 17,
  },
  docDetail: {
    color: '#88878A',
    fontSize: 9,
    lineHeight: 11,
  },
})
export default DoctorList
