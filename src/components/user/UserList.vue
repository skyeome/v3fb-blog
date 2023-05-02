<template>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>users</q-toolbar-title>
      <q-btn icon="mdi-refresh" round flat @click="getData"></q-btn>
    </q-toolbar>
    <q-list>
      <UserListItem v-for="item in items" :key="item.id" :item="item"/>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User, getUsers } from 'src/models/user'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import UserListItem from './UserListItem.vue'

const items = ref<QueryDocumentSnapshot<User>[]>([])
const getData = async () => {
  const snapshot = await getUsers()
  items.value = snapshot.docs
}

onMounted(() => getData())
</script>
