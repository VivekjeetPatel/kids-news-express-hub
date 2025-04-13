
import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import ModernHeader, { NavButton } from '@/components/ui/modern-header';
import Logo from '@/components/ui/logo';
import { HeaderButtons } from '@/components/ui/header-buttons';

// Menu items configuration based on The Flying Bus categories
const menuItems = [
  {
    text: "Headliners",
    to: "/headliners"
  },
  {
    text: "Categories",
    items: [
      {
        text: "Debates",
        description: "Join discussions on important topics",
        to: "/debates"
      },
      {
        text: "Spice It Up",
        description: "Fun and interesting stories",
        to: "/spice-it-up"
      },
      {
        text: "Storyboard", 
        description: "Creative writing and stories",
        to: "/storyboard"
      },
      {
        text: "In the Neighborhood",
        description: "Local news and events",
        to: "/neighborhood"
      },
    ]
  },
  {
    text: "Learning",
    items: [
      {
        text: "Learning Resources",
        description: "Educational content for kids",
        to: "/learning"
      },
      {
        text: "School News",
        description: "Latest updates from schools",
        to: "/school"
      }
    ]
  },
  {
    text: "About",
    to: "/about"
  }
];

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
