<template>
  <q-item>
    <q-item-section avatar>{{ item.id }}</q-item-section>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>{{ post.context }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'

const props = defineProps<{
  item:QueryDocumentSnapshot<DocumentData>
}>()

const post = computed(() => props.item.data())
</script>

<style scoped>

</style>
