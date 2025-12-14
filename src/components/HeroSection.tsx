"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
    return (
        <section id="home" className="relative min-h-screen w-full overflow-x-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-nature-deep/40 z-10" /> {/* Overlay */}
                <Image
                    src="/assets/hero-bg-empty1.png"
                    alt="Serene Forest Background"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
            </div>

            {/* Content Container */}

            {/* Content Container */}
            <div className="relative z-20 container max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 lg:gap-12 pt-24 md:pt-0 pb-12">

                {/* Left Side: Guru Image */}
                <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full order-1">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: -50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="relative group cursor-pointer"
                    >
                        {/* Decorative Elements around image */}
                        <div className="absolute inset-0 bg-nature-light/20 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />

                        <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-nature-light/30 shadow-2xl group-hover:border-nature-light/50 transition-colors duration-500 bg-gradient-to-b from-nature-light/10 to-nature-deep/60">
                            <Image
                                src="/assets/patriji_nature.png"
                                alt="Brahmarshi Patriji"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Guru Name & Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="text-center md:text-left mt-6 ml-4"
                    >
                        <span className="block text-nature-light tracking-[0.2em] text-sm uppercase font-semibold mb-1">
                            Guru
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-nature-text flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-8 h-[1px] bg-nature-light/50 inline-block md:hidden"></span>
                            Brahmarshi Patriji
                            <span className="w-8 h-[1px] bg-nature-light/50 inline-block"></span>
                        </h3>
                    </motion.div>
                </div>

                {/* Center: Text Content */}
                <div className="flex-1 text-center space-y-6 md:space-y-8 max-w-2xl mx-auto order-3 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-lg text-nature-text whitespace-nowrap">
                            Silent Valley
                        </h1>
                        <p className="font-light text-xl md:text-2xl italic text-nature-text/95 mb-8 drop-shadow-md">
                            The Sacred Meditation Ashram
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.0 }}
                        className="space-y-4 text-nature-text/90 font-light text-lg md:text-xl drop-shadow-sm"
                    >
                        <p className="leading-relaxed">Where the silence of the forests... <br />
                            The gentle breeze of nature... <br />
                            And the mountains that call for peace...</p>
                        <p className="pt-2 font-medium text-nature-light">
                            All come together in one sacred space.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Founder Image */}
                <div className="flex-1 flex flex-col items-center md:items-end justify-center w-full order-2 md:order-3 mt-8 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="relative group cursor-pointer"
                    >
                        {/* Decorative Elements around image */}
                        <div className="absolute inset-0 bg-nature-light/20 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />

                        <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-nature-light/30 shadow-2xl group-hover:border-nature-light/50 transition-colors duration-500 bg-gradient-to-b from-nature-light/10 to-nature-deep/60">
                            <Image
                                src="/assets/founder_nature.png"
                                alt="Founder Prakruthi Umamahesh"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Founder Name & Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="text-center md:text-right mt-6 mr-4"
                    >
                        <span className="block text-nature-light tracking-[0.2em] text-sm uppercase font-semibold mb-1">
                            Founder
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-nature-text flex items-center gap-2 justify-center md:justify-end whitespace-nowrap">
                            <span className="w-8 h-[1px] bg-nature-light/50 inline-block md:hidden"></span>
                            Prakruthi Uma Mahesh
                            <span className="w-8 h-[1px] bg-nature-light/50 inline-block"></span>
                        </h3>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <a href="#about" className="animate-bounce inline-block text-nature-light hover:text-white transition-colors">
                    <span className="sr-only">Scroll Down</span>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </a>
            </motion.div>
        </section>
    );
}
