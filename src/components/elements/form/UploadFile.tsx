import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InputEl from './InputEl'
import { TextInput } from 'react-native-paper'
import Icon from '../Icon'
import DocumentPicker, { types } from 'react-native-document-picker'

const UploadFile = ({
  name,
  value,
  error,
  onChange,
  label,
}: {
  name: string
  value: string
  error?: string
  onChange: (a: string, b: any) => void
  label: string
}) => {
  const openFileDirectory = () => {
    DocumentPicker.pickSingle({
      type: [types.csv, types.docx, types.pdf, types.doc],
    })
      .then((res) => onChange(name, res ?? ''))
      .catch((err) => console.log(err))
  }
  return (
    <InputEl
      value={value}
      label={label}
      error={error}
      right={<TextInput.Icon icon={() => <Icon name="document" />} />}
      showKeyboard={false}
      onPressIn={() => openFileDirectory()}
    />
  )
}

export default UploadFile

const styles = StyleSheet.create({})
