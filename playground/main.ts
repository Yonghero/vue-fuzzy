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
  baseURL: 'http://localhost:3301/api', // api的base_url
  timeout: 300000, // 请求超时时间
})
axiosInstance.interceptors.request.use((config: any) => {
  config.headers.Authorization = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJfbmFtZSI6InlvdW5naGVybyIsInNjb3BlIjpbImFwcCJdLCJuYW1lIjoi5byg5a6H6L2pIiwiaWQiOiIyMTQiLCJleHAiOjE2NDcyNzM1MDIsImlkbm8iOm51bGwsImF1dGhvcml0aWVzIjpbIk5PVEVfUEVSTUlTU0lPTiJdLCJqdGkiOiIzOWUzYWZhNC1kYTIyLTRhNDQtYjIxMC1jZTQ0OWMzYjk3NjIiLCJjbGllbnRfaWQiOiJTbWFydFBhcmtBcHAifQ.ge1ogiI6dDQJU6m3L3BdtomUnytXqcklcGuD4SZNDZJKs9taBm_md5XlUSA8_0PuEcCQaPavoCsyAxCYd5JaLJ3svXPphQG7GoZ13uAqT-tELgQIj7B7Il3tM07SeQPSUtBy3_7lNyGLyCYbTz4HXLumteakk7o2Pw4d4rWcOkY'
  return config
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
