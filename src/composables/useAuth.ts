import { ref, computed } from 'vue'
import { auth } from 'boot/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { onChangeStatus, offChangeStatus } from './statusChange'

export const firebaseUser = ref<User | null>(null)
export const isSigned = computed(() => firebaseUser.value !== null)

export const useAuth = () => {
  const initialize = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        /**
         * 로그인이 실행되고 나면 온라인 상태를 바꾸어주는
         * onChageStatus를 실행해준다.
         * 접속이 끊기면 online: false
         * 접속이 생기면 online: true가 되는 함수이다.
         */
        onChangeStatus(user.uid)
      } else {
        // 로그아웃이 되거나 유저에 정보가 없으면 실행
        offChangeStatus(firebaseUser.value?.uid || '').catch(e => console.error('off err', e))
      }
      firebaseUser.value = user
    })
  }
  return { initialize }
}
