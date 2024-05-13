import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { flexStyles } from 'styles/flex'

interface IQuestionsProps {}

const topics = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 0 },
  { id: 10 },
  { id: 811 },
  { id: 82 },
  { id: 822 },
  { id: 824 },
  { id: 826 },
  { id: 827 },
]
const Questions: React.FunctionComponent<IQuestionsProps> = (props) => {
  const [expandedQuestions, setExpandedQuestions] = React.useState<Array<number>>([])
  const [moreTextQuestions, setMoreQuestions] = React.useState<Array<number>>([])
  const onExpand = (id: number) => {
    const isExpanded = expandedQuestions.includes(id)
    if (isExpanded) {
      setExpandedQuestions(expandedQuestions.filter((x) => x !== id))
    } else {
      setExpandedQuestions([...expandedQuestions, id])
    }
  }
  const onTextLayout =(e: any, id: number) => {
    if (e.nativeEvent.lines.length > 2) setMoreQuestions([...moreTextQuestions, id])
  }
  return (
    <ScrollView>
      <View style={styles.questionsContainer}>
        {topics?.map((x) => (
          <View style={styles.questionContainer} key={x.id}>
            <View style={styles.header}>
              <MyText style={styles.headerText} fontStyle="extraBold">
                Topic: Headache
              </MyText>
              <MyText style={styles.headerText} fontStyle="extraBold">
                Responded
              </MyText>
            </View>
            <View
              style={{
                ...styles.questionTextContainer,
                ...flexStyles.flex,
                alignItems: 'flex-start',
              }}
            >
              <View
                style={{
                  ...flexStyles.flex,
                  ...flexStyles.justifyBetween,
                  flexWrap: 'wrap',
                  //marginRight: 3,
                  width:'97%'
                }}
              >
                <MyText
                  numberOfLines={expandedQuestions.includes(x.id) ? 0 : 2}
                  style={styles.questionText}
                  onTextLayout={(e) => onTextLayout(e, x.id)}
                >
                  Description: Turns out semicolon-less style is easier and safer in TS because most
                  gotcha edge cases are is easier and safer in TS because most gotcha edge cases
                  are.
                </MyText>
                {moreTextQuestions.includes(x.id) && (
                  <Pressable onPress={() => onExpand(x.id)}>
                    <MyText style={styles.viewMore}>
                      {expandedQuestions.includes(x.id) ? 'View less' : 'View more'}
                    </MyText>
                  </Pressable>
                )}
              </View>
              <View>
                <Pressable onPress={() => onExpand(x.id)}>
                  <Icon
                    name={expandedQuestions.includes(x.id) ? 'chevron-up' : 'chevron-down'}
                    size={10}
                  />
                </Pressable>
              </View>
            </View>
            <View style={{ ...flexStyles.flex, ...flexStyles.justifyBetween, marginTop: 10 }}>
              <MyText style={styles.name}>Anil Kumar</MyText>
              <MyText style={styles.date}>8th Dec, 2022 at 10:38 PM</MyText>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  questionsContainer: {
    //marginHorizontal: 15,
    marginVertical: 20,
  },
  questionContainer: {
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 11,
    lineHeight: 13,
    color: '#4CC2CB',
  },
  questionTextContainer: {
    marginTop: 10,
    //paddingHorizontal: 5,
  },
  questionText: {
    fontSize: 11,
    lineHeight: 13,
    color: '#000000',
  },
  viewMore: {
    fontSize: 10,
    lineHeight: 13,
    color: '#4CC2CB',
  },
  name: { fontSize: 10, lineHeight: 13, color: '#88878A' },
  date: { fontSize: 10, lineHeight: 13, color: '#B3B3BF' },
})

export default Questions
