import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { InternalAxiosRequestConfig } from 'axios'
import { JWT_KEY } from './sharedPrefKeys'

export const BASE_API_PATH = '/api/v1/'

// Setting base URL for backend requests
const instance = axios.create({
  baseURL:
    process.env.REACT_APP_API_ENDPOINT !== undefined
      ? process.env.REACT_APP_API_ENDPOINT
      : 'https://Medikmeet-be.softdevels.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  let jwt: any = await AsyncStorage.getItem(JWT_KEY)
  // jwt = {
  //   access_token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJraW5AbWFpbHNhYy5jb20iLCJsb2dpbl9pZCI6MzA1LCJleHAiOjE2ODYzMjQ5MDh9.bbtB7Xz2-e9kyGerJJTc03ZwWYj-LKFRBHDy-WTaHlE',
  // }
  jwt = JSON.parse(jwt || '{}')

  if (jwt?.access_token) {
    config.headers['Authorization'] = `Bearer ${jwt?.access_token}`
  }
  return config
})

export default instance
