import { db } from 'boot/firebase'
import {
  FirestoreDataConverter, Timestamp, SetOptions,
  doc, setDoc, collection, query, getDocs, deleteDoc, serverTimestamp
} from 'firebase/firestore'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title:string,
    readonly context:string,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined
  ) {}
}

const convertor: FirestoreDataConverter<Post> = {
  toFirestore: (model:Post, options?: SetOptions) => {
    if (options) {
      return Object.assign(model, { updatedAt: serverTimestamp() })
    }
    return {
      title: model.title,
      context: model.context,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new Post(
      data.title,
      data.context,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined
    )
  }
}

export const setPost = (post: Post) => {
  const ref = doc(db, 'posts', post.title).withConverter(convertor)
  return setDoc(ref, post)
}

export const getPosts = () => {
  const ref = collection(db, 'posts').withConverter(convertor)
  const q = query(ref)
  return getDocs(q)
}

export const updatePost = (id: string, context: string) => {
  const ref = doc(db, 'posts', id).withConverter(convertor)
  return setDoc(ref, { context }, { merge: true })
}

export const deletePost = (id: string) => {
  const ref = doc(db, 'posts', id)/* .withConverter(convertor) */
  return deleteDoc(ref)
}