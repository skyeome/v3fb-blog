<template>
  <q-page padding>
    <TuiEditor v-model="text" />
    <q-card>
      <q-card-section>{{ text }}</q-card-section>
    </q-card>
    <q-card>
      <TuiViewer :content="text" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TuiEditor from 'src/components/editor/TuiEditor.vue'
import TuiViewer from 'src/components/editor/TuiViewer.vue'

const text = ref()
</script>
