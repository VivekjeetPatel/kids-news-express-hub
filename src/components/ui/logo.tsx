
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  // Size classes for the logo container
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40'
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
