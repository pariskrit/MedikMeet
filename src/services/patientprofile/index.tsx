import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'
import { AxiosRequestConfig } from 'axios'

interface PayloadInterface {
  email?: string
  mobile?: string
  address?: string
  city?: string
  postalCode?: string
  nationality?: string
  idType?: number
  ic?: string
  passport?: string
  blood_group_id?: number | string
}

// Update Patient Profile
const updatePatientProfile = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/profile`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
// Get Patient Profile
const getPatientProfile = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/profile`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Get General
const getPatientGeneral = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/profile/generals`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Get Topics
const getPatientTopics = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/profile/topics`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const uploadPatientProfilePicture = async (image: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/profile-picture`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getPatientHealthDetails = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/profile/health-details`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const deletePatientHealthDetail = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/profile/health-details?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientHealthDetails = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/health-details`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientHealthDetails = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/profile/health-details?health_detail_id=${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getPatientMedicalHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/medical-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientMedicalHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/medical-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const updatePatientMedicalHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/medical-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientMedicalHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/medical-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getPatientSurgicalHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/surgical-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientSurgicalHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/surgical-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientSurgicalHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/surgical-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientSurgicalHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/surgical-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientHospitalHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/hospital-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientHospitalHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/hospital-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientHospitalHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/hospital-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientHospitalHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/hospital-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientMedicineHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/medicine-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientMedicineHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/medicine-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientMedicineHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/medicine-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientMedicineHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/medicine-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientTraditionalMedicineHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/tra-medicine-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientTraditionalMedicineHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/tra-medicine-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientTraditionalMedicineHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/tra-medicine-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientTraditionalMedicineHistory = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/tra-medicine-history/${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientAllergyHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/allergy-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientAllergyHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/allergy-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientAllergyHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/allergy-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientAllergyHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/allergy-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientPregnancyHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/pregnancy-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientPregnancyHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/pregnancy-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientPregnancyHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/pregnancy-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientPregnancyHistory = async (payload: any) => {
  try {
    let response = await API.put(`${Apis.PatientProfile}/pregnancy-history/${payload?.id}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPatientContraceptiveHistory = async () => {
  try {
    let response = await API.get(`${Apis.PatientProfile}/contraceptive-history`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deletePatientContraceptiveHistory = async (id: number) => {
  try {
    let response = await API.delete(`${Apis.PatientProfile}/contraceptive-history?id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addPatientContraceptiveHistory = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.PatientProfile}/profile/contraceptive-history`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updatePatientContraceptiveHistory = async (payload: any) => {
  try {
    let response = await API.put(
      `${Apis.PatientProfile}/contraceptive-history/${payload?.id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getPatientGeneral,
  getPatientTopics,
  getPatientProfile,
  updatePatientProfile,
  uploadPatientProfilePicture,
  getPatientHealthDetails,
  deletePatientHealthDetail,
  addPatientHealthDetails,
  updatePatientHealthDetails,
  getPatientMedicalHistory,
  addPatientMedicalHistory,
  deletePatientMedicalHistory,
  updatePatientMedicalHistory,
  getPatientSurgicalHistory,
  deletePatientSurgicalHistory,
  addPatientSurgicalHistory,
  updatePatientSurgicalHistory,
  getPatientHospitalHistory,
  deletePatientHospitalHistory,
  addPatientHospitalHistory,
  updatePatientHospitalHistory,
  getPatientMedicineHistory,
  deletePatientMedicineHistory,
  addPatientMedicineHistory,
  updatePatientMedicineHistory,
  getPatientTraditionalMedicineHistory,
  deletePatientTraditionalMedicineHistory,
  addPatientTraditionalMedicineHistory,
  updatePatientTraditionalMedicineHistory,
  getPatientAllergyHistory,
  deletePatientAllergyHistory,
  addPatientAllergyHistory,
  updatePatientAllergyHistory,
  getPatientPregnancyHistory,
  deletePatientPregnancyHistory,
  addPatientPregnancyHistory,
  updatePatientPregnancyHistory,
  getPatientContraceptiveHistory,
  deletePatientContraceptiveHistory,
  addPatientContraceptiveHistory,
  updatePatientContraceptiveHistory,
}
