import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import About from '@/components/About';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-cream">
        {/* Page Banner */}
        <section className="text-center py-20 bg-terracotta/10">
          <h1 className="text-4xl md:text-5xl font-bold text-terracotta mb-4">
            About Us
          </h1>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
            Learn more about our culinary roots, story, and commitment to
            authentic African cuisine.
          </p>
        </section>

        {/* Main About Content */}
        <About />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
