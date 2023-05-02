import { db } from 'boot/firebase'
import {
  FirestoreDataConverter,
  Timestamp,
  SetOptions,
  DocumentReference,
  DocumentSnapshot,
  doc, setDoc, collection,
  query, getDocs, deleteDoc,
  serverTimestamp
} from 'firebase/firestore'
import { getUser, User } from './user'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title:string,
    readonly context:string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined,
    public userSnapshot?: DocumentSnapshot<User> | undefined
  ) {}

  toJSON () {
    return {
      title: this.title,
      context: this.context,
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp()
    }
  }

  updatePost (id: string, context: string) {
    const ref = doc(db, 'posts', id).withConverter(convertor)
    return setDoc(ref, { context }, { merge: true })
  }

  deletePost (id: string) {
    const ref = doc(db, 'posts', id)/* .withConverter(convertor) */
    return deleteDoc(ref)
  }
}

const convertor: FirestoreDataConverter<Post> = {
  toFirestore: (model:Post, options?: SetOptions) => {
    if (options) {
      return Object.assign(model, { updatedAt: serverTimestamp() })
    }
    return model.toJSON()
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    // const userId = data.userRef instanceof
    const userSnapshot = userSnapshots.find(u => u.id === data.userRef.id)
    return new Post(
      data.title,
      data.context,
      data.userRef,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
      userSnapshot
    )
  }
}

export const setPost = (post: Post) => {
  const ref = doc(db, 'posts', post.title).withConverter(convertor)
  return setDoc(ref, post)
}

// 유저들을 중복없이 불러오기 위해 만든 변수
const userSnapshots: DocumentSnapshot<User>[] = []
export const getPosts = async () => {
  const ref = collection(db, 'posts').withConverter(convertor)
  const q = query(ref)
  const sn = await getDocs(q)
  let count = 0

  /**
   * 게시물을 가져올때 게시글 안에 있는 유저 정보들을 검사 해서
   * 동일한 유저의 경우 쿼리를 돌리지 않는다.
   */
  for (const postSnapshot of sn.docs) {
    // 게시물의 유저 정보를 꺼낸다.
    const data = postSnapshot.data()
    // 이미 있는 유저인지 검사한다.
    const findUserSnapshot = userSnapshots.find(u => u.id === data.userRef.id)
    // 이미 있는 유저 이면 건너뛴다.
    if (findUserSnapshot) continue
    const userSnapshot = await getUser(data.userRef.id)
    // 새로운 유저 이면 스냅샷에 저장한다.
    userSnapshots.push(userSnapshot)
    console.log('user find count: ', ++count)
  }

  return sn
}
