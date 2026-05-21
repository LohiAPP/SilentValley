"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ZoomEventCard } from "@/components/ZoomEventCard";
import { SimpleEventCard } from "@/components/SimpleEventCard";
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${apiUrl}/events`);
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load events. Database might not be connected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans selection:bg-nature-light/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-24 px-6 relative z-10">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-nature-deep/50 to-transparent pointer-events-none -z-10" />
        
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold tracking-tight mb-6">
              Upcoming <span className="text-nature-accent">Events</span>
            </h1>
            <p className="text-nature-text/80 text-xl max-w-2xl font-light">
              Join us for deep silent retreats, virtual sessions, and mindful gatherings.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-nature-accent mb-4" />
              <p className="text-nature-light">Loading events...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 p-6 rounded-2xl flex flex-col items-center justify-center max-w-lg mx-auto border border-red-500/20">
              <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
              <p className="text-red-300 text-center">{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20 bg-nature-light/5 rounded-3xl border border-nature-light/10 border-dashed backdrop-blur-sm">
              <p className="text-nature-light text-lg">No upcoming events right now. Check back later!</p>
            </div>
          ) : (
            <div className="space-y-10">
              {events.map((event) => (
                <div key={event.id}>
                  {event.theme === 'zoom' ? (
                    <ZoomEventCard event={event} />
                  ) : (
                    <SimpleEventCard event={event} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
