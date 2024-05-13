import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  profile: Record<string, string> | null
}

const initialState: InitialState = {
  profile: null,
}

const drProfileSlice = createSlice({
  name: 'drProfile',
  initialState,
  reducers: {
    setDoctorProfile: (state, action) => {
      state.profile = {
        ...action.payload,
        dob: action.payload?.date_of_birth,
        gender: action.payload?.gender,
        firstName: action.payload?.first_name,
        lastName: action.payload?.last_name,
        email: action.payload?.email,
        mobile: action.payload?.mobile_number,
      }
    },
    updateDoctorProfileDetails: (state, action) => {
      state.profile = action.payload
    },
    updateDoctorProfileAbout: (state, action) => {
      state.profile = {
        ...state.profile,
        about: action.payload,
      }
    },
    updateDoctorMmcNumber: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
      }
    },
  },
})

export const {
  setDoctorProfile,
  updateDoctorProfileDetails,
  updateDoctorProfileAbout,
  updateDoctorMmcNumber,
} = drProfileSlice.actions

export default drProfileSlice.reducer
