
import React from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from '@/components/Layout/menuItems';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DesktopNavItemsProps {
  items: NavItem[];
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ items }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item) => renderMenuItem(item))}
      </NavigationMenuList>
    </NavigationMenu>
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
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-gray-900"
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
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-gray-900"
      to={item.to || "#"}
    >
      {item.text}
    </Link>
  );
};

export default DesktopNavItems;
