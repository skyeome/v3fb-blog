<template>
  <q-list>
    <PostLIstItem
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </q-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostLIstItem from './PostLIstItem.vue'
import { db } from 'boot/firebase'
import {
  collection, query, getDocs,
  QueryDocumentSnapshot, DocumentData
} from 'firebase/firestore'

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([])

const getData = async () => {
  const q = query(collection(db, 'posts'))
  const querySnapshot = await getDocs(q)
  items.value = querySnapshot.docs
}

onMounted(() => getData())
</script>

<style scoped>

</style>
