"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, Image as ImageIcon, Users, TrendingUp, Loader2 } from 'lucide-react';

export function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const token = localStorage.getItem('admin_token');
        const res = await axios.get(`${apiUrl}/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-nature-accent" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Stat Card 1 */}
        <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-nature-light/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-nature-accent/20 rounded-xl">
              <CalendarDays className="w-6 h-6 text-nature-accent" />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+Active</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">{stats.events}</h3>
          <p className="text-nature-light text-sm uppercase tracking-wider">Total Events</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-nature-light/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <ImageIcon className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+Active</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">{stats.gallery}</h3>
          <p className="text-nature-light text-sm uppercase tracking-wider">Gallery Images</p>
        </div>

        {/* Placeholder Stat 3 */}
        <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-nature-light/10 transition-colors opacity-70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-xs font-bold text-nature-light bg-nature-light/10 px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">--</h3>
          <p className="text-nature-light text-sm uppercase tracking-wider">Subscribers</p>
        </div>

        {/* Placeholder Stat 4 */}
        <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-nature-light/10 transition-colors opacity-70">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <span className="text-xs font-bold text-nature-light bg-nature-light/10 px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">--</h3>
          <p className="text-nature-light text-sm uppercase tracking-wider">Engagement</p>
        </div>
      </div>

      <div className="bg-nature-light/5 border border-nature-light/10 rounded-2xl p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-serif text-white mb-4">Welcome to the Dashboard</h3>
        <p className="text-nature-light mb-6 max-w-2xl">
          From here you can manage all upcoming events, virtual sessions, and upload beautiful images to your public gallery.
          Navigate using the tabs above to create new content.
        </p>
      </div>
    </div>
  );
}
