import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

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
              <NavLink to="/newReleases" label="New Releases" />
              <NavLink to="/toprated" label="Top Rated" />
            </nav>
            
            {/* Search Icon and Input */}
            <div className="hidden md:flex items-center">
              <button 
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 text-gray-300" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-16 right-4 w-64 bg-gray-800 rounded-lg shadow-lg p-2 animate-fade-down mb-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search games..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </form>
                </div>
              )}
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
              <NavLink to="/" mobile label="Home" />
              <NavLink to="/games" mobile label="Games" />
              <NavLink to="/newReleases" mobile label="New Releases" />
              <NavLink to="/toprated" mobile label="Top Rated" />
              <div className="pt-2 border-t border-gray-700">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </form>
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