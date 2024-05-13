import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'

const SwitchEl = ({
  value,
  onChange,
  label,
  style,
}: {
  value: boolean
  onChange: () => void
  label: string
  style?: Record<string, string | number>
}) => {
  return (
    <View style={{ ...styles.switch, ...style }}>
      <Switch value={value} onValueChange={onChange} />
      <Text style={{ color: 'black' }}>{label}</Text>
    </View>
  )
}

export default SwitchEl

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
