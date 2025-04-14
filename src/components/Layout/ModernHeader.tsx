
import React from 'react';
import { Navbar1 } from '@/components/ui/navbar1';
import Logo from '@/components/ui/logo';
import { HeaderButtons } from '@/components/ui/header-buttons';
import menuItems from './menuItems';

const HeaderLogo = () => (
  <Logo className="md:block hidden" size="lg" />
);

const MobileLogo = () => (
  <Logo className="md:hidden block" size="md" />
);

const Header = () => {
  return (
    <Navbar1
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
