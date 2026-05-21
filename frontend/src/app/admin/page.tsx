"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminEventForm } from "@/components/AdminEventForm";
import { AdminGalleryForm } from "@/components/AdminGalleryForm";
import { AdminVideoForm } from "@/components/AdminVideoForm";
import { AdminBookForm } from "../../components/AdminBookForm";
import { AdminRegistrationsForm } from "@/components/admin/AdminRegistrationsForm";
import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'gallery' | 'videos' | 'books' | 'registrations'>('dashboard');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans">
      <header className="bg-nature-deep border-b border-nature-light/10 py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="text-white font-serif font-bold text-xl">Silent Valley <span className="text-nature-accent">Admin</span></div>
        <button onClick={handleLogout} className="px-4 py-1.5 border border-nature-accent/50 text-nature-accent text-sm rounded-full hover:bg-nature-accent hover:text-nature-deep transition-colors">
          Logout
        </button>
      </header>
      
      <div className="pt-24 pb-24 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-nature-light">Manage platform content and events.</p>
          </div>

          <div className="flex space-x-4 mb-8 border-b border-nature-light/10 pb-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'dashboard' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'events' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Events Management
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'gallery' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Gallery Management
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'videos' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Video Management
            </button>
            <button 
              onClick={() => setActiveTab('books')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'books' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Book Management
            </button>
            <button 
              onClick={() => setActiveTab('registrations')}
              className={`whitespace-nowrap px-4 py-2 font-bold uppercase tracking-wider text-sm transition-colors ${activeTab === 'registrations' ? 'text-nature-accent border-b-2 border-nature-accent' : 'text-nature-light hover:text-white'}`}
            >
              Registrations
            </button>
          </div>
          
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'events' && <AdminEventForm />}
          {activeTab === 'gallery' && <AdminGalleryForm />}
          {activeTab === 'videos' && <AdminVideoForm />}
          {activeTab === 'books' && <AdminBookForm />}
          {activeTab === 'registrations' && <AdminRegistrationsForm />}
        </div>
      </div>

      <Footer />
    </main>
  );
}
