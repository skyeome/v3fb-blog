<template>
  <q-card>
    <q-skeleton v-if="!post" />
    <PostWrite v-else :id="id" :title="post.title" :content="post.content || ''" />
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PostWrite from './PostWrite.vue'
import { getPost, Post } from 'src/models/Post'

const props = defineProps<{id:string}>()
const post = ref<Post | null>()

onMounted(() => {
  return getPost(props.id)
    .then(data => {
      post.value = data
    })
})

</script>
