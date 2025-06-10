import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1493962853295-0fd70327578a"
                  alt="Traditional African dishes"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-72 h-56 overflow-hidden rounded-lg hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
                  alt="African landscape"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-8 -left-8 hidden lg:flex items-center justify-center bg-terracotta w-36 h-36 rounded-full">
                <div className="text-center text-white">
                  <p className="font-display text-4xl font-bold">25+</p>
                  <p className="text-sm">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">
              Our Story
            </span>
            <h2 className="heading-lg mb-6">
              A Journey Through African Culinary Excellence
            </h2>
            <p className="mb-6 text-charcoal/80">
              Vemma's Kitchen Catering was founded in 1998 with a vision to
              share the rich cultural heritage of Africa through its diverse and
              flavorful cuisine. What began as a small family restaurant has now
              grown into a premier catering service, bringing authentic African
              flavors to events and special occasions across the region.
            </p>
            <p className="mb-8 text-charcoal/80">
              Our culinary team combines traditional cooking methods with modern
              presentation, ensuring a unique and memorable dining experience.
              Each dish tells a story of our heritage, crafted with locally
              sourced ingredients and authentic African spices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-terracotta shrink-0" />
                <p>Authentic African recipes passed down through generations</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-terracotta shrink-0" />
                <p>Locally sourced, fresh ingredients</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-terracotta shrink-0" />
                <p>Customizable catering packages</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="mr-2 h-5 w-5 text-terracotta shrink-0" />
                <p>Experienced culinary team</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
