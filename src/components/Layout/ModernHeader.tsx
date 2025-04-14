
import React from 'react';
import { User, BookOpen } from 'lucide-react';
import ModernHeader, { NavButton } from '@/components/ui/modern-header';
import Logo from '@/components/ui/logo';
import { HeaderButtons } from '@/components/ui/header-buttons';
import menuItems from './menuItems';

const HeaderLogo = () => (
  <Logo className="md:block hidden" size="xxl" />
);

const MobileLogo = () => (
  <Logo className="md:hidden block" size="xl" />
);

const Header = () => {
  return (
    <ModernHeader
      logo={
        <>
          <HeaderLogo />
          <MobileLogo />
        </>
      }
      menuItems={menuItems}
      rightContent={<HeaderButtons />}
    />
  );
};

export default Header;
