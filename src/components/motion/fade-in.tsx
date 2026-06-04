import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

const directionOffset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
