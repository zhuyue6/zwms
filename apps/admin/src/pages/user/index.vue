<template>
  <div class="flex pl-[100px] pt-[60px] flex-col">
    <el-form label-width="100" class="w-[600px]">
      <el-form-item label="用户名">
        <div class="flex">
          <el-input v-model="state.formData.name" :disabled="state.type !== 'edit'" />
        </div>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="state.formData.password" :disabled="state.type !== 'edit'"  /> 
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="state.formData.age" :disabled="state.type !== 'edit'"  /> 
      </el-form-item>
      <el-form-item label="头像">
        <div class="flex">
          <el-avatar size="100" :src="state.formData.avatarUrl"></el-avatar>
          <el-upload
            :before-upload="upload"
          >
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </div>
      </el-form-item>
    </el-form>
    <el-button class="w-[100px] ml-100px" @click="submit">修改</el-button>
  </div>
</template>

<script setup lang="ts">
  import { useUserInfo } from '../../hooks'
  import { User } from '../../types'
  import { reactive, watchEffect, toValue } from 'vue'
  const { userInfo } = useUserInfo()

  interface State {
    formData: Partial<User>
    type: 'view' | 'edit'
  }

  const state: State = reactive({
    formData: {
      name: '',
      password: '',
      avatarUrl: '',
      age: undefined
    },
    type: 'view'
  })

  watchEffect(() => {
    state.formData = {
      ...toValue(userInfo)
    } as any
  })

  function submit() {
    if (state.type === 'view') {
      
    }
  }

  function upload() {
    
  }

</script>