<template>
  <div class="advanced-table">
    <el-table
      ref="tableRef"
      v-loading="state.loading"
      :data="state.tableData" 
      stripe
      :="$attrs"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.prop ?? col.slot ?? col.label"
        :label="col.label"
        :prop="col.prop"
        :width="col.width"
        :min-width="col.minWidth"
        :align="col.align"
      >
        <template v-if="col.slot" #default="scope">
          <slot :name="col.slot" :row="scope.row" />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pageVisible"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="state.total"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      class="mt-4 justify-end"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch, onMounted, computed } from 'vue'

  /** 列配置 */
  export interface TableCol {
    label: string
    prop?: string
    /** 使用插槽时传入插槽名，插槽参数为 { row } */
    slot?: string
    width?: string | number
    minWidth?: string | number
    align?: 'left' | 'center' | 'right'
  }

  /** 表格数据 */
  export interface TableData<T = unknown> {
    total?: number
    data: T[]
  }

  /** 分页参数（请求用） */
  export interface PageParams {
    currentPage: number
    pageSize: number
  }

  interface Props {
    /** 列配置 */
    columns: TableCol[]
    /** 表单验证规则 */
    /** 静态数据，当未使用 fetch 时生效 */
    data?: TableData
    /** 请求方法（优先级高于 data），返回 Promise<{ total, data }>，参数为分页信息（当 page.visible 时传入） */
    fetch?: (params: PageParams) => Promise<TableData>
    /** 分页配置，用于渲染与同步分页 */
    pageVisible?: boolean
    page?: PageParams
    /** 分页每页条数选项 */
    pageSizes?: number[]
  }

  const props = withDefaults(defineProps<Props>(), {
    data: undefined,
    fetch: undefined,
    pageVisible: true,
    page: () => ({
      pageSize: 10,
      currentPage: 1,
    }),
    pageSizes: () => [10, 20, 50, 100],
  })

  const emit = defineEmits<{
    (e: 'update:page', value: PageParams): void
  }>()

  const state = reactive<{
    tableData: unknown[]
    total: number
    loading: boolean
  }>({
    tableData: [],
    total: 0,
    loading: false,
  })

  const currentPage = computed({
    get: () => props.page?.currentPage ?? 1,
    set: (v: number) => {
      if (props.page) emit('update:page', { ...props.page, currentPage: v })
    },
  })

  const pageSize = computed({
    get: () => props.page?.pageSize ?? 10,
    set: (v: number) => {
      if (props.page) emit('update:page', { ...props.page, pageSize: v })
    },
  })

  async function load() {
    if (props.fetch) {
      state.loading = true
      try {
        const params: PageParams = {
          currentPage: currentPage.value,
          pageSize: pageSize.value,
        }
        const res = await props.fetch(params)
        state.tableData = res.data ?? []
        state.total = res.total ?? state.tableData.length  ?? 0
      } finally {
        state.loading = false
      }
    } else if (props.data) {
      state.tableData = props.data.data ?? []
      state.total = props.data.total ?? 0
    }
  }

  function handlePageChange() {
    load()
  }

  function handleSizeChange() {
    if (props.page) {
      emit('update:page', { ...props.page, currentPage: 1, pageSize: pageSize.value })
    }
    load()
  }

  watch(
    () => [props.data, props.fetch],
    () => load(),
    { deep: true }
  )

  watch(
    () => props.page?.currentPage,
    (cur, prev) => {
      if (cur !== prev) load()
    }
  )

  onMounted(() => {
    load()
  })

  defineExpose({
    load,
    tableData: () => state.tableData,
    total: () => state.total,
  })
</script>

<style scoped>
  .advanced-table :deep(.el-pagination) {
    display: flex;
  }
</style>
