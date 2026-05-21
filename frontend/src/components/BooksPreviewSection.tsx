"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Book, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BookData {
  id: number;
  title: string;
  description: string | null;
  cover_image_url: string | null;
  book_file_url: string | null;
}

export function BooksPreviewSection() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await axios.get(`${apiUrl}/books`);
        // Only take the first 4 books for preview
        setBooks(res.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching preview books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (!loading && books.length === 0) {
    return null; 
  }

  return (
    <section id="books-preview" className="py-24 bg-nature-dark relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-6xl md:text-7xl font-serif text-white font-bold tracking-tight">
              Library of Wisdom
            </h2>
            <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
            <p className="text-nature-text/80 text-xl font-light tracking-wide max-w-2xl mt-4">
              Dive deep into spiritual knowledge through our curated collection of books and teachings.
            </p>
          </div>
          
          <Link 
            href="/books"
            className="hidden md:inline-flex items-center px-8 py-3 border border-nature-accent text-nature-accent font-bold rounded-full hover:bg-nature-accent hover:text-nature-deep transition-all duration-300 whitespace-nowrap"
          >
            Explore All Books <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-nature-accent" />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((book, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={book.id}
                  className="group"
                >
                  <Link href="/books">
                    <div className="aspect-[3/4] relative rounded-[2rem] overflow-hidden shadow-2xl bg-nature-deep border border-nature-light/10 mb-6 cursor-pointer">
                      {book.cover_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={book.cover_image_url} 
                          alt={book.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-linear-to-br from-nature-deep to-nature-dark">
                          <Book className="w-16 h-16 text-nature-light/20 mb-4" />
                          <span className="text-nature-light/50 font-serif text-lg">{book.title}</span>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-nature-dark/90 via-nature-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-nature-accent text-nature-deep p-4 rounded-full shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500">
                          <FileText size={28} />
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <h3 className="text-2xl font-serif text-white font-medium mb-2 group-hover:text-nature-accent transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-nature-light/60 text-sm line-clamp-2">
                    {book.description || "A spiritual journey through wisdom and silence."}
                  </p>
                </motion.div>
              ))}
            </div>
        )}

        <div className="mt-12 text-center md:hidden">
            <Link 
              href="/books"
              className="inline-flex items-center px-8 py-3 border border-nature-accent text-nature-accent font-bold rounded-full hover:bg-nature-accent hover:text-nature-deep transition-all duration-300"
            >
              Explore All Books <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
        </div>
      </div>
    </section>
  );
}
