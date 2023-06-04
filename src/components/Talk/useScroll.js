import { useState, useEffect, useLayoutEffect, useRef } from 'react'

export const useScroll = (messages, loading) => {
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

  return { messageBoxRef, lastMessageRef, prevScrollHeightRef, userMessageBoxRef, userMessageBoxHeight }
}
