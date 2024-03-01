<template>
  <div>login</div>
</template>

<script setup lang="ts">
  import { get, post } from '@/http'
  get('http://127.0.0.1:3000/api/user/login', { aaa: 1111 })
  post('http://127.0.0.1:3000/api/user/register', { name: 2222 })
</script>