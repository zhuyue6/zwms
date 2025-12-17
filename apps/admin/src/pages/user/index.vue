<template>
  <div class="flex pl-[100px] pt-[60px]">
    <el-form label-width="100" class="w-[600px]">
      <el-form-item label="用户名">
        <div class="flex">
          <el-input v-model="state.formData.name" />
          <el-button class="">修改</el-button>
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="state.formData.password"  /> 
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="state.formData.age"  /> 
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar size="100" :src="state.formData.avatarUrl"></el-avatar>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { useUserInfo } from '../../hooks'
  import { User } from '../../types'
  import { reactive, watchEffect, toValue } from 'vue'
  const { userInfo } = useUserInfo()

  interface State {
    formData: Partial<User>
  }

  const state: State = reactive({
    formData: {
      name: '',
      password: '',
      avatarUrl: '',
      age: undefined
    }
  })

  watchEffect(() => {
    state.formData = {
      ...toValue(userInfo)
    } as any
  })

</script>