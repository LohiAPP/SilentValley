"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Video, PlayCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface VideoData {
  id: number;
  youtube_url: string;
  title: string | null;
  created_at: string;
}

export function VideosPreviewSection() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/videos`);
        // Only take the first 3 videos for preview
        setVideos(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching preview videos:", err);
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

  if (!loading && videos.length === 0) {
    return null; // Don't show the section if there are no videos
  }

  return (
    <section id="videos" className="py-24 bg-nature-deep relative z-10 overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[url('/assets/hero-bg-empty1.png')] opacity-5 bg-cover bg-center mix-blend-overlay z-0" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-serif text-white font-bold tracking-tight">
              Watch & Learn
            </h2>
            <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
            <p className="text-nature-text/80 text-xl font-light tracking-wide max-w-2xl mt-4">
              Explore teachings, guided meditations, and spiritual insights.
            </p>
          </div>
          
          <Link 
            href="/videos"
            className="hidden md:inline-flex items-center px-8 py-3 border border-nature-accent text-nature-accent font-bold rounded-full hover:bg-nature-accent hover:text-nature-deep transition-all duration-300 whitespace-nowrap"
          >
            View All Videos <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-nature-accent" />
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={video.id}
                    className="group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-xl bg-nature-dark border border-nature-light/10"
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

        <div className="mt-12 text-center md:hidden">
            <Link 
              href="/videos"
              className="inline-flex items-center px-8 py-3 border border-nature-accent text-nature-accent font-bold rounded-full hover:bg-nature-accent hover:text-nature-deep transition-all duration-300"
            >
              View All Videos <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
        </div>
      </div>

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
    </section>
  );
}
