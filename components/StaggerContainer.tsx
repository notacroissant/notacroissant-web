'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  staggerDelay?: number
  delay?: number
  duration?: number
  type?: 'up' | 'scale' | 'blur' | 'clipUp'
  once?: boolean
  margin?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export default function StaggerContainer({
  children,
  className = '',
  style,
  staggerDelay = 0.12,
  delay = 0,
  duration = 0.8,
  type = 'up',
  once = true,
  margin = '-60px',
}: StaggerContainerProps) {
  const ref = useRef(null)

  const getChildVariants = (index: number) => {
    const initial = (() => {
      switch (type) {
        case 'up':     return { opacity: 0, y: 50 }
        case 'scale':  return { opacity: 0, scale: 0.82 }
        case 'blur':   return { opacity: 0, filter: 'blur(12px)' }
        case 'clipUp': return { opacity: 0, clipPath: 'inset(100% 0 0 0)' }
        default:       return { opacity: 0, y: 50 }
      }
    })()

    const whileInView = (() => {
      switch (type) {
        case 'up':     return { opacity: 1, y: 0 }
        case 'scale':  return { opacity: 1, scale: 1 }
        case 'blur':   return { opacity: 1, filter: 'blur(0px)' }
        case 'clipUp': return { opacity: 1, clipPath: 'inset(0% 0 0 0)' }
        default:       return { opacity: 1, y: 0 }
      }
    })()

    return {
      initial,
      whileInView,
      viewport: { once, margin: typeof margin === 'string' ? margin : `${margin}px` },
      transition: { duration, delay: delay + index * staggerDelay, ease },
    }
  }

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div ref={ref} className={className} style={style}>
      {childArray.map((child, i) => {
        const key = (child as React.ReactElement)?.key ?? i
        const variants = getChildVariants(i)
        return (
          <motion.div key={key} {...variants}>
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
