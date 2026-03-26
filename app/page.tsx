import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import TrustSection from "@/components/TrustSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: '#000', overflowX: 'hidden' }}>
      {/* Grain removed — now only applied inside hero photo area */}
      <Navbar />
      <Hero />
      <TrustSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
