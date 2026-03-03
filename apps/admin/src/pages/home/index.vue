<template>
  <el-container class="w-full h-full">
    <el-header class="h-15">
      <headerBar />
    </el-header>
    <el-container>
      <el-aside class="w-50 mt-0.5">
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
  const { updateUserInfo } = useUserInfo()

  onMounted(async () => {
    updateUserInfo()
  })

</script>