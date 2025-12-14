"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const attractions = [
    {
        title: "Shambhala Pyramid",
        description: "A unique stone structure created with natural rock columns — a special space for deep, transformative meditation.",
        subtext: "(Under Construction)",
        image: "/assets/shambhala_pyramid.jpg",
        cssClass: "md:col-span-2"
    },
    {
        title: "Buddha Vihara Pond",
        description: "A Symbol of Silence. A serene water body reflecting the peace within.",
        image: "/assets/pond.jpg",
    },
    {
        title: "Rock Garden",
        description: "A peaceful space crafted with natural stones, bringing grounding energy.",
        image: "/assets/rock_garden.jpg",
    },
    {
        title: "Forest Meditation",
        description: "Meditate amidst the forest breeze and soothing sounds of nature.",
        image: "/assets/forest_meditation1.jpg",
    },
    {
        title: "Silent Retreats",
        description: "2, 3, or 7-Day deep silent retreats to journey inward.",
        image: "/assets/accomdation.jpg",
    },
];

export function AttractionsSection() {
    return (
        <section id="attractions" className="py-24 bg-nature-dark">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="space-y-4 mb-12">
                    <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                        Attractions
                    </h2>
                    <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {attractions.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative overflow-hidden rounded-2xl h-[400px] ${item.cssClass || ""}`}
                        >
                            {/* Image Background */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-nature-deep/90 via-nature-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h4 className="font-serif text-2xl font-bold text-nature-text mb-2">
                                    {item.title}
                                </h4>
                                {item.subtext && (
                                    <span className="text-xs text-nature-light uppercase tracking-wider block mb-2">{item.subtext}</span>
                                )}
                                <p className="text-nature-text/80 text-sm md:text-base line-clamp-3 group-hover:line-clamp-none transition-all">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
