
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const Logo = ({ className = '', size = 'xl' }: LogoProps) => {
  // Updated size classes with larger default sizes
  const sizeClasses = {
    sm: 'w-32',
    md: 'w-40',
    lg: 'w-48',
    xl: 'w-56',
    xxl: 'w-64'
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
