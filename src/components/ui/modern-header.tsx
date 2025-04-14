
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { NavButton } from "./nav-button"
import { HeaderNavigation } from "./header-navigation"
import { MobileMenu, MobileMenuButton } from "./mobile-menu"
import { NavItem } from "@/components/Layout/menuItems"

interface ModernHeaderProps {
  className?: string
  logo?: React.ReactNode
  menuItems?: NavItem[]
  rightContent?: React.ReactNode
}

export const ModernHeader: React.FC<ModernHeaderProps> = ({
  className,
  logo,
  menuItems = [],
  rightContent,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full bg-white border-b border-gray-200',
        className
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {logo}
          <HeaderNavigation items={menuItems} />
          <div className="flex items-center gap-x-4">
            {rightContent}
            <MobileMenuButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} items={menuItems} />
    </header>
  );
};

export { NavButton };
export default ModernHeader;

