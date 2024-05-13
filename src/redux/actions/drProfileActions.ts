import { Dispatch } from '@reduxjs/toolkit'
import { setDoctorProfile } from 'redux/reducer/drProfileSlice'
import { getDoctorProfile } from 'services/doctorprofile'
import { getCurrentUser } from 'services/users/userAuth'

export const fetchUserAction = () => async (dispatch: Dispatch) => {
  try {
    const res = await getCurrentUser()
    const profile = await getDoctorProfile()
    dispatch(setDoctorProfile({ ...profile?.data?.data, ...res?.data?.data }))
  } catch (error) {
    console.log(error)
  }
}
