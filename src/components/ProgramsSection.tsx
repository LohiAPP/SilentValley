"use client";

import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

export function ProgramsSection() {
    const programs = [
        "Silent Meditation Retreats (2 & 3 Days)",
        "7-Day Deep Silent Retreats",
        "Pyramid Meditation Sessions",
        "Nature Meditation",
        "Manifestation & Mindfulness Workshops",
        "Spiritual Awareness Camps for Youth"
    ];

    return (
        <section id="programs" className="bg-nature-deep py-24 relative z-10">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4 mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                        Meditation Programs
                    </h2>
                    <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-nature-light/5 backdrop-blur-sm p-6 rounded-xl border border-nature-light/10 flex items-center space-x-4 hover:bg-nature-light/10 transition-colors"
                        >
                            <div className="p-3 bg-nature-light/20 rounded-full">
                                <Leaf className="text-nature-light w-6 h-6" />
                            </div>
                            <span className="text-nature-text/90 font-medium">{program}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
