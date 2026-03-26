"use client";
import { useEffect, useRef } from "react";

export default function Benefits() {
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
        gsap.set([".about-badge", ".about-title", ".about-body"], { opacity: 0, y: 24 });
        gsap.set(".about-highlight", { opacity: 0, scale: 0.95 });

        gsap.to(".about-badge", {
          opacity: 1, y: 0, duration: 0.8, ease: "framerEase",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
        gsap.to(".about-title", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase", delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
        gsap.to(".about-body", {
          opacity: 1, y: 0, duration: 1, ease: "framerEase", delay: 0.25,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
        gsap.to(".about-highlight", {
          opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: "framerEase", delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });

        // Subtle parallax on the glow
        gsap.to(".about-glow", {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: "#080808",
      padding: "120px 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative glow */}
      <div className="about-glow" style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(153, 153, 153, 0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top border gradient */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, #222 30%, #222 70%, transparent 100%)",
      }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
          alignItems: "center",
        }}>
          <span className="about-badge" style={{
            fontFamily: "Geist Mono, monospace",
            fontSize: "12px",
            color: "rgba(153,153,153,0.6)",
            letterSpacing: "0.06em",
          }}>
            QUEM SOMOS
          </span>

          <h2 className="about-title" style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(28px, 3.5vw, 40px)",
            lineHeight: 1.15,
            letterSpacing: "-0.04em",
            color: "#fff",
            maxWidth: "640px",
          }}>
            De quem constrói para quem constrói
          </h2>

          <p className="about-body" style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            lineHeight: 1.7,
            color: "rgba(184,184,184,0.9)",
            letterSpacing: "-0.01em",
            maxWidth: "600px",
          }}>
            Somos empreendedores e builders ativos, não consultores de PowerPoint. Vivemos os mesmos desafios que nossos clientes enfrentam ao implementar IA em empresas reais. Nossa fundadora tem passagem pelo Forbes Under 30, fundou uma empresa criativa e foi adquirida por um grupo global de tecnologia.
          </p>

          {/* Highlight chips */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
            {["Forbes Under 30", "Exit para grupo global", "Builders ativos"].map((h, i) => (
              <span key={i} className="about-highlight" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid #222",
                borderRadius: "62px",
                padding: "10px 20px",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: "rgba(184,184,184,0.8)",
                letterSpacing: "-0.01em",
              }}>
                <span style={{ color: "#999999" }}>&#10003;</span>
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
