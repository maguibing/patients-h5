import { useUserStore } from '@/stores'
import { Toast } from 'vant'
import axios, { type Method } from 'axios'
import router from '@/router'

type Data<T> = {
  code: number
  message: string
  data: T
}

const instance = axios.create({
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token) {
      config.headers['Authorization'] = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code !== 10000) {
      Toast(res.data.message)
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      const store = useUserStore()
      store.delUser()
      router.push(`/login?redirectUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(err)
  }
)

const request = <T>(url: string, method: Method = 'get', data?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}

export { instance, request }
