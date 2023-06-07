import { useEffect, useState } from 'react'
import { Box, Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Fade } from '@mui/material'
import { CharacterOptions } from './CharacterOptions'
import oracleImg from '@/../public/images/oracle.webp'
import characterImg from '@/../public/images/character.webp'
import storyImg from '@/../public/images/story.webp'

const ChatOption = ({ chatMode, onClick }) => (
  <Grid item xs={6} md={4} lg={3}>
    <Card
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          cursor: 'pointer',
          boxShadow: (theme) => theme.shadows[4], // Increase depth of boxShadow on hover
        },
      }}
    >
      <CardActionArea
        sx={{
          paddingTop: '100%', // padding-top gives the 1:1 ratio
          position: 'relative', // allows us to use absolute positioning on the child
        }}
      >
        <CardMedia
          component="img"
          image={chatMode.image.src}
          alt={chatMode.title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </CardActionArea>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          component="h2"
          sx={{
            textAlign: 'center',
            typography: {
              xs: 'body1', // for screens 0px and up
              md: 'h5', // for screens 900px and up
            },
          }}
        >
          {chatMode.title}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
)

export default () => {
  const [selectedChatMode, setSelectedChatMode] = useState(false)

  useEffect(() => {
    console.log(selectedChatMode)
  }, [selectedChatMode])

  const chatModes = [
    {
      title: 'Oracle',
      image: oracleImg,
    },
    {
      title: 'Character',
      image: characterImg,
    },
    {
      title: 'Story',
      image: storyImg,
    },
  ]

  const handleChatModeClick = (chatMode) => {
    setSelectedChatMode(chatMode)
  }

  const handleGoBack = () => {
    setSelectedChatMode(false)
  }

  const handleExited = () => {
    setSelectedChatMode(null)
  }

  return (
    <Box pt={3}>
      {!selectedChatMode && (
        <Grid container spacing={3}>
          {chatModes.map((chatMode, index) => (
            <ChatOption key={index} chatMode={chatMode} onClick={() => handleChatModeClick(chatMode)} />
          ))}
        </Grid>
      )}

      {selectedChatMode && selectedChatMode.title === 'Character' && (
        <Box>
          <CharacterOptions handleGoBack={handleGoBack} />
        </Box>
      )}
    </Box>
  )
}
