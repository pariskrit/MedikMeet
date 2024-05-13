import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'
import { AxiosRequestConfig } from 'axios'

// Get Generals
const getGenerals = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/generals`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Get Topics
const getTopics = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/topic_master`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

// Get Known Languages
const getKnownLanguages = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/known_languages`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getWorkType = async (config: AxiosRequestConfig) => {
  try {
    let response = await API.get(`${Apis.Masters}/work_type_master`, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getWorkRelation = async (config: AxiosRequestConfig) => {
  try {
    let response = await API.get(`${Apis.Masters}/work_relation_master`, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getDegreeTypes = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/degree_types`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getRecongnitionypes = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/degree-recognition-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getCountry = async (config?: AxiosRequestConfig) => {
  try {
    let response = await API.get(`${Apis.Masters}/country`, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getCity = async (config?: AxiosRequestConfig) => {
  try {
    let response = await API.get(`${Apis.Masters}/city`, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getStateMaster = async (config?: AxiosRequestConfig) => {
  try {
    let response = await API.get(`${Apis.Masters}/state_master`, config)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getIdTypes = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/id_types`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getBloodGroups = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/blood-group`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getFollowUpCenter = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/follow-up-at-center`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getFollowUpCenterType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/follow-up-center-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getRoute = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/route`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getRouteType = async (id: number) => {
  try {
    let response = await API.get(`${Apis.Masters}/route-type?route_id=${id}`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getDosage = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/dosage`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getDuration = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/duration`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getAllergyType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/allergy_type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getMenstrualCycleType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/menstrual-cycle-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getPregnancyMethod = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/pregnancy-method`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getAidedHistory = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/aided-method`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getContraceptiveType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/contraceptive-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getDeliveryType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/delivery-method`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getConsumptionType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/consumption-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getHourRange = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/hour-range`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getLivingDwellingType = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/living-dwelling-type`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getOccupantMember = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/occupant-member`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getFamilyMemberRelationship = async (id: number) => {
  try {
    let response = await API.get(
      `${Apis.Masters}/family-member-relationship/relation-for-id?relation_for_master_id=${id}`
    )
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getFamilyMemberRelationshipFor = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/family-relationship-for`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

const getTemperatureUnit = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/temperature-unit`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getHba1cUnit = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/hba1c-unit`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}
const getBloodSugarUnit = async () => {
  try {
    let response = await API.get(`${Apis.Masters}/blood-sugar`)
    return getAPIResponse(response)
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export {
  getWorkType,
  getWorkRelation,
  getGenerals,
  getTopics,
  getKnownLanguages,
  getDegreeTypes,
  getRecongnitionypes,
  getCountry,
  getCity,
  getStateMaster,
  getIdTypes,
  getBloodGroups,
  getFollowUpCenter,
  getFollowUpCenterType,
  getRoute,
  getRouteType,
  getDosage,
  getDuration,
  getAllergyType,
  getMenstrualCycleType,
  getPregnancyMethod,
  getAidedHistory,
  getContraceptiveType,
  getDeliveryType,
  getConsumptionType,
  getHourRange,
  getLivingDwellingType,
  getOccupantMember,
  getFamilyMemberRelationship,
  getTemperatureUnit,
  getHba1cUnit,
  getBloodSugarUnit,
  getFamilyMemberRelationshipFor,
}
