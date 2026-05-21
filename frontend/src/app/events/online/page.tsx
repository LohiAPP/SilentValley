"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ZoomEventCard } from "@/components/ZoomEventCard";
import { Loader2, AlertCircle, Globe2, Wifi, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OnlineEventsPage() {
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
      // Filter only zoom events
      setEvents(response.data.filter((e: any) => e.theme === 'zoom'));
    } catch (err) {
      setError('Failed to load events. Database might not be connected.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050B0A] text-nature-text font-sans selection:bg-nature-accent/30 flex flex-col relative overflow-hidden">
      {/* Virtual Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Cyber Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#84A98C10_1px,transparent_1px),linear-gradient(to_bottom,#84A98C10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-nature-accent/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-nature-light/10 rounded-full blur-[120px]" 
        />
      </div>

      <Navbar />
      
      <div className="flex-1 pt-40 pb-24 px-6 relative z-10 container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          
          {/* Left Side: Virtual Theme Header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start lg:sticky lg:top-40 h-fit"
          >
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-nature-accent/30 rounded-2xl blur-xl group-hover:bg-nature-accent/50 transition-all duration-500" />
              <div className="relative w-20 h-20 rounded-2xl bg-black/40 border border-nature-accent/30 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(82,183,136,0.2)]">
                <MonitorPlay className="w-10 h-10 text-nature-accent" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white font-bold tracking-tight mb-6 leading-tight">
              Virtual<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-light to-nature-accent filter drop-shadow-[0_0_15px_rgba(82,183,136,0.5)]">
                Ashram
              </span>
            </h1>
            
            <p className="text-nature-light/80 text-xl font-light leading-relaxed mb-10">
              Transcend physical boundaries. Join our sacred digital space for live meditations, wisdom sharing, and global spiritual connection.
            </p>
            
            {/* Stats/Badges */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/10 hover:border-nature-accent/30 transition-all group">
                <div className="p-3 bg-nature-accent/10 rounded-xl group-hover:bg-nature-accent/20 transition-colors">
                  <Globe2 className="text-nature-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Global Access</h4>
                  <p className="text-sm text-nature-light/70">Connect from anywhere</p>
                </div>
              </div>
              <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/10 hover:border-nature-accent/30 transition-all group">
                <div className="p-3 bg-nature-accent/10 rounded-xl group-hover:bg-nature-accent/20 transition-colors">
                  <Wifi className="text-nature-accent w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Live Streaming</h4>
                  <p className="text-sm text-nature-light/70">Real-time interaction</p>
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
            {/* Glass Panel Container for Events */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-nature-accent/50 to-transparent" />
              
              <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/10">
                <h3 className="text-2xl font-serif text-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-nature-accent animate-pulse" />
                  Upcoming Sessions
                </h3>
                <span className="text-nature-light/60 text-sm font-medium uppercase tracking-wider bg-white/5 px-4 py-2 rounded-full">
                  {events.length} Available
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 h-full">
                  <Loader2 className="w-12 h-12 animate-spin text-nature-accent mb-6" />
                  <p className="text-nature-light text-lg">Establishing connection...</p>
                </div>
              ) : error ? (
                <div className="bg-red-500/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-red-500/20 mt-10">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-red-300 text-lg">{error}</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-32 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-nature-light/5 border border-nature-light/10 flex items-center justify-center mb-6">
                    <MonitorPlay className="w-8 h-8 text-nature-light/40" />
                  </div>
                  <p className="text-nature-light/80 text-xl font-light">No online sessions scheduled right now.</p>
                  <p className="text-nature-light/50 mt-2">Please check back later for new updates.</p>
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
                      <ZoomEventCard event={event} />
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
