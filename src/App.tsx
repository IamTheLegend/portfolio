import { useEffect } from 'react'
import Lenis from 'lenis'
import { Nav } from '@/components/layout/nav'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Skills } from '@/components/sections/skills'
import { Contact } from '@/components/sections/contact'
import { Marquee } from '@/components/ui/marquee'
import { Backdrop } from '@/components/three/backdrop'

let lenisInstance: Lenis | null = null

export function scrollTo(target: string) {
  const el = document.querySelector(target)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return (
    <div className="relative">
      <Backdrop />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App
