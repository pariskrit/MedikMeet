import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { headerColor } from 'styles/colors'

const ProfileHeader = ({
  title,
  onBackPress,
  heading = 'Profile  -  ',
  style,
}: {
  title: string
  onBackPress?: () => void
  heading?: string
  style?: Record<string, string | number>
}) => {
  return (
    <View style={{ ...styles.header, ...style }}>
      <TouchableOpacity style={styles.arrow} onPress={onBackPress}>
        <Feather name="arrow-left" size={20} color={headerColor} />
      </TouchableOpacity>
      <Text style={styles.headerText} numberOfLines={1}>
        {/* <Text style={styles.title}>{heading}</Text> */}
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  arrow: {
    // backgroundColor: 'grey',
    borderRadius: 30,
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    color: headerColor,
    width: '88%',
  },
  title: {
    fontWeight: '600',
    marginHorizontal: 10,
  },
})

export default ProfileHeader
