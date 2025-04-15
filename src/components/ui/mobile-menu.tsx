
import * as React from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ 
  isOpen, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "md:hidden p-2 rounded-md text-gray-700 transition-all duration-200 ease-in-out",
        "hover:bg-gray-100 hover:scale-105 active:scale-95", // Subtle scale animation
        "focus:outline-none focus:ring-2 focus:ring-gray-200"
      )}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  )
}

export const MobileMenuButton = React.memo(MobileMenuButton)
