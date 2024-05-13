import * as React from 'react'
import { StyleSheet, View, TextInput, Pressable, TouchableWithoutFeedback } from 'react-native'
import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import { medicConnectSearchTypes } from 'helpers/constants'
import { Modal } from 'react-native-paper'
import Dropdown from 'components/elements/form/Dropdown'
import useForm from 'hooks/useForm'

interface IDoctorSearchProps {
  value: string
  onSearchChange: (text: string) => void
  onSearch: (text: string) => void
  selectedSearchType: string
  setSelectedSearchType: (selected: any) => void
  showSearchTypes: boolean
  setShowSearchTypes: (val: boolean) => void
  placeholder?: string
}

const initialFormState = {
  doctorType: 'male',
  speciality: '',
  subSpeciality: '',
  sorting: '',
}
const DoctorSearch: React.FunctionComponent<IDoctorSearchProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialFormState)
  const {
    value,
    onSearchChange,
    onSearch,
    selectedSearchType,
    setSelectedSearchType,
    showSearchTypes,
    setShowSearchTypes,
    placeholder = 'Dr Names, Posts Topics',
  } = props
  const [showRecentList, setShowRecentList] = React.useState(false)
  const onInputFocus = () => {
    setShowRecentList(true)
  }
  const onInputBlur = () => {
    onSearch(value)
  }

  return (
    <View style={styles.inputContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Icon name="search" />
        <TextInput
          onChangeText={onSearchChange}
          value={value}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          placeholder={placeholder}
        />
      </View>

      <Pressable onPress={() => setShowSearchTypes(true)}>
        <View style={styles.searchFilterContainer}>
          <Icon name="filter-horizontal" size={18} />
        </View>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 8,
    //paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginBottom:20
  },
  searchFilterContainer: {
    //borderLeftWidth: 1,
    //borderLeftColor: '#B3B3BF',
    paddingLeft: 8,
    position: 'relative',
    //flex: 1,
  },
  selectedSearch: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    //width: 90,
  },
  searchTypeList: {
    position: 'absolute',
    right: 0,
    top: -20,
    backgroundColor: '#ffffff',
    width: 90,
    //paddingHorizontal: 15,
    paddingBottom: 10,
    paddingTop: 5,
    borderWidth: 0.5,
    borderColor: '#B3B3BF',
    borderRadius: 5,
  },
  searchTypeItem: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
})
export default DoctorSearch
