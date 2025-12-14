"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    // Handle Navbar Background on Scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manual Scroll Spy Logic
    useEffect(() => {
        const handleScrollSpy = () => {
            // Special priority check for Contact/Footer
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                // If 150px of the footer is visible OR we are at the very bottom
                if (rect.top < window.innerHeight - 150 || (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
                    setActiveSection("contact");
                    return;
                }
            }

            const sections = document.querySelectorAll("section[id], footer[id='contact']");
            let current = "";
            const scrollMid = window.scrollY + window.innerHeight / 2;

            // Strategy: Find the section that contains the viewport center
            // If none (gap), find the closest one.

            let minDistance = Infinity;
            let closestSection = "";

            sections.forEach((section) => {
                const el = section as HTMLElement;
                const top = el.offsetTop;
                const height = el.offsetHeight;
                const bottom = top + height;

                // Priority 1: Contains Center
                if (top <= scrollMid && bottom > scrollMid) {
                    current = el.getAttribute("id") || "";
                }

                // Priority 2: Track closest distance (fallback)
                const center = top + height / 2;
                const dist = Math.abs(center - scrollMid);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestSection = el.getAttribute("id") || "";
                }
            });

            // Use containment match, or fallback to closest
            setActiveSection(current || closestSection);
        };

        window.addEventListener("scroll", handleScrollSpy);

        // Initial check
        handleScrollSpy();

        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "My Guru", href: "#guru" },
        { name: "Vision", href: "#about" },
        { name: "Attractions", href: "#attractions" },
        { name: "Programs", href: "#programs" },
        { name: "Facilities", href: "#facilities" },
        { name: "Gallery", href: "#gallery" },
        { name: "Donate", href: "#donate" },
        { name: "Contact Us", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-nature-deep/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-nature-light/30 group-hover:border-nature-light transition-colors duration-500">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/silent valley logo.png"
                            alt="Silent Valley Logo"
                            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <span className="text-xl font-serif font-bold text-nature-text tracking-widest group-hover:text-nature-light transition-colors">SILENT VALLEY</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center p-1 rounded-full bg-black/20 border border-white/5 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 ${isActive ? "text-nature-deep" : "text-nature-text/70 hover:text-nature-text"
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-nature-light rounded-full -z-10 shadow-[0_0_20px_rgba(132,169,140,0.4)]"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:block ml-4">
                    <Link
                        href="#donate"
                        className="px-8 py-2.5 bg-nature-text text-nature-deep font-bold text-xs uppercase tracking-[0.1em] rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-nature-light/30 border border-transparent hover:border-nature-light/50"
                    >
                        Support Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-nature-text p-2 hover:bg-white/5 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-nature-deep/95 backdrop-blur-xl border-b border-white/10 md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-8 space-y-6 items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-lg font-medium tracking-widest uppercase ${activeSection === link.href.substring(1) ? "text-nature-light" : "text-nature-text/80"}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="#donate"
                                className="w-full text-center px-6 py-4 bg-nature-light text-nature-deep font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Support Us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
