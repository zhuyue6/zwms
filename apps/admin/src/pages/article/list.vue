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
          <el-button type="text" @click="viewItem(row)">查看详情</el-button>
          <el-button type="text" @click="editItem(row)">编辑</el-button>
          <el-button type="text" @click="deleteItem(row)">删除</el-button>
        </div>
      </template>
    </Table>
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.type === 'create' ? '创建文章' : '编辑文章'"
      width="500"
      destroy-on-close
    >
      <el-form 
        ref="formRef"
        :model="state.selected"
        :rules="rules"
        class="w-[400px]"
        label-width="100"
      >
        <el-form-item 
          prop="title"
          label="文章标题"
        >
          <el-input v-model="state.selected.title"></el-input>
        </el-form-item>
        <el-form-item 
          prop="categoryId"
          label="类别"
        >
          <el-select v-model="state.selected.categoryId">
            <el-option 
              v-for="item of state.categoryList"
              :key="item.id" 
              :label="item.categoryName"
              :value="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item 
          prop="tagId"
          label="标签"
        >
          <el-select v-model="state.selected.tagId">
            <el-option 
              v-for="item of state.tagList"
              :key="item.id" 
              :label="item.tagName"
              :value="item.id"
              ></el-option>
          </el-select>
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
  import { useRouter } from 'vue-router'
  import Table from '../../components/table.vue'
  import type { PageDto } from '../../types'

  const i18n = useI18n()
  const router = useRouter()

  const columns = [
    { label: 'id', prop: 'id' },
    { label: '文章标题', prop: 'title' },
    { label: '类别', prop: 'categoryName' },
    { label: '标签', prop: 'tagName' },
    { label: '创建人', prop: 'creatorName' },
    { label: '更新时间', prop: 'updateTime' },
    { label: '操作', slot: 'operate' },
  ]

  const rules = {
    categoryId: [validate.validateRequire()],
  }

  const state = reactive({
    dialogVisible: false,
    type: 'create',
    categoryList: [] as { id: number; categoryName: string }[],
    tagList: [] as { id: number; tagName: string }[],
    selected: {
      id: '',
      title: '',
      categoryId: '',
      tagId: '',
    }
  })

  const formRef = ref()
  const tableRef = ref()

  async function getList({ currentPage, pageSize }: PageDto) {
    const res = await ARTICLERAPI.getArticleList({ currentPage, pageSize })
    return {
      total: res.total ?? res.list?.length ?? 0,
      data: res.list ?? [],
    }
  }

  async function loadOptions() {
    const [resTag, resCategory] = await Promise.all([
      ARTICLERAPI.getTagList({ currentPage: 1, pageSize: 100 }),
      ARTICLERAPI.getCategoryList({ currentPage: 1, pageSize: 100 }),
    ])
    state.tagList = resTag.list ?? []
    state.categoryList = resCategory.list ?? []
  }

  function createPrev() {
    state.type = 'create'
    state.selected.title = ''
    state.selected.categoryId = ''
    state.selected.tagId = ''
    dialogVisible(true)
  }

  function dialogVisible(visible: boolean) {
    state.dialogVisible = visible
  }

  function handleTag() {
    formRef.value.validate(async (isValid: boolean) => {
      if (isValid) {
        if (state.type === 'create') {
          await ARTICLERAPI.createArticle({
            title: state.selected.title,
            categoryId: Number(state.selected.categoryId),
            ...(state.selected.tagId ? { tagId: Number(state.selected.tagId) } : {}),
          })
        } else {
          await ARTICLERAPI.updateArticle({
            id: Number(state.selected.id),
            title: state.selected.title,
            categoryId: Number(state.selected.categoryId),
            ...(state.selected.tagId ? { tagId: Number(state.selected.tagId) } : {}),
          })
        }
        tableRef.value?.load()
        dialogVisible(false)
      }
    })
  }

  function viewItem(item) {
    router.push({
      name: 'articleInfo',
      query: {
        id: item.id
      }
    })
  }

  function editItem(item) {
    state.type = 'edit'
    state.selected.id = item.id
    state.selected.title = item.title
    state.selected.categoryId = item.categoryId
    state.selected.tagId = item.tagId
    dialogVisible(true)
  }

  async function deleteItem(item) {
    await ElMessageBox.confirm('确定要删除文章?')
    await ARTICLERAPI.deleteArticle({
      id: Number(item.id)
    })
    tableRef.value?.load()
  }

  onMounted(() => {
    loadOptions()
  })
</script>