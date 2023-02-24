import * as React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { NavigationProp, RouteProp, StackActions } from '@react-navigation/native'
import Button from 'components/elements/Button'
import FormGroup from 'components/elements/form'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { formStyles } from 'styles/form'

interface IVerifyUserProps {
  navigation?: NavigationProp<any, any>
  route?: RouteProp<{ params: { name: string } }, 'params'>
}

const VerifyUser: React.FunctionComponent<IVerifyUserProps> = ({ route, navigation }) => {
  const [text, setText] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const { name } = route?.params || {}
  const verifyUser = () => {}
  navigation?.setOptions({ title: name === 'email' ? 'Verify Email' : 'Verify Phone' })
  return (
    <SafeAreaView>
      <View style={styles.formContainer}>
        <View style={formStyles.formRow}>
          <FormGroup
            formName="textinput"
            onChangeText={(value: any) => setText(value)}
            error={error}
            value={text}
            hasIcon
            icon={<Icon name="message" />}
            placeholder={name === 'email' ? 'Email' : 'Phone'}
            info={''}
          />
        </View>
        <View style={formStyles.formRow}>
          <MyText style={{ fontSize: 11 }}>We will send a One Time Password in your Email</MyText>
        </View>
        <View style={{ ...formStyles.formRow, ...styles.btnContainer }}>
          <Button
            hasIcon
            icon={<Icon name="arrow-circle-right-fill" />}
            onPress={() => verifyUser()}
            loading={isLoading}
            title="Verify"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  btnContainer: {
    paddingTop: 15,
  },
})
export default VerifyUser
