import { useState } from 'react'
import { Box, TextField, Typography, Button, Chip, Container } from '@mui/material'

const traitsList = ['Brave', 'Clever', 'Kind', 'Loyal', 'Mysterious', 'Optimistic', 'Pessimistic', 'Sarcastic']

export const CharacterOptions = ({ handleGoBack }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [personality, setPersonality] = useState('')
  const [selectedTraits, setSelectedTraits] = useState([])

  const handleTraitToggle = (trait) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [...prev, trait]))
  }

  const handleSubmit = () => {
    const systemMessage = `Creating a character named ${name}, age ${age}, with a ${personality} personality and traits: ${selectedTraits.join(', ')}.`
    // Send systemMessage to the completions API
    console.log(systemMessage)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button variant="outlined" onClick={handleGoBack} sx={{ alignSelf: 'flex-start' }}>
          Go back
        </Button>
        <Typography component="h1" variant="h5">
          Create Your Character
        </Typography>
        <Box
          component="form"
          sx={{
            width: '100%',
            marginTop: 2,
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="Age"
            type="number"
            id="age"
            autoComplete="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="personality"
            label="Personality Description"
            id="personality"
            autoComplete="personality"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
          />
          <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
            Traits
          </Typography>
          {traitsList.map((trait) => (
            <Chip
              key={trait}
              label={trait}
              clickable
              color={selectedTraits.includes(trait) ? 'primary' : 'default'}
              onClick={() => handleTraitToggle(trait)}
              sx={{ margin: 0.5 }}
            />
          ))}
          <Button type="button" fullWidth variant="contained" color="primary" sx={{ my: 3 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
