<template>
  <el-container>
    <el-header class="h-[60px] shadow-2xs">
      <headerBar />
    </el-header>
    <el-container>
      <el-aside class="w-[200px]">
        <menus />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import headerBar from './headerBar.vue'
  import menus from './menus.vue'
  import { useUserInfo } from '../../hooks'
  import { user as UserAPI } from '../../api'
  const { setUserInfo } = useUserInfo()

  onMounted(async () => {
    const { user } = await UserAPI.getInfo()
    if (user) {
      setUserInfo(user)
    }
  })

</script>