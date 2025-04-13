
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { NavButton } from "./nav-button"
import { HeaderNavigation } from "./header-navigation"
import { MobileMenu, MobileMenuButton } from "./mobile-menu"

interface NavItem {
  to?: string
  text: string
  items?: {
    icon?: {
      dark: string
      light: string
    }
    text: string
    description?: string
    to: string
  }[]
}

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
        'relative z-40 w-full bg-white border-b border-gray-200',
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
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
