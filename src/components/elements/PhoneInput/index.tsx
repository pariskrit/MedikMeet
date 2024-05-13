import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

const FlagInput = (props: any) => {
  return (
    <View style={props.styles}>
      <CountryPicker onSelect={props.onSelect} {...props} withCallingCode />
    </View>
  )
}

const styles = StyleSheet.create({})
export default FlagInput
