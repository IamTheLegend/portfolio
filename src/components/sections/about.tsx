import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'
import { FadeIn } from '@/components/motion/fade-in'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { GradientText } from '@/components/ui/gradient-text'
import { SectionScroll } from '@/components/ui/section-scroll'

const stats = [
  { prefix: '', value: 11, suffix: '+', label: 'Years of professional experience' },
  { prefix: '', value: 1, suffix: 'M+', label: 'Active users served' },
  { prefix: '$', value: 12, suffix: 'M+', label: 'In savings delivered' },
]

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView, to])

  return (
    <motion.span
      ref={ref}
      className="gradient-text"
      initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      style={{ display: 'inline-block' }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}

export function About() {
  return (
    <section id="about" className="relative min-h-dvh flex flex-col justify-center py-8 md:py-12 px-6 section-gradient-violet">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: bio */}
          <div>
            <FadeIn direction="left">
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--muted)' }}>
                About me
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                From APIs to interfaces, <GradientText>built to scale</GradientText>
              </h2>
              <div className="space-y-4 leading-relaxed" style={{ color: 'var(--body)' }}>
                <p>
                  I'm a Senior Full-Stack Engineer with 11+ years shipping production software across
                  Amazon, Tesla, Intel, and Western Digital. I build Agentic AI-first — AI isn't a
                  feature I add, it's the architecture I start from.
                </p>
                <p>
                  Currently at Amazon as an SDE II, I lead AI-first full-stack development for AWS
                  Partner Central (a ~$8B+ program portfolio) and serve as an AI Ambassador, driving
                  agentic AI adoption across ~450 engineers. I won Amazon's internal GenAI Hackathon
                  building an AI agent for sales migration workflows.
                </p>
                <p>
                  M.S. in Computer and Information Science (GPA 3.97/4) from Florida International
                  University. B.Tech in Computer Science from JNTU, Kakinada.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: stats + highlight */}
          <Stagger delay={0.2} className="grid grid-cols-1 gap-4">
            {stats.map(({ prefix, value, suffix, label }) => (
              <StaggerItem key={label}>
                <div className="glass rounded-2xl px-8 py-6 flex items-center gap-6">
                  <span className="text-4xl font-bold">
                    <CountUp to={value} prefix={prefix} suffix={suffix} />
                  </span>
                  <span className="text-sm leading-tight" style={{ color: 'var(--body)' }}>{label}</span>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="glass rounded-2xl px-8 py-6">
                <p className="text-xs font-mono uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--muted)' }}>
                  Latest achievement
                </p>
                <p className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>
                  🏆 GenAI Hackathon Winner — Amazon
                </p>
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--body)' }}>
                  Built an AI agent enabling Sales teams to generate tailored AWS migration solutions for new customers.
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
      <SectionScroll target="#work" label="Experience" />
    </section>
  )
}
