import { Box, Typography } from '@mui/material'

export const MessageList = ({ messages, lastMessageRef }) => {
  const messageList = messages.map((message, index) => (
    <Box
      bgcolor={message.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent'}
      key={index}
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
          backgroundColor: message.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent',
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
          backgroundColor: message.role === 'user' ? (theme) => 'hsl(0,0%,96%)' : 'transparent',
        },
      }}
      ref={index === messages.length - 1 ? lastMessageRef : null}
    >
      <Typography color={message.role === 'user' ? 'primary' : 'secondary'} textAlign={'right'}>
        {message.role}:
      </Typography>
      <Typography color="text.primary" ml={1}>
        {message.content}
      </Typography>
    </Box>
  ))
  return <>{messageList}</>
}
