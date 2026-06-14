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
        'transition-all duration-200 hover:-translate-y-px hover:border-accent/50 hover:text-fg hover:shadow-[0_0_10px_oklch(from_var(--accent)_l_c_h/0.25)]',
        variant === 'default' && 'sunset-fill',
        variant === 'accent' && 'bg-accent/10 text-accent border border-accent/20',
        variant === 'outline' && 'border border-border',
        className
      )}
    >
      {children}
    </span>
  )
}
