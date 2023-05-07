<template>
  <q-card>
    <q-skeleton v-if="!post" />
    <template v-else>
      <q-card-section>
        {{ post.title }}
        {{ post.createdAt?.toLocaleDateString() }}
      </q-card-section>
      <q-card-section>
        <tui-viewer :content="post.content" />
      </q-card-section>
    </template>
    <q-card-actions>
      <q-btn to="/posts" label="list"></q-btn>
      <q-btn :to="`/post/${id}/update`" label="update"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPost, Post } from 'src/models/Post'
import TuiViewer from './editor/TuiViewer.vue'

const props = defineProps<{id:string | string[]}>()
const post = ref<Post | null>()

onMounted(() => {
  getPost(props.id as string)
    .then(data => {
      post.value = data
    })
})
</script>
