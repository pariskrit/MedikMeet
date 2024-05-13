import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'

const getPatientFamilyHealthHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/family-health-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientFamilyHealthHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/family-health-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientFamilyHealthHistory = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/family-health-history/${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const deletePatientFamilyHealthHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/family-health-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getPatientFamilyHealthHistory,
  addPatientFamilyHealthHistory,
  deletePatientFamilyHealthHistory,
  updatePatientFamilyHealthHistory,
}
