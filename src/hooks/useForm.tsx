import React, { useState } from 'react'
import { InputValidator } from 'helpers/inputValidators'
import { isEmpty } from 'utils'

const useForm = (fields: any) => {
  const [formState, setFormState] = React.useState(fields)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [errors, setErrors] = React.useState(
    Object.keys(fields).reduce((acc, current) => ({ ...acc, [current]: '' }), fields)
  )

  const validateForm = async () => {
    const requiredFields = Object.keys(formState).filter((item) => formState[item]?.isRequired)
    const fieldsToValidate = {
      ...requiredFields.reduce(
        (acc, current) => ({ ...acc, [current]: formState[current]?.value }),
        {}
      ),
    }
    const formErrors: typeof errors = await InputValidator(fieldsToValidate)
    setErrors(formErrors)
    setIsFormSubmitted(true)
    return isEmpty(formErrors)
  }

  const onChange = async (name: string, value: any) => {
    const inputValue = Array.isArray(value)
      ? [...formState[name], ...value]
      : typeof formState[name] === 'object' && formState[name]
      ? { ...formState[name], value }
      : value
    if (isFormSubmitted && formState[name]?.isRequired) {
      const formErrors = await InputValidator({ [name]: value })
      setErrors({
        ...errors,
        [name]: formErrors[name],
      })
    }
    setFormState((prev: any) => ({
      ...prev,
      [name]: inputValue,
    }))
  }
  return { formState, onChange, errors, validateForm, setFormState }
}

export default useForm
