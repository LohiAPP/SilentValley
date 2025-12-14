"use client";

import Image from "next/image";
import { Coffee, Home, Users, Flower, Map } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function FacilitiesSection() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

    const upcoming = [
        {
            icon: Coffee,
            title: "Natural Dining Hall",
            desc: "Eco-friendly bamboo structure with pure, sattvic dining.",
            image: "/assets/bamboo_dining_hall.png"
        },
        {
            icon: Home,
            title: "Eco-Friendly Rooms",
            desc: "Individual rooms designed for peaceful, silent stay.",
            image: "/assets/eco_friendly_rooms.jpg"
        },
        {
            icon: Users,
            title: "Bamboo Conference Hall",
            desc: "For meditation sessions, retreats, and spiritual workshops.",
            image: "/assets/bamboo_conference_hall.jpg"
        },
        {
            icon: Flower,
            title: "Herbal Garden",
            desc: "A healing garden with aromatic medicinal plants.",
            image: "/assets/herbal_garden.jpg"
        },
        {
            icon: Map,
            title: "Nature Trail Path",
            desc: "A walking path designed for meditation in the midst of nature.",
            image: "/assets/nature_trail_path.png"
        },
    ];

    return (
        <section id="facilities" ref={targetRef} className="bg-nature-dark relative">

            {/* Mobile Layout: Horizontal Snap Scroll */}
            <div className="block md:hidden py-12">
                <div className="container mx-auto px-6 mb-8">
                    <h3 className="text-3xl font-serif text-nature-text mb-2">Upcoming Facilities</h3>
                    <p className="text-nature-light text-sm uppercase tracking-widest">Swipe to explore</p>
                </div>

                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 scrollbar-hide">
                    {upcoming.map((facility, index) => (
                        <div
                            key={index}
                            className="snap-center shrink-0 w-[85vw] h-[400px] relative rounded-2xl overflow-hidden shadow-lg border border-nature-light/10"
                        >
                            <Image
                                src={facility.image}
                                alt={facility.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-nature-dark via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <div className="w-10 h-10 bg-nature-light/20 backdrop-blur-md rounded-full flex items-center justify-center mb-3 border border-nature-light/30">
                                    <facility.icon className="text-nature-accent w-5 h-5" />
                                </div>
                                <h4 className="text-xl font-bold text-nature-text mb-2">{facility.title}</h4>
                                <p className="text-nature-text/90 text-sm leading-relaxed">{facility.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop Layout: Immersive Sticky Scroll */}
            <div className="hidden md:block relative h-[225vh]">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

                    {/* Floating Title anchored in background */}
                    <div className="absolute top-10 left-6 md:left-20 z-0 hidden md:block">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="text-4xl md:text-6xl font-serif text-nature-light/20 font-bold uppercase tracking-widest"
                        >
                            Upcoming
                        </motion.h3>
                        <motion.h3
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-serif text-nature-light/20 font-bold uppercase tracking-widest ml-12"
                        >
                            Facilities
                        </motion.h3>
                    </div>

                    <div className="container mx-auto px-6 mb-8 relative z-20 md:pl-20">
                        <h3 className="text-3xl md:text-4xl font-serif text-nature-text mb-2">
                            Expanding Our Vision
                        </h3>
                        {/* <p className="text-nature-light font-sans text-sm uppercase tracking-widest">
                                Scroll down to explore
                            </p> */}
                    </div>

                    {/* Horizontal Scroll Track */}
                    <div className="flex h-full items-center">
                        <motion.div style={{ x }} className="flex gap-8 pl-6 md:pl-20">
                            {upcoming.map((facility, index) => (
                                <div
                                    key={index}
                                    className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl border border-nature-light/10 bg-nature-deep"
                                >
                                    {/* Background Image */}
                                    <Image
                                        src={facility.image}
                                        alt={facility.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-nature-dark via-nature-dark/50 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="w-14 h-14 bg-nature-light/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-nature-light/30">
                                            <facility.icon className="text-nature-accent w-7 h-7" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-nature-text mb-3 leading-tight">{facility.title}</h4>
                                        <p className="text-nature-text/80 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {facility.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

