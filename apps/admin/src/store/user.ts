import { defineStore } from 'pinia'
import { User } from '../types'

export const useUserStore = defineStore('user', {
  state() {
    return {
      info: {} as User
    }
  }
})