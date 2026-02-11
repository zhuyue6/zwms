<template>
    <div class="flex pl-[100px] pt-[60px] flex-col">
      <el-form
        :model="state.formData"
        :rules="rules"
        ref="formRef"
        class="w-[600px]"
        label-width="200"
      >
        <el-form-item label="头像">
          <Avatar />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="state.formData.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="state.formData.age" />
        </el-form-item>
        <el-form-item label="权限">
          {{ permissionText }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" :disabled="saveDisabled">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
    import { useUserInfo } from '../../hooks'
    import { reactive, watchEffect, computed, ref } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { validate } from '../../shared'
    import { user } from '../../api'
    import { permission } from '../../consts'
    import Avatar from './avatar.vue'

    const { userInfo, updateUserInfo } = useUserInfo()
    const formRef = ref()
    const i18n = useI18n()

    interface State {
      formData: Partial<Record<string, any>>
      compareData: Partial<Record<string, any>>
      type: 'view' | 'edit'
    }
  
    const rules = {
      name: [validate.validateName()],
      age: [validate.validateNumber(1, 150)]
    }

    const state: State = reactive({
      formData: {
        name: '',
        age: '0'
      },
      compareData: {
        name: '',
        age: '0'
      }
    })

    const permissionText = computed(() => {
      const matcher = permission.Permission.find((item) => {
        return item.value === userInfo.value.permission
      })

      if (matcher) {
        return i18n.t(`user.${matcher.key}`)
      }
    })

    const saveDisabled = computed(() => {
      return state.formData.name === state.compareData.name && state.formData.age === state.compareData.age
    })

    watchEffect(() => {
      state.formData.name = userInfo.value.name
      state.formData.age = String(userInfo.value.age)
      state.compareData.name = userInfo.value.name
      state.compareData.age = String(userInfo.value.age)
    })

    function submit() {
      formRef.value.validate(async (isvalid: boolean)=>{
        if (isvalid) {
          await user.update({
            name: state.formData.name,
            age: Number(state.formData.age)
          })
          updateUserInfo()
        }
      })
    }
  
  </script>