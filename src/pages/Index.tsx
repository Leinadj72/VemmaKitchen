import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />

        {/* Short CTA Section */}
        <section className="bg-white py-20">
          <div className="container-custom text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-4">Discover Vemma’s Kitchen</h2>
            <p className="text-charcoal/80 mb-8">
              From flavorful dishes to top-tier catering, explore how we bring African culinary excellence to every occasion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/about">
                <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                  About Us
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                  Our Services
                </Button>
              </Link>
              <Link to="/menu">
                <Button className="bg-terracotta text-white hover:bg-terracotta/90">
                  View Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" className="text-terracotta hover:underline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
