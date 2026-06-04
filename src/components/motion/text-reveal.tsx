import { motion } from 'motion/react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  wordDelay?: number
}

export function TextReveal({ text, className, delay = 0, wordDelay = 0.06 }: TextRevealProps) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.65,
              delay: delay + i * wordDelay,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
