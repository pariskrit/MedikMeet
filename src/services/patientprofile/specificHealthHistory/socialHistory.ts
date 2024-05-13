import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'

const getPatientSocialHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/social-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientSocialHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/social-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const addSocialOccupantMap = async (payload: any) => {
  try {
    let response = await API.post(
      `${Apis.PatientProfile}/social-occupant-map/update-multi`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientSocialHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/social-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getPatientSocialHistory,
  addPatientSocialHistory,
  updatePatientSocialHistory,
  addSocialOccupantMap,
}
