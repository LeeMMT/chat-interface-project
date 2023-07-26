import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signIn } from '@/utils/auth'
import { useUser } from '@/contexts/userContext'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const useSignInLogic = () => {
  const { user, setUser } = useUser()
  const [alertOpen, setAlertOpen] = useState(false)
  const [signInError, setSignInError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const onSubmit = async (data) => {
    const { email, password } = data

    const result = await signIn(email, password)

    if (result.status) {
      //Signed in
      router.push('/')
      //Get api key from user doc if it exists and add it to user obj
      let userApiKey = ''

      try {
        const userDocRef = await getDoc(doc(db, 'users', result.user.uid))
        const userDocData = userDocRef.data()
        if (userDocData.apiKey) {
          userApiKey = userDocData.apiKey
        }
        console.log(userDocData)
      } catch (error) {
        console.error('Error getting apiKey:', error)
      }

      setUser({
        uid: result.user.uid,
        email: result.user.email,
        photoURL: result.user.photoURL,
        apiKey: userApiKey,
      })
    } else {
      //Error
      setSignInError(result.message)
      setAlertOpen(true)
    }
  }

  return { signInError, register, handleSubmit, onSubmit, errors, alertOpen, setAlertOpen }
}
