import Lottie from 'lottie-react'
import animationData from '@/assets/animations/typing.json'

export const TypingLottie = () => {
  return (
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
  )
}
