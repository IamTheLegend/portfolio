import { useRef } from 'react'
import { motion } from 'motion/react'
import { FadeIn } from '@/components/motion/fade-in'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { Badge } from '@/components/ui/badge'
import { GradientText } from '@/components/ui/gradient-text'
import { workEntries } from '@/data/work'

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-4px)`
    el.style.boxShadow = '0 16px 48px oklch(72% 0.19 270 / 0.18), 0 0 0 1px oklch(72% 0.19 270 / 0.22)'
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.15s ease' }}
    >
      {children}
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="relative py-12 md:py-20 px-6 section-gradient-cyan">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn className="mb-10 md:mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--muted)' }}>Experience</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Where I've <GradientText>worked</GradientText>
          </h2>
        </FadeIn>

        {/* Timeline */}
        <Stagger className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'top' }}
          />

          {workEntries.map((entry, i) => (
            <StaggerItem key={i}>
              <div className="md:pl-10 mb-8 relative group">
                {/* Timeline dot */}
                <div
                  className="absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 border-accent hidden md:block transition-all duration-300 group-hover:scale-150"
                  style={{ background: 'var(--bg)' }}
                />

                <TiltCard className="glass rounded-2xl p-8 hover:border-accent/30 transition-colors duration-300 hover:shadow-lg hover:shadow-accent/5">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-fg">{entry.role}</h3>
                      <p className="text-accent font-medium text-sm mt-0.5">{entry.company}</p>
                    </div>
                    <span className="text-xs font-mono bg-surface px-3 py-1 rounded-full whitespace-nowrap self-start" style={{ color: 'var(--body)' }}>
                      {entry.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--body)' }}>{entry.description}</p>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-6">
                    {entry.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--body)' }}>
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </TiltCard>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
