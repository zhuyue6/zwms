<template>
  <el-container>
    <el-header class="h-[60px]">
      <headerBar />
    </el-header>
    <el-container>
      <el-aside class="w-[200px] mt-[2px]">
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