import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito de IA — Vortex Consulting",
  description:
    "Responda em 2 minutos. Em até 24h você recebe um diagnóstico com os pontos da sua operação onde IA gera retorno primeiro — priorizados por ROI e viabilidade.",
  robots: { index: false, follow: false }, // landing de ads, fora do índice orgânico
  openGraph: {
    title: "Diagnóstico Gratuito de IA — Vortex Consulting",
    description:
      "Em até 24h, um diagnóstico com os pontos da sua operação onde IA gera retorno primeiro.",
  },
};

// Configurar depois: definir NEXT_PUBLIC_FB_PIXEL_ID no .env.local
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function DiagnosticoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#0B0B0B", minHeight: "100vh", color: "#fff" }}>
      {/* Meta Pixel base — só carrega se o ID estiver configurado */}
      {PIXEL_ID && (
        <>
          <Script id="fb-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');`}
          </Script>
          <noscript>
            <img
              height="1" width="1" style={{ display: "none" }} alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* Topo: somente o logo /// Vortex, sem navegação */}
      <header style={{ padding: "26px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <svg width="24" height="17" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 1L2 15" stroke="#FF8C3A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M11 1L7 15" stroke="#FF6A1A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M16 1L12 15" stroke="rgba(255,140,58,0.4)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span style={{
            fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 18,
            letterSpacing: "-0.03em", color: "#fff",
          }}>
            Vortex
          </span>
        </div>
      </header>

      {children}
    </div>
  );
}
