import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { QuestionAnswer, SearchAskADr } from 'components/modules/AskADR'
import MyCircle from 'components/modules/MedikConnect/MyCircle'
import Post from 'components/modules/MedikConnect/Post'
import AddPost from 'components/modules/MedikConnect/Post/AddPost'
import SearchResult from 'components/modules/common/Search/SearchResult'
import { medicConnectSearchTypes, medicPostTypes } from 'helpers/constants'
import * as React from 'react'
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Modal } from 'react-native-paper'

interface IMedikConnectProps {}
const windowHeight = Dimensions.get('window').height
const AskADr: React.FunctionComponent<IMedikConnectProps> = (props) => {
  const [searchText, setSearchText] = React.useState('')
  const [showAddPost, setShowAddPost] = React.useState(false)
  const [showMyCircle, setShowMyCircle] = React.useState(false)
  const [showSearchResult, setShowSearchResult] = React.useState(false)
  const [selectedSearchType, setSelectedSearchType] = React.useState(medicConnectSearchTypes[0])
  const [showSearchTypes, setShowSearchTypes] = React.useState(false)
  const [showPostTypes, setShowPostTypes] = React.useState(false)
  const [selectedPostType, setSelectedPostTypes] = React.useState(medicPostTypes[0])
  const onSearch = (val: string) => {
    setShowMyCircle(false)
    setShowAddPost(false)
    setShowSearchResult(true)
    setShowSearchTypes(false)
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowSearchTypes(false)
        setShowPostTypes(false)
      }}
    >
      <View style={styles.postContainer}>
        <View style={{ ...styles.topBar, zIndex: showAddPost ? 0 : 100 }}>
          <SearchAskADr
            value={searchText}
            onChange={(text) => setSearchText(text)}
            onSearch={(val) => onSearch(val)}
            selectedSearchType={selectedSearchType.label}
            setSelectedSearchType={setSelectedSearchType}
            showSearchTypes={showSearchTypes}
            setShowSearchTypes={setShowSearchTypes}
            placeholder="Search with Tags..."
          />
          <View style={styles.iconContainer}>
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
          </View>
        </View>
        <QuestionAnswer />
        {/* {!showMyCircle && !showSearchResult && (
          <ScrollView>
            <Pressable
              onStartShouldSetResponder={() => true}
              onPress={() => {
                setShowSearchTypes(false)
                setShowPostTypes(false)
              }}
            >
              <Post />
            </Pressable>
          </ScrollView>
        )} */}
        <Modal
          visible={showAddPost}
          onDismiss={() => setShowAddPost(false)}
          contentContainerStyle={styles.containerStyle}
        >
          <ScrollView nestedScrollEnabled>
            <AddPost setShowAddPost={setShowAddPost} />
          </ScrollView>
        </Modal>
        {showMyCircle && <MyCircle goBack={() => setShowMyCircle(false)} />}
        {showSearchResult && (
          <SearchResult
            searchType={selectedSearchType.value as string}
            goBack={() => setShowSearchResult(false)}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 20,
    //zIndex: 100,
  },
  postContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 70,
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
    paddingHorizontal: 10,
    borderRadius: 7,
    maxHeight: windowHeight - 150,
    zIndex: 200,
  },
  postTypeList: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#ffffff',
    width: 130,
    //paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
    borderWidth: 0.5,
    borderColor: '#B3B3BF',
    borderRadius: 5,
    zIndex: 100,
  },
  postTypeItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
})

export default AskADr
