
import * as React from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface NavigationProps {
  items: NavItem[]
}

const ChevronIcon = () => (
  <ChevronDown className="h-4 w-4 opacity-60" />
)

const HeaderNavigation: React.FC<NavigationProps> = ({ items }) => (
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

export { HeaderNavigation }
