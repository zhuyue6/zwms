<template>
  <div class="w-full h-full grow flex flex-col">
    <Toolbar
      class="border-b border-b-[#ccc] border-b-solid"
      :editor="editorRef"
      :mode="mode"
    />
    <Editor
      v-model="model"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { shallowRef, onUnmounted } from 'vue'

  const model = defineModel<string>()
  const editorRef = shallowRef()
  const mode = 'default'

  const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例
  }

  onUnmounted(()=>{
    editorRef.value?.destroy()
  })

</script>