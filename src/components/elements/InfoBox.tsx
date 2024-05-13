import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import Icon from 'components/elements/Icon'
import { Button, Dialog, Portal } from 'react-native-paper'
import MyText from 'components/elements/MyText'
import ButtonEl from './Button'

interface InfoBoxProps {
  leftColumn: string[]
  rightColumn: string[]
  onEdit?: any
  onDelete?: any
  id?: any
}

const InfoBox = ({ leftColumn, rightColumn, onEdit, onDelete, id }: InfoBoxProps) => {
  const [visible, setVisible] = React.useState(false)

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)
  return (
    <View style={styles.infoContainer}>
      {leftColumn?.map((item, index) => (
        <View style={styles.row} key={item}>
          <Text style={styles.rowLeft}>{item}</Text>
          <Text style={styles.rowRight} numberOfLines={1}>{rightColumn?.[index] || ''}</Text>
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.rowLeft}>{'Actions'}</Text>
        <View
          style={{
            ...styles.row,
            columnGap: 10,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Pressable onPress={() => onEdit(id)}>
            <Icon name="edit-black" size={16} />
          </Pressable>
          <Pressable onPress={showDialog}>
            <Icon name="delete" size={16} />
          </Pressable>
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <MyText>Are you sure you want to delete this item?</MyText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>CANCEL</Button>

            <Button
              onPress={() => {
                hideDialog()
                onDelete(id)
              }}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default InfoBox

const styles = StyleSheet.create({
  infoContainer: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#E4E4E4',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  rowRight: {
    color: 'black',
    overflow: 'hidden',
  },
  rowLeft: {
    color: '#6B6B6B',
  },
})
