<template>
  <el-dialog :modelValue="state.visible" @update:modelValue="updateVisible" :before-close="updateVisible(false)" width="500">
    <el-form :rules="rules" :model="state.formData" ref="formRef">
      <el-form-item 
        prop="name" 
        class="input-content-item"
        label="账号："
      >
        <el-input
          v-model="state.formData.name"
          placeholder="请输入账号"
          @keyup.enter="submit"
          size="large"
        />
      </el-form-item>
      <el-form-item 
        prop="password"
        class="input-content-item"
        label="密码："
      >
        <el-input
          size="large"
          v-model="state.formData.password"
          type="password"
          show-password
          placeholder="请输入密码"
          @keyup.enter="submit"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="state.visible = false">取消</el-button>
      <el-button type="primary" @click="submit">
        注册
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { FormInstance, ElMessage } from 'element-plus'
  import { validateRule } from '@/shared'
  import { ref, watchEffect } from 'vue'
  import { user } from '@/services'

  interface Prop {
    modelValue: boolean
  }

  const props = withDefaults(defineProps<Prop>(), {
    modelValue: false
  })

  interface State {
    formData: {
      name: string
      password: string
    },
    visible: boolean
  }

  const state:State = {
    formData: {
      name: '',
      password: ''
    },
    visible: false
  }

  watchEffect(()=>{
    state.visible = props.modelValue
  })

  const formRef = ref<FormInstance|null>()

  const rules = {
    name: [validateRule.required],
    password: [validateRule.required],
  }

  const emits = defineEmits(['update:modelValue'])

  function updateVisible(visible: boolean) {
    state.visible = visible
    emits('update:modelValue', visible)
  }

  function submit() {
    user.register(state.formData).then(()=>{
      ElMessage({
        message: '操作成功',
        type: "success",
      })
      state.visible = false
    })
  }
</script>

<style scoped lang="scss">

</style>