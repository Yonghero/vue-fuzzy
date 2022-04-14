import type { AxiosInstance } from 'axios'
import { ref } from 'vue'
export const axiosInstance = ref<AxiosInstance>()

export function getRequest(): AxiosInstance {
  return axiosInstance.value!
}

export function setRequest(ins: AxiosInstance) {
  axiosInstance.value = ins
}
