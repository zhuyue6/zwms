<template>
  <div>
    <div class="flex mb-2">
      <el-button type="primary" @click="createUserPrev">创建</el-button>
    </div>
    <Table 
      :fetch="getList"
      :columns="columns"
      ref="tabelRef"
    >
      <template #permission="{ row }">
        {{ getPermissionText(row.permission) }}
      </template>
      <template #operation="{ row }">
        <div v-if="row.permission !== 0">
          <el-button type="text" @click="editUser(row)">编辑</el-button>
          <el-button type="text" @click="deleteUser(row)">删除</el-button>
        </div>
      </template>
    </Table>
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
          <el-input v-model="state.selected.name" :disabled="state.type === 'edit'"></el-input>
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
  import Table from '../../components/table.vue'
  import { PageDto } from '../../types'

  const i18n = useI18n()

  const rules = {
    name: [validate.validateName()],
    password: [validate.validatePassword()]
  }

  const columns = [
    {
      label: '用户名',
      prop: 'name'
    },
    {
      label: '权限',
      prop: 'permission',
      slot: 'permission'
    },
    {
      label: '操作',
      prop: 'operation',
      slot: 'operation'
    } 
  ]

  const state = reactive({
    tableData: [],
    dialogVisible: false,
    type: 'create',
    selected: {
      id: undefined,
      name: '',
      password: ''
    }
  })

  const formRef = ref()
  const tabelRef = ref()

  function getPermissionText(permissionNum: number) {
    const matcher = permission.Permission.find((item) => {
      return item.value === permissionNum
    })

    if (matcher) {
      return i18n.t(`user.${matcher.key}`)
    }
  }
  async function getList({ currentPage, pageSize }: PageDto) {
    const res = await USERAPI.getList({ currentPage, pageSize })
    state.tableData = res.list
    return {
      total: res.total,
      data: res.list
    }
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
            id: state.selected.id,
            name: state.selected.name,
            password: state.selected.password
          })
        }
        tabelRef.value.load()
        dialogVisible(false)
      }
    })
  }

  function editUser(user) {
    state.type = 'edit'
    state.selected.id = user.id
    state.selected.name = user.name
    state.selected.password = user.password
    dialogVisible(true)
  }

  async function deleteUser(user) {
    await ElMessageBox.confirm('确定要删除用户?')
    await USERAPI.del({
      id: user.id
    })
    tabelRef.value.load()
  }

  onMounted(() => {
    tabelRef.value.load()
  })
</script>