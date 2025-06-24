import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">
              Contact Us
            </span>
            <h2 className="heading-lg mb-6">Get in Touch</h2>
            <p className="mb-8 text-charcoal/80">
              Have questions about our restaurant or catering services? Fill out
              the form below or contact us directly, and we'll get back to you
              as soon as possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your event or inquiry..."
                  rows={5}
                  required
                />
              </div>

              <Button className="bg-terracotta hover:bg-terracotta/90 text-white">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h3 className="text-2xl font-display font-bold mb-8">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-terracotta mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <address className="text-charcoal/70 not-italic">
                      123 Culinary Avenue
                      <br />
                      Flavortown, FT 12345
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-terracotta mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-charcoal/70">
                      <a
                        href="tel:+11234567890"
                        className="hover:text-terracotta transition-colors"
                      >
                        (123) 456-7890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-terracotta mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-charcoal/70">
                      <a
                        href="mailto:info@africanfeast.com"
                        className="hover:text-terracotta transition-colors"
                      >
                        info@africanfeast.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-terracotta mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <div className="text-charcoal/70 space-y-1">
                      <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
                      <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {['facebook', 'twitter', 'instagram', 'youtube'].map(
                    (platform) => (
                      <a
                        key={platform}
                        href={`#${platform}`}
                        className="h-10 w-10 rounded-full bg-terracotta/10 flex items-center justify-center hover:bg-terracotta hover:text-white transition-colors"
                        aria-label={`Follow us on ${platform}`}
                      >
                        <span className="sr-only">Follow us on {platform}</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
                        </svg>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
