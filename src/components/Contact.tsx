import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send message");

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you shortly.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Something went wrong";
      toast({
        variant: "destructive",
        title: "Message failed",
        description: msg,
      });
    } finally {
      setLoading(false);
    }
  };

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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Name
                  </label>
                  <Input id="name" required value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  Subject
                </label>
                <Input id="subject" value={formData.subject} onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  Message
                </label>
                <Textarea id="message" rows={5} required value={formData.message} onChange={handleChange} />
              </div>

              <Button className="bg-terracotta hover:bg-terracotta/90 text-white" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact info box stays unchanged */}
          {/* ... */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
