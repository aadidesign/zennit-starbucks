import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <motion.img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" 
                alt="Starbucks" 
                className="h-12 w-12 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link 
                  to={item.path}
                  className={`font-semibold text-sm tracking-tight uppercase transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'text-starbucks-green border-b-2 border-starbucks-green' 
                      : 'text-gray-900 hover:text-starbucks-green'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="https://www.starbucks.com/store-locator"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-2 hover:text-starbucks-green transition-all duration-300"
              >
                <MapPin size={20} />
                <span className="text-sm font-semibold tracking-tight">Find a store</span>
              </a>
            </motion.div>
            
            <motion.a 
              href="https://www.starbucks.com/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={22} />
            </motion.a>
            
            <Link to="/signin">
              <motion.button
                className="hidden md:block px-4 py-2 border-2 border-black rounded-full font-semibold text-sm hover:bg-gray-100 transition-all duration-300 tracking-tight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
              </motion.button>
            </Link>
            
            <Link to="/register">
              <motion.button
                className="hidden md:block px-4 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300 tracking-tight"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join now
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden py-4 border-t border-gray-200"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path}
                    className={`font-semibold text-sm tracking-tight transition-all duration-300 ${
                      location.pathname === item.path 
                        ? 'text-starbucks-green' 
                        : 'text-gray-900 hover:text-starbucks-green'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <a 
                    href="https://www.starbucks.com/store-locator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm font-semibold tracking-tight transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MapPin size={18} />
                    <span>Find a store</span>
                  </a>
                </motion.div>
                <motion.div 
                  className="flex space-x-2 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Link 
                    to="/signin"
                    className="flex-1 px-4 py-2 border-2 border-black rounded-full font-semibold text-sm tracking-tight transition-all duration-300 hover:bg-gray-100 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/register"
                    className="flex-1 px-4 py-2 bg-black text-white rounded-full font-semibold text-sm tracking-tight transition-all duration-300 hover:bg-gray-800 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

