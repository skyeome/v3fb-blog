<template>
  <div ref="editorRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const editorRef = ref()
const editor = ref<Editor | null>()
const props = defineProps<{modelValue: string}>()
const emits = defineEmits<{(e: 'update:modelValue', value: string):void,
  (e: 'addImage', file: File, callback: (url: string, text?: string) => void): void}>()

const add = (blob: Blob | File, callback: (url: string, text?: string) => void) => {
  emits('addImage', blob as File, callback)
}

onMounted(() => {
  editor.value = new Editor({
    el: editorRef.value as HTMLDivElement,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: props.modelValue,
    events: {
      change: () => {
        if (!editor.value) return
        emits('update:modelValue', editor.value?.getMarkdown())
      }
    },
    hooks: {
      addImageBlobHook: add
    }
  })
})

</script>
