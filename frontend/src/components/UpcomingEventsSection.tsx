"use client";

import React from 'react';
import { ArrowRight, Globe2, Leaf } from 'lucide-react';
import Link from 'next/link';

export function UpcomingEventsSection() {
  return (
    <section id="events" className="py-24 bg-nature-dark relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif text-white font-bold mb-8">Explore Our Gatherings</h2>
          <p className="text-nature-light text-xl max-w-3xl mx-auto leading-relaxed">
            Whether you wish to join us from the comfort of your home or immerse yourself deeply in nature, 
            choose the path that resonates with your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          
          {/* Online Events Card */}
          <Link 
            href="/events/online"
            className="group relative bg-nature-light/5 border border-nature-light/10 p-10 rounded-3xl hover:bg-nature-light/10 transition-all duration-500 overflow-hidden backdrop-blur-sm"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-nature-accent/10 rounded-full blur-3xl group-hover:bg-nature-accent/20 transition-colors duration-500 -z-10" />
            
            <div className="flex flex-col h-full items-center text-center">
              <div className="w-20 h-20 rounded-full bg-nature-accent/10 border border-nature-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(132,169,140,0.1)]">
                <Globe2 className="w-10 h-10 text-nature-accent" />
              </div>
              
              <h3 className="text-4xl font-serif text-white font-bold mb-6">Online Sessions</h3>
              <p className="text-nature-text/80 text-lg leading-relaxed mb-12 flex-grow">
                Connect with our spiritual community virtually. Join guided meditations, profound Q&A sessions, and teachings from anywhere in the world.
              </p>
              
              <div className="inline-flex items-center px-8 py-3 border border-nature-accent text-nature-accent font-bold rounded-full group-hover:bg-nature-accent group-hover:text-nature-deep transition-all duration-300">
                Explore Virtual <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Offline Events Card */}
          <Link 
            href="/events/offline"
            className="group relative bg-nature-light/5 border border-nature-light/10 p-10 rounded-3xl hover:bg-nature-light/10 transition-all duration-500 overflow-hidden backdrop-blur-sm"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-nature-light/10 rounded-full blur-3xl group-hover:bg-nature-light/20 transition-colors duration-500 -z-10" />
            
            <div className="flex flex-col h-full items-center text-center">
              <div className="w-20 h-20 rounded-full bg-nature-light/10 border border-nature-light/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Leaf className="w-10 h-10 text-nature-light" />
              </div>
              
              <h3 className="text-4xl font-serif text-white font-bold mb-6">Offline Retreats</h3>
              <p className="text-nature-text/80 text-lg leading-relaxed mb-12 flex-grow">
                Step away from the noise and immerse yourself in profound silence. Join our in-person retreats surrounded by pure nature and spiritual energy.
              </p>
              
              <div className="inline-flex items-center px-8 py-3 border border-nature-light text-nature-light font-bold rounded-full group-hover:bg-nature-light group-hover:text-nature-deep transition-all duration-300">
                Explore In-Person <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
