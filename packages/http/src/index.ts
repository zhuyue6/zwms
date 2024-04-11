import axios, {type AxiosRequestConfig} from 'axios'
export {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'


const http = axios.create({
  timeout: 100000
})

function get<T, P=Record<string, unknown>>(url: string, params: P, config?: AxiosRequestConfig) {
  return http.get<T>(url, {
    ...config,
    params,
  })
}

function post<T, P=Record<string, unknown>>(url: string, params: P, config?: AxiosRequestConfig) {
  return http.post<T>(url, params, config)
}

export { get, post }

export default http
