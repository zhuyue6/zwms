<template>
  <el-menu
    default-active="/user"
    router
  >
    <el-menu-item index="/user/list">用户管理</el-menu-item>
    <el-sub-menu index="/user">
      <template #title>用户中心</template>
      <el-menu-item index="/user/info">个人信息</el-menu-item>
      <el-menu-item index="/user/safe">安全中心</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="/article">
      <template #title>文章栏</template>
      <el-menu-item index="/article/list">文章列表</el-menu-item>
      <el-menu-item index="/article/category">类别管理</el-menu-item>
      <el-menu-item index="/article/tag">标签管理</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>


<script setup lang="ts">

</script>