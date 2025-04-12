
"use client"

import * as React from "react"
import { Link } from "react-router-dom"
import { cva } from "class-variance-authority"
import { ChevronDown, Menu, X, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

interface NavItem {
  to?: string
  text: string
  items?: {
    icon?: {
      dark: string
      light: string
    }
    text: string
    description?: string
    to: string
  }[]
}

interface ModernHeaderProps {
  className?: string
  logo?: React.ReactNode
  menuItems?: NavItem[]
  rightContent?: React.ReactNode
}

const ChevronIcon = () => (
  <ChevronDown className="h-4 w-4 opacity-60" />
)

const Navigation: React.FC<{ items: NavItem[] }> = ({ items }) => (
  <nav>
    <ul className="flex gap-x-6 xl:gap-x-8 md:flex hidden">
      {items.map(({ to, text, items }, index) => {
        return (
          <li
            className={cn('relative [perspective:2000px]', items?.length && items.length > 0 ? 'group' : '')}
            key={index}
          >
            {to ? (
              <Link
                className={cn(
                  'flex items-center gap-x-1 whitespace-pre text-sm font-medium text-gray-700 hover:text-flyingbus-purple',
                )}
                to={to}
              >
                {text}
              </Link>
            ) : (
              <button
                className={cn(
                  'flex items-center gap-x-1 whitespace-pre text-sm font-medium text-gray-700 hover:text-flyingbus-purple',
                )}
              >
                {text}
                {items?.length && items.length > 0 && <ChevronIcon />}
              </button>
            )}
            
            {items?.length && items.length > 0 && (
              <div
                className={cn(
                  'absolute -left-5 top-full w-[300px] pt-5 z-50',
                  'pointer-events-none opacity-0',
                  'origin-top-left transition-[opacity,transform] duration-200 [transform:rotateX(-12deg)_scale(0.9)]',
                  'group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:[transform:none]'
                )}
              >
                <ul
                  className={cn(
                    'relative flex min-w-[248px] flex-col gap-y-0.5 rounded-[14px] border p-2.5',
                    'border-gray-200 bg-white shadow-[0px_14px_20px_0px_rgba(0,0,0,.1)]'
                  )}
                >
                  {items.map(({ text, description, to }, index) => (
                    <li key={index}>
                      <Link
                        className={cn(
                          'group/link relative flex items-center overflow-hidden whitespace-nowrap rounded-[14px] p-2',
                          'before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100',
                          'text-gray-700 before:bg-[#f5f5f5]'
                        )}
                        to={to}
                      >
                        <div className="relative z-10 ml-3">
                          <span className="block text-sm font-medium">{text}</span>
                          {description && (
                            <span className="mt-0.5 block text-sm text-gray-500">
                              {description}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  </nav>
)

const MobileMenuButton: React.FC<{ onClick: () => void; isOpen: boolean }> = ({
  onClick,
  isOpen
}) => (
  <button
    className="md:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 text-gray-700"
    onClick={onClick}
  >
    {isOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
)

const MobileMenu: React.FC<{ isOpen: boolean; items: NavItem[] }> = ({ isOpen, items }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden fixed inset-0 top-[72px] z-50 bg-white">
      <div className="container h-full overflow-y-auto">
        <nav className="py-6">
          <ul className="flex flex-col space-y-4">
            {items.map((item, index) => (
              <li key={index}>
                {item.to ? (
                  <Link 
                    to={item.to} 
                    className="block text-lg font-medium text-gray-700 hover:text-flyingbus-purple"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <div>
                    <div className="text-lg font-medium text-gray-700 mb-2">{item.text}</div>
                    {item.items && item.items.length > 0 && (
                      <ul className="pl-4 space-y-2">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link 
                              to={subItem.to} 
                              className="block text-base text-gray-600 hover:text-flyingbus-purple"
                            >
                              {subItem.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export const ModernHeader: React.FC<ModernHeaderProps> = ({
  className,
  logo,
  menuItems = [],
  rightContent,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        'relative z-40 w-full bg-white border-b border-gray-200',
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {logo}
          <Navigation items={menuItems} />
          <div className="flex items-center gap-x-4">
            {rightContent}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} items={menuItems} />
    </header>
  );
};

export { NavButton };
export default ModernHeader;
