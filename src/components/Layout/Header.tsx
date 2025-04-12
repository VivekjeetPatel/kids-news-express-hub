
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-flyingbus-purple rounded-full flex items-center justify-center">
                <span className="text-white font-display text-xl">FB</span>
              </div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-gray-900">
                The Flying Bus
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple transition-colors">Home</Link>
            <Link to="/headliners" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple transition-colors">Headliners</Link>
            <Link to="/debates" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple transition-colors">Debates</Link>
            <Link to="/storyboard" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple transition-colors">Storyboard</Link>
            <Link to="/learning" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple transition-colors">Learning</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-md">Sign In</Button>
            <Button size="sm" className="bg-flyingbus-purple hover:bg-purple-600 text-white rounded-md">Join Us</Button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleNav}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple hover:bg-gray-50 rounded-md transition-colors">Home</Link>
              <Link to="/headliners" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple hover:bg-gray-50 rounded-md transition-colors">Headliners</Link>
              <Link to="/debates" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple hover:bg-gray-50 rounded-md transition-colors">Debates</Link>
              <Link to="/storyboard" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple hover:bg-gray-50 rounded-md transition-colors">Storyboard</Link>
              <Link to="/learning" className="px-3 py-2 text-gray-700 hover:text-flyingbus-purple hover:bg-gray-50 rounded-md transition-colors">Learning</Link>
            </nav>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 rounded-md">Sign In</Button>
              <Button size="sm" className="flex-1 bg-flyingbus-purple hover:bg-purple-600 text-white rounded-md">Join Us</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
