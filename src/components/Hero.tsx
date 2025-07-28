import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-cream min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469041797191-50ace28483c3')] bg-cover bg-center opacity-15"
        role="presentation"
        aria-hidden="true"
      ></div>

      {/* Optional pattern overlay */}
      <div className="pattern-bg absolute inset-0 opacity-60" />

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">
            Authentic African Cuisine
          </span>

          <h1 className="heading-xl mb-6">
            <span className="block text-terracotta">Experience the Rich</span>
            Flavors of Africa
          </h1>

          <p className="text-lg md:text-xl mb-8 text-charcoal/80 max-w-2xl">
            Indulge in authentic African cuisine with our restaurant and
            comprehensive catering services. From intimate gatherings to grand
            celebrations, we bring the vibrant taste of Africa to your table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-terracotta hover:bg-terracotta/90 text-white"
              >
                View Our Menu
              </Button>
            </Link>

            <Link to="/catering">
              <Button
                size="lg"
                variant="outline"
                className="border-terracotta text-terracotta hover:bg-terracotta/10"
              >
                Book Catering <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
