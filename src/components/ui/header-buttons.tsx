
import * as React from "react"
import { User, BookOpen } from "lucide-react"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import UserMenu from "@/components/auth/UserMenu"

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
        <UserMenu />
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Link to="/reader-auth?tab=sign-in">
        <NavButton variant="outline" className="hidden md:flex">
          <User className="mr-2 h-4 w-4" />
          Sign In
        </NavButton>
      </Link>
      <Link to="/reader-auth?tab=sign-up">
        <RainbowButton className="hidden md:flex items-center">
          <BookOpen className="mr-2 h-4 w-4" />
          Join Us
        </RainbowButton>
      </Link>
    </div>
  )
}
