import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import axios from 'axios'
import 'virtual:windi.css'
import { FuzzyInstall } from '../core/index'
import '~/style/index.scss'

import App from './App.vue'

const axiosInstance = axios.create({
  baseURL: 'test', // api的base_url
  timeout: 300000, // 请求超时时间
})

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(FuzzyInstall, {
    request: axiosInstance,
  })
  .mount('#app')
