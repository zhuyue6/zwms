<template>
  <div class="flex h-full w-full">
    <div class="h-full flex items-center">
      logo
    </div>
    <div class="h-full flex items-center w-full justify-end">
      <div class="flex items-center">
        <div class="mr-2">{{ userInfo.name }}</div>
        <el-avatar :src="userInfo.avatarUrl" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { useUserInfo } from '../../hooks'
  const { userInfo } = useUserInfo()

  watch(userInfo, () => {
    console.log(userInfo)
  })
</script>