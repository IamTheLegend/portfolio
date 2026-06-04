const items = [
  'Agentic AI', 'React', 'TypeScript', 'AWS', 'Claude Sonnet', 'Python',
  'Microservices', 'Full-Stack', 'Node.js', 'Spring Boot', 'Prompt Engineering',
  'LLM Integration', 'AI-First Architecture', 'Amazon Q', 'Cursor',
]

export function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative border-y border-border py-4 select-none" style={{ overflow: 'hidden', contain: 'paint' }}>
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />

      <div className="flex animate-marquee w-max gap-0">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-sm font-mono whitespace-nowrap" style={{ color: 'var(--muted)' }}>
            {item}
            <span className="gradient-text text-base leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
