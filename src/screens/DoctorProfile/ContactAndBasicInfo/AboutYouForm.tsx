import { View, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'

import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import InputEl from 'components/elements/form/InputEl'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import {
  getDoctorProfileServices,
  postDoctorProfileServices,
  updateDoctorProfile,
} from 'services/doctorprofile'
import { updateDoctorProfileAbout } from 'redux/reducer/drProfileSlice'
import { HelperText } from 'react-native-paper'
import Icon from 'components/elements/Icon'

const defaultFormState = {
  about: '',
  service: '',
}

const AboutYouForm = () => {
  const [services, setServices] = useState<any>([])
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)

  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const { profile } = useAppSelector((state) => state.drProfile)

  useEffect(() => {
    setFormState({ about: profile?.about })

    try {
      const servicesList = async () => {
        const services = await getDoctorProfileServices()
        if (services?.status) {
          setServices(services?.data?.data?.services || [])
        }
      }
      servicesList()
    } catch (error) {}
  }, [])

  const onFormSubmit = async () => {
    const isValidated = await validateForm()

    if (isValidated) {
      try {
        dispatch(showLoading())
        const response = await updateDoctorProfile({ about: formState?.about })
        const responseService = await postDoctorProfileServices({
          services: [...services.map((x: any) => x.services), formState['service']],
          isNew: true,
        })
        if (response?.status) {
          dispatch(updateDoctorProfileAbout(formState?.about))
          navigation.navigate('ProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  const handleServiceChange = (service: any, text: string) => {
    setServices(() =>
      services.map((x: any) => (x.id === service.id ? { ...x, services: text } : x))
    )
  }

  const handleAddNewService = () => {
    if (formState['service']) {
      setServices([...services, { id: new Date().getTime(), services: formState['service'] }])
      setFormState({ service: '', about: formState['about'] })
    }
  }

  const handleRemoveService = (service: any) => {
    setServices(() => services.filter((x: any) => x.id !== service.id))
  }

  return (
    <View style={styles.form}>
      <KeyboardDismiss>
        <HelperText type="info" visible={true} style={{ fontStyle: 'italic' }}>
          Please describe yourself. Your profile will be visible to patient
        </HelperText>
        <InputEl
          multiLine={true}
          numberOfLines={5}
          label={'About You'}
          value={formState['about']}
          onChangeText={(text: string) => onChange('about', text)}
          isRequired
          // disabled
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: -25,
            justifyContent: 'flex-end',
          }}
        >
          <HelperText type="info" visible={true}>
            {formState?.about?.length}/2000
          </HelperText>
        </View>

        <View>
          <HelperText type="info" visible={true} style={{ fontStyle: 'italic' }}>
            Please provide a description of the service you offer
          </HelperText>
          <View style={styles.serviceActionContainer}>
            <InputEl
              label={'Service'}
              value={formState['service']}
              onChangeText={(text: string) => onChange('service', text)}
              style={{ flex: 0.95 }}
            />
            <Pressable onPress={handleAddNewService} style={{ marginTop: -13 }}>
              <Icon name="plus" size={30} />
            </Pressable>
          </View>
          <View>
            {services?.map((service: any) => (
              <View style={styles.serviceActionContainer}>
                <InputEl
                  label={'Service'}
                  value={service?.services}
                  onChangeText={(text: string) => handleServiceChange(service, text)}
                  style={{ flex: 0.95 }}
                />
                <Pressable onPress={() => handleRemoveService(service)} style={{ marginTop: -13 }}>
                  <Icon name="delete" size={25} />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
        <ButtonEl onPress={onFormSubmit} style={{ marginVertical: 20 }} btnTextColor={primaryColor}>
          Save Changes
        </ButtonEl>
      </KeyboardDismiss>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },

  serviceActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default AboutYouForm
