import Grain from "@/components/Grain";
import Navbar from "@/components/Navbar";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Waitlist — Optimus",
  description: "Entre na lista de espera e seja um dos primeiros a operar com agentes autônomos de IA na plataforma Optimus.",
};

export default function WaitlistPage() {
  return (
    <main style={{ background: "#000", overflowX: "hidden" }}>
      <Grain />
      <Navbar />
      <Waitlist />
      <Footer />
    </main>
  );
}
