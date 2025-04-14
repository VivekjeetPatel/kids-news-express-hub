
import React from 'react';
import DesktopNavItems from './NavbarComponents/DesktopNavItems';
import MobileNavbar from './NavbarComponents/MobileNavbar';
import { NavItem } from '@/components/Layout/menuItems';

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
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="w-full px-4 md:px-6 lg:px-8 py-2">
        <nav className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo}
            <div className="flex items-center">
              <DesktopNavItems items={menuItems} />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {rightContent}
          </div>
        </nav>
        <MobileNavbar logo={logo} menuItems={menuItems} />
      </div>
    </header>
  );
};

export { Navbar1 };
