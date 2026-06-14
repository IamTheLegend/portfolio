import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { Button } from '@/components/ui/button'
import { LinkedinIcon } from '@/components/ui/brand-icons'
import { scrollTo } from '@/App'
import { SectionScroll } from '@/components/ui/section-scroll'

const ease = [0.25, 0.4, 0.25, 1] as const

function reveal(delay: number) {
  return {
    initial: { opacity: 0, filter: 'blur(10px)', y: 14 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
    transition: { duration: 0.6, delay, ease },
  }
}

export function Hero() {
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 600], [0, -80])
  const orb2Y = useTransform(scrollY, [0, 600], [0, 50])

  // Pointer-driven 3D tilt on the headline block
  const rotX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const rotY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 })
  const cardRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent) {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotY.set(px * 8)
    rotX.set(-py * 6)
  }
  function onLeave() {
    rotX.set(0)
    rotY.set(0)
  }

  function scrollToAbout() {
    scrollTo('#about')
  }
  function scrollToContact() {
    scrollTo('#contact')
  }

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden px-6"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* soft depth orbs (sit above the ribbon, below the text) */}
      <motion.div
        style={{ y: orb1Y, background: 'var(--accent2)' }}
        className="absolute -top-48 -left-48 w-[620px] h-[620px] rounded-full pointer-events-none blur-3xl opacity-20 animate-glow"
      />
      <motion.div
        style={{ y: orb2Y, background: 'var(--accent3)' }}
        className="absolute -bottom-48 -right-48 w-[620px] h-[620px] rounded-full pointer-events-none blur-3xl opacity-20 animate-glow"
      />

      <div className="absolute inset-0 hero-text-shield pointer-events-none" />

      <motion.div
        ref={cardRef}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1000,
        }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          {...reveal(0)}
          className="inline-flex items-center gap-2 glass border border-border rounded-full px-4 py-1.5 text-xs font-mono mb-8"
          style={{ color: 'var(--body)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(72%_0.18_145)] animate-pulse" />
          Open to new opportunities
        </motion.div>

        {/* Heading */}
        <h1 className="text-[3.5rem] sm:text-[4.25rem] md:text-[5.7rem] font-bold tracking-tight leading-[1.08] mb-6">
          <motion.span {...reveal(0.08)} className="block" style={{ color: 'var(--fg)' }}>
            Hi, I'm Prasanth
          </motion.span>
          <motion.span {...reveal(0.18)} className="block mt-2 gradient-text-hero">
            Senior Full-Stack Engineer
          </motion.span>
        </h1>

        {/* Tagline */}
        <motion.p
          {...reveal(0.28)}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: 'var(--body)' }}
        >
          From architecting AWS partner platforms powering billion-dollar programs to shipping
          HR applications used by 1M+ people — I build software that performs at scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...reveal(0.38)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button onClick={scrollToAbout}>View my work</Button>
          <Button variant="outline" onClick={scrollToContact}>
            Get in touch
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://www.linkedin.com/in/prasanth-annam/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-full transition-all duration-200 hover:text-fg"
              style={{ color: 'var(--muted)' }}
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <SectionScroll target="#about" label="About" />
    </section>
  )
}
