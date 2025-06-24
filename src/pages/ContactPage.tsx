import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-8">
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
