<template>
  <el-menu
    default-active="/user"
    router
  >
    <el-sub-menu index="/user">
      <template #title>用户中心</template>
      <el-menu-item index="/user/info">个人信息</el-menu-item>
      <el-menu-item index="/user/safe">安全中心</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>


<script setup lang="ts">

</script>