<template>
  <div class="w-full">
    <el-form 
      class="w-[500px]"
      ref="passwordFormRef"
      :rules="passwordRules"
      :model="state.passwordFormData"
      label-width="100px"
    >
      <el-form-item :label="$t('user.originalPassword')" prop="password" >
        <el-input v-model="state.passwordFormData.password"  type="password" />
      </el-form-item>
      <el-form-item :label="$t('user.newPassword')" prop="newPassword">
        <el-input v-model="state.passwordFormData.newPassword" type="password" />
      </el-form-item>
      <el-form-item :label="$t('user.confirmPassword')" prop="confirmPassword">
        <el-input v-model="state.passwordFormData.confirmPassword" type="password" />
      </el-form-item>
    </el-form>
    <div class="ml-[250px] mt-4">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { user } from '../../api'
import { validate } from '../../shared'
import { utils } from '@zwms/shared'
import type { FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'

interface State {
  passwordFormData: {
    password: string
    newPassword: string
    confirmPassword: string
  }
}

const state: State = reactive({
  passwordFormData: {
    password: '',
    newPassword: '',
    confirmPassword: ''
  }
})

const i18n = useI18n()
const passwordFormRef = ref()
const passwordRules: FormRules = {
  password: [
    validate.validateRequire(),
    validate.validatePassword(),
    {
      validator(rule: any, value: string, callback: any) {
        if (value === state.passwordFormData.newPassword && state.passwordFormData.newPassword) {
          callback(new Error(i18n.t("validate.originNewPassword")))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  newPassword: [
    validate.validateRequire(),
    validate.validatePassword(),
    {
      validator(rule: any, value: string, callback: any) {
        if (value === state.passwordFormData.password && state.passwordFormData.password) {
          callback(new Error(i18n.t("validate.originNewPassword")))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ],
  confirmPassword: [
    validate.validateRequire(),
    validate.validatePassword(),
    {
      validator(rule: any, value: string, callback: any) {
        if (value === state.passwordFormData.newPassword && state.passwordFormData.newPassword) {
          callback(new Error(i18n.t("validate.confirmNewPassword")))
        } else {
          callback()
        }
      },
      trigger: 'change'
    }
  ]
}

function submit() {
   passwordFormRef.value?.validate(async (valid) => {
    if (valid) {
      await user.update({
        newPassWord: state.passwordFormData.newPassword,
        password: state.passwordFormData.password
      })
    }
  })
}
</script>