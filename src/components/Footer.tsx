import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
    return (
        <footer id="contact" className="bg-nature-deep py-16 border-t border-nature-light/10 text-nature-text">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6 max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-nature-light/20">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/assets/silent valley logo.png"
                                    alt="Silent Valley Logo"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <span className="text-2xl font-serif font-bold tracking-wide text-nature-light">Silent Valley</span>
                        </div>
                        <p className="text-nature-text/70 text-sm leading-relaxed">
                            A sacred space for inner peace, meditation, and self-discovery.
                            Reconnect with your inner self in the embrace of nature.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:px-8">
                        <h4 className="font-serif text-lg font-semibold text-nature-light mb-6">Quick Links</h4>
                        <div className="flex flex-col space-y-3 text-sm text-nature-text/80">
                            <Link href="#home" className="hover:text-nature-accent transition-colors w-fit">Home</Link>
                            <Link href="#about" className="hover:text-nature-accent transition-colors w-fit">Vision</Link>
                            <Link href="#attractions" className="hover:text-nature-accent transition-colors w-fit">Attractions</Link>
                            <Link href="#facilities" className="hover:text-nature-accent transition-colors w-fit">Facilities</Link>
                            <Link href="#donate" className="hover:text-nature-accent transition-colors w-fit">Support Us</Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-nature-light mb-6">Connect With Us</h4>
                        <div className="space-y-4">
                            <a
                                href="https://maps.app.goo.gl/m8JjNNRTEfPEC3pi7?g_st=awb"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 text-nature-text/80 hover:text-nature-accent transition-colors group"
                            >
                                <MapPin className="w-5 h-5 mt-0.5 text-nature-light group-hover:text-nature-accent" />
                                <span className="text-sm">
                                    Silent Valley <br />
                                    Baswayipalli, Devarakadra (Mandal),<br />
                                    Mahabubnagar (District), <br />
                                    Telangana <br />
                                    India.
                                </span>
                            </a>

                            <a
                                href="tel:+919502001495"
                                className="flex items-center gap-3 text-nature-text/80 hover:text-nature-accent transition-colors group"
                            >
                                <Phone className="w-5 h-5 text-nature-light group-hover:text-nature-accent" />
                                <span className="text-sm">+91 95020 01495</span>
                            </a>

                            <a
                                href="mailto:PrakruthiSilentVally@gmail.com"
                                className="flex items-center gap-3 text-nature-text/80 hover:text-nature-accent transition-colors group"
                            >
                                <Mail className="w-5 h-5 text-nature-light group-hover:text-nature-accent" />
                                <span className="text-sm">PrakruthiSilentVally@gmail.com</span>
                            </a>

                            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-nature-light/10">
                                <a href="#" className="p-2 bg-nature-light/5 rounded-full hover:bg-nature-light/20 transition-colors">
                                    <Instagram className="w-5 h-5 text-nature-light" />
                                </a>
                                <a
                                    href="https://www.facebook.com/UmamaheshKummari?mibextid=rS40aB7S9Ucbxw6v"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-nature-light/5 rounded-full hover:bg-nature-light/20 transition-colors"
                                >
                                    <Facebook className="w-5 h-5 text-nature-light" />
                                </a>
                                <a
                                    href="https://youtube.com/@prakruthiumamahesh?si=mQI2pwMrbCpSEaBI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-nature-light/5 rounded-full hover:bg-nature-light/20 transition-colors"
                                >
                                    <Youtube className="w-5 h-5 text-nature-light" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-nature-light/10 text-center">
                    <p className="text-nature-text/40 text-xs">
                        © {new Date().getFullYear()} Silent Valley - Prakruthi Wisdom Foundation Global. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
