// import React, { useContext, useState } from 'react'

// const UserContext = React.createContext({ user: null, setUser: () => {} })

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(undefined)

//   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
// }

// export const useUser = () => useContext(UserContext)

import { useEffect, useState, createContext, useContext } from 'react'
import { auth } from '@/utils/auth'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
