import { db } from 'boot/firebase'
import {
  FirestoreDataConverter,
  Timestamp,
  SetOptions,
  DocumentReference,
  DocumentSnapshot,
  doc, collection,
  query, getDoc, getDocs,
  serverTimestamp, writeBatch
} from 'firebase/firestore'
import { getUser, User } from './user'
import { firebaseUser } from 'src/composables/useAuth'
import { converter as contentsConverter, Content, getContents } from './contents'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title:string,
    readonly summary:string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined,
    public userSnapshot?: DocumentSnapshot<User> | undefined,
    public content?: string | undefined
  ) {}

  toJSON () {
    return {
      title: this.title,
      summary: this.summary.substr(0, 10),
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp()
    }
  }

  // updatePost (id: string, context: string) {
  //   const ref = doc(db, 'posts', id).withConverter(convertor)
  //   return setDoc(ref, { context }, { merge: true })
  // }

  // deletePost (id: string) {
  //   const ref = doc(db, 'posts', id)/* .withConverter(convertor) */
  //   return deleteDoc(ref)
  // }
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
      data.content,
      data.userRef,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
      userSnapshot
    )
  }
}

const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\_+<>@\#$%&\\\=\(\'\"]/gi

  return text.replace(pattern, '').split(' ').join('-')
}

const contentsToChunks = (str: string) => {
  return str.match(/.{1,1000}/g) || []
}

export const setPost = async (title: string, context: string) => {
  if (!firebaseUser.value) throw Error('user not signed')
  /**
   * 배치를 사용하여 모든작업이 끝나야지만 commit이 실행되면서 저장된다.
   */
  const batch = writeBatch(db)
  const userRef = doc(db, 'users', firebaseUser.value.uid)
  const id = titleToId(title)
  const contents = contentsToChunks(context)
  const post = new Post(title, context, userRef)
  const postRef = doc(db, 'posts', id).withConverter(convertor)
  batch.set(postRef, post)
  const sn = await getContents(id)
  sn.docs.forEach(d => batch.delete(d.ref))

  contents.forEach((c, i) => {
    const ref = doc(collection(db, 'posts', id, 'contents')).withConverter(contentsConverter)
    batch.set(ref, new Content(i, c))
  })

  return await batch.commit()
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

export const getPost = async (id: string) => {
  const ref = doc(db, 'posts', id).withConverter(convertor)
  const postSnapshot = await getDoc(ref)
  const post = postSnapshot.data()
  if (!post) throw Error('post not exists')
  const contentsSnapshot = await getContents(id)
  const contents = contentsSnapshot.docs.map(d => d.data().content)

  post.content = contents.join('')

  return post
}

export const deletePost = async (id: string) => {
  const batch = writeBatch(db)
  const sn = await getContents(id)
  sn.docs.forEach(d => batch.delete(d.ref))
  batch.delete(doc(db, 'posts', id))
  return await batch.commit()
}
