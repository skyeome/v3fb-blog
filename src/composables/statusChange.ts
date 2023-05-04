import { rtdb } from 'src/boot/firebase'
import {
  ref,
  onValue,
  onDisconnect,
  serverTimestamp,
  set,
  off
} from 'firebase/database'

/**
 * .info/connected 에는 유저가 접속한지 여부를 저장해놓았다.
 * onValue 를 통해서 실시간으로 감시하고 변화가 생길때마다 값을 가져온다.
 */
const infoConnectedRef = ref(rtdb, '.info/connected')

export const onChangeStatus = (uid: string) => {
  onValue(infoConnectedRef, snapshot => {
    // 접속여부를 boolean으로 저장한다.
    const connected = snapshot.val() as boolean
    // 리턴하면 online이 false가 된다.
    if (!connected) return
    //
    const statusRef = ref(rtdb, `status/${uid}`)
    // 우선 온라인 일때 상태를 지켜보다가 접속이 끊기면 자동으로 onDisconnect가 실행된다.
    onDisconnect(statusRef).set({ online: false, visitedAt: serverTimestamp() })
      .then(() => {
        set(statusRef, { online: true, visitedAt: serverTimestamp() })
      })
  })
}

export const offChangeStatus = (uid: string) => {
  // 유저 정보가 없으면 감시하는 기능을 아에 꺼버린다.
  off(infoConnectedRef)
  if (!uid) return Promise.resolve()
  const statusRef = ref(rtdb, `status/${uid}`)
  return set(statusRef, { online: false, visitedAt: serverTimestamp() })
}
