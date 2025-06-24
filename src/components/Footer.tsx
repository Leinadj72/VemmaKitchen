import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display text-2xl font-bold text-white mb-6 inline-block"
            >
              Vemma's Kitchen
            </Link>
            <p className="text-white/70 mb-6">
              Bringing authentic African cuisine to your table with our
              restaurant and comprehensive catering services for all occasions.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map(
                (platform) => (
                  <a
                    key={platform}
                    href={`https://www.${platform}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:scale-105 transition-all"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 
                    10-10S17.52 2 12 2zm0 18c-4.41 
                    0-8-3.59-8-8s3.59-8 8-8 8 3.59 
                    8 8-3.59 8-8 8z"
                      />
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Menu', to: '/menu' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-terracotta hover:scale-105 inline-block transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                'Indoor Catering',
                'Outdoor Catering',
                'Special Event Catering',
                'Corporate Catering',
                'Private Chef Services',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-terracotta hover:scale-105 inline-block transition-all"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <address className="text-white/70 not-italic space-y-4">
              <p>
                123 Culinary Avenue
                <br />
                Flavortown, FT 12345
              </p>
              <p>
                <a
                  href="tel:+11234567890"
                  className="hover:text-terracotta transition-colors"
                >
                  (123) 456-7890
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@africanfeast.com"
                  className="hover:text-terracotta transition-colors"
                >
                  info@africanfeast.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} Vemma's Kitchen Catering. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/privacy-policy"
              className="text-white/70 hover:text-terracotta transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/70 hover:text-terracotta transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
