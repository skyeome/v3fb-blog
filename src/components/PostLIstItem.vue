<template>
  <q-item>
    <q-item-section avatar>{{ item.id }}</q-item-section>
    <q-item-section>
      <q-item-label>{{ post.title }}</q-item-label>
      <q-item-label caption>{{ post.summary }}</q-item-label>
      <q-item-label caption>{{ post.createdAt }}</q-item-label>
      <q-item-label caption>{{ post.updatedAt }}</q-item-label>
      <q-item-label caption>{{ post.userRef.id }}</q-item-label>
      <q-item-label caption>{{ user?.email }}</q-item-label>
    </q-item-section>
    <q-item-section side><q-btn label="delete" @click="onDelete"></q-btn></q-item-section>
    <q-item-section side><q-btn label="go" :to="`/post/${item.id}`"></q-btn></q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed, defineEmits } from 'vue'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Post, deletePost } from 'src/models/Post'

const props = defineProps<{
  item: QueryDocumentSnapshot<Post>
}>()

const emit = defineEmits<{(e: 'refresh'): void }>()

const post = computed(() => props.item.data())
const user = computed(() => post.value.userSnapshot?.data())
/**
 * 게시글을 업데이트 하는데 시간이 필요하기 때문에
 * 비동기 방식으로 해야한다.
 * 그렇게 하지 않으면 새로고침이 먼저 실행되어서
 * 데이터를 받기도 전에 새로고침이 되어 정보가 뜨지 않는다.
 */
async function onDelete () {
  await deletePost(props.item.id)
  emit('refresh')
}

</script>
