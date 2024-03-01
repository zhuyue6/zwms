import axios, {type AxiosRequestConfig} from 'axios'

const http = axios.create({
  timeout: 100000
})

function get<T, P={}>(url: string, params: P, config?: AxiosRequestConfig) {
  return http.get<T>(url, {
    ...config,
    params,
  })
}

function post<T, P={}>(url: string, params: P, config?: AxiosRequestConfig) {
  return http.post<T>(url, params, config)
}

export { get, post }

export default http
