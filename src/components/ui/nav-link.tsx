
import * as React from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  icon?: React.ReactNode
  text: string
  to: string
  onClick?: () => void
  className?: string
}

export const NavLink = ({
  icon,
  text,
  to,
  onClick,
  className
}: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "flex items-center text-sm font-medium text-gray-800 hover:text-gray-900 transition-all hover:scale-105 active:scale-95",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </Link>
  )
}
