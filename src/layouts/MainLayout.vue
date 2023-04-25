<template>
  <q-layout view="hhh lpr fff" :container="false">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          vue3 blog
        </q-toolbar-title>
        <AuthBtn />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AuthBtn from 'src/components/auth/AuthBtn.vue'
</script>

<style scoped>

</style>
