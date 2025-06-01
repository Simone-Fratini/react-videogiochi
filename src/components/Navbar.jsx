import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

 

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad className="h-8 w-8 text-purple-500" />
            <span className="text-xl font-bold text-white">GameHub</span>
          </Link>
          
          {/* Right side navigation and search */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink to="/" label="Home" />
              <NavLink to="/games" label="Games" />
              <NavLink to="/games?category=New%20Releases" label="New Releases" />
              <NavLink to="/games?category=Top%20Rated" label="Top Rated" />
            </nav>
            
            {/* Search Icon */}
            <div className="hidden md:flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Search className="h-5 w-5 text-gray-300" />
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 py-4 px-2 rounded-lg mt-2 animate-fade-down">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" label="Home" mobile />
              <NavLink to="/games" label="Games" mobile />
              <NavLink to="/games?category=New%20Releases" label="New Releases" mobile />
              <NavLink to="/games?category=Top%20Rated" label="Top Rated" mobile />
              <div className="pt-2 border-t border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Helper NavLink component
const NavLink = ({ to, label, mobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname + location.search === to;
  
  return (
    <Link 
      to={to}
      className={`${
        mobile 
          ? 'block px-3 py-2 rounded-lg' 
          : 'inline-flex items-center'
      } ${
        isActive
          ? 'text-purple-500 font-medium'
          : 'text-gray-300 hover:text-white transition-colors'
      }`}
    >
      {label}
    </Link>
  );
};

export default Navbar;