"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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
        { name: "Home", href: "/" },
        { name: "Vision", href: "/#about" },
        { 
            name: "Events", 
            href: "/#events",
            dropdown: [
                { name: "Online Sessions", href: "/events/online" },
                { name: "Offline Retreats", href: "/events/offline" }
            ]
        },
        { name: "Attractions", href: "/#attractions" },
        { name: "Facilities", href: "/#facilities" },
        { name: "Videos", href: "/videos" },
        { name: "Books", href: "/books" },
        { name: "Gallery", href: "/gallery" },
        { name: "Donate", href: "/#donate" },
        { name: "Contact Us", href: "/#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-nature-deep/90 backdrop-blur-xl border-b border-white/10 py-5 shadow-lg"
                : "bg-transparent py-8"
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
                <div className="hidden lg:flex items-center p-1 rounded-full bg-black/20 border border-white/5 backdrop-blur-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
                    {navLinks.map((link) => {
                        let isActive = false;
                        if (link.dropdown) {
                            isActive = pathname.startsWith('/events');
                            if (pathname === '/' && link.name === 'Events' && activeSection === 'events') isActive = true;
                        } else if (link.href.includes('#')) {
                            const targetId = link.href.split('#')[1];
                            isActive = pathname === '/' && activeSection === targetId;
                        } else if (link.href === '/') {
                            isActive = pathname === '/' && (activeSection === 'home' || activeSection === '');
                        } else {
                            isActive = pathname.startsWith(link.href);
                            // Highlight on home page if scrolling past their respective sections
                             if (pathname === '/' && link.name === 'Gallery' && activeSection === 'gallery') isActive = true;
                             if (pathname === '/' && link.name === 'Videos' && activeSection === 'videos') isActive = true;
                             if (pathname === '/' && link.name === 'Books' && activeSection === 'books-preview') isActive = true;
                        }
                        
                        
                        if (link.dropdown) {
                            return (
                                <div key={link.name} className="relative group">
                                    <button
                                        className={`relative px-4 xl:px-5 py-2.5 flex items-center gap-1 rounded-full text-sm uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${isActive ? "text-nature-deep" : "text-nature-text/70 hover:text-nature-text"}`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="activeSection"
                                                className="absolute inset-0 bg-nature-light rounded-full -z-10 shadow-[0_0_20px_rgba(132,169,140,0.4)]"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                        {link.name}
                                        <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                                    </button>
                                    
                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-nature-deep/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl min-w-[200px] flex flex-col overflow-hidden relative">
                                            {/* Decorative glow inside dropdown */}
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-nature-light/10 rounded-full blur-xl -z-10" />
                                            {link.dropdown.map((sublink) => (
                                                <Link
                                                    key={sublink.name}
                                                    href={sublink.href}
                                                    className="px-4 py-3 text-sm font-medium text-nature-text/90 hover:text-nature-light hover:bg-white/10 rounded-xl transition-all whitespace-nowrap flex items-center"
                                                >
                                                    {sublink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 xl:px-5 py-2.5 rounded-full text-sm uppercase tracking-wider font-bold whitespace-nowrap transition-all duration-300 ${isActive ? "text-nature-deep" : "text-nature-text/70 hover:text-nature-text"
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

                <div className="hidden lg:block ml-4">
                    <Link
                        href="/#donate"
                        className="whitespace-nowrap px-8 py-3 bg-nature-text text-nature-deep font-bold text-sm uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-nature-light/30 border border-transparent hover:border-nature-light/50"
                    >
                        Support Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-nature-text p-2 hover:bg-white/5 rounded-full transition-colors"
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
                        className="absolute top-full left-0 right-0 bg-nature-deep/95 backdrop-blur-xl border-b border-white/10 lg:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-8 space-y-6 items-center">
                            {navLinks.map((link) => {
                                if (link.dropdown) {
                                    let isDropdownActive = pathname.startsWith('/events');
                                    if (pathname === '/' && link.name === 'Events' && activeSection === 'events') isDropdownActive = true;

                                    return (
                                        <div key={link.name} className="flex flex-col items-center w-full">
                                            <button
                                                onClick={() => setExpandedMenu(expandedMenu === link.name ? null : link.name)}
                                                className={`flex items-center gap-2 text-lg font-medium tracking-widest uppercase ${isDropdownActive ? "text-nature-light" : "text-nature-text/80"}`}
                                            >
                                                {link.name}
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedMenu === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedMenu === link.name && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="flex flex-col items-center space-y-4 pt-4 overflow-hidden w-full"
                                                    >
                                                        {link.dropdown.map(sublink => (
                                                            <Link
                                                                key={sublink.name}
                                                                href={sublink.href}
                                                                className="text-base text-nature-light/70 hover:text-nature-light uppercase tracking-wider bg-white/5 w-full text-center py-3 rounded-xl"
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                            >
                                                                {sublink.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                let isActive = false;
                                if (link.href.includes('#')) {
                                    const targetId = link.href.split('#')[1];
                                    isActive = pathname === '/' && activeSection === targetId;
                                } else if (link.href === '/') {
                                    isActive = pathname === '/' && (activeSection === 'home' || activeSection === '');
                                } else {
                                    isActive = pathname.startsWith(link.href);
                                     // Highlight on home page if scrolling past their respective sections
                                     if (pathname === '/' && link.name === 'Gallery' && activeSection === 'gallery') isActive = true;
                                     if (pathname === '/' && link.name === 'Videos' && activeSection === 'videos') isActive = true;
                                     if (pathname === '/' && link.name === 'Books' && activeSection === 'books-preview') isActive = true;
                                 }

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-lg font-medium tracking-widest uppercase ${isActive ? "text-nature-light" : "text-nature-text/80"}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
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
