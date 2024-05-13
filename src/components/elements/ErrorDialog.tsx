import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppSelector } from 'redux/hook'
import { useAppDispatch } from 'redux/hook'
import { hideErrorDialoge } from 'redux/reducer/commonSlice'
import { Button } from 'react-native-paper'
import MyText from './MyText'

const ErrorDialog = () => {
  const error = useAppSelector((state) => state.common)
  const dispatch = useAppDispatch()

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={error.showErrorModal}
      onRequestClose={() => {
        dispatch(hideErrorDialoge())
      }}
    >
      <View style={styles.modal_container}>
        <View style={styles.modal_content}>
          <MyText style={styles.message}>{error.errorMessage}</MyText>
          <Button
            onPress={() => dispatch(hideErrorDialoge())}
            mode="contained"
            style={{ width: '50%', alignSelf: 'center' }}
          >
            OK
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default ErrorDialog

const styles = StyleSheet.create({
  modal_container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modal_content: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
})
