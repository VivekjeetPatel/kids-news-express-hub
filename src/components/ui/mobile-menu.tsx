import * as React from "react"
import { Link } from "react-router-dom"
import { Menu, X, User, BookOpen, LogOut, Settings, Newspaper, FileText, BookText, MessagesSquare, HomeIcon, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"
import { NavItem } from "@/components/Layout/menuItems"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCategoryColor } from "@/utils/categoryColors"
import { Separator } from "@/components/ui/separator"

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

  const getCategoryIcon = (text: string) => {
    const categoryIcons: {[key: string]: React.ReactNode} = {
      'Headliners': <Newspaper size={16} />,
      'Debates': <MessagesSquare size={16} />,
      'Spice It Up': <FileText size={16} />,
      'Storyboard': <BookText size={16} />,
      'In the Neighborhood': <HomeIcon size={16} />,
      'Learning Resources': <BookOpen size={16} />,
      'School News': <Newspaper size={16} />,
      'About': <Info size={16} />
    };
    
    return categoryIcons[text] || <FileText size={16} />;
  };

  const renderAuthSection = () => {
    if (isLoggedIn && currentUser) {
      return (
        <div className="mt-6 pt-6">
          <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Account</div>
          <Separator className="mb-3" />
          <ul className="space-y-4">
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
      <div className="mt-6 pt-6">
        <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">Account</div>
        <Separator className="mb-3" />
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
      <div className="w-full h-full overflow-y-auto px-4">
        <nav className="py-6">
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={index} className="mb-5">
                {item.to ? (
                  <Link 
                    to={item.to} 
                    className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-900"
                  >
                    {getCategoryIcon(item.text)}
                    <span className="ml-2">{item.text}</span>
                  </Link>
                ) : (
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-gray-500 mb-2">{item.text}</div>
                    <Separator className="mb-3" />
                    {item.items && item.items.length > 0 && (
                      <ul className="space-y-3 pl-0">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link 
                              to={subItem.to} 
                              className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-900"
                            >
                              {getCategoryIcon(subItem.text)}
                              <span className="ml-2">{subItem.text}</span>
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
