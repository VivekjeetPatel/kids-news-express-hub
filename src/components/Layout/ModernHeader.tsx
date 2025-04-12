
import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import ModernHeader, { NavButton } from '@/components/ui/modern-header';

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
  <Link to="/" className="flex items-center space-x-3">
    <div className="h-10 w-10 bg-flyingbus-purple rounded-full flex items-center justify-center">
      <span className="text-white font-display text-xl">FB</span>
    </div>
    <h1 className="text-xl md:text-2xl font-display font-bold text-gray-900">
      The Flying Bus
    </h1>
  </Link>
);

// Right content with sign in buttons
const HeaderRightContent = () => (
  <div className="flex items-center space-x-3">
    <NavButton variant="outline" className="hidden md:flex">
      <User className="mr-2 h-4 w-4" />
      Sign In
    </NavButton>
    <NavButton className="hidden md:flex">
      <BookOpen className="mr-2 h-4 w-4" />
      Join Us
    </NavButton>
  </div>
);

const Header = () => {
  return (
    <ModernHeader
      logo={<HeaderLogo />}
      menuItems={menuItems}
      rightContent={<HeaderRightContent />}
    />
  );
};

export default Header;
