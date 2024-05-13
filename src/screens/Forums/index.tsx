import ForumGroup from 'components/modules/Forums/ForumGroup'
import CreateForum from 'components/modules/Forums/ForumGroup/CreateForum'
import InviteToGroup from 'components/modules/Forums/ForumGroup/InviteToGroup'
import * as React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { Modal } from 'react-native-paper'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import SearchPost from 'components/modules/common/Search'
import ForumItem from 'components/modules/Forum/ForumItem'

interface IForumsProps {}
const windowHeight = Dimensions.get('window').height

const Forums: React.FunctionComponent<IForumsProps> = (props) => {
  const [showCreateForum, setShowCreateForum] = React.useState(false)
  const [showInviteForm, setShowInviteForm] = React.useState(true)
  const [searchText, setSearchText] = React.useState('')

  const [selectedSearchType, setSelectedSearchType] = React.useState('')
  const [showSearchTypes, setShowSearchTypes] = React.useState(false)

  const onSearch = (val: string) => {
    setShowSearchTypes(false)
  }
  return (
    <View>
      <KeyboardDismiss>
        <View style={styles.postContainer}>
          <View style={styles.topBar}>
            <SearchPost
              value={searchText}
              onChange={(text) => setSearchText(text)}
              onSearch={(val) => onSearch(val)}
              selectedSearchType={''}
              setSelectedSearchType={setSelectedSearchType}
              showSearchTypes={showSearchTypes}
              setShowSearchTypes={setShowSearchTypes}
              placeholder=""
            />
          </View>
          <View>
            <ForumItem />
            <ForumItem />
            <ForumItem />
            <ForumItem />
          </View>
        </View>
      </KeyboardDismiss>
      <ForumGroup />
      <Modal
        visible={showCreateForum}
        onDismiss={() => setShowCreateForum(false)}
        contentContainerStyle={styles.containerStyle}
      >
        <ScrollView nestedScrollEnabled>
          <CreateForum setShowCreateForum={setShowCreateForum} />
        </ScrollView>
      </Modal>

      <InviteToGroup showInviteForm={showInviteForm} setShowInviteForm={setShowInviteForm} />
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 70,
  },
  topBar: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 20,
    zIndex: 100,
  },
  containerStyle: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 7,
    maxHeight: windowHeight - 150,
    zIndex: 200,
  },
})

export default Forums
