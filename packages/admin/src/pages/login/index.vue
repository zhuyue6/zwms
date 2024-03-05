<template>
  <div>login</div>
</template>

<script setup lang="ts">
import { get, post } from '@/http'
get('http://127.0.0.1:3000/api/user/login', {
  name: 'root',
  password: '123456',
})
</script>
