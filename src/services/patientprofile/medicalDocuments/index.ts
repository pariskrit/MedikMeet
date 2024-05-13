import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'

const getPatientMedicalDocuments = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/profile/documents`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientMedicalDocuments = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/documents`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const uploadPatientMedicalDocuments = async (id: number, payload: any) => {
  try {
    let response = await API.post(
      `${Apis.PatientProfile}/profile/patient-document?document_id=${id}`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientMedicalDocuments = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/profile/documents?document_id=${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const deletePatientMedicalDocuments = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/profile/documents?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getPatientMedicalDocuments,
  addPatientMedicalDocuments,
  deletePatientMedicalDocuments,
  updatePatientMedicalDocuments,
  uploadPatientMedicalDocuments,
}
