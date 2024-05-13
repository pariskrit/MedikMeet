import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'
import { userAuthPayload, userRegisterPayload } from 'ts/interfaces/apiInrerface'
import { AxiosRequestConfig } from 'axios'

// login with google
const loginWithGoogle = async () => {
  try {
    let response = await API.get(`${Apis.Users}/login_with_google`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// validate the given email address already exist in database or not.
const validateUser = async ({ email, country_dial_code, mobile_number }: userAuthPayload) => {
  try {
    console.log({ country_dial_code })
    let response = await API.get(
      `${Apis.Users}/validate?${
        email
          ? `email=${email}`
          : `country_dial_code=${encodeURIComponent(
              country_dial_code || ''
            )}&mobile_number=${mobile_number}`
      }`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const validateOTP = async ({ email, country_dial_code, mobile_number, otp }: userAuthPayload) => {
  try {
    let response = await API.post(`${Apis.Users}/validate-otp`, {
      email,
      country_dial_code,
      mobile_number,
      otp,
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const generateOTP = async ({ email, country_dial_code, mobile_number }: userAuthPayload) => {
  try {
    let response = await API.get(
      `${Apis.Users}/generate_otp?${
        email
          ? `email=${email}`
          : `country_dial_code=${encodeURIComponent(
              country_dial_code || ''
            )}&mobile_number=${mobile_number}`
      }`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const signUpUser = async (payload: userRegisterPayload) => {
  try {
    let response = await API.post(`${Apis.Users}/register`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const logInUser = async (payload: userRegisterPayload) => {
  try {
    let response = await API.post(`${Apis.Users}/login`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const changePassword = async (payload: { password: string }, config: AxiosRequestConfig) => {
  try {
    let response = await API.put(`${Apis.Users}/change-password`, payload, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getCurrentUser = async () => {
  try {
    let response = await API.get(`${Apis.Users}/current_user`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  validateUser,
  validateOTP,
  signUpUser,
  generateOTP,
  logInUser,
  changePassword,
  getCurrentUser,
  loginWithGoogle,
}
