<template>
  <div>
    <div class="flex mb-2">
      <el-button type="primary" @click="createUserPrev">创建</el-button>
    </div>
    <el-table :data="state.tableData" stripe>
      <el-table-column 
        prop="id" 
        label="id"
      />
      <el-table-column 
        prop="tagName" 
        label="标签名称"
      />
      <el-table-column 
        :label="$t('common.operate')" 
      >
        <template #default="{ row }">
          <div v-if="row.permission !== 0">
            <el-button type="text" @click="editTag(row)">编辑</el-button>
            <el-button type="text" @click="deleteTag(row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.type === 'create' ? '创建标签' : '编辑标签'"
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
          prop="tagName"
          label="标签名称"
        >
          <el-input v-model="state.selected.tagName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible(false)">取消</el-button>
        <el-button type="primary" @click="handleTag">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { article as ARTICLERAPI } from '../../api'
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
      id: '',
      tagName: ''
    }
  })

  const formRef = ref()

  async function getList() {
    const res = await ARTICLERAPI.getTagList()
    state.tableData = res.list
  }

  function createUserPrev() {
    state.type = 'create'
    state.selected.tagName = ''
    dialogVisible(true)
  }

  function dialogVisible(visible: boolean) {
    state.dialogVisible = visible
  }

  function handleTag() {
    formRef.value.validate(async (isValid: boolean) => {
      if (isValid) {
        if (state.type === 'create') {
          await ARTICLERAPI.createTag({
            tagName: state.selected.tagName,
          })
        } else {
          await ARTICLERAPI.update({
            id: state.selected.id,
            password: state.selected.tagName
          })
        }
        getList()
        dialogVisible(false)
      }
    })
  }

  function editTag(tag) {
    state.type = 'edit'
    state.selected.id = tag.id
    state.selected.tagName = tag.tagName
    dialogVisible(true)
  }

  async function deleteTag(tag) {
    await ElMessageBox.confirm('确定要删除用户?')
    await ARTICLERAPI.del({
      id: tag.id
    })
    getList()
  }

  onMounted(() => {
    getList()
  })
</script>