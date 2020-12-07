import axios, { AxiosInstance } from 'axios'
import store from '@/store/index'
import router from '@/router/index'
import { Message } from 'element-ui'
import qs from 'qs'

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

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 响应拦截器
let isRefreshing = false
let requests: Array<Function> = []
request.interceptors.response.use(function (response) { // 状态码为 2xx
  return response
}, function (error) { // 状态码不是 2xx
  if (error.response) { // 请求发出去了，收到响应，但是状态码超出了 2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效（没有token、token无效、token过期）
      // 1. 如果没有 refresh_token，去 login
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) { // 刷新 token
        isRefreshing = true // 开启刷新状态
        // 2. 如果有 refresh_token，则尝试获取新的 access_token
        return refreshToken()
          //    2.1 成功了 -> 重发失败的请求
          .then(res => {
            if (!res.data.success) {
              throw new Error('刷新 token 失败')
            }
            // 刷新 token 成功
            store.commit('setUser', res.data.content)
            // requests.forEach(cb => cb())
            requests = []
            return request(error.config)
          })
          //    2.2 失败了 -> login
          .catch(error => {
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(error)
          })
          .finally(() => {
            isRefreshing = false // 重置刷新状态
          })
      } else { // 刷新状态下，把请求挂起放到 requests 数组中
        return new Promise(resolve => {
          requests.push(() => {
            console.log(error.config)
            resolve(request(error.config))
          })
        })
        // return requests.push(() => {
        //   console.log(error.config)
        //   request(error.config)
        // })
      }
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了，没收到响应
    // 例如，请求超时、断网

  } else { // 在设置请求时发生了错误
  }

  return Promise.reject(error)
})

export default request
