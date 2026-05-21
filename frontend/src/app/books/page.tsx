"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Book, ArrowLeft, FileText, Download, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface BookData {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  book_file_url: string | null;
  created_at: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/books`);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-nature-deep/50 z-0" />
        <div className="absolute inset-0 bg-[url('/assets/hero-bg-empty1.png')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="w-full max-w-[1536px] mx-auto px-4 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-white font-bold tracking-tight mb-6">
              Silent Valley <span className="text-nature-accent italic">Library</span>
            </h1>
            <p className="text-nature-text/80 text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto">
              A collection of spiritual wisdom, guided teachings, and transformative insights to support your inner journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-20 relative z-10">
        <div className="w-full max-w-[1536px] mx-auto px-4 lg:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-nature-accent" />
              <p className="text-nature-light animate-pulse">Opening the scrolls of wisdom...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-40 bg-nature-deep/30 rounded-[3rem] border border-nature-light/10">
              <Book className="w-20 h-20 text-nature-light/20 mx-auto mb-6" />
              <h2 className="text-3xl font-serif text-white mb-4">No Books Found</h2>
              <p className="text-nature-light/60 mb-8">Our digital library is currently being curated. Please check back soon.</p>
              <Link href="/" className="px-8 py-3 bg-nature-accent text-nature-deep font-bold rounded-full hover:bg-white transition-colors">
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-nature-deep/40 border border-nature-light/10 rounded-[2.5rem] overflow-hidden hover:border-nature-accent/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex flex-col h-full">
                    {/* Cover Image */}
                    <div className="aspect-[16/10] relative overflow-hidden">
                      {book.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={book.cover_image_url} 
                          alt={book.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-nature-deep to-nature-dark flex items-center justify-center">
                          <Book className="w-16 h-16 text-nature-light/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-nature-dark via-transparent to-transparent opacity-60" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-nature-accent/90 backdrop-blur-md text-nature-deep text-xs font-bold rounded-full tracking-widest uppercase">
                        Digital Edition
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-10 flex-1 flex flex-col">
                      <h3 className="text-3xl font-serif text-white font-bold mb-4 group-hover:text-nature-accent transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-nature-text/70 text-lg leading-relaxed mb-8 line-clamp-4 flex-1">
                        {book.description || "A deep dive into the spiritual essence of silence and the transformative power of meditation at Silent Valley."}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <a 
                          href={book.book_file_url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-3 py-4 bg-nature-accent text-nature-deep font-bold rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-nature-accent/20"
                        >
                          <Download size={20} /> Read / Download
                        </a>
                        <button 
                          onClick={() => {
                            if (book.book_file_url) window.open(book.book_file_url, '_blank');
                          }}
                          className="p-4 border border-nature-light/20 text-nature-light rounded-2xl hover:bg-nature-light/10 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
