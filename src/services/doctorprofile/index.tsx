import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'
import { AxiosRequestConfig } from 'axios'

interface GeneralInterestInterface {
  value: number
}

interface DoctorProfileInterface {
  date_of_birth?: string
  gender?: 'Male' | 'Female'
  nationality_id?: number
  about?: string
  nsr_number?: any
  apc_number?: any
  mmc_number?: any
}

// Get Doctor Profile
const getDoctorProfile = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Update Doctor Profile
const updateDoctorProfile = async (payload: DoctorProfileInterface) => {
  try {
    let response = await API.put(`${Apis.DoctorProfile}/profile`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getDoctorProfileServices = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/services`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const postDoctorProfileServices = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/services`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Upload Doctor Profile Picture
const uploadDoctorProfilePicture = async (image: any) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile_picture`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Select General
const addInterestGeneral = async ({ value }: GeneralInterestInterface) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/generals/updatemulti`, {
      generals_master_id: value,
      isNew: true,
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
// Get General
const getInterestGeneral = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/generals`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
// Select Topic
const addInterestTopic = async ({ value }: GeneralInterestInterface) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/topics/updatemulti`, {
      topic_master_id: value,
      isNew: true,
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
// Get Topic
const getInterestTopic = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/topics`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Update Language
const updateKnownLanguages = async ({ value, prevValue }: { value: number; prevValue: number }) => {
  try {
    let response = await API.put(
      `${Apis.DoctorProfile}/profile/known-languages?doctor_known_language_master_id=${prevValue}`,
      {
        known_language_master_id: value,
      }
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
// Update Language
const addKnownLanguages = async ({ value }: GeneralInterestInterface) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/known-languages`, {
      known_language_master_id: value,
    })
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Get Language
const getDoctorKnownLanguages = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/known-languages`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Upload Doctor Profile Picture
// const addDoctorProfile = async (payload:) => {
//   try {
//     let response = await API.post(`${Apis.DoctorProfile}/profile_picture}`, {
//       profile_picture: image,
//     })
//     return getAPIResponse(response)
//   } catch (err: any) {
//     return getAPIResponse(err.response)
//   }
// }

const addDoctorProfileEducation = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/education`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addDoctorProfileEducationDocument = async (education_id: any, payload: any) => {
  try {
    let response = await API.put(
      `${Apis.DoctorProfile}/profile/education_certificate?education_id=${education_id}`,
      payload,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updateDoctorProfileEducation = async (education_id: any, payload: any) => {
  try {
    let response = await API.put(
      `${Apis.DoctorProfile}/profile/education/?education_id=${education_id}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getDoctorProfileEducation = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/education/`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deleteDoctorProfileEducation = async (education_id: number) => {
  try {
    let response = await API.delete(
      `${Apis.DoctorProfile}/profile/education/delete?education_id=${education_id}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getDoctorProfileAwards = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/awards/`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deleteDoctorProfileAward = async (award: number) => {
  try {
    let response = await API.delete(`${Apis.DoctorProfile}/profile/awards/delete?award_id=${award}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addDoctorProfileAward = async (payload: any) => {
  try {
    let response = await API.post(`${Apis.DoctorProfile}/profile/awards`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updateDoctorProfileAward = async ({
  payload,
  received_from,
  received_year,
  award_name,
}: {
  payload: any
  received_from: string
  received_year: any
  award_name: string
}) => {
  try {
    let response = await API.put(
      `${Apis.DoctorProfile}/profile/awards?award_name=${award_name}&received_from=${received_from}&received_year=${received_year}`,
      payload
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addDoctorProfileAwardDocument = async ({
  payload,
  received_from,
  received_year,
  award_name,
  description,
  doctor_profile_id,
}: {
  payload: any
  received_from: string
  received_year: any
  award_name: string
  description: string
  doctor_profile_id: any
}) => {
  try {
    let response = await API.post(
      `${Apis.DoctorProfile}/profile/award_document?&doctor_profile_id=${doctor_profile_id}&award_name=${award_name}&received_from=${received_from}&received_year=${received_year}&description=${description}`,
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

const getDoctorProfileWork = async () => {
  try {
    let response = await API.get(`${Apis.DoctorProfile}/profile/work-all/`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const deleteDoctorProfileWork = async (work: number) => {
  try {
    let response = await API.delete(`${Apis.DoctorProfile}/profile/work/delete?work_id=${work}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addDoctorProfileWork = async (payload: any) => {
  try {
    console.log(payload)
    let response = await API.post(`${Apis.DoctorProfile}/profile/work`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const updateDoctorProfileWork = async (workId: number, payload: any) => {
  try {
    let response = await API.put(`${Apis.DoctorProfile}/profile/work?work_id=${workId}`, payload)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const addDoctorProfileWorkDocument = async (workId: number, payload: any) => {
  try {
    let response = await API.put(
      `${Apis.DoctorProfile}/profile/work_documents?work_id=${workId}`,
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
export {
  uploadDoctorProfilePicture,
  addInterestGeneral,
  addInterestTopic,
  getInterestGeneral,
  getInterestTopic,
  updateKnownLanguages,
  getDoctorKnownLanguages,
  addKnownLanguages,
  getDoctorProfile,
  updateDoctorProfile,
  addDoctorProfileEducation,
  addDoctorProfileEducationDocument,
  getDoctorProfileEducation,
  deleteDoctorProfileEducation,
  updateDoctorProfileEducation,
  getDoctorProfileAwards,
  deleteDoctorProfileAward,
  addDoctorProfileAward,
  updateDoctorProfileAward,
  addDoctorProfileAwardDocument,
  getDoctorProfileWork,
  addDoctorProfileWork,
  deleteDoctorProfileWork,
  updateDoctorProfileWork,
  addDoctorProfileWorkDocument,
  getDoctorProfileServices,
  postDoctorProfileServices,
}
