import { motion } from 'motion/react'
import { cn } from '@/lib/cn'

interface StaggerProps {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
}

export function Stagger({ children, className, delay = 0, staggerDelay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
