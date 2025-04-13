
import * as React from "react"
import { cn } from "@/lib/utils"

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children: React.ReactNode
  variant?: 'default' | 'outline'
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(({ 
  className, 
  children, 
  variant = 'default',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flyingbus-purple focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'h-10 px-4 py-2',
        variant === 'default' && [
          'bg-flyingbus-purple text-white hover:bg-flyingbus-purple/90',
        ],
        variant === 'outline' && [
          'border border-current',
          'hover:bg-flyingbus-purple/10'
        ],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
NavButton.displayName = "NavButton"

export { NavButton }
