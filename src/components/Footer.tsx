import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                    href={`#${platform}`}
                    className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors"
                    aria-label={platform}
                  >
                    <span className="sr-only">{platform}</span>
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                    </svg>
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Indoor Catering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Outdoor Catering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Special Event Catering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Corporate Catering
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-terracotta transition-colors"
                >
                  Private Chef Services
                </a>
              </li>
            </ul>
          </div>

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

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} Vemma's Kitchen Catering. All
            rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-white/70 hover:text-terracotta transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-terracotta transition-colors text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
