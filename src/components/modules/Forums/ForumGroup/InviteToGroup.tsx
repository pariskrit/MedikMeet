import ButtonEl from 'components/elements/Button'
import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import * as React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Avatar, Modal } from 'react-native-paper'

interface IInviteToGroupProps {
  showInviteForm: boolean
  setShowInviteForm: Function
}
const users = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
const windowHeight = Dimensions.get('window').height
const InviteToGroup: React.FunctionComponent<IInviteToGroupProps> = (props) => {
  const { setShowInviteForm, showInviteForm } = props
  return (
    <Modal
      visible={showInviteForm}
      onDismiss={() => setShowInviteForm(false)}
      contentContainerStyle={styles.containerStyle}
    >
      <View style={styles.header}>
        <MyText style={styles.headerText} fontStyle="bold">
          Invite to group
        </MyText>
      </View>
      <View style={styles.body}>
        {users.map((user) => (
          <View style={styles.bodyRow}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} key={user.id}>
              <Avatar.Image size={35} source={require('assets/images/Logo2.png')} />
              <MyText style={styles.userText}>Jason Holder</MyText>
            </View>
            <CheckboxEl
              size={22}
              //checked={formState.requireAdminReview}
              //onPress={() => onChange('requireAdminReview', !formState.requireAdminReview)}
            />
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <ButtonEl
          onPress={() => setShowInviteForm(false)}
          style={{
            width: '28%',
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
          style={{ width: '61%' }}
          //btnTextColor={primaryColor}
          paddingHorizontal={0}
        >
          Make Group Admin
        </ButtonEl>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    //paddingHorizontal: 10,
    borderRadius: 7,
    // maxHeight: windowHeight - 150,
    zIndex: 200,
  },
  header: {
    paddingVertical: 15,
    backgroundColor: '#171766',
    paddingHorizontal: 15,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  body: { paddingVertical: 15, paddingHorizontal: 15 },
  footer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  bodyRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginTop:20 },
  headerText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 17,
  },
  userText: {
    color: '#000',
    fontSize: 11,
    lineHeight: 12,
  },
})

export default InviteToGroup
