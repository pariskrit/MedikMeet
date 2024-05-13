import Icon from 'components/elements/Icon'
import MyText from 'components/elements/MyText'
import CheckboxEl from 'components/elements/form/Checkbox'
import Dropdown from 'components/elements/form/Dropdown'
import InputEl from 'components/elements/form/InputEl'
import { error } from 'console'
import useForm from 'hooks/useForm'
import * as React from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'

interface IPatientInformationProps {}
const initialState = {
  firstName: '',
  lastName: '',
  relationShip: '',
  gender: '',
  icPassportNo: '',
  email: '',
  mobile: '',
}
const genderItems = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]
const PatientInformation: React.FunctionComponent<IPatientInformationProps> = (props) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(initialState)
  const { firstName, lastName, relationShip, gender, icPassportNo, email, mobile } = formState
  return (
    <View>
      <View style={styles.header}>
        <MyText style={styles.headerText}>Patient Information</MyText>
      </View>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
            <CheckboxEl size={18} borderColor="#171766" />
            <MyText>Anna Mathew</MyText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
            <CheckboxEl size={18} borderColor="#171766" />
            <MyText>Anna Mathew</MyText>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
            <CheckboxEl size={18} borderColor="#171766" />
            <MyText>Anna Mathew</MyText>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, flex: 1 }}>
            <CheckboxEl size={18} borderColor="#171766" />
            <MyText>Anna Mathew</MyText>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <MyText style={{ color: '#4CC2CB', fontSize: 12, lineHeight: 15 }}>
            Add New Patient Info
          </MyText>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            <InputEl
              value={firstName}
              label={'First Name'}
              error={errors.firstName}
              onChangeText={(text: string) => onChange('firstName', text)}
              style={{ flex: 1 }}
            />
            <InputEl
              value={lastName}
              label={'Last Name'}
              error={errors.lastName}
              onChangeText={(text: string) => onChange('lastName', text)}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: -20 }}>
            <InputEl
              value={relationShip}
              label={'Relationship'}
              error={errors.relationShip}
              onChangeText={(text: string) => onChange('relationShip', text)}
              style={{ width: '48%' }}
            />
            <Dropdown
              value={gender}
              items={genderItems}
              error={errors.gender}
              placeholder={'Gender/Sex'}
              setValue={(value: string) => onChange('gender', value)}
              styles={{ width: '48%' }}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: -20 }}>
            <InputEl
              value={icPassportNo}
              label={'IC or Passport Number'}
              error={errors.icPassportNo}
              onChangeText={(text: string) => onChange('icPassportNo', text)}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: -20 }}>
            <InputEl
              value={email}
              label={'Email ID'}
              error={errors.email}
              onChangeText={(text: string) => onChange('email', text)}
              style={{ flex: 1 }}
            />
            <InputEl
              value={mobile}
              label={'Mobile Number'}
              error={errors.mobile}
              onChangeText={(text: string) => onChange('mobile', text)}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#4CC2CB',
    fontSize: 18,
    lineHeight: 22,
  },
  body: {
    paddingTop: 10,
  },
  bodyRow: {
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 20,
  },
  btnContainer: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 124,
    marginTop: 10,
    borderColor: '#B3B3BF',
    borderWidth: 1,
  },
})
export default PatientInformation
