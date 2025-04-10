
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-flyingbus-purple rounded-full flex items-center justify-center animate-float">
                <span className="text-white font-display text-xl">FB</span>
              </div>
              <h1 className="text-xl md:text-2xl font-display font-bold">
                <span className="text-flyingbus-purple">The</span> 
                <span className="text-flyingbus-blue"> Flying</span> 
                <span className="text-flyingbus-yellow"> Bus</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/headliners" className="nav-link">Headliners</Link>
            <Link to="/debates" className="nav-link">Debates</Link>
            <Link to="/spice-it-up" className="nav-link">Spice It Up</Link>
            <Link to="/storyboard" className="nav-link">Storyboard</Link>
            <Link to="/neighborhood" className="nav-link">Neighborhood</Link>
            <Link to="/learning" className="nav-link">Learning</Link>
            <Link to="/school" className="nav-link">School News</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" className="rounded-full">Sign In</Button>
            <Button className="bg-flyingbus-purple hover:bg-purple-600 rounded-full">Join Us</Button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleNav}
            className="md:hidden bg-flyingbus-purple text-white p-2 rounded-full"
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/headliners" className="nav-link">Headliners</Link>
              <Link to="/debates" className="nav-link">Debates</Link>
              <Link to="/spice-it-up" className="nav-link">Spice It Up</Link>
              <Link to="/storyboard" className="nav-link">Storyboard</Link>
              <Link to="/neighborhood" className="nav-link">Neighborhood</Link>
              <Link to="/learning" className="nav-link">Learning</Link>
              <Link to="/school" className="nav-link">School News</Link>
            </nav>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" className="flex-1 rounded-full">Sign In</Button>
              <Button className="flex-1 bg-flyingbus-purple hover:bg-purple-600 rounded-full">Join Us</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
