import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Menu', path: '/menu' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Gift Cards', path: '/gift-cards' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" 
                alt="Starbucks" 
                className="h-12 w-12 cursor-pointer hover:scale-110 transition-transform"
              />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={`font-semibold text-sm tracking-wider uppercase transition-colors ${
                    location.pathname === item.path 
                      ? 'text-starbucks-green border-b-2 border-starbucks-green' 
                      : 'text-gray-900 hover:text-starbucks-green'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/contact"
              className="hidden md:flex items-center space-x-2 hover:text-starbucks-green transition-colors"
            >
              <MapPin size={20} />
              <span className="text-sm font-semibold">Find a store</span>
            </Link>
            
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart size={22} />
            </button>
            
            <button className="hidden md:block px-4 py-2 border-2 border-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
              Sign in
            </button>
            
            <button className="hidden md:block px-4 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
              Join now
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={`font-semibold text-sm ${
                    location.pathname === item.path 
                      ? 'text-starbucks-green' 
                      : 'text-gray-900 hover:text-starbucks-green'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/contact"
                className="flex items-center space-x-2 text-sm font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin size={18} />
                <span>Find a store</span>
              </Link>
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-4 py-2 border-2 border-black rounded-full font-semibold text-sm">
                  Sign in
                </button>
                <button className="flex-1 px-4 py-2 bg-black text-white rounded-full font-semibold text-sm">
                  Join now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

