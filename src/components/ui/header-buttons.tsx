
import * as React from "react"
import { User, BookOpen } from "lucide-react"
import { NavButton } from "./nav-button"
import { RainbowButton } from "./rainbow-button"

interface HeaderButtonsProps {
  className?: string
}

export const HeaderButtons: React.FC<HeaderButtonsProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <NavButton variant="outline" className="hidden md:flex">
        <User className="mr-2 h-4 w-4" />
        Sign In
      </NavButton>
      <RainbowButton className="hidden md:flex items-center">
        <BookOpen className="mr-2 h-4 w-4" />
        Join Us
      </RainbowButton>
    </div>
  )
}
