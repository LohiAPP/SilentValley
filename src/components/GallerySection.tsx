'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function GallerySection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of gallery images (sv1.jpeg to sv10.jpeg)
    const galleryImages = Array.from({ length: 10 }, (_, i) => ({
        src: `/silent_valley_gallery/sv${i + 1}.jpeg`,
        alt: `Silent Valley Gallery Image ${i + 1}`
    }));

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <section id="gallery" className="py-24 bg-gradient-to-b from-nature-deep to-nature-dark relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-64 h-64 bg-nature-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-nature-light rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-nature-accent via-nature-light to-nature-accent bg-clip-text text-transparent">
                        Silent Valley Gallery
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-nature-accent to-transparent mx-auto mb-6"></div>
                    <p className="text-lg text-nature-text/80 max-w-2xl mx-auto">
                        Explore the serene beauty and spiritual essence of Silent Valley through our curated collection
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative group">
                        {/* Main Image Container */}
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={galleryImages[currentIndex].src}
                                alt={galleryImages[currentIndex].alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority={currentIndex === 0}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-nature-deep/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Previous Button */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-nature-deep/90 backdrop-blur-sm hover:bg-nature-accent text-nature-text hover:text-nature-deep p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-nature-accent/50 hover:scale-110 border border-nature-accent/30 group/btn"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6 transition-transform group-hover/btn:-translate-x-1" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-nature-deep/90 backdrop-blur-sm hover:bg-nature-accent text-nature-text hover:text-nature-deep p-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-nature-accent/50 hover:scale-110 border border-nature-accent/30 group/btn"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="mt-8 flex justify-center gap-2 flex-wrap px-4">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-nature-accent w-8'
                                    : 'bg-nature-text/30 hover:bg-nature-text/50'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
