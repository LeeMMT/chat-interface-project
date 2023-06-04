import { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '@/contexts/userContext'
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export const useChat = () => {
  const { user } = useUser()
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

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

    setLoading(false)
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = async () => {
    //Prevents user from sending an empty message
    if (input.trim() === '') return

    //Prevent user sending subsequent messages before receiving a response
    if (loading) return
    setLoading(true)

    // Temporarily store for saveChat callback at end
    const newMessages = [...messages, { role: 'user', content: input }]

    //Add user's message to the chat history
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: input }])

    // Clear the input field
    setInput('')

    // Prepare the messages for the API request
    const apiMessages = newMessages.map((message) => {
      return { role: message.role, content: message.content }
    })

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: apiMessages,
          max_tokens: 60,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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',
          },
        }
      )

      console.log(response)

      //Add AI response to chat history
      const updatedMessages = [...newMessages, { role: 'assistant', content: response.data.choices[0].message.content.trim() }]

      setMessages(updatedMessages)
      saveChat(updatedMessages)
    } catch (error) {
      console.error('Error while calling OpenAI API:', error)
    }
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

  return { chats, selectedChat, setSelectedChat, messages, setMessages, input, handleInputChange, handleSend, createNewChat, deleteChat, loading }
}
