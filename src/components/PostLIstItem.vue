<template>
  <q-item>
    <q-item-section avatar>{{ item.id }}</q-item-section>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>{{ post.context }}</q-item-label>
      <q-item-label caption>{{ post.createdAt }}</q-item-label>
      <q-item-label caption>{{ post.updatedAt }}</q-item-label>
    </q-item-section>
    <q-item-section><q-input v-model="context"/></q-item-section>
    <q-item-section side><q-btn label="update" @click="onUpdate"></q-btn></q-item-section>
    <q-item-section side><q-btn label="delete" @click="onDelete"></q-btn></q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits } from 'vue'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Post, updatePost, deletePost } from 'src/models/Post'

const props = defineProps<{
  item:QueryDocumentSnapshot<Post>
}>()

const emit = defineEmits<{(e:'refresh'):void}>()

const post = computed(() => props.item.data())
const context = ref(post.value.context)
async function onUpdate () {
  await updatePost(props.item.id, context.value)
  emit('refresh')
}

async function onDelete () {
  await deletePost(props.item.id)
  emit('refresh')
}

</script>
