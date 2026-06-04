import { FadeIn } from '@/components/motion/fade-in'
import { Button } from '@/components/ui/button'
import { GradientText } from '@/components/ui/gradient-text'
import { Mail } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/brand-icons'

const email = 'hireprasanthannam@gmail.com'

const socials = [
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    handle: 'in/prasanth-annam',
    href: 'https://www.linkedin.com/in/prasanth-annam/',
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative orb */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[500px] h-48 -mt-24 pointer-events-none blur-3xl opacity-10 rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))',
          }}
        />

        <FadeIn>
          <p className="text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--muted)' }}>Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Let's build something <GradientText>great</GradientText>
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: 'var(--body)' }}>
            I'm open to senior fullstack and engineering leadership roles. If you have something
            interesting in mind, I'd love to hear from you.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => window.open(`mailto:${email}`, '_blank')}
            className="mb-12"
          >
            <Mail size={16} />
            {email}
          </Button>
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={0.15} className="flex items-center justify-center gap-4 flex-wrap">
          {socials.map(({ icon: Icon, label, handle, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass border border-border rounded-xl px-5 py-3 text-sm text-muted hover:text-fg hover:border-accent/30 transition-all duration-200 group"
            >
              <Icon size={16} className="text-muted group-hover:text-accent transition-colors duration-200" />
              <span className="font-mono text-xs">{handle}</span>
              <span className="transition-colors" style={{ color: 'var(--muted)' }}>↗</span>
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
