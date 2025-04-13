
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Logo = ({ className = '', size = 'lg' }: LogoProps) => {
  // Updated size classes for the logo container with a new 'xxl' option
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40',
    xl: 'w-48',
    xxl: 'w-64'  // Added an extra large size for maximum visual impact
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="https://cdn.prod.website-files.com/67d1e4044e5c3e8d317137bd/67d1e669ad3c1025994bc23e_Logo.svg" 
        alt="The Flying Bus Logo" 
        className={`${sizeClasses[size]}`}
      />
    </Link>
  );
};

export default Logo;
