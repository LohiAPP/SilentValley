"use client";

import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function SimpleEventCard({ event }: { event: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-8 hover:bg-nature-light/10 transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {event.image_url && (
          <div className="md:w-1/3 shrink-0 rounded-xl overflow-hidden aspect-video md:aspect-square lg:aspect-video relative">
            <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="space-y-4 flex-1">
          <h3 className="text-2xl font-serif text-white font-bold">{event.title}</h3>
          
          <div className="flex flex-wrap gap-4 text-nature-light text-sm font-medium uppercase tracking-wider">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </div>
          </div>

          {event.description && (
            <p className="text-nature-text/80 leading-relaxed max-w-2xl">
              {event.description}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <a
            href={`/register?eventId=${event.id}`}
            className="inline-flex items-center px-6 py-3 border border-nature-accent text-nature-accent rounded-full hover:bg-nature-accent hover:text-nature-deep transition-colors font-semibold shadow-lg shadow-nature-accent/10 hover:shadow-nature-accent/30 hover:-translate-y-1"
          >
            Register Now <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
