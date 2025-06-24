import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Services from '@/components/Services';

const ServicesPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-cream">
        {/* Clean Banner without background image */}
        <section className="text-center py-20 bg-terracotta/10">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4">
            Our Services
          </h1>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
            Discover our wide range of African-inspired catering solutions
            tailored to make every event memorable.
          </p>
        </section>

        {/* Services Content */}
        <Services />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
