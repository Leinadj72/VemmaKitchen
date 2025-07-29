import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

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
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white hover:scale-105 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white hover:scale-105 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white hover:scale-105 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta hover:text-white hover:scale-105 transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Menu", to: "/menu" },
                { label: "Contact", to: "/contact" },
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
                "Indoor Catering",
                "Outdoor Catering",
                "Special Event Catering",
                "Corporate Catering",
                "Private Chef Services",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to={`/services?focus=${encodeURIComponent(service)}`}
                    className="text-white/70 hover:text-terracotta hover:scale-105 inline-block transition-all"
                  >
                    {service}
                  </Link>
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
                  +234 8026384531
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
