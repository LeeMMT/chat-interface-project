import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Fade } from '@mui/material'

export const ScrollDownBtn = ({ messageBoxRef, userMessageBoxHeight, lastMessageRef }) => {
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const target = messageBoxRef.current
    const handleScroll = () => {
      const distanceFromBottom = target.scrollHeight - target.scrollTop - target.clientHeight
      setTrigger(distanceFromBottom > 100)
    }
    target.addEventListener('scroll', handleScroll)
    return () => {
      target.removeEventListener('scroll', handleScroll)
    }
  }, [messageBoxRef])

  const scrollToBottom = () => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Fade in={trigger}>
      <IconButton aria-label="Scroll down" onClick={scrollToBottom} sx={{ position: 'fixed', bottom: `${userMessageBoxHeight + 8}px`, right: ['8px', '16px'] }}>
        <ArrowDownwardIcon />
      </IconButton>
    </Fade>
  )
}
