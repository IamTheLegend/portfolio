import { useEffect } from 'react'
import Lenis from 'lenis'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Work } from '@/components/sections/work'
import { Skills } from '@/components/sections/skills'
import { Contact } from '@/components/sections/contact'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
