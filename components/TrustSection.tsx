"use client";
import { useEffect, useRef } from "react";

const SERVICES = [
  "Mapeamento de oportunidades",
  "Integração com sistemas existentes",
  "Automação de processos críticos",
  "Enriquecimento e estruturação de dados",
  "Capacitação de equipes",
  "E muito além disso",
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        gsap.set(".trust-headline", { opacity: 0, y: 32 });
        gsap.set(".service-chip", { opacity: 0, y: 24, scale: 0.95 });
        gsap.set(".trust-glow", { opacity: 0 });

        gsap.to(".trust-headline", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
        gsap.to(".service-chip", {
          opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: "framerEase",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });
        gsap.to(".trust-glow", {
          opacity: 1, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#fff", padding: "200px 0", position: "relative", overflow: "hidden" }}>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Headline */}
        <h2
          className="trust-headline"
          style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 300,
            fontSize: "40px",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "#111",
            textAlign: "center",
            marginBottom: "56px",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          A revolução da IA não espera por quem ainda está assistindo
        </h2>

        {/* Services as chips / pills */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {SERVICES.map((service, idx) => (
            <span
              key={idx}
              className="service-chip"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 24px",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: "62px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(60,60,60,0.9)",
                letterSpacing: "-0.01em",
                transition: "all 0.4s cubic-bezier(0.12, 0.23, 0.28, 0.97)",
                cursor: "default",
              }}
            >
              <span style={{ color: "#333", fontSize: "14px" }}>&#10003;</span>
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
