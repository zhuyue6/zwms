import axios, {type AxiosRequestConfig} from 'axios'

const http = axios.create({
  timeout: 100000,
})

function get<T=any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) {
  return http.get<T>(url, {
    ...config,
    params: params ?? {},
  })
}

function post<T=any>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) {
  return http.post<T>(url, params ?? {}, config)
}

export { get, post }

export default http

export type { AxiosRequestConfig }
