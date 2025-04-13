
import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
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

interface MobileMenuButtonProps {
  onClick: () => void
  isOpen: boolean
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
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

interface MobileMenuProps {
  isOpen: boolean
  items: NavItem[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, items }) => {
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

export { MobileMenu, MobileMenuButton }
