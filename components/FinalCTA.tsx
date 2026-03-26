"use client";
import { useEffect, useRef } from "react";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        // Stats banner
        gsap.set(".stats-banner", { opacity: 0, y: 40, scale: 0.98 });
        gsap.to(".stats-banner", {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: ".stats-banner", start: "top 85%", once: true },
        });

        // CTA content children
        const els = wrapperRef.current?.querySelectorAll(".cta-content > *");
        if (els) {
          gsap.set(els, { opacity: 0, y: 32 });
          gsap.to(els, {
            opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: "framerEase",
            scrollTrigger: { trigger: wrapperRef.current, start: "top 85%", once: true },
          });
        }

        // Parallax on grid background
        gsap.to(".cta-grid-bg", {
          backgroundPosition: "0px -40px",
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
    <section
      ref={sectionRef}
      id="contato"
      style={{
        background: "#000",
        paddingTop: "120px",
        paddingBottom: "120px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="section-container">
        {/* Stats banner */}
        <div className="stats-banner" style={{
          textAlign: "center",
          marginBottom: "64px",
          padding: "56px 32px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1a1a1a",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Inner glow */}
          <div style={{
            position: "absolute",
            top: "-50%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(97,174,250,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <p style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 300,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            lineHeight: 1.35,
            letterSpacing: "-0.03em",
            color: "rgba(184,184,184,0.9)",
            maxWidth: "640px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}>
            Empresas que implementam IA estão obtendo um retorno médio de{" "}
            <span style={{ color: "#61aefa", fontWeight: 400 }}>3,7x</span>
            {" "}para cada $1 investido.
          </p>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            color: "rgba(117,117,117,0.9)",
            marginTop: "20px",
            position: "relative",
            zIndex: 1,
          }}>
            Nascemos para colocar sua empresa nesse grupo. <span style={{ color: "#61aefa" }}>Comece agora &rarr;</span>
          </p>
        </div>

        {/* Main CTA */}
        <div
          ref={wrapperRef}
          className="cta-perspective"
          style={{
            border: "1px solid #1a1a1a",
            borderRadius: "24px",
            padding: "96px 48px",
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(97,174,250,0.06) 0%, transparent 70%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background grid */}
          <div
            className="cta-grid-bg"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              borderRadius: "24px",
            }}
          />

          <div
            className="cta-content"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
              textAlign: "center",
            }}
          >
            <h2 style={{
              fontFamily: "Geist, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#fff",
              maxWidth: "640px",
            }}>
              Você perdeu a internet.<br />Você perdeu o mobile.<br />
              <span style={{ color: "#61aefa" }}>Não perca a IA.</span>
            </h2>

            <p className="body-m" style={{ maxWidth: "480px" }}>
              Comece agora a transformar sua empresa com inteligência artificial.
            </p>

            <a href="#contato" style={{
              background: "#fff",
              color: "#000",
              borderRadius: "62px",
              padding: "16px 36px",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              marginTop: "8px",
            }}>
              Comece agora
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
