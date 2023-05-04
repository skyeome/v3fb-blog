import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://localhost:9099')

// firebaseApps previously initialized using initializeApp()
const db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8081)

const rtdb = getDatabase()
connectDatabaseEmulator(rtdb, 'localhost', 9000)

export { app, auth, db, rtdb }
