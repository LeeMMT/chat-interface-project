import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/contexts/userContext'
import { useForm } from 'react-hook-form'
import { Container, Box, TextField, Button } from '@mui/material'
import Link from 'next/link'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

export default () => {
  const router = useRouter()
  const { user, setUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const db = getFirestore()

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    }
  }, [user])

  const onSubmit = async (data) => {
    const { apiKey } = data

    try {
      const userDoc = doc(db, 'users', user.uid)
      await updateDoc(userDoc, { apiKey: apiKey })

      //Explicitely update user state, so that the api key is immediatel available across the application
      setUser((prevUser) => ({
        ...prevUser,
        apiKey,
      }))
      router.push('/')
    } catch (error) {
      console.error('Error adding API key: ', error)
    }
  }

  return (
    <Container component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('apiKey', {
          required: 'Key required.',
        })}
        sx={{ mb: 2 }}
        helperText={'Paste your OpenAI API key here'}
        required
        fullWidth
        name="apiKey"
        label="API key"
        id="api-key"
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/">
          <Button variant="text">Go back</Button>
        </Link>
        <Button variant="outlined" type="submit">
          Add key
        </Button>
      </Box>
    </Container>
  )
}
