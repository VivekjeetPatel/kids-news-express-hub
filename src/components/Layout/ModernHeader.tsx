
import React from 'react';
import ModernHeader from '@/components/ui/modern-header';
import Logo from '@/components/ui/logo';
import { HeaderButtons } from '@/components/ui/header-buttons';
import menuItems from './menuItems';

const HeaderLogo = () => (
  <Logo className="md:block hidden" size="xl" />
);

const MobileLogo = () => (
  <Logo className="md:hidden block" size="md" />
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
