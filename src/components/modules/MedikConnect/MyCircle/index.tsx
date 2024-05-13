import * as React from 'react'
import { View, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import Follow from './Follow'
import Request from './Request'
import Suggestions from './Suggestions'
import MyText from 'components/elements/MyText'

interface IMyCircleProps {
  goBack: Function
}
const myCircleMenus = [
  {
    id: 1,
    title: 'Followers/Following',
    component: <Follow />,
  },
  {
    id: 2,
    title: 'Requests',
    component: <Request />,
  },
  {
    id: 3,
    title: 'Suggestions',
    component: <Suggestions />,
  },
]

const MyCircle: React.FunctionComponent<IMyCircleProps> = (props) => {
  const { goBack } = props
  const [selectedMenu, setSelectedMenu] = React.useState<(typeof myCircleMenus)[0]>(
    myCircleMenus[0]
  )
  return (
    <View style={styles.menuContainer}>
      <Pressable onPress={() => goBack()}>
        <MyText
          style={{
            marginBottom: 10,
            color: '#447fe1',
            fontSize: 10,
            textDecorationLine: 'underline',
          }}
        >
          Go back
        </MyText>
      </Pressable>
      <View style={styles.menuListContainer}>
        {myCircleMenus.map((item) => (
          <TouchableOpacity onPress={() => setSelectedMenu(item)} key={item.id}>
            <View style={styles.menuList}>
              <MyText
                style={{
                  ...styles.title,
                  color: selectedMenu.id === item.id ? '#4CC2CB' : '#B3B3BF',
                  textDecorationLine: selectedMenu.id === item.id ? 'underline' : 'none',
                }}
              >
                {item.title}
              </MyText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.menuContent}>{selectedMenu.component}</View>
    </View>
  )
}
const styles = StyleSheet.create({
  menuContainer: {},
  menuListContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  menuList: {
    paddingVertical: 10,
  },
  menuContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 17,
  },
})
export default MyCircle
