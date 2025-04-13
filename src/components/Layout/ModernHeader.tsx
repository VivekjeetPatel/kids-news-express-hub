
import React from 'react';
import { User, BookOpen } from 'lucide-react';
import ModernHeader, { NavButton } from '@/components/ui/modern-header';
import Logo from '@/components/ui/logo';
import { HeaderButtons } from '@/components/ui/header-buttons';
import menuItems from './menuItems';

const HeaderLogo = () => (
  <Logo />
);

const Header = () => {
  return (
    <ModernHeader
      logo={<HeaderLogo />}
      menuItems={menuItems}
      rightContent={<HeaderButtons />}
    />
  );
};

export default Header;
