"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimpleEventCard } from "@/components/SimpleEventCard";
import { Loader2, AlertCircle, Leaf, MapPin, TreePine, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OfflineEventsPage() {
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
      // Filter only simple/offline events
      setEvents(response.data.filter((e: any) => e.theme === 'simple'));
    } catch (err) {
      setError('Failed to load events. Database might not be connected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A100D] text-nature-text font-sans selection:bg-nature-light/30 flex flex-col relative overflow-hidden">
      {/* Earthy Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Sun rays or soft light coming from top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,#84A98C15_0%,transparent_70%)]" />
        
        {/* Soft green/brown ambient glows */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-0 w-[40rem] h-[40rem] bg-[#52796F]/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-[#2F3E46]/20 rounded-full blur-[150px]" 
        />
      </div>

      <Navbar />
      
      <div className="flex-1 pt-40 pb-24 px-6 relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          
          {/* Left Side: Organic Theme Header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start lg:sticky lg:top-40 h-fit"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-nature-light/20 rounded-full blur-xl" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#2D4A3E] to-[#1A2E26] border border-nature-light/20 flex items-center justify-center shadow-2xl">
                <Leaf className="w-12 h-12 text-[#A3C4B3]" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold tracking-tight mb-6 leading-tight">
              Nature<br />
              <span className="text-[#A3C4B3] italic font-light">
                Retreats
              </span>
            </h1>
            
            <p className="text-nature-light/80 text-xl font-light leading-relaxed mb-10">
              Step away from the noise. Immerse yourself in the profound silence of our physical sanctuary and reconnect with your inner self.
            </p>
            
            {/* Stats/Badges */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-5 bg-[#16231E]/60 border border-[#2D4A3E]/50 rounded-2xl p-5 backdrop-blur-sm transition-all">
                <div className="p-3 bg-[#2D4A3E]/50 rounded-full">
                  <TreePine className="text-[#A3C4B3] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Immersive Nature</h4>
                  <p className="text-sm text-nature-light/70">Surrounded by ancient forests</p>
                </div>
              </div>
              <div className="flex items-center gap-5 bg-[#16231E]/60 border border-[#2D4A3E]/50 rounded-2xl p-5 backdrop-blur-sm transition-all">
                <div className="p-3 bg-[#2D4A3E]/50 rounded-full">
                  <MapPin className="text-[#A3C4B3] w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Sacred Grounds</h4>
                  <p className="text-sm text-nature-light/70">Silent Valley Ashram</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Events List */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Organic Container for Events */}
            <div className="bg-[#121C18]/80 backdrop-blur-xl border border-[#2D4A3E]/30 rounded-[3rem] p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2D4A3E] via-[#A3C4B3] to-[#2D4A3E]" />
              
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-[#2D4A3E]/30">
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <Sun className="w-6 h-6 text-[#A3C4B3]" />
                  Upcoming Retreats
                </h3>
                <span className="text-[#A3C4B3] text-sm font-medium uppercase tracking-wider bg-[#2D4A3E]/30 px-5 py-2 rounded-full">
                  {events.length} Scheduled
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 h-full">
                  <Loader2 className="w-12 h-12 animate-spin text-[#A3C4B3] mb-6" />
                  <p className="text-[#A3C4B3] text-lg">Gathering dates...</p>
                </div>
              ) : error ? (
                <div className="bg-red-900/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-red-500/20 mt-10">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-red-300 text-lg">{error}</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-32 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#2D4A3E]/20 border border-[#2D4A3E]/50 flex items-center justify-center mb-6">
                    <Leaf className="w-8 h-8 text-[#A3C4B3]/50" />
                  </div>
                  <p className="text-[#A3C4B3] text-xl font-light">No physical retreats scheduled right now.</p>
                  <p className="text-[#A3C4B3]/60 mt-2">The sanctuary is currently in a state of silent observation.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <SimpleEventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
