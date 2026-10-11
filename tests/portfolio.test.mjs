import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { test } from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('approved section order remains intact', () => {
  const page = read('src/portfolio/PortfolioPage.tsx')
  const sections = ['<Hero />', '<About />', '<Experience />', '<Skills />', '<Contact />']
  const positions = sections.map((section) => page.indexOf(section))
  assert(positions.every((index) => index !== -1))
  assert(positions.every((index, i) => i === 0 || positions[i - 1] < index))
})

test('all five employers and their impact statements remain present', () => {
  const experience = read('src/portfolio/sections/Experience.tsx')
  for (const name of ['Amazon', 'Tesla', 'Intel', 'Western Digital', 'Infosys']) {
    assert(experience.toLowerCase().includes(name.toLowerCase()), `Missing experience: ${name}`)
  }
  for (const metric of ['57%', '750K', '4M', '2.5B']) {
    assert(experience.includes(metric), `Missing documented highlight: ${metric}`)
  }
})

test('hero animation is 15 percent more transparent without dimming other scenes', () => {
  const motion = read('src/portfolio/interactions.js')
  assert(motion.includes('drawChapter(0,0.85*(1-clamp((curr-.35)/.65)))'))
  assert(motion.includes('drawChapter(k,1-eased)'))
  assert(motion.includes('if(k<7)drawChapter(k+1,eased)'))
})

test('local resume and bundled technology icons are shipped', () => {
  assert(existsSync(new URL('public/Prasanth_Annam_Resume.pdf', root)))
  const techDir = new URL('public/technology-icons/', root)
  assert(readdirSync(techDir).some((name) => name.endsWith('.svg')))
  assert(read('src/portfolio/sections/Hero.tsx').includes('/Prasanth_Annam_Resume.pdf'))
})

test('both themes and accessible motion preference are supported', () => {
  const css = read('src/portfolio/portfolio.css')
  const motion = read('src/portfolio/interactions.js')
  assert(css.includes('html[data-theme=light]'))
  assert(motion.includes('prefers-reduced-motion: reduce'))
  assert(motion.includes('eventCleanups.forEach'))
})
