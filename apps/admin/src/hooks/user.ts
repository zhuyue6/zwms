import { useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { User } from '../types'

export function useUserInfo() {
  const userStore = useUserStore()
  const { info: userInfo } = storeToRefs(userStore)
  function setUserInfo(userInfo: User) {
    userStore.info = userInfo
  }
  return { 
    userInfo, 
    setUserInfo
  }
}