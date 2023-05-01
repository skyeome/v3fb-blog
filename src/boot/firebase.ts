import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://localhost:9099')

// firebaseApps previously initialized using initializeApp()
const db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8081)

export { auth, db }
