"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="py-24 bg-nature-deep relative overflow-hidden scroll-mt-28">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-nature-dark/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Header matching Guru Section Style */}
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                                Vision
                            </h2>
                            <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
                        </div>

                        {/* Content matching Guru Section Typography */}
                        <div className="space-y-6 text-nature-text/80 text-lg leading-relaxed font-light tracking-wide">
                            <p>
                                <span className="font-serif text-green-300 text-xl">Silent Valley</span> is a sacred spiritual space that takes you one step away from the outside world... and one step closer to your <span className="text-nature-light font-medium">inner self</span>.
                            </p>
                            <p>
                                Every corner here breathes <span className="text-green-300">peace</span>, <span className="text-green-300">nature</span>, and <span className="text-green-300">deep meditation</span>.
                            </p>
                            <p>
                                It is not just a place, but an inner journey to rediscover the silence that resides within.
                            </p>

                            <blockquote className="border-l-4 border-nature-accent/40 pl-6 italic text-nature-light py-2">
                                &quot;To create a sacred space where every human being can rediscover their inner silence, their inner peace, and the healing power of nature.&quot;
                            </blockquote>
                        </div>
                    </motion.div>

                    {/* Image Grid */}
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-nature-light/20 bg-nature-deep/5">
                            {/* Image - Using tapovvanam.jpg as requested */}
                            <Image
                                src="/assets/founder_nature.png"
                                alt="Tapovvanam Forest"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Subtle Inner Glow/Overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-nature-deep/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative refined element - Mirrored for Right Side */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-nature-accent/20 rounded-2xl hidden md:block" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
