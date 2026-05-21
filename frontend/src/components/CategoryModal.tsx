"use client";

import React, { useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Image {
  id: number;
  image_url: string;
  title: string | null;
  category: string;
}

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  images: Image[];
}

export function CategoryModal({ isOpen, onClose, categoryName, images }: CategoryModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-7xl max-h-full bg-nature-deep border border-nature-light/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 md:p-8 border-b border-nature-light/10 bg-nature-deep/50 relative z-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-wide">
                {categoryName}
              </h2>
              <p className="text-nature-light/70 mt-2 text-sm uppercase tracking-widest font-bold">
                {images.length} {images.length === 1 ? 'Image' : 'Images'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-red-500/20 text-nature-light hover:text-red-400 rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body (Scrollable Gallery) */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            {images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-nature-light/50">
                <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                <p>No images found for this category.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {images.map((img, index) => (
                  <motion.div 
                    key={img.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="break-inside-avoid rounded-2xl overflow-hidden bg-nature-deep/50 border border-nature-light/10 group relative shadow-lg"
                  >
                    <img 
                      src={img.image_url} 
                      alt={img.title || categoryName} 
                      className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                    {img.title && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white font-serif text-lg">{img.title}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
