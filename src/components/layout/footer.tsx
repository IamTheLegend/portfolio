import { Mail } from 'lucide-react'
import { LinkedinIcon } from '@/components/ui/brand-icons'

const year = new Date().getFullYear()

const socials = [
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/prasanth-annam/' },
  { icon: Mail, label: 'Email', href: 'mailto:hireprasanthannam@gmail.com' },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'var(--muted)' }}>
          © {year} Prasanth Annam.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
