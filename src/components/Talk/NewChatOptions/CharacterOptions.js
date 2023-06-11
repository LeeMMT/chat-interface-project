import { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, Chip, Container, Grid, IconButton, List, ListItem, ListItemText, Input } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { TransitionGroup } from 'react-transition-group'
import Collapse from '@mui/material/Collapse'

function TraitItem({ trait, handleTraitToggle }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleTraitToggle(trait)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={trait} />
    </ListItem>
  )
}

const predefinedTraitsList = ['Brave', 'Clever', 'Kind', 'Loyal', 'Mysterious', 'Optimistic', 'Pessimistic', 'Sarcastic']

export const CharacterOptions = ({ handleGoBack }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [personality, setPersonality] = useState('')
  const [userTrait, setUserTrait] = useState('')
  const [selectedTraits, setSelectedTraits] = useState([])

  useEffect(() => {
    console.log(selectedTraits)
  }, [selectedTraits])

  const handleTraitToggle = (trait) => {
    setSelectedTraits((prev) => (prev.includes(trait) ? prev.filter((t) => t !== trait) : [trait, ...prev]))
  }

  const handleUserTraitSubmit = () => {
    if (userTrait) {
      handleTraitToggle(userTrait)
      setUserTrait('')
    }
  }

  const handleSubmit = () => {
    const systemMessage = `Creating a character named ${name}, age ${age}, with a ${personality} personality and traits: ${selectedTraits.join(', ')}.`
    console.log(systemMessage)
  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handleGoBack} sx={{ alignSelf: 'flex-start', marginBottom: 2 }}>
          Go back
        </IconButton>
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

          <Grid container rowSpacing={2} columnSpacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
                Available Traits
              </Typography>
              <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                {predefinedTraitsList.map((trait) => (
                  <Chip
                    key={trait}
                    label={trait}
                    clickable
                    color={selectedTraits.includes(trait) ? 'primary' : 'default'}
                    onClick={() => handleTraitToggle(trait)}
                    sx={{ margin: 0.5 }}
                  />
                ))}
                <Box display="flex" alignItems="center" marginTop={2}>
                  <Input value={userTrait} onChange={(e) => setUserTrait(e.target.value)} placeholder="Custom trait" />
                  <IconButton onClick={handleUserTraitSubmit}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
                Selected Traits
              </Typography>
              <List>
                <TransitionGroup component={List}>
                  {selectedTraits.map((trait, index) => (
                    <Collapse key={trait}>
                      <TraitItem trait={trait} handleTraitToggle={handleTraitToggle} />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </Grid>
          </Grid>

          <Button type="button" fullWidth variant="contained" color="primary" sx={{ my: 3 }} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
