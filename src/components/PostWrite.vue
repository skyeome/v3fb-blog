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
import { useRouter } from 'vue-router'
import { Post, setPost } from 'src/models/Post'

const router = useRouter()
const title = ref('')
const context = ref('')

const existsRule = (val:string) => (val && val.length > 0) || '내용을 적어주세요'

const onSubmit = async () => {
  await setPost(new Post(title.value, context.value))
  router.push('/posts')
}
const onReset = () => {
  title.value = ''
  context.value = ''
}
</script>
