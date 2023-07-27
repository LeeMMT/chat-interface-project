import Head from 'next/head'
import { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Box, IconButton, useMediaQuery, useTheme, Snackbar, Alert } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import { useChat } from '@/components/Talk/useChat'
import { db } from '@/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useUser } from '@/contexts/userContext'
import { useScroll } from '@/components/Talk/useScroll'
import { ScrollDownBtn } from '@/components/Talk/ScrollDownBtn'
import Messages from '@/components/Talk/Messages'
import { SmartModeIcon } from '@/components/Talk/SmartModeIcon'
import UserInput from '@/components/Talk/UserInput'
import ChatsDrawer from '@/components/Talk/ChatsDrawer'
//import NewChatOptions from '@/components/Talk/NewChatOptions'

export default function Home() {
  const { user } = useUser()

  const {
    chats,
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSend,
    createNewChat,
    deleteChat,
    loading,
    smartMode,
    setSmartMode,
    snackbarOpen,
    snackbarSeverity,
    snackbarMessage,
    handleSnackbarClose,
  } = useChat()
  const { messageBoxRef, lastMessageRef, userMessageBoxRef, userMessageBoxHeight } = useScroll(messages, loading)

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
      <Head>
        <title>Chat Interface Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isSmallScreen && (
        <AppBar position="fixed" sx={{ height: '60px' }}>
          <Toolbar sx={{ height: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>

            <Typography variant="body2" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {selectedChat ? selectedChat.name : null}
            </Typography>

            {/* <IconButton onClick={() => setSmartMode(!smartMode)}>
              <SmartModeIcon smartMode={smartMode} />
            </IconButton> */}

            <IconButton
              edge="end"
              color="inherit"
              aria-label="add"
              onClick={() => {
                createNewChat()
              }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <ChatsDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        isSmallScreen={isSmallScreen}
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
        <Box ref={messageBoxRef} sx={{ overflowY: 'auto', overflowX: 'hidden', pt: isSmallScreen ? `60px` : 0 }}>
          <Box
            sx={{
              px: 2,
              margin: '0 auto',
              maxWidth: '900px',
              width: '100%',
            }}
          >
            {/* {messages.length < 1 && <NewChatOptions />} */}
            <Messages messages={messages} lastMessageRef={lastMessageRef} loading={loading} isSmallScreen={isSmallScreen} />
          </Box>
        </Box>

        <UserInput inputValue={input} userMessageBoxRef={userMessageBoxRef} handleInputChange={handleInputChange} handleSend={handleSend} />

        <ScrollDownBtn messageBoxRef={messageBoxRef} userMessageBoxHeight={userMessageBoxHeight} lastMessageRef={lastMessageRef} />
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust duration as needed
        onClose={handleSnackbarClose}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
