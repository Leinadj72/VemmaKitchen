
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReservation = location.pathname.includes('reservation');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-cream pattern-bg py-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-terracotta" />
              </div>
              
              <h1 className="heading-md mb-4">
                {isReservation ? 'Reservation Received!' : 'Catering Request Received!'}
              </h1>
              
              <p className="text-charcoal/80 mb-8">
                {isReservation 
                  ? 'Thank you for your reservation. We\'ve received your request and will send a confirmation to your email shortly.'
                  : 'Thank you for your catering inquiry. Our team will review your request and contact you within 24 hours to discuss details.'}
              </p>
              
              <div className="mb-8 p-6 bg-cream rounded-lg">
                <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-terracotta/20 text-terracotta font-medium flex items-center justify-center mr-3">1</span>
                    <span>
                      {isReservation 
                        ? 'Check your email for confirmation details'
                        : 'One of our catering specialists will call you'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-terracotta/20 text-terracotta font-medium flex items-center justify-center mr-3">2</span>
                    <span>
                      {isReservation 
                        ? 'If you need to modify your reservation, please call us'
                        : 'We\'ll discuss menu options and pricing'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-terracotta/20 text-terracotta font-medium flex items-center justify-center mr-3">3</span>
                    <span>
                      {isReservation 
                        ? 'Arrive at your scheduled time and enjoy your meal!'
                        : 'Once details are finalized, we\'ll send a formal quote'}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-terracotta text-terracotta hover:bg-terracotta/10"
                >
                  Return Home
                </Button>
                <Button
                  onClick={() => navigate(isReservation ? '/menu' : '/menu')}
                  className="bg-terracotta hover:bg-terracotta/90 text-white"
                >
                  {isReservation ? 'View Menu' : 'Explore Our Menu'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
