import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { signIn } from '@/utils/auth'
import { useUser } from '@/contexts/userContext'

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
      console.log(result)
      //Signed in
      router.push('/')
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        photoURL: result.user.photoURL,
      })
    } else {
      //Error
      setSignInError(result.message)
      setAlertOpen(true)
    }
  }

  return { signInError, register, handleSubmit, onSubmit, errors, alertOpen, setAlertOpen }
}
