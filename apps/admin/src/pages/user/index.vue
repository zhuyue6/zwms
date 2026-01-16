<template>
  <div class="flex pl-[100px] pt-[60px] flex-col">
    <el-form label-width="100" class="w-[600px]" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <div class="flex">
          <el-input v-model="state.formData.name" :disabled="state.type !== 'edit'" />
        </div>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="state.formData.password" type="password" :disabled="state.type !== 'edit'"  /> 
      </el-form-item>
      <el-form-item label="年龄" prop="age">
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

    <div class="ml-[100px] flex">
      <el-button class="w-[100px]" @click="changeState">{{ stateText }}</el-button>
      <el-button class="w-[100px] ml-[10px]" type="primary" v-if="state.type === 'edit'" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserInfo } from '../../hooks'
  import { User } from '../../types'
  import { reactive, watchEffect, toValue, computed } from 'vue'
  import { validate } from '../../shared'
  import { user } from '../../api'

  const { userInfo } = useUserInfo()

  interface State {
    formData: Partial<User>
    type: 'view' | 'edit'
  }

  const rules = {
    name: [validate.validateName],
    password: [validate.validatePassword]
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

  const stateText = computed(() => {
    return state.type === 'view' ? '修改' : '返回'
  })

  watchEffect(() => {
    state.formData = {
      ...toValue(userInfo)
    } as any
  })

  function submit() {
    if (state.type === 'view') {
      state.type
    } else {
      user.update({
        name: state.formData.name,
        password: state.formData.password
      } as any)
    }
  }

  function changeState() {
    state.type = state.type === 'view' ? 'edit' : 'view'
  }

  function upload() {
    
  }

</script>