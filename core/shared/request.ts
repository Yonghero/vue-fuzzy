import type { AxiosInstance } from 'axios'
import { ref } from 'vue'
import type { ImplResponseType } from '../Fuzzy/types'

export const axiosInstance = ref<AxiosInstance>()
// eslint-disable-next-line import/no-mutable-exports
export let implResponse: ImplResponseType

export function getRequest(): AxiosInstance {
  return axiosInstance.value!
}

export function setRequest(ins: AxiosInstance) {
  axiosInstance.value = ins
}

export function setResponse(implResponseInvoke: ImplResponseType) {
  implResponse = implResponseInvoke
}

export function getResponse(response: any) {
  return implResponse(response)
}
