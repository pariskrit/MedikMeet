import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'

interface IPollProps {
  poll: any
}

const Poll: React.FunctionComponent<IPollProps> = (props) => {
  const { poll } = props
  return (
    <View style={styles.pollContainer}>
      <View style={styles.pollTitleContainer}>
        <MyText style={styles.pollTitle}>{poll.pollTitle}</MyText>
      </View>
      <View style={styles.pollItemContainer}>
        {poll.pollItems?.map((item: any) => (
          <View style={styles.pollItem} key={item.id}>
            <View style={{ ...styles.pollItemBackground, width: item.percentage }}></View>
            <View style={styles.pollLeftItem}>
              <CheckboxEl size={18} borderColor="#171766" />
              <MyText style={styles.pollItemText}>{item.pollItemName}</MyText>
            </View>
            <MyText style={styles.pollItemText}>{item.percentage}</MyText>
          </View>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  pollTitleContainer: {
    marginBottom: 10,
  },
  pollTitle: {
    fontSize: 9,
    lineHeight: 10,
    color: '#171766',
  },
  pollItemContainer: {},
  pollItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#171766',
    position: 'relative',
    flex: 1,
    marginBottom: 12,
  },
  pollLeftItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pollItemText: {
    fontSize: 9,
    lineHeight: 10,
    color: '#171766',
    paddingRight: 10,
  },
  pollItemBackground: {
    backgroundColor: '#D6F5F8',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 38,
  },
})
export default Poll
