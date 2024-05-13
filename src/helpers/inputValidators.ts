import { genericObj } from './../ts/types/index'
import { isEmpty } from 'utils'
import {
  EmailRegexValidaion,
  numberAndDecimals,
  numbersOnly,
  passwordRegexValidation,
  PhoneNumberRegexValidation,
  positiveNumber,
} from './regex'

export const InputValidator = async (validationFields: genericObj) => {
  const errors: any = {}
  const fields = Object.keys(validationFields).map((key) => ({
    id: key,
    value: validationFields[key],
  }))

  if (fields) {
    Promise.all(
      fields.map(async (field) => {
        const conditions: string[] = ['required']
        conditions.push(field.id.toLowerCase())
        if (conditions) {
          Promise.all(
            conditions.map((condition) => {
              const errMsg = validationConditions(condition, field.value)
              if (errMsg) {
                errors[field.id] = errMsg
              }
            })
          )
        }
      })
    )
  }
  return errors
}

const validationConditions = (condition: string, value: any) => {
  switch (condition) {
    case 'required': {
      return !value || isEmpty(value) ? 'Required' : ''
    }

    case 'email': {
      const isValid = !isEmpty(value) ? EmailRegexValidaion(value.trim()) : true
      return !isValid ? 'Invalid Email' : ''
    }

    case 'numberAndDecimals': {
      const isValid = !isEmpty(value) ? numberAndDecimals(value) : true
      return isEmpty(value) ? 'Required' : !isValid ? 'Numbers Only' : ''
    }

    case 'numbers': {
      const isValid = !isEmpty(value) ? numbersOnly(value) : true
      return !value ? 'Required' : !isValid ? 'Numbers Only' : ''
    }

    case 'posNumbers': {
      const isValid = !isEmpty(value) ? positiveNumber(value) : true
      return !isValid ? 'Positive Number Only' : ''
    }

    case 'yearNum': {
      const isValid = !isEmpty(value) ? numbersOnly(value) && value.toString().length == 4 : true
      return !value ? 'Required' : !isValid ? 'Invalid Year' : ''
    }

    case 'phone': {
      const isValid = !isEmpty(value) ? PhoneNumberRegexValidation(value) : true
      return !value ? 'Required' : !isValid ? 'Invalid Phone no.' : ''
    }

    case 'upToCurrentYear': {
      const isValid = !isEmpty(value) ? numbersOnly(value) && value.toString().length == 4 : true
      return !value
        ? 'Required'
        : !isValid
        ? 'Invalid Year'
        : new Date().getFullYear() < value
        ? "Can't exceed current date"
        : ''
    }
    case 'password': {
      const isValid = !isEmpty(value) ? passwordRegexValidation(value) : true
      return !isValid
        ? ' Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        : ''
    }
    default:
      return ''
  }
}
