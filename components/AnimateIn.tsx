'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
  /** 'up' | 'down' | 'left' | 'right' | 'scale' | 'scaleUp' | 'scaleDown' | 'blur' | 'clipUp' | 'clipLeft' | 'none' */
  type?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'scaleUp' | 'scaleDown' | 'blur' | 'clipUp' | 'clipLeft' | 'none'
  once?: boolean
  margin?: string | number
  amount?: number
  hiddenScaleX?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

export default function AnimateIn({
  children,
  className = '',
  style,
  delay = 0,
  duration = 0.9,
  type = 'up',
  once = true,
  margin = '-80px',
  amount = 0.2,
  hiddenScaleX = false,
}: AnimateInProps) {
  const ref = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once, margin: margin as any, amount })

  const getInitial = () => {
    switch (type) {
      case 'up':      return { opacity: 0, y: 60 }
      case 'down':    return { opacity: 0, y: -60 }
      case 'left':    return { opacity: 0, x: -60 }
      case 'right':   return { opacity: 0, x: 60 }
      case 'scale':   return { opacity: 0, scale: 0.7 }
      case 'scaleUp': return { opacity: 0, scale: 0.6, y: 40 }
      case 'scaleDown': return { opacity: 0, scale: 1.15 }
      case 'blur':    return { opacity: 0, filter: 'blur(16px)' }
      case 'clipUp':  return { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
      case 'clipLeft': return { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
      case 'none':    return { opacity: 0 }
      default:        return { opacity: 0, y: 60 }
    }
  }

  const getAnimate = () => {
    switch (type) {
      case 'up':      return { opacity: 1, y: 0 }
      case 'down':    return { opacity: 1, y: 0 }
      case 'left':    return { opacity: 1, x: 0 }
      case 'right':   return { opacity: 1, x: 0 }
      case 'scale':   return { opacity: 1, scale: 1 }
      case 'scaleUp': return { opacity: 1, scale: 1, y: 0 }
      case 'scaleDown': return { opacity: 1, scale: 1 }
      case 'blur':    return { opacity: 1, filter: 'blur(0px)' }
      case 'clipUp':  return { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
      case 'clipLeft': return { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
      case 'none':    return { opacity: 1 }
      default:        return { opacity: 1, y: 0 }
    }
  }

  const initial = getInitial()
  const animate = inView ? getAnimate() : initial

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  )
}
