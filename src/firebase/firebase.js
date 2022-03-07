import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBcztBUI6NXJun0kGIMEf5n2dlfdT6xQbw',
  authDomain: 'sharex-229f1.firebaseapp.com',
  projectId: 'sharex-229f1',
  storageBucket: 'sharex-229f1.appspot.com',
  messagingSenderId: '960333384124',
  appId: '1:960333384124:web:db028482cdeee458f783b9',
  measurementId: 'G-ZCKJSBTQ5M'
}

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()

export { db }
