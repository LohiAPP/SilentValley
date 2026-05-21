"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader2, AlertCircle, Video, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoData {
  id: number;
  youtube_url: string;
  title: string | null;
  created_at: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <main className="min-h-screen bg-nature-dark font-sans selection:bg-nature-accent selection:text-nature-deep">
      <Navbar />

      {/* Header Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-nature-deep z-0" />
        <div className="absolute inset-0 bg-[url('/assets/hero-bg-empty1.png')] opacity-5 bg-cover bg-center mix-blend-overlay z-0" />
        
        <div className="container relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-nature-accent tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">
              Watch & Learn
            </span>
            <h1 className="text-5xl md:text-6xl font-serif text-white font-bold mb-6">
              Video Gallery
            </h1>
            <p className="text-nature-light max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              Explore our collection of teachings, guided meditations, and insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 min-h-[50vh]">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-nature-accent mb-4" />
              <p className="text-nature-light">Loading videos...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-400">
              <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
              <p>{error}</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-nature-light/50">
              <Video className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-xl font-serif">No videos found.</p>
              <p className="mt-2 text-sm uppercase tracking-wider">Check back later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => {
                const videoId = getYoutubeId(video.youtube_url);
                if (!videoId) return null;
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={video.id}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-nature-deep"
                    onClick={() => setSelectedVideo(videoId)}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-nature-deep/20 group-hover:bg-transparent transition-colors z-10" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-white/20 group-hover:border-nature-accent group-hover:bg-nature-accent/20">
                          <PlayCircle className="w-10 h-10 text-white group-hover:text-nature-accent transition-colors" />
                        </div>
                      </div>

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={thumbnailUrl} 
                        onError={(e) => {
                          // Fallback if maxresdefault doesn't exist
                          e.currentTarget.src = fallbackThumbnailUrl;
                        }}
                        alt={video.title || "Video thumbnail"} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    {video.title && (
                      <div className="p-6">
                        <h3 className="text-xl font-serif text-white font-medium line-clamp-2 group-hover:text-nature-accent transition-colors">
                          {video.title}
                        </h3>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-white/50 hover:text-white flex items-center gap-2 transition-colors z-50"
              >
                Close <span className="text-2xl">&times;</span>
              </button>
              
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
