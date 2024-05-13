import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  profile: Record<string, any> | null
}

const initialState: InitialState = {
  profile: null,
}

const patientProfileSlice = createSlice({
  name: 'patientProfile',
  initialState,
  reducers: {
    setPatientProfile: (state, action) => {
      state.profile = {
        ...action.payload,
        dob: action.payload?.date_of_birth,
        firstName: action.payload?.first_name,
        lastName: action.payload?.last_name,
        mobile: action.payload?.mobile_number,
      }
    },
    updatePatientProfileDetails: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const { setPatientProfile, updatePatientProfileDetails } = patientProfileSlice.actions

export default patientProfileSlice.reducer
