"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, ArrowRight, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export function GallerySection() {
    const [categories, setCategories] = useState<{ name: string; coverImage: string | null }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${apiUrl}/gallery`);
                const fetchedImages = res.data;
                
                // Group by category and assign the first image as cover
                const categoryMap = new Map<string, string>();
                fetchedImages.forEach((img: any) => {
                    if (!categoryMap.has(img.category) && img.image_url) {
                        categoryMap.set(img.category, img.image_url);
                    }
                });
                
                const uniqueCategories = Array.from(categoryMap.entries()).map(([name, coverImage]) => ({
                    name,
                    coverImage
                }));
                
                setCategories(uniqueCategories);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <section id="gallery" className="py-24 bg-linear-to-b from-nature-deep to-nature-dark relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-nature-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-nature-light rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-nature-accent via-nature-light to-nature-accent bg-clip-text text-transparent">
                        Silent Valley Gallery
                    </h2>
                    <div className="w-24 h-1 bg-linear-to-r from-transparent via-nature-accent to-transparent mx-auto mb-6"></div>
                    <p className="text-lg text-nature-text/80 max-w-2xl mx-auto">
                        Explore the serene beauty and spiritual essence of Silent Valley
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-nature-accent" /></div>
                ) : categories.length === 0 ? (
                    <div className="text-center text-nature-light bg-white/5 border border-white/10 rounded-2xl p-12">
                        <ImageIcon className="w-12 h-12 text-nature-light/50 mx-auto mb-4" />
                        <p>No gallery images have been uploaded yet.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {categories.map((cat) => (
                                <Link href="/gallery" key={cat.name}>
                                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl bg-nature-deep border border-nature-light/10 cursor-pointer block">
                                        {cat.coverImage ? (
                                            <img
                                                src={cat.coverImage}
                                                alt={cat.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-nature-deep text-nature-light/30">
                                                <ImageIcon className="w-12 h-12" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-nature-dark/95 via-nature-dark/40 to-transparent flex flex-col justify-end p-8">
                                            <h3 className="text-white text-2xl font-serif font-bold group-hover:text-nature-accent transition-colors">
                                                {cat.name}
                                            </h3>
                                            <p className="text-nature-light/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                                View collection
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <Link 
                                href="/gallery" 
                                className="inline-flex items-center px-8 py-4 bg-nature-accent text-nature-deep font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            >
                                View Full Gallery <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
