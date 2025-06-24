import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';

const MenuPage = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-cream">
        <Menu />
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
