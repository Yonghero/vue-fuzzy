import type { App, Component } from 'vue'
import type { AxiosInstance } from 'axios'
import './style/index.scss'
import 'virtual:windi.css'
export interface FuzzyOptions {
  request: AxiosInstance
}
/**
 * vue3 全局组件注册
 * @param App
 */
export declare function FuzzyInstall<T extends Component>(App: App<T>, options: FuzzyOptions): void
