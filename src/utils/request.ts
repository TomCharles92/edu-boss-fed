import axios, { AxiosInstance } from 'axios'
import store from '@/store/index'

const request: AxiosInstance = axios.create({
  // 配置选项
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 响应拦截器

export default request
