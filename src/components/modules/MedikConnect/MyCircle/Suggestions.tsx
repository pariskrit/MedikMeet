import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface ISuggestionsProps {}
const suggestionList = [
  {
    id: 1,
    image: '',
    name: 'Elon Musk',
    designation: 'General Practitioner',
    practicedPlace: 'Malaysia University',
    status: 'Follow',
  },
  {
    id: 2,
    image: '',
    name: 'Elon Musk',
    designation: 'Orthopedic Dr',
    practicedPlace: 'Orthopedic Interest',
    status: 'Follow',
  },
  {
    id: 3,
    image: '',
    name: 'Elon Musk',
    status: 'Follow',
    designation: '',
    practicedPlace: 'Network',
  },
  {
    id: 4,
    image: '',
    name: 'Elon Musk',
    status: 'Follow',
    designation: '',
    practicedPlace: 'Orthopedic surgeon Forum',
  },
]
const Suggestions: React.FunctionComponent<ISuggestionsProps> = (props) => {
  return (
    <View>
      {suggestionList.map((follow) => (
        <View style={styles.followList} key={follow.id}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
            <View style={{ width: 95 }}>
              <MyText style={{ color: '#88878A' }} fontStyle="bold">
                {follow.name}
              </MyText>
              <MyText style={{ color: '#88878A', fontSize: 9 }}>{follow.designation}</MyText>
            </View>
          </View>
          <View style={{ width: 70 }}>
            <MyText style={{ color: '#B3B3BF', fontSize: 10 }}>
              {follow.practicedPlace}
            </MyText>
          </View>
          <View style={{ width: 65 }}>
            <MyText style={{ color: '#B3B3BF', fontSize: 10 }}>
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
    width: 90,
  },
})

export default Suggestions
