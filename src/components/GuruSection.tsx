"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function GuruSection() {
    return (
        <section id="guru" className="py-24 bg-nature-light/5 relative overflow-hidden scroll-mt-28">
            {/* Subtle Texture/Background (Optional) */}
            <div className="absolute inset-0 opacity-30 pattern-grid-lg text-nature-light/10" />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-nature-light/20 bg-nature-deep/5">
                            {/* Image - Using founder_nature.png for consistency and calm aesthetic */}
                            <Image
                                src="/assets/patriji_nature.png"
                                alt="Prakruthi Umamahesh"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            {/* Subtle Inner Glow/Overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-nature-deep/40 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative refined element */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border border-nature-accent/20 rounded-2xl hidden md:block" />
                    </motion.div>

                    {/* Right Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                                My Guru
                            </h2>
                            <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
                        </div>

                        <div className="space-y-6 text-nature-text/80 text-lg leading-relaxed font-light tracking-wide">
                            <p>
                                Prakruthi Uma Mahesh spent over three decades in close association with <span className="font-bold text-green-300 text-xl tracking-wide">Brahmarshi Patriji</span>, absorbing the essence of meditation through silence and lived experience.
                            </p>
                            <p>
                                This sacred companionship profoundly shaped his life, vision, and way of being.
                            </p>
                            <p>
                                From this depth of inner realization, he has authored three spiritual books — not as teachings, but as expressions of lived truth.
                            </p>
                            <p>
                                Through numerous talks and videos, he shares meditation in a simple, practical, and experiential manner.
                            </p>
                            <p>
                                He is the visionary behind <span className="font-serif text-green-300">Silent Valley</span>, a sacred space devoted to silence, nature, and inner awakening.
                            </p>

                            <blockquote className="border-l-4 border-nature-accent/40 pl-6 italic text-nature-light py-2">
                                His work stands as a quiet continuation of Patriji’s vision — truth lived, not preached.
                            </blockquote>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
