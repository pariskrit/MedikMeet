import MyText from 'components/elements/MyText'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface IPostProps {}

const questionAnswer = [
  { id: 1, postedByMe: false },
  { id: 2, postedByMe: true, isActionPost: true },
  { id: 3, postedBYMe: false },
]
const MAX_LINES = 2
const QuestionAnswer: React.FunctionComponent<IPostProps> = (props) => {
  const [showText, setShowText] = useState(false)
  const [numberOfLines, setNumberOfLines] = useState(2)
  const [showMoreButton, setShowMoreButton] = useState(false)

  const onTextLayout = (e: any) => {
    console.log(e.nativeEvent)
    if (e.nativeEvent.lines.length > MAX_LINES && !showText) {
      setShowMoreButton(true)
      setNumberOfLines(MAX_LINES)
    }
  }

  return (
    <View>
      {questionAnswer?.map((qa) => (
        <View style={styles.container} key={qa?.id}>
          <View style={styles.heading}>
            <Text style={styles.headingLeft}>Topic: Headache</Text>
            <Text style={styles.headingRight}> Responded</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <MyText
              style={styles.description}
              numberOfLines={numberOfLines}
              onTextLayout={onTextLayout}
            >
              Description: Turns out semicolon-less style is easier and safer in TS because most
              gotcha edge cases are type invalid as well.
            </MyText>
            {showMoreButton && (
              <Pressable onPress={() => setShowText((showText) => !showText)}>
                <MyText style={styles.viewMore}>{showText ? 'View Less' : 'View More'}</MyText>
              </Pressable>
            )}
            {/* <Text style={{ color: '#000000' }}>
              Description: Turns out semicolon-less style is easier and safer in TS because most
              gotcha edge cases are type invalid as well.
            </Text> */}
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerLeft}>Anil Kumar</Text>
            <Text style={styles.footerRight}>8th Dec, 2022 at 10:38 PM</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headingLeft: {
    color: '#4CC2CB',
    fontWeight: '400',
  },
  headingRight: {
    color: '#2CC84A',
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  description: {
    color: '#000000',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  footerLeft: {
    color: '#88878A',
    fontWeight: '700',
  },
  footerRight: {
    color: '#B3B3BF',
    fontWeight: '400',
  },
  viewMore: {
    fontSize: 12,
    lineHeight: 12,
    color: '#4CC2CB',
  },
})
export default QuestionAnswer
