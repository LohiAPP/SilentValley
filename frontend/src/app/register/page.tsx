"use client";

import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Calendar, MapPin, Video, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function RegistrationFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEventId = searchParams?.get('eventId');

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    event_id: initialEventId || '',
    name: '',
    email: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to load events", err);
        setError("Failed to load events list.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiUrl}/registrations`, formData);
      setSuccess(true);
      // Optional: redirect to home after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to submit registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 min-h-[500px]">
        <Loader2 className="w-12 h-12 animate-spin text-nature-accent" />
      </div>
    );
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-white/5 border border-nature-accent/30 rounded-3xl p-12 text-center backdrop-blur-md shadow-2xl"
      >
        <div className="w-24 h-24 bg-nature-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-nature-accent" />
        </div>
        <h2 className="text-4xl font-serif font-bold text-white mb-4">Registration Successful!</h2>
        <p className="text-nature-light text-lg mb-8">
          Thank you for registering. We look forward to having you join us.
        </p>
        <p className="text-nature-light/50 text-sm">Redirecting to homepage...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-nature-deep/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-nature-accent/10 rounded-full blur-[80px] -z-10" />
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold mb-4">Register</h1>
          <p className="text-nature-light/80 text-lg">Reserve your spot for our upcoming sessions and retreats.</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-bold text-nature-light uppercase tracking-wider pl-1">Select Event *</label>
            <select
              name="event_id"
              required
              value={formData.event_id}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-hidden focus:border-nature-accent transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled className="bg-nature-deep text-nature-light/50">Choose an event...</option>
              {events.map(event => (
                <option key={event.id} value={event.id} className="bg-nature-deep text-white">
                  {event.title} ({event.theme === 'zoom' ? 'Online' : 'Offline'} - {event.date})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-nature-light uppercase tracking-wider pl-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-hidden focus:border-nature-accent transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-nature-light uppercase tracking-wider pl-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-hidden focus:border-nature-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-nature-light uppercase tracking-wider pl-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-hidden focus:border-nature-accent transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-nature-light uppercase tracking-wider pl-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York, NY"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-hidden focus:border-nature-accent transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 mt-6 bg-nature-accent text-nature-deep font-bold text-lg uppercase tracking-wider rounded-2xl hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center"
          >
            {submitting ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans selection:bg-nature-accent/30 flex flex-col relative">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-nature-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-nature-light/5 rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 pt-40 pb-24 px-6 relative z-10 container mx-auto">
        <Suspense fallback={
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-nature-accent" />
          </div>
        }>
          <RegistrationFormContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
