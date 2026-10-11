import { useEffect } from 'react'
import { PortfolioPage } from '@/portfolio/PortfolioPage'
import { initPortfolio } from '@/portfolio/interactions'
import '@/portfolio/portfolio.css'

// Retained for older component modules while the approved design is integrated.
export function scrollTo(target: string) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export default function App() {
  useEffect(() => initPortfolio(), [])
  return <PortfolioPage />
}
