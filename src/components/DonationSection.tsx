"use client";

import { Copy, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DonationSection() {
    const [copied, setCopied] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="donate" className="py-24 bg-nature-deep relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: 'radial-gradient(#84a98c 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Call to Action */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Title Block matching Guru Style */}
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-tight">
                                Support Us
                            </h2>
                            <div className="w-24 h-1 bg-nature-accent/60 rounded-full" />
                        </div>

                        {/* Content matching Guru/Vision Typography */}
                        <div className="space-y-6 text-nature-text/80 text-lg leading-relaxed font-light tracking-wide">
                            <p>
                                The construction of <span className="text-green-300 font-serif">Silent Valley</span>... the Pyramid... the dining hall... everything grows with your love and your support.
                            </p>
                            <p className="border-l-4 border-nature-accent/40 pl-6 italic text-nature-light py-2">
                                &quot;Your donation becomes a light that brings peace into someone&apos;s life.&quot;
                            </p>
                        </div>
                    </div>

                    {/* Bank Details Card */}
                    <div className="lg:col-span-7 bg-gradient-to-br from-nature-dark to-nature-deep border border-nature-light/20 p-8 md:p-12 rounded-3xl shadow-2xl">
                        <h3 className="text-2xl font-serif text-nature-text mb-8 border-b border-nature-light/10 pb-4">
                            Trust Details
                        </h3>

                        <div className="flex flex-col xl:flex-row gap-10 items-start">
                            {/* Text Details */}
                            <div className="space-y-6 flex-1 w-full">
                                <div>
                                    <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">Account Name</span>
                                    <p className="text-xl md:text-2xl font-bold text-nature-text">Prakruthi Wisdom Foundation Global</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">Bank</span>
                                        <p className="text-lg text-nature-text">Indian Bank</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">Branch</span>
                                        <p className="text-lg text-nature-text">Ameerpet – Begumpet</p>
                                    </div>
                                </div>

                                <div className="bg-nature-light/10 p-4 rounded-xl flex items-center justify-between group cursor-pointer"
                                    onClick={() => handleCopy("7668576213")}>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">Account Number</span>
                                        <p className="text-xl font-mono text-nature-accent">7668576213</p>
                                    </div>
                                    <Copy className={`text-nature-light opacity-50 group-hover:opacity-100 transition-opacity ${copied ? 'text-green-400' : ''}`} size={20} />
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">IFSC Code</span>
                                        <p className="font-mono text-lg text-nature-text">IDIB000B057</p>
                                    </div>
                                    <div>
                                        <span className="block text-xs uppercase tracking-wider text-nature-light mb-1">PhonePe / GPay</span>
                                        <p className="font-mono text-lg text-nature-text">+91 9502001495</p>
                                    </div>
                                </div>
                            </div>

                            {/* QR Code Scanner Thumbnail */}
                            <div
                                className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 mx-auto xl:mx-0 cursor-zoom-in group"
                                onClick={() => setIsScannerOpen(true)}
                            >
                                <div className="relative w-48 h-64 md:w-56 md:h-72">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/assets/payment-qr.jpg"
                                        alt="Scan to Pay - Prakruthi Wisdom Foundation"
                                        className="w-full h-full object-contain"
                                    />
                                    {/* Zoom Overlay Hint */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                                        <span className="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">Click to Zoom</span>
                                    </div>
                                </div>
                                <span className="mt-2 text-nature-deep font-bold text-sm tracking-wider">SCAN TO DONATE</span>
                            </div>
                        </div>

                        {copied && <p className="text-center text-green-400 text-sm mt-6">Copied to clipboard!</p>}
                    </div>

                </div>
            </div>

            {/* Full Screen Scanner Modal */}
            <AnimatePresence>
                {isScannerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsScannerOpen(false)}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white p-4 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsScannerOpen(false)}
                                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X size={24} />
                            </button>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/assets/payment-qr.jpg"
                                alt="Payment QR Code Full Size"
                                className="w-full h-auto object-contain rounded-xl"
                            />
                            <p className="text-center mt-4 font-bold text-nature-deep text-xl">Scan to Pay</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
