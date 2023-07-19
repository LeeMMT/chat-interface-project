import { useState } from 'react'
import { Container, Box, TextField, Button } from '@mui/material'
import { useRouter } from 'next/router'

export default () => {
  const [apiKey, setApiKey] = useState('')
  const router = useRouter()

  const goBack = () => {
    router.push('/')
  }

  return (
    <Container component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
      <TextField sx={{ mb: 2 }} helperText={'Paste your OpenAI API key here'} required fullWidth name="API key" label="API key" id="api-key" />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="text" onClick={goBack}>
          Go back
        </Button>
        <Button variant="outlined">Add key</Button>
      </Box>
    </Container>
  )
}
