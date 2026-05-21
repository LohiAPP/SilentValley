"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryModal } from '@/components/CategoryModal';

interface Image {
  id: number;
  image_url: string;
  title: string | null;
  category: string;
}

interface CategoryGroup {
  name: string;
  coverImage: string | null;
  images: Image[];
}

export default function GalleryPage() {
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryGroup | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await axios.get(`${apiUrl}/gallery`);
      const fetchedImages: Image[] = res.data;
      
      // Group images by category
      const grouped = new Map<string, Image[]>();
      fetchedImages.forEach((img) => {
        if (!grouped.has(img.category)) {
          grouped.set(img.category, []);
        }
        grouped.get(img.category)!.push(img);
      });
      
      const categoryGroups: CategoryGroup[] = Array.from(grouped.entries()).map(([name, images]) => ({
        name,
        coverImage: images.length > 0 ? images[0].image_url : null,
        images
      }));
      
      setCategories(categoryGroups);
    } catch (err) {
      console.error(err);
      setError('Failed to load gallery. Database connection might be offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A100D] text-nature-text font-sans selection:bg-nature-accent/30 flex flex-col relative overflow-hidden">
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-nature-light rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-nature-accent rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 mix-blend-screen" />
      </div>

      {/* Subtle Grain Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <Navbar />

      <div className="flex-1 pt-40 pb-24 px-6 relative z-10 container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white font-bold tracking-tight mb-6"
          >
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-light to-nature-accent">Journeys</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-nature-light/80 text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            Explore our collections of moments, retreats, and spiritual gatherings at Silent Valley.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-nature-accent mb-6" />
            <p className="text-nature-light text-lg">Curating gallery...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center border border-red-500/20 max-w-2xl mx-auto mt-10">
            <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
            <p className="text-red-300 text-lg">{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-32 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <ImageIcon className="w-10 h-10 text-nature-light/40" />
            </div>
            <p className="text-nature-light/80 text-xl font-light">No collections available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className="group cursor-pointer"
              >
                {/* Category Card */}
                <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-nature-deep border border-white/10 shadow-xl transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(82,183,136,0.2)] group-hover:-translate-y-2">
                  {category.coverImage ? (
                    <img 
                      src={category.coverImage} 
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-nature-deep/50 text-nature-light/30">
                      <ImageIcon className="w-16 h-16" />
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/40 to-transparent flex flex-col justify-end p-8 sm:p-10">
                    <span className="text-nature-accent text-sm font-bold uppercase tracking-widest mb-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                      View Collection
                    </span>
                    <h3 className="text-3xl md:text-4xl text-white font-serif font-bold group-hover:text-nature-light transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-nature-light/60 text-sm mt-3 font-medium uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-nature-accent/50" />
                      {category.images.length} {category.images.length === 1 ? 'Item' : 'Items'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Modal Popup */}
      <CategoryModal 
        isOpen={selectedCategory !== null}
        onClose={() => setSelectedCategory(null)}
        categoryName={selectedCategory?.name || ''}
        images={selectedCategory?.images || []}
      />
    </main>
  );
}
