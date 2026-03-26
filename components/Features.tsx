"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const SECTIONS = [
  {
    id: "consultoria",
    badge: "Consultoria",
    icon: "",
    image: "/imagem-consultoria.png",
    title: "Sua estratégia de IA merece sair do slide e entrar em operação",
    description:
      "Antes de construir para você, construímos para nós. Mergulhamos nos seus processos, localizamos onde a IA gera valor de verdade e entregamos soluções prontas para escalar o seu negócio. Sem enrolação, sem teoria. Só resultado.",
    cta: { label: "Ver Consultoria", href: "#consultoria-detail" },
    accent: "rgba(153, 153, 153, 0.08)",
    accentBorder: "rgba(153, 153, 153, 0.2)",
  },
  {
    id: "produtos",
    badge: "Produtos",
    icon: "",
    image: null,
    title: "Ferramentas que precisávamos, não encontramos. Então, criamos",
    description:
      "Desenvolvemos soluções para resolver nossos próprios desafios. Esse processo nos deu experiência prática que usamos para ensinar vibe coding e para construir aplicações reais para nossos clientes.",
    cta: null,
    accent: "rgba(162,89,255,0.06)",
    accentBorder: "rgba(162,89,255,0.15)",
  },
  {
    id: "educacao",
    badge: "Educação",
    icon: "",
    image: null,
    title: "Chega de usar IA de forma amadora. Aprenda a usar como quem realmente domina.",
    description:
      "Fique à frente do mercado aprendendo na prática com quem usa e constrói com IA todos os dias. Sem jargão, sem teoria vazia.",
    cta: { label: "Ver Educação", href: "#educacao-detail" },
    accent: "rgba(34,197,94,0.06)",
    accentBorder: "rgba(34,197,94,0.15)",
  },
];

export default function Features() {
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
        gsap.set(".feat-card", { opacity: 0, y: 48 });

        gsap.to(".feat-card", {
          opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "96px 0", position: "relative" }}>
      <div className="section-container">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {SECTIONS.map((section, idx) => (
            <div
              key={idx}
              id={section.id}
              className="card-feature feat-card"
              style={{
                padding: "48px",
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "32px",
                alignItems: "flex-start",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background glow */}
              <div style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: `radial-gradient(ellipse, ${section.accent} 0%, transparent 70%)`,
                pointerEvents: "none",
                filter: "blur(40px)",
              }} />

              {/* Icon / Image */}
              {section.image ? (
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  overflow: "hidden",
                  flexShrink: 0,
                  position: "relative",
                }}>
                  <Image
                    src={section.image}
                    alt={section.badge}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "14px",
                  background: section.accent,
                  border: `1px solid ${section.accentBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  flexShrink: 0,
                }}>
                  {section.icon}
                </div>
              )}

              {/* Content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
                <span style={{
                  background: section.accent,
                  border: `1px solid ${section.accentBorder}`,
                  borderRadius: "62px",
                  padding: "4px 14px",
                  fontSize: "12px",
                  fontFamily: "Geist Mono, monospace",
                  color: "rgba(153, 153, 153, 0.8)",
                  letterSpacing: "0.04em",
                  alignSelf: "flex-start",
                }}>
                  {section.badge}
                </span>

                <h3 style={{
                  fontFamily: "Geist, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  lineHeight: 1.2,
                  maxWidth: "580px",
                }}>
                  {section.title}
                </h3>

                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(184,184,184,0.9)",
                  letterSpacing: "-0.01em",
                  maxWidth: "560px",
                }}>
                  {section.description}
                </p>

                {section.cta && (
                  <a
                    href={section.cta.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#999999",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "4px",
                      transition: "gap 0.3s ease",
                    }}
                  >
                    <span>&rarr;</span> {section.cta.label}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          .feat-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
