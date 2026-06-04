import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-accent text-white px-6 py-3 text-sm hover:opacity-90 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-accent/20',
        outline:
          'glass px-6 py-3 text-sm text-fg hover:bg-fg/5 hover:scale-[1.03] active:scale-[0.98] border border-border',
        ghost: 'px-4 py-2 text-sm text-muted hover:text-fg hover:bg-fg/5',
        icon: 'p-2.5 rounded-full glass border border-border text-muted hover:text-fg hover:scale-[1.05]',
      },
      size: {
        sm: 'text-xs px-4 py-2',
        md: 'text-sm px-6 py-3',
        lg: 'text-base px-8 py-4',
      },
    },
    defaultVariants: { variant: 'primary' },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
