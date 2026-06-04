import { cn } from '@/lib/cn'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export function GradientText({ children, className, animate = false }: GradientTextProps) {
  return (
    <span className={cn(animate ? 'gradient-text-animate' : 'gradient-text', className)}>
      {children}
    </span>
  )
}
