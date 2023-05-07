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
          v-model="postTitle"
          label="제목"
          hint="글의 제목을 정해주세요"
          lazy-rules
          :rules="[existsRule]"
        />

        <!-- <q-input
          filled
          v-model="postContent"
          type="textarea"
          label="내용"
          hint="글의 내용을 작성해주세요"
          lazy-rules
          :rules="[existsRule]"
        /> -->
        <tui-editor v-model="postContent" @add-image="addImage" />
      </q-card-section>
      <q-card-actions>
        <q-space />
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { deletePost, setPost } from 'src/models/Post'
import TuiEditor from './editor/TuiEditor.vue'
import { setImage } from 'src/models/image'
import useStorage from 'src/composables/useStorage'

const props = defineProps<{id: string, title: string, content: string}>()
const router = useRouter()
const { getURL } = useStorage()
const postTitle = ref(props.title)
const postContent = ref(props.content)

const existsRule = (val:string) => (val && val.length > 0) || '내용을 적어주세요'

const onSubmit = async () => {
  if (props.id && props.title !== postTitle.value) await deletePost(props.id)
  await setPost(postTitle.value, postContent.value)
  router.push('/posts')
}
const onReset = () => {
  postTitle.value = ''
  postContent.value = ''
}
const addImage = async (blob: Blob | File, callback: (url: string, text?: string) => void) => {
  const id = await setImage(blob as File)
  const origin = await getURL(`images/${id}/origin`)
  callback(origin, 'test')
}
</script>
