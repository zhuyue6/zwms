<template>
  <div>
    <div class="flex mb-2">
      <el-button type="primary" @click="createPrev">创建</el-button>
    </div>
    <Table
      ref="tableRef"
      :fetch="getList"
      :columns="columns"
    >
      <template #operate="{ row }">
        <div v-if="row.permission !== 0">
          <el-button type="text" @click="editTag(row)">编辑</el-button>
          <el-button type="text" @click="deleteTag(row)">删除</el-button>
        </div>
      </template>
    </Table>
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
  import { reactive, ref } from 'vue'
  import { article as ARTICLERAPI } from '../../api'
  import { ElMessageBox } from 'element-plus'
  import { validate } from '../../shared'
  import Table from '../../components/table.vue'
  import type { PageDto } from '../../types'

  const columns = [
    { label: 'id', prop: 'id' },
    { label: '类别名称', prop: 'categoryName' },
    { label: '操作', slot: 'operate' },
  ]

  const rules = {
    categoryName: [validate.validateRequire()],
  }

  const state = reactive({
    dialogVisible: false,
    type: 'create',
    selected: {
      id: '',
      categoryName: ''
    }
  })

  const formRef = ref()
  const tableRef = ref()

  async function getList({ currentPage, pageSize }: PageDto) {
    const res = await ARTICLERAPI.getCategoryList({ currentPage, pageSize })
    return {
      total: res.total ?? res.list?.length ?? 0,
      data: res.list ?? [],
    }
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
        tableRef.value?.load()
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
    tableRef.value?.load()
  }
</script>