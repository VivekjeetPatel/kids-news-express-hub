
import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X, User, BookOpen, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"
import { NavItem } from "@/components/Layout/menuItems"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const { currentUser, isLoggedIn, logout } = useAuth();
  
  if (!isOpen) return null;
  
  const handleLogout = () => {
    logout();
  };

  const renderAuthSection = () => {
    if (isLoggedIn && currentUser) {
      return (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 px-4 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
              <AvatarFallback className="bg-neutral-700 text-white">
                {currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentUser.displayName}</p>
              <p className="text-sm text-gray-500">@{currentUser.username}</p>
            </div>
          </div>
          
          <ul className="space-y-2 px-4">
            <li>
              <Link 
                to={`/profile/${currentUser.username}`}
                className="flex items-center gap-2 py-2 text-gray-700"
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to={`/profile/${currentUser.username}/settings`}
                className="flex items-center gap-2 py-2 text-gray-700"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 py-2 text-gray-700 w-full text-left"
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </div>
      );
    }
    
    return (
      <div className="mt-6 px-4">
        <Link to="/reader-auth?tab=sign-in" className="block w-full mb-2">
          <NavButton variant="outline" className="w-full">
            <User className="mr-2 h-4 w-4" />
            Sign In
          </NavButton>
        </Link>
        <Link to="/reader-auth?tab=sign-up" className="block w-full">
          <RainbowButton className="w-full flex items-center justify-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Join Us
          </RainbowButton>
        </Link>
      </div>
    );
  };
  
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
                    className="block text-lg font-medium text-gray-700 hover:text-gray-900"
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
                              className="block text-base text-gray-600 hover:text-gray-900"
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
          {renderAuthSection()}
        </nav>
      </div>
    </div>
  );
};

export { MobileMenu, MobileMenuButton }
