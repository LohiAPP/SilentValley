"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Trash2, Calendar, User, Mail, Phone, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface Registration {
  id: number;
  event_id: number;
  event_title: string;
  event_date: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  created_at: string;
}

export function AdminRegistrationsForm() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(res.data);
    } catch (err) {
      setError('Failed to fetch registrations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    try {
      const token = localStorage.getItem('admin_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await axios.delete(`${apiUrl}/registrations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(registrations.filter(r => r.id !== id));
    } catch (err) {
      alert('Failed to delete registration');
    }
  };

  const filteredRegistrations = registrations.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone.includes(searchTerm) ||
    (r.event_title && r.event_title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-nature-accent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-serif text-white font-bold">Event Registrations</h2>
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-hidden focus:border-nature-accent transition-colors"
          />
          <Search className="w-5 h-5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {registrations.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-nature-light">No registrations found.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredRegistrations.map((reg) => (
            <motion.div 
              key={reg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="bg-nature-accent/20 text-nature-accent text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {reg.event_title || 'Unknown Event'}
                  </span>
                  <span className="text-white/40 text-sm">
                    {new Date(reg.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-nature-light" />
                  {reg.name}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-nature-light/80 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-nature-accent/70" />
                    <a href={`mailto:${reg.email}`} className="hover:text-nature-accent transition-colors">{reg.email}</a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-nature-accent/70" />
                    <a href={`tel:${reg.phone}`} className="hover:text-nature-accent transition-colors">{reg.phone}</a>
                  </div>
                  {reg.city && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-nature-accent/70" />
                      {reg.city}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(reg.id)}
                  className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                  title="Delete Registration"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8 text-white/50">
              No results match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
