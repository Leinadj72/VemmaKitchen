import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarDays, Clock, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Initialize Supabase client with fallback values if env variables aren't available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the environment variables are available
const supabaseAvailable = supabaseUrl && supabaseAnonKey;

// Only create the client if we have the necessary credentials
const supabase = supabaseAvailable 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const EVENT_TYPES = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Graduation",
  "Family Gathering",
  "Other"
];

const GUEST_COUNT_RANGES = [
  "10-25",
  "26-50",
  "51-100",
  "101-200",
  "201-500",
  "500+"
];

const cateringSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  eventType: z.string({ required_error: "Please select an event type" }),
  guestCount: z.string({ required_error: "Please select guest count" }),
  date: z.date({ required_error: "Please select a date" }),
  location: z.string().min(5, { message: "Please provide the event location" }),
  additionalInfo: z.string().optional(),
});

const Catering = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [supabaseError, setSupabaseError] = useState(!supabaseAvailable);

  const form = useForm<z.infer<typeof cateringSchema>>({
    resolver: zodResolver(cateringSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      additionalInfo: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof cateringSchema>) => {
    if (!supabaseAvailable) {
      toast({
        variant: "destructive",
        title: "Database connection not configured",
        description: "Supabase environment variables are not set up.",
      });
      
      // For demo purposes, still navigate to confirmation
      navigate('/catering-confirmation');
      return;
    }
    
    try {
      setLoading(true);
      
      // Insert catering request into Supabase
      const { data, error } = await supabase
        .from('catering_requests')
        .insert([
          { 
            name: values.name,
            email: values.email,
            phone: values.phone,
            event_type: values.eventType,
            guest_count: values.guestCount,
            event_date: format(values.date, 'yyyy-MM-dd'),
            location: values.location,
            additional_info: values.additionalInfo || null,
            status: 'pending'
          }
        ])
        .select();

      if (error) throw error;
      
      toast({
        title: "Catering request submitted!",
        description: "We'll contact you shortly to discuss the details.",
      });
      
      // Reset form
      form.reset();
      navigate('/catering-confirmation');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-cream pattern-bg py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 bg-terracotta/10 text-terracotta font-medium rounded-full mb-6">Catering Services</span>
                <h1 className="heading-lg mb-4">Request Catering for Your Event</h1>
                <p className="text-charcoal/80 max-w-2xl mx-auto">
                  Bring the authentic taste of Africa to your special event. Our catering services provide 
                  a unique culinary experience with customized menus tailored to your needs.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
                {supabaseError && (
                  <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-600">
                    <p className="text-sm font-medium">Demo Mode</p>
                    <p className="text-xs mt-1">Database connection is not configured. This form will submit but not store data.</p>
                  </div>
                )}
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {EVENT_TYPES.map(type => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Event Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full justify-start text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    // Disable dates in the past
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return date < today;
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="guestCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Guests</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <Users className="mr-2 h-4 w-4" />
                                  <SelectValue placeholder="Select guest count" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {GUEST_COUNT_RANGES.map(range => (
                                  <SelectItem key={range} value={range}>
                                    {range} guests
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address of your event" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your event, any dietary restrictions, or special requests"
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Catering Request"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catering;
