import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { GuruSection } from "@/components/GuruSection";
import { AttractionsSection } from "@/components/AttractionsSection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { FacilitiesSection } from "@/components/FacilitiesSection";
import { DonationSection } from "@/components/DonationSection";
import { GallerySection } from "@/components/GallerySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-nature-dark text-nature-text font-sans selection:bg-nature-light/30">
      <Navbar />
      <HeroSection />
      <GuruSection />
      <AboutSection />
      <AttractionsSection />
      <ProgramsSection />
      <FacilitiesSection />
      <GallerySection />
      <DonationSection />
      <Footer />
    </main>
  );
}
