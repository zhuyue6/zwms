<template>
  <div>
    <div class="flex mb-2">
      <el-button type="primary" @click="createUserPrev">创建</el-button>
    </div>
    <el-table :data="state.tableData" stripe>
      <el-table-column 
        prop="name" 
        :label="$t('user.name')"
      />
      <el-table-column 
        prop="age" 
        :label="$t('user.age')"
      />
      <el-table-column 
        prop="permission"
        :label="$t('user.permission')" 
      >
        <template #default="{ row }">
          {{ getPermissionText(row.permission) }}
        </template>
      </el-table-column>
      <el-table-column 
        :label="$t('common.operate')" 
      >
        <template #default="{ row }">
          <div v-if="row.permission !== 0">
            <el-button type="text" @click="editUser(row)">编辑</el-button>
            <el-button type="text" @click="deleteUser(row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.type === 'create' ? '创建用户' : '编辑用户'"
      width="500"
    >
      <el-form 
        ref="formRef"
        :model="state.selected"
        :rules="rules"
        class="w-[400px]"
        label-width="100"
      >
        <el-form-item 
          prop="name"
          label="用户名"
        >
          <el-input v-model="state.selected.name"></el-input>
        </el-form-item>
        <el-form-item 
          prop="password"
          label="密码"
        >
          <el-input v-model="state.selected.password" type="password" show-password></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible(false)">取消</el-button>
        <el-button type="primary" @click="handleUser">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { permission } from '../../consts'
  import { user as USERAPI } from '../../api'
  import { ElMessageBox } from 'element-plus'
  import { validate } from '../../shared'

  const i18n = useI18n()

  const rules = {
    name: [validate.validateName()],
    password: [validate.validatePassword()]
  }

  const state = reactive({
    tableData: [],
    dialogVisible: false,
    type: 'create',
    selected: {
      name: '',
      password: ''
    }
  })

  const formRef = ref()

  function getPermissionText(permissionNum: number) {
    const matcher = permission.Permission.find((item) => {
      return item.value === permissionNum
    })

    if (matcher) {
      return i18n.t(`user.${matcher.key}`)
    }
  }
  async function getList() {
    const res = await USERAPI.getList()
    state.tableData = res.list
  }

  function createUserPrev() {
    state.type = 'create'
    state.selected.name = ''
    state.selected.password = ''
    dialogVisible(true)
  }

  function dialogVisible(visible: boolean) {
    state.dialogVisible = visible
  }

  function handleUser() {
    formRef.value.validate(async (isValid: boolean) => {
      if (isValid) {
        if (state.type === 'create') {
          await USERAPI.register({
            name: state.selected.name,
            password: state.selected.password
          })
        } else {
          await USERAPI.update({
            name: state.selected.name,
            password: state.selected.password
          })
        }
        getList()
        dialogVisible(false)
      }
    })
  }

  function editUser(user) {
    state.type = 'edit'
    state.selected.name = user.name
    state.selected.password = user.password
    dialogVisible(true)
  }

  async function deleteUser(user) {
    await ElMessageBox.confirm('确定要删除用户?')
    await USERAPI.del({
      id: user.id
    })
    getList()
  }

  onMounted(() => {
    getList()
  })
</script>