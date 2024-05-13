import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'

interface ITopicsListProps {}
const topicList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
const TopicsList: React.FunctionComponent<ITopicsListProps> = (props) => {
  return (
    <View style={styles.topicListContainer}>
      {topicList.map((topic) => (
        <View style={styles.topicList} key={topic.id}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <MyText style={styles.topicName} fontStyle="bold">
              Herbal Care/ Health/ Beauty Tips
            </MyText>
            <MyText style={styles.topicDetail}>Posted by</MyText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 8 }}>
            <Avatar.Image size={30} source={require('assets/images/Logo2.png')} />
            <View style={{ flex: 1 }}>
              <MyText style={styles.docName}>Dr. Sarath Pal</MyText>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginTop: 5,
                  justifyContent: 'space-between',
                }}
              >
                <MyText style={styles.topicDetail}>18 years Experience</MyText>
                <MyText style={styles.topicDetail}>Posted On: 2hrs ago</MyText>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  topicListContainer: {
    marginBottom: 60,
  },
  topicList: {
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
    textDecorationLine: 'underline',
  },
  topicDetail: {
    color: '#88878A',
    fontSize: 9,
    lineHeight: 11,
  },
  topicName: {
    fontSize: 14,
    lineHeight: 17,
    color: '#171766',
  },
})
export default TopicsList
