import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

// Supabase setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabaseAvailable = supabaseUrl && supabaseAnonKey;
const supabase = supabaseAvailable
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Account = () => {
  const [loading, setLoading] = useState(false);
  const [supabaseError] = useState(!supabaseAvailable);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    if (!supabaseAvailable) {
      toast({
        variant: "destructive",
        title: "Authentication not configured",
        description: "Supabase environment variables are not set up.",
      });
      return;
    }

    try {
      setLoading(true);
      const { email, password } = values;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      toast({ title: "Login successful", description: "Welcome back!" });
      navigate("/");
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (values: z.infer<typeof signupSchema>) => {
    if (!supabaseAvailable) {
      toast({
        variant: "destructive",
        title: "Authentication not configured",
        description: "Supabase environment variables are not set up.",
      });
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.fullName },
        },
      });

      if (authError) throw authError;

      // Save user in MongoDB via backend
      const saveRes = await fetch("http://localhost:5000/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
        }),
      });

      const saveJson = await saveRes.json();

      if (!saveRes.ok) {
        console.error("❌ Error saving user to MongoDB:", saveJson.message);
        toast({
          variant: "destructive",
          title: "Saved to Supabase, but failed to save to database",
          description: saveJson.message || "Check your backend server",
        });
      } else {
        toast({
          title: "Sign up successful!",
          description: "Check your email to verify your account.",
        });
        signupForm.reset();
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h1 className="heading-md text-center mb-6">Account Access</h1>

            {supabaseError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                <p className="text-sm font-medium">
                  Supabase configuration is missing
                </p>
                <p className="text-xs mt-1">
                  Authentication is currently unavailable. Please check your
                  environment variables.
                </p>
              </div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLogin)}
                    className="space-y-4"
                  >
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
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
                      disabled={loading || supabaseError}
                    >
                      {loading ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="signup">
                <Form {...signupForm}>
                  <form
                    onSubmit={signupForm.handleSubmit(onSignup)}
                    className="space-y-4"
                  >
                    <FormField
                      control={signupForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
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
                      disabled={loading || supabaseError}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
