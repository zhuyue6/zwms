import { useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { User } from '../types'
import { user as UserAPI } from '../api'

export function useUserInfo() {
  const userStore = useUserStore()
  const { info: userInfo } = storeToRefs(userStore)
  function setUserInfo(userInfo: User) {
    userStore.info = userInfo
  }

  async function updateUserInfo() {
    const { user } = await UserAPI.getInfo()
    if (user) {
      setUserInfo(user)
    }
  }
  return { 
    userInfo, 
    setUserInfo,
    updateUserInfo
  }
}