import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  currentUser: Record<string, string> | null
}

const initialState: InitialState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = {
        ...action.payload,
        firstName: action.payload?.first_name,
        lastName: action.payload?.last_name,
        email: action.payload?.email,
        mobile: action.payload?.mobile_number,
      }
    },
  },
})

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer
