import { TextField, Box, Typography, InputAdornment, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { useChat } from './useChat'
import { ChatsDrawer } from './ChatsDrawer'
import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useUser } from '@/contexts/userContext'

export default function Talk() {
  const { chats, selectedChat, setSelectedChat, messages, setMessages, input, handleInputChange, handleSend, createNewChat, deleteChat, loading } = useChat()
  const { user } = useUser()
  const messageBoxRef = useRef(null)
  const lastMessageRef = useRef(null)
  const prevScrollHeightRef = useRef(null)

  const userMessageBoxRef = useRef(null)
  const [userMessageBoxHeight, setUserMessageBoxHeight] = useState(0)

  useLayoutEffect(() => {
    if (userMessageBoxRef.current) {
      setUserMessageBoxHeight(userMessageBoxRef.current.getBoundingClientRect().height)
    }
  }, [])

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

  useEffect(() => {
    // Before messages update, store the previous scroll height
    if (messageBoxRef.current) {
      prevScrollHeightRef.current = messageBoxRef.current.scrollHeight
    }
  }, [messages])

  useLayoutEffect(() => {
    if (messageBoxRef.current && lastMessageRef.current) {
      const clientHeight = messageBoxRef.current.clientHeight
      const scrollTop = messageBoxRef.current.scrollTop
      const prevScrollHeight = prevScrollHeightRef.current || 0

      // We need to check whether we were near the bottom before the new message was added.
      // If we were, we scroll the user.
      if (loading === false) {
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
      } else if (prevScrollHeight - scrollTop <= 2 * clientHeight) {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [messages])

  const messageList = messages.map((message, index) => (
    <Box
      key={index}
      sx={{ display: 'grid', gridTemplateColumns: '64px 1fr', pr: '64px', columnGap: 2, py: 2 }}
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

  return (
    <>
      <ChatsDrawer
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
        <Box ref={messageBoxRef} sx={{ overflowY: 'auto' }}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              px: 2,
              pt: 2,
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%',
            }}
          >
            {messageList}
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

        <IconButton aria-label="Scroll down" sx={{ position: 'fixed', bottom: `${userMessageBoxHeight}px`, right: '16px' }}>
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    </>
  )
}
