
import { Book, Menu, Sunset, Trees, Zap, User, BookOpen } from "lucide-react";
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
} from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { RainbowButton } from "@/components/ui/rainbow-button";
import UserMenu from "@/components/auth/UserMenu";
import { NavItem } from "@/components/Layout/menuItems";

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
  const { isLoggedIn, isLoading } = useAuth();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 md:px-8 lg:px-12 py-4">
        <nav className="hidden justify-between md:flex">
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
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  {logo}
                </SheetTitle>
              </SheetHeader>
              <div className="my-6 flex flex-col gap-6">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menuItems.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="border-t py-4">
                  {!isLoggedIn && !isLoading && (
                    <div className="flex flex-col gap-3">
                      <Link to="/reader-auth?tab=sign-in" className="w-full">
                        <Button asChild variant="outline" className="w-full">
                          <span>
                            <User className="mr-2 h-4 w-4" />
                            Sign In
                          </span>
                        </Button>
                      </Link>
                      <Link to="/reader-auth?tab=sign-up" className="w-full">
                        <RainbowButton className="w-full flex items-center justify-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Join Us
                        </RainbowButton>
                      </Link>
                    </div>
                  )}
                </div>
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
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
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

const renderMobileMenuItem = (item: NavItem) => {
  if (item.items && item.items.length > 0) {
    return (
      <AccordionItem key={item.text} value={item.text} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.text}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.text}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              to={subItem.to}
            >
              <div>
                <div className="text-sm font-semibold">{subItem.text}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.text} to={item.to || "#"} className="font-semibold py-3 block">
      {item.text}
    </Link>
  );
};

export { Navbar1 };
