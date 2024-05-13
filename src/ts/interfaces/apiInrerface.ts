export interface userAuthPayload {
  email?: string
  country_dial_code?: string
  mobile_number?: number | string
  otp?: number
}

export interface userRegisterPayload extends userAuthPayload {
  user_type?: string
  password: string
  is_without_password?: boolean
  first_name?: string
  last_name?: string
}
