
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Wedding Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "African Feast Catering made our wedding reception unforgettable! The jollof rice and peri peri chicken were huge hits with our guests. Their staff was professional and accommodating with our guests' dietary restrictions.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Corporate Event Planner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "We've hired African Feast for multiple corporate events, and they consistently deliver excellence. Their diverse menu options keep our team excited, and their setup is always impeccable. Highly recommend their corporate packages!",
    rating: 5
  },
  {
    name: "Aisha Thomas",
    role: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    content: "The team went above and beyond for my father's 70th birthday. They created an authentic West African menu that transported him back to his childhood. The personal touches and attention to detail made the celebration special.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section bg-sage text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-white/20 text-white font-medium rounded-full mb-6">Testimonials</span>
          <h2 className="heading-lg mb-6">What Our Clients Say</h2>
          <p className="text-white/80">
            Don't just take our word for it. Here's what our clients have to say about their experiences with African Feast Catering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-none">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-ochre fill-ochre" />
                  ))}
                </div>
                <p className="mb-6 italic text-white/90">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center text-white hover:underline">
            Read more reviews
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
