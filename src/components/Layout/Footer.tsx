
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-flyingbus-purple text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">The Flying Bus</h3>
            <p className="text-sm">
              News for Kids, By Kids - A safe and engaging space where young journalists 
              can express themselves through age-appropriate news content.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/headliners" className="hover:underline">Headliners</Link></li>
              <li><Link to="/debates" className="hover:underline">Debates</Link></li>
              <li><Link to="/spice-it-up" className="hover:underline">Spice It Up</Link></li>
              <li><Link to="/storyboard" className="hover:underline">Storyboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-4">More Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/neighborhood" className="hover:underline">In the Neighborhood</Link></li>
              <li><Link to="/learning" className="hover:underline">Learning</Link></li>
              <li><Link to="/school" className="hover:underline">School News</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-bold mb-4">For Parents</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/safety" className="hover:underline">Safety Policy</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-400 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} The Flying Bus. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline mx-2">Terms of Use</Link>
            <Link to="/cookie" className="hover:underline mx-2">Cookie Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
