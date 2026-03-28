import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

import TrustSection from "@/components/TrustSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import ProjectCalculator from "@/components/ProjectCalculator";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: '#000', overflowX: 'clip' }}>
      {/* Grain removed — now only applied inside hero photo area */}
      <Navbar />
      <Hero />
      <TrustSection />
      <Features />
      <HowItWorks />
      <Benefits />
      <ProjectCalculator />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
