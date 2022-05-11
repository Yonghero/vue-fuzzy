import type { App, Component } from 'vue'
import type { AxiosInstance } from 'axios'
import Fuzzy from './Fuzzy/index.vue'
import { setRequest, setResponse } from './shared'
// import './style/index.scss'
import type { ResponseHandler } from './Fuzzy/types'

export interface FuzzyOptions {
  request: AxiosInstance
  componentName?: string
  implResponse: (response: any) => ResponseHandler
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
