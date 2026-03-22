'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function FadeIn({ children, className = '', style, delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef(null)

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 32 : 0,
    x: direction === 'left' ? -32 : direction === 'right' ? 32 : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
