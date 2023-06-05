import { useState, useEffect } from 'react'
import { AppBar, Toolbar, TextField, Box, InputAdornment, IconButton, useMediaQuery, useTheme } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import SendIcon from '@mui/icons-material/Send'
import { useChat } from './useChat'
import { ChatsDrawer } from './ChatsDrawer'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useUser } from '@/contexts/userContext'
import { useScroll } from './useScroll'
import { ScrollDownBtn } from './ScrollDownBtn'
import { MessageList } from './MessageList'

export default function Talk() {
  const { chats, selectedChat, setSelectedChat, messages, setMessages, input, handleInputChange, handleSend, createNewChat, deleteChat, loading } = useChat()
  const { messageBoxRef, lastMessageRef, userMessageBoxRef, userMessageBoxHeight } = useScroll(messages, loading)
  const { user } = useUser()

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen) // drawer is initially open if not small screen

  useEffect(() => {
    setDrawerOpen(!isSmallScreen) // update drawer open state when screen size changes
  }, [isSmallScreen])

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (user && selectedChat) {
        try {
          const chatDocRef = doc(db, 'users', user.uid, 'chats', selectedChat.id)
          const chatDocSnapshot = await getDoc(chatDocRef)
          if (chatDocSnapshot.exists()) {
            const chatHistory = chatDocSnapshot.data().messages
            setMessages(chatHistory)
          }
        } catch (error) {
          console.error('Error fetching chat history:', error)
        }
      } else {
        setMessages([])
      }
    }
    fetchChatHistory()
  }, [selectedChat, user])

  return (
    <>
      {isSmallScreen && (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <DragHandleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <ChatsDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        anchor={isSmallScreen ? 'top' : 'left'}
        chats={chats}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        createNewChat={createNewChat}
        deleteChat={deleteChat}
        loading={loading}
      />
      <Box
        component="main"
        sx={{
          height: '100vh',
          pl: [0, '300px'],
          display: 'grid',
          gridTemplateRows: '1fr auto',
        }}
      >
        <Box ref={messageBoxRef} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
          <Box
            sx={{
              px: 2,
              pt: 2,
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%',
            }}
          >
            <MessageList messages={messages} lastMessageRef={lastMessageRef} loading={loading} />
          </Box>
        </Box>

        <Box sx={{ p: 2, position: 'relative', margin: '0 auto', maxWidth: '900px', width: '100%' }} ref={userMessageBoxRef}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend()
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSend}
                    edge="end"
                    disabled={input.trim() === ''} // disable the button if input is empty
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <ScrollDownBtn messageBoxRef={messageBoxRef} userMessageBoxHeight={userMessageBoxHeight} lastMessageRef={lastMessageRef} />
      </Box>
    </>
  )
}
