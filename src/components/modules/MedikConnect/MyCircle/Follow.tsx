import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Dimensions, Pressable, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Modal } from 'react-native-paper'

interface IFollowProps {}
const followList = [
  {
    id: 1,
    image: '',
    name: 'Elon Musk',
    status: 'Follower',
  },
  {
    id: 2,
    image: '',
    name: 'Elon Musk',
    status: 'Following',
  },
  {
    id: 3,
    image: '',
    name: 'Elon Musk',
    status: 'Follower',
  },
  {
    id: 4,
    image: '',
    name: 'Elon Musk',
    status: 'Following',
  },
]
const windowWidth = Dimensions.get('window').width
const Follow: React.FunctionComponent<IFollowProps> = (props) => {
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState('')
  return (
    <View style={{ position: 'relative' }}>
      {followList.map((follow) => (
        <View style={styles.followList} key={follow.id}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
            <MyText style={{ color: '#88878A' }} fontStyle="bold">
              {follow.name}
            </MyText>
          </View>
          <View style={{ width: 65 }}>
            <MyText style={{ color: '#B3B3BF' }}>
              {follow.status === 'Follower' ? 'Deny' : 'Unfollow'}
            </MyText>
          </View>
          <Pressable
            onPress={() => {
              setSelectedUser(follow.name)
              setShowConfirmDialog(true)
            }}
            disabled={follow.status === 'Follower'}
          >
            <View
              style={{
                ...styles.statusContainer,
                backgroundColor: follow.status === 'Follower' ? '#C2FFCE' : '#FFDD8D',
              }}
            >
              <MyText style={{ color: follow.status === 'Follower' ? '#02AF23' : '#C28903' }}>
                {follow.status}
              </MyText>
            </View>
          </Pressable>
        </View>
      ))}
      <MyText style={{ textAlign: 'center', marginTop: 15 }}>View more...</MyText>
      {showConfirmDialog && (
        <View style={styles.modalWrapper}>
          <Modal
            visible={showConfirmDialog}
            onDismiss={() => setShowConfirmDialog(false)}
            contentContainerStyle={styles.containerStyle}
            style={{ backgroundColor: 'transparent' }}
          >
            <View style={styles.confirmText}>
              <MyText>Are you sure you want to unfollow </MyText>
              <MyText style={{ color: '#4CC2CB', fontSize: 14 }}>{selectedUser}</MyText>
              <MyText>?</MyText>
            </View>
            <View style={styles.btnContainer}>
              <Pressable
                onPress={() => {
                  setShowConfirmDialog(false)
                }}
              >
                <View
                  style={{
                    ...styles.statusContainer,
                    backgroundColor: '#FFDD8D',
                  }}
                >
                  <MyText style={{ color: '#C28903' }}>Yes</MyText>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowConfirmDialog(false)
                }}
              >
                <View
                  style={{
                    ...styles.statusContainer,
                    backgroundColor: '#C2FFCE',
                  }}
                >
                  <MyText style={{ color: '#02AF23' }}>No</MyText>
                </View>
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
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
  containerStyle: {
    backgroundColor: '#fff',
    // marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 7,
    height: 200,
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  confirmText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modalWrapper: {
    height: 200,
    width: "100%",
    position:'absolute',
    top:20
    // marginTop:-250
  },
})
export default Follow
