import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'

interface ISlotProps {}

const Slot: React.FunctionComponent<ISlotProps> = (props) => {
  const [selectedDay, setSelectedDay] = React.useState(new Date())
  const [selectedDayString, setSelectedDayString] = React.useState(
    getFormatedDate(new Date(), 'MMM DD, YYYY')
  )
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState(0)
  const handleDayChange = (index: number) => {
    let date = selectedDay
    date.setDate(date.getDate() + index)
    // console.log(date)
    setSelectedDay(date)
    setSelectedDayString(getFormatedDate(date, 'MMM DD, YYYY'))
  }
  return (
    <View>
      <View style={styles.header}>
        <MyText style={styles.headerText}>Select Slot</MyText>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', gap: 20, paddingVertical: 10, alignItems: 'center' }}>
          <Pressable onPress={() => handleDayChange(-1)}>
            <Icon name="arrow-circle-left" size={30} />
          </Pressable>
          <MyText style={{ color: '#4CC2CB', fontSize: 20, lineHeight: 24 }} fontStyle="extraBold">
            {selectedDayString}
          </MyText>
          <Pressable onPress={() => handleDayChange(1)}>
            <Icon name="arrow-circle-right" size={30} />
          </Pressable>
        </View>
        <View style={styles.bodyRow}>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              //width: 135,
              borderColor: selectedTimeSlot === 1 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(1)}
          >
            <MyText style={{ color: selectedTimeSlot === 1 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
          <Pressable
            style={{
              ...styles.btnContainer,
              //width: 135,
              flex: 1,
              borderColor: selectedTimeSlot === 2 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(2)}
          >
            <MyText style={{ color: selectedTimeSlot === 2 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
        </View>
        <View style={styles.bodyRow}>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              //width: 135,
              borderColor: selectedTimeSlot === 3 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(3)}
          >
            <MyText style={{ color: selectedTimeSlot === 3 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
          <Pressable
            style={{
              ...styles.btnContainer,
              //width: 135,
              flex: 1,
              borderColor: selectedTimeSlot === 4 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(4)}
          >
            <MyText style={{ color: selectedTimeSlot === 4 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
        </View>
        <View style={styles.bodyRow}>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              //width: 135,
              borderColor: selectedTimeSlot === 5 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(5)}
          >
            <MyText style={{ color: selectedTimeSlot === 5 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
          <Pressable
            style={{
              ...styles.btnContainer,
              //width: 135,
              flex: 1,
              borderColor: selectedTimeSlot === 6 ? '#4CC2CB' : '#B3B3BF',
            }}
            onPress={() => setSelectedTimeSlot(6)}
          >
            <MyText style={{ color: selectedTimeSlot === 6 ? '#4CC2CB' : '#B3B3BF', fontSize: 12 }}>
              09:00AM - 11:00AM
            </MyText>
          </Pressable>
        </View>
        <View style={styles.bodyRow}>
          <Pressable
            style={{
              ...styles.btnContainer,
              flex: 1,
              //width: 135,
            }}
          >
            <MyText style={{ color: '#B3B3BF', fontSize: 12 }}>09:00AM - 11:00AM</MyText>
          </Pressable>
          <Pressable
            style={{
              ...styles.btnContainer,
              //width: 135,
              flex: 1,
            }}
          >
            <MyText style={{ color: '#B3B3BF', fontSize: 12 }}>09:00AM - 11:00AM</MyText>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#4CC2CB',
    fontSize: 18,
    lineHeight: 22,
  },
  body: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  bodyRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  btnContainer: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    marginTop: 10,
    borderColor: '#B3B3BF',
    borderWidth: 1,
  },
})
export default Slot
