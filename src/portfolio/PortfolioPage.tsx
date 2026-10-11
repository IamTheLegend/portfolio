import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

/** The approved reading flow stays intact: Hero, About, Experience, Skills, Contact. */
export function PortfolioPage() {
  return (
    <>
      <a className="skip" href="#main">
        {"Skip to content"}
      </a>
      <canvas id="ambient-canvas" aria-hidden="true"></canvas>
      <div className="grain" aria-hidden="true"></div>
      <div className="nav-indicator" id="progress" aria-hidden="true"></div>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
