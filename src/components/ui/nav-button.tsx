
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
        'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'h-10 px-4 py-1 hover:scale-105 active:scale-95', // Added scale transforms
        variant === 'default' && [
          'bg-gray-800 text-white hover:bg-gray-700',
        ],
        variant === 'outline' && [
          'border border-current text-gray-800',
          'hover:bg-gray-100/50' // Lighter hover background
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
