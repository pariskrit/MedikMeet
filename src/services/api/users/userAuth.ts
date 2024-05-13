import API from 'helpers/api'
import { Apis } from 'services/api'
import { getAPIResponse } from 'helpers/getApiResponse'
import { userAuthPayload } from 'ts/interfaces/apiInrerface'

// validate the given email address already exist in database or not.
const validateUser = async ({ email, country_dial_code, mobile_number }: userAuthPayload) => {
  try {
    let response = await API.get(
      `${Apis.Users}/validate?email=${email}&country_dial_code=${country_dial_code}&mobile_number=${mobile_number}`
    )
    return response
  } catch (err: any) {
    return getAPIResponse(err.response)
  }
}

export { validateUser }
