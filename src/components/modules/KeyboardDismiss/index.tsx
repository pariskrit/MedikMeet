import { View, Text, Keyboard, Pressable } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'

const KeyboardDismiss = ({ children }: { children: ReactNode }) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      {children}
    </Pressable>
  )
}

export default KeyboardDismiss
