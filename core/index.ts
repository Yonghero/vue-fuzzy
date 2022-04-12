import type { App, Component } from 'vue'
import type { AxiosInstance } from 'axios'
import Fuzzy from './Fuzzy/index.vue'
import { setRequest } from './shared'
import './style/index.scss'
import 'virtual:windi.css'

export interface FuzzyOptions {
  request: AxiosInstance
}

/**
 * vue3 全局组件注册
 * @param App
 */
export function FuzzyInstall<T extends Component>(App: App<T>, options: FuzzyOptions) {
  setRequest(options.request)
  App.component(Fuzzy.name, Fuzzy)
}
