import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  isLoading: boolean
  showErrorModal: boolean
  errorMessage: string
}

const initialState: InitialState = {
  isLoading: false,
  showErrorModal: false,
  errorMessage: '',
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    showErrorDialoge: (state, action) => {
      state.showErrorModal = true
      state.errorMessage = action.payload
    },
    hideErrorDialoge: (state) => {
      state.showErrorModal = false
      state.errorMessage = ''
    },
  },
})

export const { showLoading, hideLoading, showErrorDialoge, hideErrorDialoge } = commonSlice.actions

export default commonSlice.reducer
