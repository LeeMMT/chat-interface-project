import { useEffect } from 'react'
import SignIn from '@/components/SignIn'
import { useUser } from '@/contexts/userContext'
import { useRouter } from 'next/router'

export default () => {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/talk')
    }
  }, [user])

  return <SignIn />
}
