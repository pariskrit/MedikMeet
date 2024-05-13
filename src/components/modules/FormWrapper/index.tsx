import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  return <View style={{ paddingHorizontal: 20, flex: 1 }}>{children}</View>
}

export default FormWrapper

const styles = StyleSheet.create({})
