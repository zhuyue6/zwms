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
        prop="title" 
        label="文章标题"
      />
      <el-table-column 
        prop="categoryName" 
        label="类别"
      />
      <el-table-column 
        prop="tagName" 
        label="标签"
      />
      <el-table-column 
        prop="creatorName" 
        label="创建人"
      />
      <el-table-column 
        prop="updateTime" 
        label="更新时间"
      />
      <el-table-column 
        :label="$t('common.operate')" 
      >
        <template #default="{ row }">
          <div v-if="row.permission !== 0">
            <el-button type="text" @click="editItem(row)">编辑</el-button>
            <el-button type="text" @click="deleteItem(row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="state.dialogVisible"
      :title="state.type === 'create' ? '创建文章' : '编辑文章'"
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

  const i18n = useI18n()

  const rules = {
    categoryId: [validate.validateRequire()],
  }

  const state = reactive({
    tableData: [],
    dialogVisible: false,
    type: 'create',
    categoryList: [],
    tagList: [],
    selected: {
      id: '',
      title: '',
      categoryId: '',
      tagId: '',
    }
  })

  const formRef = ref()

  async function getList() {
    const res = await ARTICLERAPI.getArticleList()
    const resTag = await ARTICLERAPI.getTagList()
    state.tagList = resTag.list
    const resCategory = await ARTICLERAPI.getCategoryList()
    state.categoryList = resCategory.list
    state.tableData = res.list
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
            tagId: state.selected.tagId ? Number(state.selected.tagId) :  undefined,
          })
        } else {
          await ARTICLERAPI.updateArticle({
            id: Number(state.selected.id),
            title: state.selected.title,
            categoryId: Number(state.selected.categoryId),
            tagId: state.selected.tagId ? Number(state.selected.tagId) :  undefined,
          })
        }
        getList()
        dialogVisible(false)
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
    getList()
  }

  onMounted(() => {
    getList()
  })
</script>