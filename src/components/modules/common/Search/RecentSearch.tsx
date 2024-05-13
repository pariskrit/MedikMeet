import MyText from 'components/elements/MyText'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

interface ISearchPostProps {}
const recentSearches = [
  { id: 1, text: 'searchText1' },
  { id: 2, text: 'searchText2' },
  { id: 3, text: 'searchText3' },
  { id: 4, text: 'searchText4' },
  { id: 5, text: 'searchText5' },
]
const RecentSearch: React.FunctionComponent<ISearchPostProps> = (props) => {
  return (
    <View style={styles.recentSearchContainer}>
      {recentSearches?.map((search) => {
        return (
          <View key={search.id} style={styles.recentSearchList}>
            <MyText>{search.text}</MyText>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  recentSearchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  recentSearchList: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
})
export default RecentSearch
