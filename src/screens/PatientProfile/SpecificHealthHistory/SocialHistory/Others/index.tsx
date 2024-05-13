import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useForm from 'hooks/useForm'
import { AppProps } from 'screens/Authentication/Welcome'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import InputEl from 'components/elements/form/InputEl'
import {
  addSocialOccupantMap,
  updatePatientSocialHistory,
} from 'services/patientprofile/specificHealthHistory/socialHistory'
import ButtonEl from 'components/elements/Button'
import Loading from 'components/elements/ActivityIndicator'

const defaultFormState = {
  perform_any_sport_pa: '',
  hour_range_activity_per_week_id: '',
  sleep_cycle: '',
  hour_range_sleep_per_day_id: '',
  does_travel_frequently: '',
  living_status: '',
  living_dwelling_type: '',
  typeOfDwelling: '',
  patient_social_occupant_map: [],
  symptomsImprove: '',
  occupationalDisorder: '',
}

const Others = (props: {
  socialHistory: Record<string, string>[]
  consumptionType: any[]
  onEdit: (param: any) => void
  hourRange: any[]
  dwellingType: any[]
  occupantMember: any[]
}) => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [isLoading, setIsLoading] = useState(false)

  const handleEdit = async () => {
    setIsLoading(true)
    try {
      const response = await updatePatientSocialHistory(formState)
      const response2 = await addSocialOccupantMap({
        isNew: true,
        occupant_member_id: formState['patient_social_occupant_map'],
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onDropdownChange = (name: string, value: string) => {
    setFormState({ ...formState, [name]: value })
  }

  useEffect(() => {
    setFormState({
      ...props.socialHistory?.[0],
      patient_social_occupant_map: props.socialHistory?.[0]?.patient_social_occupant_map?.map(
        (pat: any) => pat?.occupant_member_id
      ),
    })
  }, [props.socialHistory])
  return (
    <ScrollView>
      <View style={styles.form}>
        <Loading show={isLoading} />

        <SwitchEl
          value={formState['perform_any_sport_pa']}
          onChange={() => {
            onChange('perform_any_sport_pa', !formState['perform_any_sport_pa'])
          }}
          label="Do you perform any sport/physical activities?"
          style={{ marginBottom: 20 }}
        />
        {formState['perform_any_sport_pa'] && (
          <Dropdown
            value={formState['hour_range_activity_per_week_id']}
            items={props?.hourRange?.slice(5)}
            error={errors['hour_range_activity_per_week_id']}
            placeholder="Total hours of activities performed in a week"
            setValue={(value: string) => onChange('hour_range_activity_per_week_id', value)}
            zIndex={200}
          />
        )}
        <SwitchEl
          value={formState['sleep_cycle']}
          onChange={() => {
            onChange('sleep_cycle', !formState['sleep_cycle'])
          }}
          label="Sleep Cycles"
          style={{ marginBottom: 20 }}
        />
        {formState['sleep_cycle'] && (
          <Dropdown
            value={formState['hour_range_sleep_per_day_id']}
            items={props?.hourRange?.slice(0, 6)}
            error={errors['hour_range_sleep_per_day_id']}
            placeholder="How many hours do you sleep per day?"
            setValue={(value: string) => onChange('hour_range_sleep_per_day_id', value)}
            zIndex={200}
            scroll
          />
        )}
        <View style={{ marginTop: formState['sleep_cycle'] ? -150 : 0, zIndex: 201 }}>
          <SwitchEl
            value={formState['does_travel_frequently']}
            onChange={() => {
              onChange('does_travel_frequently', !formState['does_travel_frequently'])
            }}
            label="Do you travel frequently?"
            style={{ marginBottom: 20 }}
          />
          <SwitchEl
            value={formState['living_status']}
            onChange={() => {
              onChange('living_status', !formState['living_status'])
            }}
            label="Living Status"
            style={{ marginBottom: 20 }}
          />
          {formState['living_status'] && (
            <>
              <Dropdown
                value={formState['living_dwelling_type']}
                items={props?.dwellingType}
                error={errors['living_dwelling_type']}
                placeholder="Type of dwelling living?"
                setValue={(value: string) => onChange('living_dwelling_type', value)}
                zIndex={200}
                scroll
              />
              <View style={{ marginTop: -150, zIndex: 201 }}>
                {formState['living_dwelling_type'] === 6 && (
                  // <Dropdown
                  //   value={formState['typeOfDwelling']}
                  //   items={props?.dwellingType}
                  //   error={errors['typeOfDwelling']}
                  //   placeholder="Type of dwelling"
                  //   setValue={(value: string) => onChange('typeOfDwelling', value)}
                  //   zIndex={100}
                  //   scroll
                  // />
                  <InputEl
                    label="Type of dwelling"
                    error={errors.typeOfDwelling}
                    value={formState['typeOfDwelling']}
                    onChangeText={(text) => onChange('typeOfDwelling', text)}
                  />
                )}
                <View
                  style={{
                    zIndex: 101,
                  }}
                >
                  <Dropdown
                    value={formState['patient_social_occupant_map']}
                    items={props?.occupantMember}
                    error={errors['patient_social_occupant_map']}
                    placeholder="Occupant members staying in?"
                    setValue={(value: string) =>
                      onDropdownChange('patient_social_occupant_map', value)
                    }
                    zIndex={50}
                    mutiple={true}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <ButtonEl onPress={handleEdit} style={{ marginBottom: 20 }}>
          Update
        </ButtonEl>
      </View>
    </ScrollView>
  )
}

export default Others

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
    marginBottom: 100,
  },
  durationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
