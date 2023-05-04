<template>
  <q-page padding>
    <PostItemUpdate :id="id"/>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostItemUpdate from 'src/components/PostItemUpdate.vue'

const route = useRoute()
const id = computed(() => route.params.id as string)

</script>
