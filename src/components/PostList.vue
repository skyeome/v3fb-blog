<template>
  <q-list>
    <PostLIstItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @refresh="getData"
    />
  </q-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostLIstItem from './PostLIstItem.vue'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Post, getPosts } from 'src/models/Post'

const items = ref<QueryDocumentSnapshot<Post>[]>([])

const getData = async () => {
  const querySnapshot = await getPosts()
  items.value = querySnapshot.docs
}

onMounted(() => getData())
</script>
