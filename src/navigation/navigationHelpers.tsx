import { NavigationProp } from '@react-navigation/native'
import HeaderBackButton from 'components/elements/HeaderBackButton'
import { fontFamilyType } from 'helpers/constants'

export const getCommonHeaderOptions = (navigation: NavigationProp<any, any>) => ({
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTitleStyle: {
    color: 'black',
    fontFamily: fontFamilyType['bold'],
  },
  headerLeft: (props:any) => <HeaderBackButton {...props} navigation={navigation} />,
})
