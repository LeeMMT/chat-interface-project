import Talk from '@/components/Talk'
import { useUser } from '@/contexts/userContext'

export default () => {
  const { user } = useUser()
  return <Talk />
}
