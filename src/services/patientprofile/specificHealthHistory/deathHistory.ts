import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'

const getPatientFamilyDeathHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/family-death-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientFamilyDeathHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/family-death-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientFamilyDeathHistory = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/family-death-history/${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const deletePatientFamilyDeathHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/family-death-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getPatientFamilyDeathHistory,
  addPatientFamilyDeathHistory,
  deletePatientFamilyDeathHistory,
  updatePatientFamilyDeathHistory,
}
