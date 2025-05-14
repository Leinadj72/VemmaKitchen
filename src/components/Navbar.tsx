
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cream/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="font-display text-2xl font-bold text-terracotta">
              African Feast
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-terracotta transition-colors">
              Home
            </Link>
            <a href="#about" className="font-medium hover:text-terracotta transition-colors">
              About
            </a>
            <a href="#services" className="font-medium hover:text-terracotta transition-colors">
              Services
            </a>
            <a href="#menu" className="font-medium hover:text-terracotta transition-colors">
              Menu
            </a>
            <a href="#testimonials" className="font-medium hover:text-terracotta transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="font-medium hover:text-terracotta transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:block">
            <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-charcoal focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <a
                href="#about"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="#services"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Services
              </a>
              <a
                href="#menu"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Menu
              </a>
              <a
                href="#testimonials"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Contact
              </a>
              <Button className="bg-terracotta hover:bg-terracotta/90 text-white mx-4">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
