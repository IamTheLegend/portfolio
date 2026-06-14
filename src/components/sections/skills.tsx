import { motion } from 'motion/react'
import { FadeIn } from '@/components/motion/fade-in'
import { Stagger, StaggerItem } from '@/components/motion/stagger'
import { GradientText } from '@/components/ui/gradient-text'
import { skillCategories } from '@/data/skills'

export function Skills() {
  const featured = skillCategories.find((c) => c.featured)
  const rest = skillCategories.filter((c) => !c.featured)

  return (
    <section id="skills" className="relative min-h-dvh flex flex-col justify-center py-8 md:py-12 px-6 section-gradient-amber">
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn className="mb-8 md:mb-12 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--muted)' }}>Skills</p>
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
            <div className="glass rounded-2xl p-10 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent2), var(--accent3))' }}
              />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] mb-2 text-fg font-semibold">
                    {featured.name}
                  </p>
                  <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--fg)' }}>
                    {featured.description}
                  </p>
                </div>
                <span
                  className="self-start text-xs font-mono px-3 py-1.5 rounded-full border whitespace-nowrap"
                  style={{ borderColor: 'var(--accent)', color: 'var(--fg)', background: 'oklch(from var(--accent) l c h / 0.16)' }}
                >
                  Primary expertise
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {featured.skills.map((skill) => (
                  <span
                    key={skill}
                    className="sunset-fill inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-default hover:-translate-y-px"
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
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="glass rounded-2xl p-8 h-full"
              >
                <h3 className="text-xs font-mono uppercase tracking-[0.22em] mb-6" style={{ color: 'var(--body)' }}>
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="sunset-fill inline-flex items-center rounded-full px-4 py-2 text-sm font-medium cursor-default transition-all duration-200 hover:-translate-y-px"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
