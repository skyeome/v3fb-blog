import { initializeApp } from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// Initialize Firebase
initializeApp(firebaseConfig)
const auth = getAuth()
auth.useDeviceLanguage()
connectAuthEmulator(auth, 'http://localhost:9099')

export { auth }
