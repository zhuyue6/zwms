import http, {InternalAxiosRequestConfig} from '@zwms/http'
import { ElMessage } from 'element-plus'
export { get, post } from '@zwms/http'
import router from '@/router'

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>)=>{
  return config
})

http.interceptors.response.use((response)=>{
  if (response.data?.code !== 0) {
    ElMessage({
      message: response.data.msg,
      type: 'error',
    })
    if (
      [403, 404, 405].includes(response.data?.code)
    ) {
      router.push({
        path: '/login',
      })
    }
    return Promise.reject(response.data.msg)
  }
  return response
}, (error)=>{
  if (
    [403, 404, 405].includes(
      error?.response?.data?.code
    )
  ) {
    ElMessage({
      message: error?.response?.data?.msg,
      type: 'error',
    })
    router.push({
      path: '/login',
    })
    return
  }
  ElMessage({
    message: '网络错误',
    type: 'error',
  })
  return Promise.reject(error)
})
