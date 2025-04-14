
import * as React from "react"
import { Link } from "react-router-dom"
import { NavItem } from "@/components/Layout/menuItems"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCategoryIcon } from "@/utils/getCategoryIcon"
import { getCategoryColor } from "@/utils/categoryColors"

interface HeaderNavigationProps {
  items: NavItem[]
}

const ChevronIcon = () => (
  <ChevronDown className="h-2.5 w-2.5 opacity-60" />
)

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ items }) => (
  <nav>
    <ul className="flex gap-x-2 xl:gap-x-4 md:flex hidden">
      {items.map(({ to, text, items }, index) => {
        const colorClass = text ? getCategoryColor(text).split(' ')[0] : '';
        const hoverClass = colorClass ? `hover:${colorClass} hover:bg-opacity-10` : 'hover:bg-gray-100';
        const borderHoverClass = colorClass ? `hover:border-b-2 hover:border-${colorClass.replace('bg-', '')}` : '';
        
        return (
          <li
            className={cn('relative [perspective:2000px]', items?.length && items.length > 0 ? 'group' : '')}
            key={index}
          >
            {to ? (
              <Link
                className={cn(
                  'flex items-center gap-x-1 whitespace-pre text-xs font-medium text-gray-700 hover:text-gray-900 py-1 px-1.5 rounded-md transition-colors',
                  hoverClass,
                  'border-b border-transparent',
                  borderHoverClass
                )}
                to={to}
              >
                {text && getCategoryIcon(text)}
                <span>{text}</span>
              </Link>
            ) : (
              <button
                className={cn(
                  'flex items-center gap-x-1 whitespace-pre text-xs font-medium text-gray-700 hover:text-gray-900 py-1 px-1.5 rounded-md transition-colors',
                  hoverClass,
                  'border-b border-transparent',
                  borderHoverClass
                )}
              >
                {text && getCategoryIcon(text)}
                <span>{text}</span>
                {items?.length && items.length > 0 && <ChevronIcon />}
              </button>
            )}
            
            {items?.length && items.length > 0 && (
              <div
                className={cn(
                  'absolute -left-5 top-full w-[250px] pt-5 z-50',
                  'pointer-events-none opacity-0',
                  'origin-top-left transition-[opacity,transform] duration-200 [transform:rotateX(-12deg)_scale(0.9)]',
                  'group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-hover:[transform:none]'
                )}
              >
                <ul
                  className={cn(
                    'relative flex min-w-[200px] flex-col gap-y-0.5 rounded-[14px] border p-2',
                    'border-gray-200 bg-white shadow-[0px_14px_20px_0px_rgba(0,0,0,.1)]'
                  )}
                >
                  {items.map(({ text, description, to }, index) => (
                    <li key={index}>
                      <Link
                        className={cn(
                          'group/link relative flex items-center overflow-hidden whitespace-nowrap rounded-[14px] p-1.5',
                          'before:absolute before:inset-0 before:z-10 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100',
                          'text-gray-700 before:bg-[#f5f5f5]'
                        )}
                        to={to}
                      >
                        <div className="relative z-10 ml-2">
                          <span className="block text-xs font-medium">{text}</span>
                          {description && (
                            <span className="mt-0.5 block text-xs text-gray-500">
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
