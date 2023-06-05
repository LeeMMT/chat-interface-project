import { Box, Typography, Fade } from '@mui/material'
import Lottie from 'lottie-react'
import animationData from '@/assets/typing'

const MessageWrapper = ({ children, message, isLastMessage, name, lastMessageRef }) => {
  return (
    <Fade in={true} timeout={500}>
      <Box
        bgcolor={message?.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent'}
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '64px 1fr',
          pr: '64px',
          columnGap: 2,
          py: 4,
          '::before': {
            zIndex: '-1',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100vw',
            transform: 'translateX(-100%)',
            content: '""',
            display: 'block',
            backgroundColor: message?.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent',
          },
          '::after': {
            zIndex: '-1',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '100vw',
            content: '""',
            display: 'block',
            backgroundColor: message?.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent',
          },
        }}
        ref={isLastMessage ? lastMessageRef : null}
      >
        {name && (
          <Typography color="secondary" textAlign={'right'}>
            {name}:
          </Typography>
        )}
        {children}
      </Box>
    </Fade>
  )
}

export const MessageList = ({ messages, lastMessageRef, loading }) => {
  const messageList = messages.map((message, index) => (
    <MessageWrapper message={message} key={index} isLastMessage={index === messages.length - 1} lastMessageRef={lastMessageRef}>
      <Typography color={message.role === 'user' ? 'primary' : 'secondary'} textAlign={'right'}>
        {message.role}:
      </Typography>
      <Typography color="text.primary" ml={1}>
        {message.content}
      </Typography>
    </MessageWrapper>
  ))

  return (
    <>
      {messageList}

      {loading && (
        <MessageWrapper name="Assistant">
          <Box sx={{ position: 'relative' }}>
            <Lottie
              animationData={animationData}
              loop={true}
              style={{
                position: 'absolute',
                top: '0',
                left: '-12px',
                width: '64px',
                transform: 'translateY(calc(-50% + 18px))',
              }}
            />
          </Box>
        </MessageWrapper>
      )}
    </>
  )
}
