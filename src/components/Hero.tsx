
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-cream min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469041797191-50ace28483c3')] bg-cover bg-center opacity-15"></div>
      <div className="pattern-bg absolute inset-0 opacity-60"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">Authentic African Cuisine</span>
          <h1 className="heading-xl mb-6">
            <span className="block text-terracotta">Experience the Rich</span>
            Flavors of Africa
          </h1>
          <p className="text-lg md:text-xl mb-8 text-charcoal/80 max-w-2xl">
            Indulge in authentic African cuisine with our restaurant and comprehensive catering services. From intimate gatherings to grand celebrations, we bring the vibrant taste of Africa to your table.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-terracotta hover:bg-terracotta/90 text-white">
              View Our Menu
            </Button>
            <Button size="lg" variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
              Book Catering <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a 
          href="#about" 
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
          aria-label="Scroll to about section"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-terracotta"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
