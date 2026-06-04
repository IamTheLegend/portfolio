import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LinkedinIcon } from '@/components/ui/brand-icons'

const ease = [0.25, 0.4, 0.25, 1] as const

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <>
      <span style={{ overflow: 'hidden', display: 'inline-block' }}>
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, delay, ease }}
        >
          {word}
        </motion.span>
      </span>
      {' '}
    </>
  )
}

function AnimatedHeading({ text, delay }: { text: string; delay: number }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <AnimatedWord key={i} word={word} delay={delay + i * 0.07} />
      ))}
    </>
  )
}

export function Hero() {
  function scrollToWork() {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }
  function scrollToContact() {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Full-bleed mesh gradient — bold, iPhone-style */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" />

      {/* Corner orbs — kept at the periphery so they don't collide with center text */}
      <div
        className="absolute -top-48 -left-48 w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl opacity-40 animate-glow"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl opacity-35 animate-glow"
        style={{ background: 'var(--accent3)', animationDelay: '1.5s' }}
      />

      {/* Dark center vignette — keeps text readable against the vivid gradient edges */}
      <div className="absolute inset-0 hero-text-shield pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-1.5 text-xs font-mono mb-8"
          style={{ color: 'var(--body)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(72%_0.18_145)] animate-pulse" />
          Open to new opportunities
        </motion.div>

        {/* Heading — uses animate (not whileInView) since it's above the fold */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="block" style={{ color: 'var(--fg)' }}>
            <AnimatedHeading text="Hi, I'm Prasanth" delay={0.2} />
          </span>
          <span className="block mt-2 gradient-text-hero">
            <AnimatedHeading text="Senior Full-Stack Engineer" delay={0.55} />
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease }}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--body)' }}
        >
          From architecting AWS partner platforms powering billion-dollar programs to shipping
          HR applications used by 1M+ people — I build software that performs at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button onClick={scrollToWork}>View my work</Button>
          <Button variant="outline" onClick={scrollToContact}>
            Get in touch
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://www.linkedin.com/in/prasanth-annam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full transition-all duration-200"
              style={{ color: 'var(--muted)' }}
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={scrollToWork}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
        style={{ color: 'var(--muted)' }}
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  )
}
