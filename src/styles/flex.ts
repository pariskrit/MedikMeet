import { StyleSheet } from 'react-native'

export const flexStyles = StyleSheet.create({
  flex: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex_column: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  flex_1: {
    flex: 1,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionCol: {
    flexDirection: 'column',
  },
})
