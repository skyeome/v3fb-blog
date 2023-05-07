import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })

// firebaseApps previously initialized using initializeApp()
const db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8081)

const rtdb = getDatabase()
connectDatabaseEmulator(rtdb, 'localhost', 9000)

const storage = getStorage()
connectStorageEmulator(storage, 'localhost', 9199)

export { app, auth, db, rtdb, storage }
