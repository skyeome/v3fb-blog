<template>
  <q-card>
    <q-card-section>test</q-card-section>
    <q-card-section>
      <q-input v-model="name" />
      <q-input v-model.number="age" type="number" />
    </q-card-section>
    <q-card-actions>
      <q-btn label="save" @click="save"></q-btn>
      <q-btn label="read" @click="read"></q-btn>
      <q-btn label="remove" @click="removeData"></q-btn>
    </q-card-actions>
    <q-card-section>
      {{ userData }}
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ref as rtRef, set, get, remove, onValue } from 'firebase/database'
import { rtdb } from 'src/boot/firebase'

interface UserData {
  name: string;
  age: number;
}

const name = ref('aaa')
const age = ref(0)
const userData = ref<UserData>({ name: '', age: 0 })

const userRef = rtRef(rtdb, 'users/id')
function save () {
  return set(userRef, {
    name: name.value,
    age: age.value
  })
}

// get 방식은 한번만 받아올때 사용된다.
// 값이 바뀔때마다 받아올려면 onValue 를 사용한다.
async function read () {
  const sn = await get(userRef)
  userData.value = sn.val() as UserData
}

function removeData () {
  remove(userRef)
}

/**
 * onMounted가 되었을때 onValue를 실행하여
 * 실행되자마자 리얼타임 데이터베이스를 실행한다.
 */
onMounted(() => {
  onValue(userRef, (sn) => {
    userData.value = sn.val() as UserData
  })
})
</script>
