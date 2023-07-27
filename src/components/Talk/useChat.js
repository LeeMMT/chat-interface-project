import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/contexts/userContext'
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { getAnswers, analyzeAnswers, resolveAnswers } from '@/utils/smartPrompt'

export const useChat = (apiKey) => {
  const { user } = useUser()
  console.log('user is', user)
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [smartMode, setSmartMode] = useState(false)

  const fetchChats = async () => {
    if (user) {
      try {
        const chatsRef = collection(db, 'users', user.uid, 'chats')
        const chatSnapshot = await getDocs(chatsRef)
        const loadedChats = chatSnapshot.docs.map((doc) => doc.data())
        setChats(loadedChats)
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }
  }

  useEffect(() => {
    fetchChats()
  }, [user])

  const createNewChat = async (updatedMessages) => {
    //Create new chat after user sends first message
    try {
      const newChatRef = await addDoc(collection(db, 'users', user.uid, 'chats'), {
        id: '',
        name: `Chat ${chats.length + 1}`,
        messages: updatedMessages || [],
        createdAt: Date.now(),
      })

      // Update the new chat document to include its own id
      await updateDoc(newChatRef, {
        id: newChatRef.id,
      })

      // Get the updated chat document
      const newChatSnap = await getDoc(newChatRef)
      const newChatData = newChatSnap.data()

      setSelectedChat(newChatData)
      fetchChats()
    } catch (error) {
      console.error('Error saving chat:', error)
    }
  }

  const saveChat = async (updatedMessages) => {
    if (user && selectedChat) {
      //Save current chat
      try {
        const chatDocRef = doc(db, 'users', user.uid, 'chats', selectedChat.id)
        await updateDoc(chatDocRef, {
          messages: updatedMessages,
        })
      } catch (error) {
        console.error('Error saving chat:', error)
      }
    } else if (user) {
      //Create and then save first chat
      createNewChat(updatedMessages)
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    //Prevents user from sending an empty message
    if (input.trim() === '') return

    //Prevents api call if user hasn't set their api key
    console.log(user)
    if (!user.apiKey) {
      console.log('No api key set')
      showSnackbarError('Enter your Open AI API key on the settings page to use chat', 'info')
      return
    }

    //Prevent user sending subsequent messages before receiving a response
    if (loading) return
    setLoading(true)

    // Temporarily store for saveChat callback at end
    const newMessages = [...messages, { role: 'user', content: input }]

    //Add user's message to the chat history
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }])

    // Clear the input field
    setInput('')

    let response = null

    if (smartMode) {
      const answerOptions = await getAnswers(newMessages)
      const researcherResponse = await analyzeAnswers(newMessages, answerOptions)
      response = await resolveAnswers(newMessages, researcherResponse.combinedAnswers, researcherResponse.response)
    } else {
      try {
        response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: newMessages,
            max_tokens: 30,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.apiKey}`,
            },
          }
        )

        console.log(response)
        response = response.data.choices[0].message.content.trim()
      } catch (error) {
        console.error('Error while calling OpenAI API:', error)
        //Set snackbar appropriately here
        showSnackbarError(error.response.data.error.message, 'error')
        setLoading(false)
        return
      }
    }

    //Add AI response to chat history
    const updatedMessages = [...newMessages, { role: 'assistant', content: response }]

    setMessages(updatedMessages)
    setTimeout(() => {
      setLoading(false)
    }, 0)
    saveChat(updatedMessages)
  }

  const deleteChat = async (chatDocId) => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'chats', chatDocId))
      setChats(chats.filter((chat) => chat.id !== chatDocId))
      if (selectedChat && selectedChat.id === chatDocId) {
        setSelectedChat(null)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  // State to control Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  //State to control severity prop of snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState(null)

  // State to store the error message
  const [snackbarMessage, setSnackbarMessage] = useState('')

  // Function to display the error message
  const showSnackbarError = (msg, severity) => {
    setSnackbarSeverity(severity)
    setSnackbarMessage(msg)
    setSnackbarOpen(true)
  }

  // Function to close the Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  return {
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
  }
}
