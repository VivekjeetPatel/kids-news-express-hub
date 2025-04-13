
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  // Size classes for the logo container
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  // Size classes for the text
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl'
  };

  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-flyingbus-purple rounded-full flex items-center justify-center`}>
        {/* Logo SVG - inline version */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4"
        >
          <path 
            d="M10 30L10 15C10 12.2386 12.2386 10 15 10L30 10" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          <path 
            d="M30 10L20 20" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          <path 
            d="M20 20L30 30" 
            stroke="white" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className={`font-display font-bold text-gray-900 ${textSizeClasses[size]}`}>
        The Flying Bus
      </h1>
    </Link>
  );
};

export default Logo;
