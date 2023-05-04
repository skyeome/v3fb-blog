<template>
  <div ref="viewerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

const viewerRef = ref()
const viewer = ref<Viewer | null>()
const props = defineProps<{content: string}>()

onMounted(() => {
  console.log(props.content)
  viewer.value = new Viewer({
    el: viewerRef.value as HTMLDivElement,
    initialValue: props.content
  })
})

</script>
