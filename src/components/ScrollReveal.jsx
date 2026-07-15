import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  distance = '30px',
  duration = 700,
  once = true,
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [once])

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)'
    switch (direction) {
      case 'up': return `translate(0, ${distance})`
      case 'down': return `translate(0, -${distance})`
      case 'left': return `translate(${distance}, 0)`
      case 'right': return `translate(-${distance}, 0)`
      case 'none': return 'translate(0, 0)'
      default: return `translate(0, ${distance})`
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
