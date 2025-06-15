
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Skills', path: '/services' },
    { name: 'Projects', path: '/references' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/booking' },
  ];

  const handleNavClick = () => {
    // Close mobile menu and scroll to top
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        scrolled ? 'glassmorphism bg-opacity-80' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink 
          to="/" 
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500"
          onClick={handleNavClick}
        >
          Muhammad Mahathir
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                cn(
                  'text-white hover:text-green-400 transition-colors duration-300 link-hover text-sm font-medium tracking-wide',
                  isActive && 'text-green-500 after:w-full'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white hover:text-green-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 glassmorphism pt-24 px-8 transition-all duration-300 ease-in-out transform md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                cn(
                  'text-white hover:text-green-400 py-2 text-xl transition-colors duration-300',
                  isActive && 'text-green-500'
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
