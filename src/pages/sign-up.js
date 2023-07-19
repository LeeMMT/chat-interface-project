import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SignUp from '@/components/SignUp'
import { useUser } from '@/contexts/userContext'

export default () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return <SignUp />
}
