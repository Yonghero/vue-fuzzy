import type { App, Component } from 'vue'
import type { AxiosInstance } from 'axios'
import Fuzzy from './Fuzzy/index.vue'
import { setRequest, setResponse } from './shared'
import type { ResponseHandler } from './Fuzzy/types'

export interface FuzzyOptions {
  request: AxiosInstance
  componentName?: string
  implResponse: (response: any) => ResponseHandler
}

export const FormItemEnum = {
  select: 1,
  input: 2,
  switch: 3,
  radio: 4,
  datePicker: 5,
  datePickerRange: 6,
  cascader: 7,
}
/**
 * vue3 全局组件注册
 * @param App
 */
export function FuzzyInstall<T extends Component>(App: App<T>, options: FuzzyOptions) {
  setRequest(options.request)
  setResponse(options.implResponse)
  App.component(
    options.componentName
      ? options.componentName
      : 'Fuzzy',
    Fuzzy)
}
