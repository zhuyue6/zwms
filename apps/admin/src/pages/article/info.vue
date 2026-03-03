<template>
  <div class="w-full h-full flex flex-col">
    <Editor v-model="state.contentHtml" />
    <div class="pt-2 h-9 shrink-0 border-t border-t-[#ccc] border-t-solid">
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Editor from '../../components/editor.vue'
  import { article as ARTICLERAPI } from '../../api'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  interface State {
    id: number | undefined
    contentHtml: string
  }

  const state = ref<State>({
    id: undefined,
    contentHtml: ''
  })

  const route = useRoute()

  onMounted(async () => {
    if (route.query.id) {
      state.value.id = Number(route.query.id)
      const article = await ARTICLERAPI.getArticleInfo(state.value.id)
      state.value.contentHtml = article?.contentHtml ?? ''
    }
  })
  
  async function save() {
    await ARTICLERAPI.updateArticle({
      id: state.value.id,
      contentHtml: state.value.contentHtml
    })
  }


</script>