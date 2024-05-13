import * as React from 'react'
import { StyleSheet, ActivityIndicator, View, Modal } from 'react-native'

interface IActivityIndicatorProps {
  style?: Object
  show: boolean
}
const defaultProps = {
  style: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  show: false,
}
// do not use default Activity Indicator component directly use Loader component instead
const Loading: React.FunctionComponent<IActivityIndicatorProps> = (props) => {
  const { style, show } = props
  return (
    <Modal transparent={true} animationType="none" visible={show}>
      <View style={style}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  )
}

Loading.defaultProps = defaultProps

const textStyle = StyleSheet.create({})
export default Loading
