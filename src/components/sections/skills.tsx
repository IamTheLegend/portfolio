import { FadeIn } from '@/components/motion/fade-in'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { GradientText } from '@/components/ui/gradient-text'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const featured = skillCategories.find((c) => c.featured)
  const rest = skillCategories.filter((c) => !c.featured)

  return (
    <section id="skills" className="relative py-20 px-6 section-gradient-pink">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <FadeIn className="mb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--dim)' }}>Skills</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Built to be <GradientText>AI-first</GradientText>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm leading-relaxed" style={{ color: 'var(--body)' }}>
            Over 11 years across the full stack — with every modern system architected Agentic AI-first from day one.
          </p>
        </FadeIn>

        {/* Featured AI card */}
        {featured && (
          <FadeIn className="mb-8">
            <div className="glass-gradient-border p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] mb-2 gradient-text font-semibold">
                    {featured.name}
                  </p>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--body)' }}>
                    {featured.description}
                  </p>
                </div>
                <span
                  className="self-start text-xs font-mono px-3 py-1.5 rounded-full border whitespace-nowrap"
                  style={{ borderColor: 'var(--accent)', color: 'var(--accent)', background: 'oklch(72% 0.19 270 / 0.08)' }}
                >
                  Primary expertise
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {featured.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-default"
                    style={{
                      background: 'linear-gradient(135deg, oklch(72% 0.19 270 / 0.15), oklch(72% 0.18 200 / 0.12), oklch(72% 0.20 330 / 0.15))',
                      border: '1px solid oklch(72% 0.19 270 / 0.30)',
                      color: 'var(--fg)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Remaining skill categories */}
        <Stagger className="grid sm:grid-cols-3 gap-6">
          {rest.map((category) => (
            <StaggerItem key={category.name}>
              <div
                className="glass rounded-2xl p-8 h-full transition-all duration-300"
                style={{ '--hover-border': 'oklch(72% 0.19 270 / 0.25)' } as React.CSSProperties}
              >
                <h3 className="text-xs font-mono uppercase tracking-[0.22em] mb-6" style={{ color: 'var(--body)' }}>
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-default"
                      style={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        color: 'var(--fg)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
