import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { scrollTo } from '@/App'

export function SectionScroll({ target, label }: { target: string; label: string }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.5 }}
      onClick={() => scrollTo(target)}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer group"
      style={{ color: 'var(--muted)' }}
      aria-label={`Scroll to ${label}`}
    >
      <span className="text-xs font-mono tracking-widest uppercase group-hover:text-fg transition-colors duration-200">{label}</span>
      <ArrowDown size={14} className="animate-bounce group-hover:text-fg transition-colors duration-200" />
    </motion.button>
  )
}
