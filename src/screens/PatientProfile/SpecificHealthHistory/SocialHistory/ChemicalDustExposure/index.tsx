import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import useForm from 'hooks/useForm'
import Dropdown from 'components/elements/form/Dropdown'
import SwitchEl from 'components/elements/form/Switch'
import InputEl from 'components/elements/form/InputEl'
import ButtonEl from 'components/elements/Button'
import { updatePatientSocialHistory } from 'services/patientprofile/specificHealthHistory/socialHistory'
import Loading from 'components/elements/ActivityIndicator'

const defaultFormState = {

    does_chemical_dust_expose: '',
    work_timings: '',
    exposure_extent: '',
    workplace_protection_offered: '',
    does_symptoms_improve: '',
    occupational_disorder_desc: '',
}

const ChemicalDustExposure = (props: {
    socialHistory: Record<string, string>[]
    consumptionType: any[]
    onEdit: (param: any) => void
    duration: any[]
}) => {
    const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
    const [isLoading, setIsLoading] = useState(false)

    const handleEdit = async () => {
        setIsLoading(true)
        try {
            const response = await updatePatientSocialHistory(formState)
            console.log(response, formState)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setFormState({
            ...props.socialHistory?.[0],
        })
    }, [props.socialHistory])
    return (
        <ScrollView style={{ flex: 1 }}>
            <Loading show={isLoading} />

            <View style={styles.form}>



                <SwitchEl
                    value={formState['does_chemical_dust_expose']}
                    onChange={() => {
                        onChange('does_chemical_dust_expose', !formState['does_chemical_dust_expose'])
                    }}
                    label="Chemical or Dust exposure"
                    style={{ marginBottom: 20 }}
                />
                {formState['does_chemical_dust_expose'] && (
                    <>
                        <InputEl
                            label="Work timings"
                            onChangeText={(text) => onChange('work_timings', text)}
                            value={formState['work_timings']}
                        />
                        <InputEl
                            label="Extent of exposure"
                            onChangeText={(text) => onChange('exposure_extent', text)}
                            value={formState['exposure_extent']}
                        />
                        <InputEl
                            label="Workplace protection offered"
                            onChangeText={(text) => onChange('workplace_protection_offered', text)}
                            value={formState['workplace_protection_offered']}
                        />
                        <SwitchEl
                            value={formState['does_symptoms_improve']}
                            onChange={() => {
                                onChange('does_symptoms_improve', !formState['does_symptoms_improve'])
                            }}
                            label="Does symptoms improve over weekend or during holidays?"
                            style={{ marginBottom: 20 }}
                        />
                        {formState['does_symptoms_improve'] && (
                            <InputEl
                                label="Describe occupational disorder"
                                onChangeText={(text) => onChange('occupational_disorder_desc', text)}
                                value={formState['occupational_disorder_desc']}
                            />
                        )}
                    </>
                )}
            </View>
            <ButtonEl onPress={handleEdit} style={{ marginBottom: 20 }}>
                Update
            </ButtonEl>
        </ScrollView>
    )
}

export default ChemicalDustExposure

const styles = StyleSheet.create({
    form: {
        padding: 10,
        flex: 1,
    },
    durationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    allergy: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 10,
    },
})
