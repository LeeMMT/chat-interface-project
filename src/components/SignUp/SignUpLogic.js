import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { signUp } from '@/utils/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export const useSignUpLogic = () => {
  const [alertOpen, setAlertOpen] = useState(false)
  const [signUpError, setSignUpError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const db = getFirestore()

  const addUser = async (uid, userData) => {
    try {
      const userDoc = doc(db, 'users', uid)
      await setDoc(userDoc, { ...userData })
      console.log('User added with ID: ', uid)
    } catch (error) {
      console.error('Error adding user: ', error)
    }
  }

  const onSubmit = async (data) => {
    const { email, password } = data

    try {
      const signUpSuccess = await signUp(email, password)
      if (typeof signUpSuccess === 'string') {
        //Error
        setSignUpError(signUpSuccess)
        setAlertOpen(true)
      } else {
        //Signed in
        router.push('/talk')
        addUser(signUpSuccess.uid, { email: data.email })
      }
    } catch (error) {
      console.error('Error during sign-up:', error)
    }
  }
  return { handleSubmit, onSubmit, register, errors, signUpError, alertOpen, setAlertOpen }
}
