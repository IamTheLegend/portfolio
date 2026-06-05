import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { useScrollProgress } from '@/hooks/use-scroll-progress'
import { cn } from '@/lib/cn'
import { scrollTo } from '@/App'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const { theme, toggle } = useTheme()
  const scrollProgress = useScrollProgress()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setScrolled(window.scrollY > 20)
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNavClick(href: string) {
    setMobileOpen(false)
    scrollTo(href)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))',
          scaleX: scrollProgress,
          transformOrigin: 'left',
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          'fixed top-2 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4',
          'transition-all duration-300'
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300',
            scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="font-mono text-sm font-semibold text-fg tracking-tight"
          >
            <span className="gradient-text">P</span>rasanth
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm text-body hover:text-fg rounded-xl hover:bg-fg/5 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full text-muted hover:text-fg hover:bg-fg/5 transition-all duration-200 cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden p-2.5 rounded-full text-muted hover:text-fg hover:bg-fg/5 transition-all duration-200 cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-2 rounded-2xl p-3 flex flex-col gap-1 border border-border"
              style={{ background: 'var(--surface)' }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm text-body hover:text-fg rounded-xl hover:bg-fg/5 transition-all duration-200 cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
