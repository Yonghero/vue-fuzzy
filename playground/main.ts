import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import '~/style/index.scss'
import 'virtual:windi.css'
import { FuzzyInstall } from '../core/index'
import type { ResponseHandler } from '../core/Fuzzy/types'
import App from './App.vue'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3300/api', // api的base_url
  timeout: 300000, // 请求超时时间
})

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(FuzzyInstall, {
    request: axiosInstance,
    implResponse: (response: any): ResponseHandler => ({
      data: response.data.data,
      success: response.status === 200,
      total: response.data.total,
    }),
  })
  .mount('#app')
