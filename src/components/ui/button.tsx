import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
          variant === 'default' && 'bg-bw-yellow-500 text-bw-gray-800 hover:bg-bw-yellow-550',
          variant === 'secondary' && 'bg-bw-gray-700 text-bw-gray-50 border border-bw-gray-600 hover:bg-bw-gray-700',
          variant === 'ghost' && 'hover:bg-bw-gray-700 text-bw-gray-200',
          variant === 'outline' && 'border border-bw-gray-600 bg-transparent hover:bg-bw-gray-700',
          size === 'default' && 'h-10 px-4 py-2',
          size === 'sm' && 'h-9 px-3',
          size === 'lg' && 'h-11 px-8',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
