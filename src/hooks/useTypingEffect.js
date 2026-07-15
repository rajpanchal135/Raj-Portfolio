import { useState, useEffect, useCallback } from 'react'

export default function useTypingEffect(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const currentWord = words[wordIndex]

    if (!isDeleting) {
      // Typing
      setDisplayText(currentWord.substring(0, displayText.length + 1))

      if (displayText.length + 1 === currentWord.length) {
        // Finished typing, pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }
    } else {
      // Deleting
      setDisplayText(currentWord.substring(0, displayText.length - 1))

      if (displayText.length - 1 === 0) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
        return
      }
    }
  }, [displayText, isDeleting, wordIndex, words, pauseTime])

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, typingSpeed, deletingSpeed])

  return displayText
}
