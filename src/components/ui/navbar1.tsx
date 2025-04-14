import { Book, Menu, LogOut, User, BookOpen, Newspaper, MessagesSquare, FileText, BookText, HomeIcon, Info, X } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { RainbowButton } from "@/components/ui/rainbow-button";
import UserMenu from "@/components/auth/UserMenu";
import { NavItem } from "@/components/Layout/menuItems";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  text: string;
  to?: string;
  description?: string;
  icon?: JSX.Element;
  items?: {
    text: string;
    description?: string;
    to: string;
    icon?: {
      dark: string;
      light: string;
    };
  }[];
}

interface Navbar1Props {
  logo?: React.ReactNode;
  menuItems?: NavItem[];
  rightContent?: React.ReactNode;
}

const Navbar1 = ({
  logo,
  menuItems = [],
  rightContent,
}: Navbar1Props) => {
  const { isLoggedIn, isLoading, currentUser, logout } = useAuth();
  
  const getCategoryIcon = (text: string) => {
    const categoryIcons: {[key: string]: React.ReactNode} = {
      'Headliners': <Newspaper size={16} className="mr-2" />,
      'Debates': <MessagesSquare size={16} className="mr-2" />,
      'Spice It Up': <FileText size={16} className="mr-2" />,
      'Storyboard': <BookText size={16} className="mr-2" />,
      'In the Neighborhood': <HomeIcon size={16} className="mr-2" />,
      'Learning Resources': <BookOpen size={16} className="mr-2" />,
      'School News': <Newspaper size={16} className="mr-2" />,
      'About': <Info size={16} className="mr-2" />,
      'Categories': <Menu size={16} className="mr-2" />,
      'Learning': <Book size={16} className="mr-2" />
    };
    
    return categoryIcons[text] || <FileText size={16} className="mr-2" />;
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 md:px-8 lg:px-12 py-4">
        <nav className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-6">
            {logo}
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menuItems.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {rightContent}
          </div>
        </nav>
        <div className="flex items-center justify-between md:hidden">
          {logo}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto w-full">
              <SheetHeader className="flex justify-between items-center">
                <SheetTitle className="flex items-center">
                  {logo}
                </SheetTitle>
              </SheetHeader>
              
              <div className="py-6">
                <div className="text-xl font-semibold flex items-center mb-6">
                  <Menu className="mr-2" />
                  <span>Categories</span>
                </div>
                
                <div className="space-y-6">
                  {menuItems.map((item) => {
                    if (item.items && item.items.length > 0) {
                      return (
                        <div key={item.text} className="space-y-3">
                          {item.items.map((subItem) => (
                            <SheetClose asChild key={subItem.text}>
                              <Link 
                                to={subItem.to} 
                                className="flex items-center text-base py-2"
                              >
                                {getCategoryIcon(subItem.text)}
                                <div className="font-medium">{subItem.text}</div>
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      );
                    }
                    
                    return (
                      <SheetClose asChild key={item.text}>
                        <Link 
                          to={item.to || "#"} 
                          className="flex items-center text-base py-2 font-medium"
                        >
                          {getCategoryIcon(item.text)}
                          {item.text}
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
                
                <Separator className="my-6" />
                
                <div className="text-xl font-semibold mb-6">
                  Account
                </div>
                
                {isLoggedIn && currentUser ? (
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <Link 
                        to={`/profile/${currentUser.username}`}
                        className="flex items-center text-base py-2"
                      >
                        <User size={16} className="mr-2" />
                        <span>My Profile</span>
                      </Link>
                    </SheetClose>
                    <button 
                      onClick={logout}
                      className="flex items-center text-base py-2 w-full text-left"
                    >
                      <LogOut size={16} className="mr-2" />
                      <span>Log out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <Link to="/reader-auth?tab=sign-in" className="block w-full mb-3">
                        <Button variant="outline" className="w-full flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/reader-auth?tab=sign-up" className="block w-full">
                        <RainbowButton className="w-full flex items-center justify-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Join Us
                        </RainbowButton>
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: NavItem) => {
  if (item.items && item.items.length > 0) {
    return (
      <NavigationMenuItem key={item.text} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.text}>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    to={subItem.to}
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.text}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.text}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      to={item.to || "#"}
    >
      {item.text}
    </Link>
  );
};

export { Navbar1 };
