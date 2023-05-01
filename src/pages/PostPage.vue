<template>
  <q-page>
    <PostList />
  </q-page>
  <q-page-sticky
    position="bottom-right"
    :offset="[18,18]"
    >
    <q-btn round color="blue-10" icon="mdi-pencil" to="/write"/>
  </q-page-sticky>
</template>

<script setup lang="ts">
import PostList from 'src/components/PostList.vue'

</script>

<style scoped>

</style>
