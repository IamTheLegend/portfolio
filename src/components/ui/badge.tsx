import { cn } from '@/lib/cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'outline'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      style={{ color: 'var(--body)' }}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-surface border border-border',
        variant === 'accent' && 'bg-accent/10 text-accent border border-accent/20',
        variant === 'outline' && 'border border-border',
        className
      )}
    >
      {children}
    </span>
  )
}
