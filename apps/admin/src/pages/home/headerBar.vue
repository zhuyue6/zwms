<template>
  <div class="flex h-full w-full shadow-2xs">
    <div class="h-full flex items-center">
      <el-image class="h-full" :src="logoUrl" fit="full" />
    </div>
    <div class="h-full flex items-center w-full justify-end">
      <div class="flex items-center mr-[30px]">
        <div class="mr-2">{{ userInfo.name }}</div>
        <el-popover 
          placement="bottom" 
          trigger="click"
          :visible="visible"
        >
          <template #reference>
            <el-avatar :src="userInfo.avatarUrl" @click="setPopoverVisible(!visible)" />
          </template>
          <div class="flex flex-col items-center">
            <el-button type="text" @click="updateInfo">修改个人信息</el-button>
            <el-button type="text" @click="logout">退出登录</el-button>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserInfo } from '../../hooks'
  import { ref } from 'vue'
  import { user } from '../../api'
  import { useRouter } from 'vue-router'
  import logoUrl from '../../../public/imgs/logos/logo.png'

  const { userInfo } = useUserInfo()
  const router = useRouter()
  const visible = ref(false)
  function logout() {
    user.logout().then(() => {
      router.push({ path: 'login' })
      setPopoverVisible(false)
    })
  }

  function updateInfo() {
    router.push({ path: '/user' })
    setPopoverVisible(false)
  }

  function setPopoverVisible(data: boolean) {
    visible.value = data
  }
</script>