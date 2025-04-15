
import * as React from "react"
import { User, BookOpen } from "lucide-react"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import UserMenu from "@/components/auth/UserMenu"
import { DrawerAuth } from "@/components/ui/drawer-auth"

interface HeaderButtonsProps {
  className?: string
}

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({ className }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div className={`flex items-center space-x-3 ${className}`}></div>;
  }

  if (isLoggedIn) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="hidden md:block">
          <UserMenu />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Drawer Auth for Sign In */}
      <div className="hidden md:block">
        <DrawerAuth
          triggerComponent={
            <NavButton variant="outline">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </NavButton>
          }
          defaultTab="sign-in"
        />
      </div>
      
      {/* Link to full page signup for Join Us button */}
      <Link to="/reader-auth?tab=sign-up" className="hidden md:block">
        <RainbowButton className="flex items-center hover:scale-105 active:scale-95 transition-transform">
          <BookOpen className="mr-2 h-4 w-4" />
          Join Us
        </RainbowButton>
      </Link>
    </div>
  )
}
