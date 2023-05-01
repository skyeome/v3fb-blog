<template>
  <q-item>
    <q-item-section avatar>{{ item.id }}</q-item-section>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>{{ post.context }}</q-item-label>
      <q-item-label caption>{{ post.createdAt }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Post } from 'src/models/Post'

const props = defineProps<{
  item:QueryDocumentSnapshot<Post>
}>()

const post = computed(() => props.item.data())
</script>
