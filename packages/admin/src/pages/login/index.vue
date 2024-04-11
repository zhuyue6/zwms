<template>
  <div class="login-container text-base">
    <animationText
      class="login-content-bg text-content"
      v-if="state.step === 1"
      :text="config.welcomeText"
      :infinite="false"
      @finish="animationTextFinish"
    />
    <particle v-else class="login-content-bg" />
    <shuttleBg ref="shuttleRef" class="login-bg" />
    <haloBorder class="login-content">
      <div class="login-content-title">{{ config.title }}</div>
      <div class="input-content">
        <el-form :rules="rules" :model="state.formData" ref="formRef">
          <el-form-item prop="name" class="input-content-item">
            <el-input
              v-model="state.formData.name"
              placeholder="请输入账号"
              @keyup.enter="submit"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password" class="input-content-item">
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
      </div>
      <el-button
        class="submit-button"
        type="primary"
        size="large"
        @click="submit"
        >登录</el-button
      >
      <el-button
        class="submit-button"
        type="primary"
        size="large"
        @click="enterRegister"
        >注册</el-button
      >
    </haloBorder>
    <register v-model="state.visible" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, ElMessage } from 'element-plus'
import { user } from '@/services'
import config from '../../../config'
import { useRouter } from 'vue-router'
import { validateRule } from '@/shared'
import animationText from '@/components/animations/text/index.vue'
import shuttleBg from '@/components/animations/shuttleBg/index.vue'
import haloBorder from '@/components/animations/haloBorder/index.vue'
import particle from '@/components/animations/particle/index.vue'
import register from './register.vue'

interface State {
  formData: {
    name: string
    password: string
  }
  step: number
  loading: boolean
  visible: boolean
}

const state: State = reactive({
  formData: {
    name: '',
    password: '',
  },
  loading: false,
  step: 1,
  visible: true
})

const rules = {
  name: [validateRule.required],
  password: [validateRule.required],
}


const formRef = ref<FormInstance | null>(null)
const shuttleRef = ref<InstanceType<typeof shuttleBg> | null>(null)

const router = useRouter()

function animationTextFinish() {
  state.step++
  shuttleRef.value?.fast()
}

function enterRegister() {
  state.visible = true
}

function submit() {
  if (state.loading) {
    return ElMessage.success('正在登陆，请稍等。')
  }
  formRef.value?.validate((valid) => {
    if (valid) {
      state.loading = true
      user.login({
        name: state.formData.name,
        password: state.formData.password,
      }).then(
        () => {
          ElMessage.success('登录成功')
          router.push({
            path: '/home',
          })
        },
        () => {
          state.loading = false
        }
      )
    }
  })
}
</script>

<style lang="scss" scoped>
@use '@/styles/common';
.login-container {
  width: 100%;
  height: 100%;
  @include common.flex;
  position: relative;
  overflow: hidden;
  .login-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .login-content-bg {
    position: relative;
    z-index: 1;
    width: 784px;
    height: 400px;
    &.text-content {
      pointer-events: none;
    }
  }
  .login-content {
    position: relative;
    z-index: 1;
    width: 300px;
    height: 400px;
    background: rgba(13, 105, 214, 0.15);
    padding: 40px;
    border-radius: 8px;
    @include common.flex(flex-start, center, column);
    .login-content-title {
      @include common.font(
        26px,
        #fff,
        bold,
        null,
        MicrosoftYaHei,
        6px 6px 6px rgba(255, 255, 255, 0.3)
      );
    }
    .input-content {
      width: 100%;
      margin: 10px 0 12px 0;
      .input-content-item {
        @include common.flex(space-between, flex-start);
        margin-top: 24px;
        .verification-code-input {
          width: 200px;
        }
        .verification-code-button {
          width: 110px;
        }
      }
    }
    .submit-button {
      width: 100%;
      margin-bottom: 16px;
    }
  }
  :deep {
    .el-button {
      margin-left: 0
    }
  }
}
</style>
