<template>
  <q-btn v-if="firebaseUser"  round color="info">
    <q-avatar size="32px">
      <img :src="firebaseUser.photoURL || ''" alt="">
      <q-menu>
        <q-card>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-account"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>이름</q-item-label>
                <q-item-label caption>{{ firebaseUser.displayName }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-email"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>이메일</q-item-label>
                <q-item-label caption>{{ firebaseUser.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="right">
            <q-btn icon="mdi-logout" label="로그아웃" flat color="primary" @click="signOut(auth)"></q-btn>
          </q-card-actions>
        </q-card>
      </q-menu>
    </q-avatar>
  </q-btn>
  <q-btn v-else @click="signInWithPopup(auth,provider)" round color="info">
    <q-avatar icon="mdi-login" size="32px"></q-avatar>
  </q-btn>
</template>

<script setup lang="ts">
import { auth } from 'boot/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseUser, useAuth } from 'src/composables/useAuth'

const { initialize } = useAuth()
initialize()
const provider = new GoogleAuthProvider()
</script>
