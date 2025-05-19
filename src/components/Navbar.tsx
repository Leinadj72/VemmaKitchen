import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Initialize Supabase client with fallback values if env variables aren't available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the environment variables are available
const supabaseAvailable = supabaseUrl && supabaseAnonKey;

// Only create the client if we have the necessary credentials
const supabase = supabaseAvailable 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Only attempt to check auth if Supabase is properly initialized
    if (!supabaseAvailable) {
      console.log("Supabase environment variables are not set. Authentication is disabled.");
      return;
    }
    
    // Check if user is already logged in
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    
    getUser();
    
    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);
  
  const handleLogout = async () => {
    if (!supabaseAvailable) {
      toast({ 
        variant: "destructive",
        title: "Authentication is not configured" 
      });
      return;
    }
    
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "Logged out successfully" 
      });
      navigate('/');
    } catch (error) {
      toast({ 
        variant: "destructive",
        title: "Error logging out" 
      });
    }
  };
  
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
            <Link to="/menu" className="font-medium hover:text-terracotta transition-colors">
              Menu
            </Link>
            <a href="#testimonials" className="font-medium hover:text-terracotta transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="font-medium hover:text-terracotta transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost"
                  className="font-medium hover:text-terracotta transition-colors"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
                <Button 
                  onClick={() => navigate('/reservation')} 
                  className="bg-terracotta hover:bg-terracotta/90 text-white"
                >
                  Book a Table
                </Button>
              </>
            ) : (
              <>
                <Link to="/account">
                  <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/reservation">
                  <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
                    Book a Table
                  </Button>
                </Link>
              </>
            )}
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
              <Link
                to="/menu"
                className="font-medium px-4 py-2 hover:bg-terracotta/10 rounded"
                onClick={toggleMenu}
              >
                Menu
              </Link>
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
              
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start font-medium hover:bg-terracotta/10 rounded"
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/account" onClick={toggleMenu}>
                    <Button 
                      variant="outline" 
                      className="w-full border-terracotta text-terracotta hover:bg-terracotta/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
              
              <Link to="/reservation" onClick={toggleMenu}>
                <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white">
                  Book a Table
                </Button>
              </Link>
              
              <Link to="/catering" onClick={toggleMenu}>
                <Button variant="ghost" className="w-full justify-start">
                  Request Catering
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
