import ButtonEl from 'components/elements/Button'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface IRequestProps {}
const requestList = [
  {
    id: 1,
    image: '',
    name: 'Elon Musk',
    designation: 'General Practitioner',
    status: 'Approve',
  },
  {
    id: 2,
    image: '',
    name: 'Elon Musk',
    designation: 'Orthopedic Dr',
    status: 'Approve',
  },
  {
    id: 3,
    image: '',
    name: 'Elon Musk',
    status: 'Approve',
    designation: '',
  },
  {
    id: 4,
    image: '',
    name: 'Elon Musk',
    status: 'Approve',
    designation: '',
  },
]
const Request: React.FunctionComponent<IRequestProps> = (props) => {
  return (
    <View>
      {requestList.map((follow) => (
        <View style={styles.followList} key={follow.id}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
            <View>
              <MyText style={{ color: '#88878A' }} fontStyle="bold">
                {follow.name}
              </MyText>
              <MyText style={{ color: '#88878A', fontSize: 9 }}>{follow.designation}</MyText>
            </View>
          </View>
          <View style={{ width: 65 }}>
            <MyText style={{ color: '#B3B3BF' }}>
              {follow.status === 'Follower' ? 'Deny' : 'Unfollow'}
            </MyText>
          </View>
          <View
            style={{
              ...styles.statusContainer,
              backgroundColor: '#C2FFCE',
            }}
          >
            <MyText style={{ color: '#02AF23' }}>{follow.status}</MyText>
          </View>
        </View>
      ))}
      <MyText style={{ textAlign: 'center', marginTop: 15 }}>View more...</MyText>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          marginBottom: 15,
          marginTop: 30,
        }}
      >
        <ButtonEl
          onPress={() => {}}
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
          onPress={() => {}}
          style={{ width: '50%' }}
          //btnTextColor={primaryColor}
          paddingHorizontal={0}
        >
          Approve all
        </ButtonEl>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  followList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statusContainer: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
  },
})

export default Request
