import { get, post, default as http } from '@zwms/http'
import { useToken } from '../shared'
import { ElMessage } from 'element-plus'
import router from '../router'
export { get, post, http }


http.interceptors.request.use((config)=>{
  const [token] = useToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use((res)=>{
  if (res.data.code !== 10000) {
    ElMessage.error(res.data.message)
    return Promise.reject()
  }

  if (res.state === 401) {
    router.push({
      path: '/login'
    })
    return Promise.reject()
  }
  return res.data.data
}, (error) => {
  if (error.response.status === 401) {
    router.push({
      path: '/login'
    })
    ElMessage.error('登录过期，请重新登录。')
    return Promise.reject()
  }
  ElMessage.error('网络错误')
  return  Promise.reject(error)
})


http.defaults.baseURL = 'http://localhost:3000'