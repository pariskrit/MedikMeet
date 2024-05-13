import TopicList from 'components/modules/Appointment/TopicList'
import Questions from 'components/modules/TeleConnect/Questions'
import SearchPost from 'components/modules/common/Search'
import SearchResult from 'components/modules/common/Search/SearchResult'
import { medicConnectSearchTypes } from 'helpers/constants'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

interface ITeleConnectProps {}

const TeleConnect: React.FunctionComponent<ITeleConnectProps> = (props) => {
  const [searchText, setSearchText] = React.useState('doctor')
  const [showSearchResult, setShowSearchResult] = React.useState(true)
  const [selectedSearchType, setSelectedSearchType] = React.useState(medicConnectSearchTypes[0])
  const [showSearchTypes, setShowSearchTypes] = React.useState(false)
  const onSearch = (val: string) => {
    setShowSearchResult(true)
    setShowSearchTypes(false)
  }
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
      <View style={styles.topBar}>
        <SearchPost
          value={searchText}
          onChange={(text) => setSearchText(text)}
          onSearch={(val) => onSearch(val)}
          selectedSearchType={selectedSearchType.label}
          setSelectedSearchType={setSelectedSearchType}
          showSearchTypes={showSearchTypes}
          setShowSearchTypes={setShowSearchTypes}
        />
      </View>

      {showSearchResult && (
        <SearchResult
          searchType={selectedSearchType.value as string}
          goBack={() => setShowSearchResult(false)}
          showAppointmentBtn
          showTeleConsultBtn
          topicListComponent={<Questions />}
          // onAppointmentClick={() => setShowAppointMentModel(true)}
          // onTeleConnectClick={() => navigation.navigate('TeleConnect')}
        />
      )}

    </View>
  )
}
const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginBottom: 10,
    //zIndex: 100,
  },
})
export default TeleConnect
