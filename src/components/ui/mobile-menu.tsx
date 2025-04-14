
import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X, User, BookOpen, LogOut, Settings, CircleDot } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"
import { NavItem } from "@/components/Layout/menuItems"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCategoryColor } from "@/utils/categoryColors"

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

  const getCategoryDotColor = (text: string) => {
    const colorClass = getCategoryColor(text);
    if (!colorClass) return null;
    
    // Extract just the background color class (bg-*)
    const bgClass = colorClass.split(' ')[0];
    if (!bgClass) return null;
    
    // Convert bg-* to text-* (e.g., bg-flyingbus-red → text-flyingbus-red)
    return bgClass.replace('bg-', 'text-');
  };

  const renderAuthSection = () => {
    if (isLoggedIn && currentUser) {
      return (
        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="flex items-center gap-4 px-5 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
              <AvatarFallback className="bg-neutral-700 text-white">
                {currentUser.displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-base">{currentUser.displayName}</p>
              <p className="text-sm text-gray-500">@{currentUser.username}</p>
            </div>
          </div>
          
          <ul className="space-y-4 px-5">
            <li>
              <Link 
                to={`/profile/${currentUser.username}`}
                className="flex items-center gap-3 py-2 text-gray-700 font-medium"
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link 
                to={`/profile/${currentUser.username}/settings`}
                className="flex items-center gap-3 py-2 text-gray-700 font-medium"
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 py-2 text-gray-700 w-full text-left font-medium"
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
      <div className="mt-8 px-5">
        <Link to="/reader-auth?tab=sign-in" className="block w-full mb-3">
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
        <nav className="py-8">
          <ul className="flex flex-col space-y-6">
            {items.map((item, index) => (
              <li key={index}>
                {item.to ? (
                  <Link 
                    to={item.to} 
                    className="flex items-center px-5 text-lg font-medium text-gray-800 hover:text-gray-900"
                  >
                    {getCategoryDotColor(item.text) && (
                      <CircleDot className={`mr-3 h-5 w-5 ${getCategoryDotColor(item.text)}`} />
                    )}
                    <span>{item.text}</span>
                  </Link>
                ) : (
                  <div className="px-5">
                    <div className="text-base uppercase tracking-wider font-semibold text-gray-500 mb-4">{item.text}</div>
                    {item.items && item.items.length > 0 && (
                      <ul className="space-y-4 pl-0">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link 
                              to={subItem.to} 
                              className="flex items-center text-lg font-medium text-gray-800 hover:text-gray-900"
                            >
                              {getCategoryDotColor(subItem.text) && (
                                <CircleDot className={`mr-3 h-5 w-5 ${getCategoryDotColor(subItem.text)}`} />
                              )}
                              <span>{subItem.text}</span>
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
