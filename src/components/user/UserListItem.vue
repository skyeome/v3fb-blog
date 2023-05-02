<template>
  <q-item>
    <q-item-section avatar>
      <q-img :src="user.photoURL" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ user.email }}</q-item-label>
      <q-item-label caption>{{ user.displayName }}</q-item-label>
      <q-item-label caption>{{ user.createdAt }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import { User } from 'src/models/user'

const props = defineProps<{
  item:QueryDocumentSnapshot<User>
}>()

const user = computed(() => props.item.data())
</script>
