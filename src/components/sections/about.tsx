import { FadeIn } from '@/components/motion/fade-in'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { GradientText } from '@/components/ui/gradient-text'

const stats = [
  { value: '11+', label: 'Years of professional experience' },
  { value: '300K+', label: 'Active users served' },
  { value: '$12M+', label: 'In savings delivered' },
]

export function About() {
  return (
    <section id="about" className="relative py-20 px-6 section-gradient-violet">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: bio */}
          <div>
            <FadeIn direction="left">
              <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--dim)' }}>
                About me
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
                From APIs to interfaces,{' '}
                <GradientText>built to scale</GradientText>
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
            {stats.map(({ value, label }) => (
              <StaggerItem key={label}>
                <div className="glass rounded-2xl px-8 py-6 flex items-center gap-6">
                  <span className="text-4xl font-bold gradient-text">{value}</span>
                  <span className="text-sm leading-tight" style={{ color: 'var(--body)' }}>{label}</span>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="glass rounded-2xl px-8 py-6">
                <p className="text-xs font-mono uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--dim)' }}>
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
    </section>
  )
}
