
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Users, CalendarDays, Utensils } from 'lucide-react';

const serviceItems = [
  {
    icon: <ChefHat className="h-10 w-10 text-terracotta" />,
    title: "Indoor Catering",
    description: "Transform your space into an African culinary haven with our in-house catering services, perfect for intimate gatherings and special celebrations.",
  },
  {
    icon: <Users className="h-10 w-10 text-terracotta" />,
    title: "Outdoor Catering",
    description: "Bring the vibrant flavors of Africa to your outdoor events, from garden parties to corporate picnics with our mobile catering solutions.",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-terracotta" />,
    title: "Special Event Catering",
    description: "Make your wedding, anniversary, or milestone celebration unforgettable with our specialized event catering packages tailored to your needs.",
  },
  {
    icon: <Utensils className="h-10 w-10 text-terracotta" />,
    title: "Corporate Catering",
    description: "Impress clients and energize your team with our corporate catering options, from boxed lunches to full-service buffets and formal dining.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">Our Services</span>
          <h2 className="heading-lg mb-6">Comprehensive Catering Solutions for Every Occasion</h2>
          <p className="text-charcoal/80">
            From intimate family gatherings to large-scale corporate events, our diverse catering services bring the authentic taste of Africa to your table. Each service is customizable to meet your specific needs and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceItems.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-charcoal/70">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-terracotta/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="heading-md mb-4">Customized Catering Packages</h3>
              <p className="mb-6 text-charcoal/80">
                We understand that each event is unique. That's why we offer fully customizable catering packages to suit your specific requirements, dietary preferences, and budget constraints.
              </p>
              <ul className="space-y-3">
                {[
                  "Menu customization based on regional African cuisines",
                  "Dietary accommodation (vegetarian, vegan, gluten-free, etc.)",
                  "Staffing options from setup-only to full-service attendance",
                  "Equipment rental and event styling services",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="inline-block h-6 w-6 rounded-full bg-terracotta text-white flex items-center justify-center mr-3 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 lg:h-full min-h-[320px]">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Catering service setup" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
