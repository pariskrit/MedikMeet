import { NavigationProp } from '@react-navigation/native'
import * as React from 'react'
import { View, Text, Pressable } from 'react-native'

export interface AppProps {
  navigation: NavigationProp<any, any>
}

function Home(props: AppProps) {
  const { navigation } = props
  return (
    <View>
      <Text>Home Page</Text>
      <Pressable onPress={() => navigation.navigate('Profile', { name: 'Profile' })}>
        <Text>Profile</Text>
      </Pressable>
    </View>
  )
}

export default Home
