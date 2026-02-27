<template>
  <div>
    <div class="flex mb-2">
      <el-button type="primary" @click="createPrev">创建</el-button>
    </div>
    <el-table :data="state.tableData" stripe>
      <el-table-column 
        prop="id" 
        label="id"
      />
      <el-table-column 
        prop="categoryName" 
        label="类别名称"
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
      :title="state.type === 'create' ? '创建类别' : '编辑类别'"
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
          prop="categoryName"
          label="类别名称"
        >
          <el-input v-model="state.selected.categoryName"></el-input>
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
    categoryName: [validate.validateRequire()],
  }

  const state = reactive({
    tableData: [],
    dialogVisible: false,
    type: 'create',
    selected: {
      id: '',
      categoryName: ''
    }
  })

  const formRef = ref()

  async function getList() {
    const res = await ARTICLERAPI.getCategoryList()
    state.tableData = res.list
  }

  function createPrev() {
    state.type = 'create'
    state.selected.categoryName = ''
    dialogVisible(true)
  }

  function dialogVisible(visible: boolean) {
    state.dialogVisible = visible
  }

  function handleTag() {
    formRef.value.validate(async (isValid: boolean) => {
      if (isValid) {
        if (state.type === 'create') {
          await ARTICLERAPI.createCategory({
            categoryName: state.selected.categoryName,
          })
        } else {
          await ARTICLERAPI.updateCategory({
            id: Number(state.selected.id),
            categoryName: state.selected.categoryName
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
    state.selected.categoryName = tag.categoryName
    dialogVisible(true)
  }

  async function deleteTag(tag) {
    await ElMessageBox.confirm('确定要删除类别?')
    await ARTICLERAPI.deleteCategory({
      id: Number(tag.id)
    })
    getList()
  }

  onMounted(() => {
    getList()
  })
</script>