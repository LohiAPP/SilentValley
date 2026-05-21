"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.post(`${apiUrl}/login`, { email, password });
      
      localStorage.setItem('admin_token', res.data.token);
      router.push('/admin');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-nature-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-nature-light rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full bg-nature-light/5 border border-nature-light/20 rounded-3xl p-10 backdrop-blur-sm z-10 relative shadow-2xl">
        <h1 className="text-3xl font-serif font-bold text-white mb-2 text-center">Admin Login</h1>
        <p className="text-nature-light text-center mb-8 text-sm">Secure access to Silent Valley dashboard</p>
        
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-6 text-sm text-center border border-red-500/20">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-nature-light mb-2 font-bold">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:border-nature-accent outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-nature-light mb-2 font-bold">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-nature-deep/50 border border-nature-light/20 rounded-lg p-3 text-white focus:border-nature-accent outline-none transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-nature-accent text-nature-deep font-bold rounded-lg p-3 hover:bg-white transition-colors"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
