import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface ITopicListProps {}

const topics = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
const TopicList: React.FunctionComponent<ITopicListProps> = (props) => {
  return (
    <View style={styles.topicContainer}>
      {topics.map((topic) => (
        <View style={styles.topicList}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MyText style={{ ...styles.text, color: '#4CC2CB' }} fontStyle="bold">
              Topic: Headache
            </MyText>
            <MyText style={{ ...styles.text, color: '#4CC2CB' }} fontStyle="bold">
              Responded
            </MyText>
          </View>
          <View style={styles.description}>
            <MyText style={{ ...styles.text, color: '#000' }}>
              Descripton: Turns out semicolon-less style is easier and safer in TS because most
              gotcha edge cases are type invalid as well.
            </MyText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <MyText style={{ ...styles.text, color: '#88878A' }} fontStyle="bold">
              Anil Kumar
            </MyText>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <MyText style={{ ...styles.text, color: '#88878A' }}>
                8th Dec, 2022 at 10:38 PM
              </MyText>
              <Pressable onPress={() => {}}>
                <View>
                  <Icon name="chevron-down" size={10} color="#4CC2CB" />
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  topicContainer: {},
  topicList: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 10,
  },
  description: {
    marginTop: 8,
  },
  text: {
    color: '#000',
    fontSize: 10,
    lineHeight: 11,
  },
})

export default TopicList
