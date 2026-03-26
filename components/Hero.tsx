"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);

  // Generate grain texture on canvas
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;
    canvas.width = 512;
    canvas.height = 512;
    const imageData = ctx2d.createImageData(512, 512);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx2d.putImageData(imageData, 0, 0);
  }, []);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");
      CustomEase.create("framerScale", "0.12, 0.23, 0.5, 1");

      ctx = gsap.context(() => {
        // Set initial hidden state
        gsap.set([".hero-h1", ".hero-sub", ".hero-cta"], { opacity: 0, y: 24 });
        gsap.set(".hero-img-wrap", { opacity: 0, scale: 1.05 });

        // Stagger reveal
        gsap.to(".hero-h1", { opacity: 1, y: 0, duration: 1.5, ease: "framerEase", delay: 0.15 });
        gsap.to(".hero-cta", { opacity: 1, y: 0, duration: 1.5, ease: "framerEase", delay: 0.35 });
        gsap.to(".hero-sub", { opacity: 1, y: 0, duration: 1.5, ease: "framerEase", delay: 0.55 });
        gsap.to(".hero-img-wrap", { opacity: 1, scale: 1, duration: 2, ease: "framerScale", delay: 0 });

        // Floating glow animation
        gsap.to(".hero-glow-orb", {
          y: -20, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true,
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        background: "#000",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Atmospheric image */}
      <div
        className="hero-img-wrap"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "65%",
          height: "100%",
        }}
      >
        <Image
          src="https://framerusercontent.com/images/YiSZBoFuDbDBmZ3kiLxAO6ApU0.jpg"
          alt="Vortex Consulting"
          fill
          style={{ objectFit: "cover", objectPosition: "60% 20%" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #000 0%, #000 5%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, #000 100%)" }} />
        {/* Film grain overlay — only on the photo area */}
        <canvas
          ref={grainRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
            opacity: 0.14,
            mixBlendMode: "overlay",
          }}
        />
      </div>

      {/* Floating glow orb */}
      <div className="hero-glow-orb" style={{
        position: "absolute",
        top: "15%",
        left: "30%",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(97,174,250,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(60px)",
      }} />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "0 24px",
          maxWidth: "920px",
          marginLeft: "max(24px, calc((100vw - 1200px) / 2))",
        }}
      >
        {/* Top spacer to push H1+CTA to center */}
        <div style={{ flex: 1 }} />

        {/* H1 + CTA group — vertically centered */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* H1 */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: "Geist, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(36px, 4.5vw, 62px)",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
          >
            Construímos com IA e<br />ensinamos você também
          </h1>

          {/* CTA */}
          <div className="hero-cta" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="#consultoria"
              className="btn-glass"
              style={{ padding: "14px 28px", fontSize: "15px", background: "#fff", color: "#000", borderRadius: "62px" }}
            >
              Comece agora
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#consultoria-detail"
              className="btn-glass"
              style={{ padding: "14px 28px", fontSize: "15px" }}
            >
              Ver Consultoria
            </a>
          </div>
        </div>

        {/* Bottom spacer — slightly less than top to push content a bit above true center */}
        <div style={{ flex: 1.2 }} />

        {/* Subtitle — pinned near bottom */}
        <div
          className="hero-sub"
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: 1.6,
            letterSpacing: "-0.02em",
            maxWidth: "520px",
            paddingBottom: "48px",
          }}
        >
          <span style={{ color: "#fff" }}>
            Da estratégia à execução, trabalhamos ao seu lado para transformar inteligência artificial em resultado real.
          </span>
          <br />
          <span style={{ color: "rgba(184,184,184,0.9)" }}>
            Seja construindo com nosso time, aprendendo a construir por conta própria ou usando as ferramentas que desenvolvemos para levar IA do papel ao mercado.
          </span>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(97,174,250,0.3) 50%, transparent 100%)",
      }} />
    </section>
  );
}
