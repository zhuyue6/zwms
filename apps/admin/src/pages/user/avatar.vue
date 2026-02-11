<template>
  <div class="flex">
    <el-upload
      :before-upload="upload"
    >
      <div class="relative">
        <el-avatar 
          size="150"
          :src="userInfo.avatarUrl"
        />
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
  import { user } from '../../api'
  import { UploadProps, ElMessage } from 'element-plus'
  import { regex } from '../../shared'
  import { useUserInfo } from '../../hooks'

  const { userInfo, updateUserInfo } = useUserInfo()

  const upload: UploadProps['beforeUpload'] = async (rawFile: any) => {
    if (regex.AVATAR_TYPE_REGEX.test(rawFile.type)) {
      ElMessage.error('Avatar picture type must be jpg/jpeg/png')
      return false
    }
    if (rawFile.size / 1024 / 1024 > 2) {
      // 不能大于2M
      ElMessage.error('Avatar picture size can not exceed 2MB!')
      return false
    }
    await user.uploadAvatar(rawFile)
    updateUserInfo()
  }
</script>