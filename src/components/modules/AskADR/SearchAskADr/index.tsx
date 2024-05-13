import * as React from 'react'
import { StyleSheet, View, TextInput, Pressable, TouchableWithoutFeedback } from 'react-native'
import RecentSearch from './RecentSearch'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { medicConnectSearchTypes } from 'helpers/constants'

interface ISearchPostProps {
  value: string
  onChange: (text: string) => void
  onSearch: (text: string) => void
  selectedSearchType: string
  setSelectedSearchType: (selected: any) => void
  showSearchTypes: boolean
  setShowSearchTypes: (val: boolean) => void
  placeholder?: string
}

const SearchAskADr: React.FunctionComponent<ISearchPostProps> = (props) => {
  const {
    value,
    onChange,
    onSearch,
    selectedSearchType,
    setSelectedSearchType,
    showSearchTypes,
    setShowSearchTypes,
    placeholder = 'Dr Names, Posts Topics',
  } = props
  const [showRecentList, setShowRecentList] = React.useState(false)
  const onInputFocus = () => {
    setShowRecentList(true)
  }
  const onInputBlur = () => {
    onSearch(value)
  }

  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <TextInput
          onChangeText={onChange}
          value={value}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          placeholder={placeholder}
        />
        <View style={styles.searchIcon}>
          <Icon name="search" size={25} />
        </View>
      </View>

      {/* {showRecentList && <RecentSearch />} */}
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 8,
    //paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom:20
  },
  searchTypeContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#B3B3BF',
    paddingLeft: 8,
    position: 'relative',
    //flex: 1,
  },
  selectedSearch: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    //width: 90,
  },
  searchTypeList: {
    position: 'absolute',
    right: 0,
    top: -20,
    backgroundColor: '#ffffff',
    width: 90,
    //paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
    borderWidth: 0.5,
    borderColor: '#B3B3BF',
    borderRadius: 5,
  },
  searchTypeItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  searchIcon: {
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
    height: 50,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SearchAskADr
