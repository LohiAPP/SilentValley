"use client";

import React from 'react';
import { Video, Calendar, Clock, User, Hash, Key, ExternalLink, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ZoomEventCard({ event }: { event: any }) {
  const highlights = Array.isArray(event.highlights) 
    ? event.highlights 
    : (typeof event.highlights === 'string' ? JSON.parse(event.highlights) : []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-linear-to- from-nature-deep to-[#1c2c26] rounded-2xl shadow-2xl overflow-hidden border border-nature-accent/20 relative"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-nature-accent/5 rounded-full blur-3xl -z-10" />

      <div className="p-8 md:p-10 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-nature-accent/20 text-nature-accent border border-nature-accent/30 tracking-widest uppercase">
            <Video className="w-3 h-3 mr-2" /> Virtual Session
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">{event.title}</h3>
        
        {event.image_url && (
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative border border-nature-accent/20">
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-nature-deep/80 to-transparent pointer-events-none" />
          </div>
        )}
        
        <div className="flex flex-wrap gap-y-4 gap-x-8 mb-8 text-nature-light uppercase text-sm tracking-wider font-medium">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-3 text-nature-accent" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-3 text-nature-accent" />
            <span>{event.time}</span>
          </div>
          {event.speaker && (
            <div className="flex items-center">
              <User className="w-5 h-5 mr-3 text-nature-accent" />
              <span>Speaker: {event.speaker}</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-nature-light/5 rounded-xl p-6 border border-nature-light/10 backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-nature-light uppercase tracking-widest mb-4">Meeting Details</h4>
            <div className="space-y-4 font-mono text-lg">
              <div className="flex items-center">
                <Hash className="w-5 h-5 mr-3 text-nature-accent/70" />
                <span className="text-nature-text/70 text-sm mr-2 uppercase tracking-wider font-sans">ID:</span>
                <span className="text-white tracking-widest">{event.zoom_id || 'TBA'}</span>
              </div>
              <div className="flex items-center">
                <Key className="w-5 h-5 mr-3 text-nature-accent/70" />
                <span className="text-nature-text/70 text-sm mr-2 uppercase tracking-wider font-sans">Passcode:</span>
                <span className="text-white tracking-widest">{event.passcode || 'None'}</span>
              </div>
            </div>
          </div>

          {highlights && highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-nature-light uppercase tracking-widest mb-4">Highlights</h4>
              <ul className="space-y-3">
                {highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-nature-accent shrink-0" />
                    <span className="text-nature-text/90 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={event.join_link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-nature-deep bg-nature-accent hover:bg-white transition-all shadow-lg shadow-nature-accent/20 hover:shadow-nature-accent/40 hover:-translate-y-1"
          >
            Join Session <ExternalLink className="w-5 h-5 ml-3" />
          </a>
          <a
            href={`/register?eventId=${event.id}`}
            className="inline-flex items-center justify-center px-8 py-4 border border-nature-accent text-nature-accent text-lg font-bold rounded-full hover:bg-nature-accent hover:text-nature-deep transition-all shadow-lg shadow-nature-accent/10 hover:shadow-nature-accent/30 hover:-translate-y-1"
          >
            Register Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
