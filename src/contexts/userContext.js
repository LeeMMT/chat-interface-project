import { useEffect, useState, createContext, useContext } from 'react'
import { auth } from '@/utils/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // fetch apiKey
        const userDocRef = doc(db, 'users', firebaseUser.uid)
        const userDocSnapshot = await getDoc(userDocRef)
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          firebaseUser.apiKey = userData.apiKey
        }
      }
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
