import { cn } from '@/lib/cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'outline'
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      style={{
        color: 'var(--body)',
        ...(variant === 'default' && {
          background: 'linear-gradient(135deg, oklch(72% 0.19 270 / 0.12), oklch(72% 0.18 200 / 0.09), oklch(72% 0.20 330 / 0.12))',
          border: '1px solid oklch(72% 0.19 270 / 0.25)',
        }),
      }}
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        'transition-all duration-200 hover:-translate-y-px hover:border-accent/50 hover:text-fg hover:shadow-[0_0_8px_oklch(72%_0.19_270/0.2)]',
        variant === 'default' && 'border',
        variant === 'accent' && 'bg-accent/10 text-accent border border-accent/20',
        variant === 'outline' && 'border border-border',
        className
      )}
    >
      {children}
    </span>
  )
}
