<template>
  <div class="w-full h-full flex">
    <div class="w-full bg-[#eee] flex items-center justify-center">
      <div class="p-8 bg-[#fff] rounded-md">
        <div class="flex flex-col w-[300px]">
          <el-form 
            :model="state.formData"
            label-width="auto"
            class="w-max-[600px]"
            :rules="rules"
            status-icon
            ref="formRef"
          >
            <el-form-item label="用户名"  prop="name">
              <el-input v-model="state.formData.name" />
            </el-form-item>
            <el-form-item label="密码"  prop="password">
              <el-input v-model="state.formData.password" type="password" />
            </el-form-item>
          </el-form> 
          <el-button class="mt-4" type="primary" @click="submit">{{ submitText }}</el-button>
          <div class="flex justify-end">
            <!-- <el-button type="text" @click="changeType('forget')">忘记密码</el-button> -->
            <el-button type="text" @click="changeType('register')">注册</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, ref } from 'vue'
  import { FormRules } from 'element-plus'
  import { validate, useToken } from '../../shared'
  import { user } from '../../api'
  import type { FormInstance } from 'element-plus'
  import { useRouter } from 'vue-router'
  
  interface State {
    type: "login" | 'register' | 'forget'
    formData: Record<string, unknown>
  }

  const rules: FormRules = {
    name: [validate.validateName()],
    password: [validate.validatePassword()]
  }

  const state: State = reactive({
    type: 'login',
    formData: {
      name: '',
      password: '',
      newPassWord: ''
    }
  })

  const router = useRouter()
  const formRef = ref<FormInstance>()
  const submitText = computed(() => {
    let text = '登录'
    if (state.type === 'forget') {
      text = '找回密码'
    } else if (state.type === 'register') {
      text = '注册'
    }
    return text
  })


  function changeType(type: State['type']) {
    state.type = type
    state.formData.name = ''
    state.formData.password = ''
    formRef.value?.resetFields()
  }

  function submit() {
    formRef.value?.validate(async (valid)=>{
      if (valid) {
        const params = {
          name: state.formData.name as string,
          password: state.formData.password as string
        }
        if (state.type === 'login') {
          const { token } = await user.login(params)
          const setToken = useToken()[1]
          setToken(token)
          router.push({
            path: '/'
          })
        } else if (state.type === 'register') {
          user.register(params)
        } else {
    
        }
      }
    })
  }

</script>

<style lang="scss" scoped>
</style>
