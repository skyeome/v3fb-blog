<template>
  <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-card>
        <q-card-section>
          <q-input
            filled
            v-model="title"
            label="제목"
            hint="글의 제목을 정해주세요"
            lazy-rules
            :rules="[existsRule]"
          />

          <q-input
            filled
            v-model="context"
            type="textarea"
            label="내용"
            hint="글의 내용을 작성해주세요"
            lazy-rules
            :rules="[existsRule]"
          />
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </q-card>
    </q-form>
  <q-page-sticky v-if="isSigned" position="bottom-right" :offset="[28,28]" :expand="false">
    <q-btn>write {{ firebaseUser?.email }}</q-btn>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { firebaseUser, isSigned } from 'src/composables/useAuth'
import { ref } from 'vue'
import { db } from 'boot/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const router = useRouter()
const title = ref('')
const context = ref('')

const existsRule = (val:string) => (val && val.length > 0) || '내용을 적어주세요'

const onSubmit = async () => {
  // Add a new document in collection "cities"
  await setDoc(doc(db, 'posts', title.value), {
    title: title.value,
    context: context.value
  })
  router.push('/posts')
}
const onReset = () => {
  title.value = ''
  context.value = ''
}
</script>

<style scoped>

</style>
