//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCq1vPVcLYQ0kZ2nhgknO-9jeJwqOPrmiM',
  authDomain: 'friend-app-fd4b5.firebaseapp.com',
  projectId: 'friend-app-fd4b5',
  storageBucket: 'friend-app-fd4b5.appspot.com',
  messagingSenderId: '155879337564',
  appId: '1:155879337564:web:743d6e66f530efb6c58099',
  measurementId: 'G-9DHHS1GEPP',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore

const db = getFirestore(app)

export { db }
