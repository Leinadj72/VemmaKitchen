import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseAvailable = supabaseUrl && supabaseAnonKey;
const supabase = supabaseAvailable
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabaseAvailable) return;

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) setUser(session.user);
        if (event === 'SIGNED_OUT') setUser(null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    if (!supabaseAvailable) {
      toast({
        variant: 'destructive',
        title: 'Authentication is not configured',
      });
      return;
    }
    try {
      await supabase.auth.signOut();
      toast({ title: 'Logged out successfully' });
      navigate('/');
    } catch {
      toast({ variant: 'destructive', title: 'Error logging out' });
    }
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Menu', to: '/menu' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <nav className="bg-cream/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-display text-2xl font-bold text-terracotta"
        >
          Vemma's Kitchen
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="font-medium text-charcoal transition-transform transform hover:scale-105 hover:text-terracotta"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:text-terracotta"
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
                <Button
                  variant="outline"
                  className="border-terracotta text-terracotta hover:bg-terracotta/10"
                >
                  <User className="h-4 w-4 mr-2" /> Sign In
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

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-charcoal"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className="font-medium px-4 py-2 rounded hover:bg-terracotta/10 transition-colors"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <Button
                variant="ghost"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="justify-start"
              >
                Log Out
              </Button>
            ) : (
              <Link to="/account" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-terracotta text-terracotta hover:bg-terracotta/10"
                >
                  <User className="h-4 w-4 mr-2" /> Sign In
                </Button>
              </Link>
            )}

            <Link to="/reservation" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white">
                Book a Table
              </Button>
            </Link>

            <Link to="/catering" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Request Catering
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
