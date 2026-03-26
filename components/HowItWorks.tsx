"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    number: "01",
    title: "Diagnóstico",
    icon: "",
    description:
      "Examinamos seus processos em profundidade para localizar onde a IA pode gerar retorno concreto. Priorizamos iniciativas por potencial de ROI e viabilidade de execução, entregando um roadmap claro que elimina achismos e transforma incerteza em decisão estratégica.",
    color: "#61aefa",
  },
  {
    number: "02",
    title: "Automação",
    icon: "",
    description:
      "Transformamos oportunidades em sistemas funcionando dentro da sua operação. Eliminamos tarefas repetitivas, liberamos sua equipe para o que realmente importa e viabilizamos crescimento de receita sem expansão proporcional de headcount.",
    color: "#a78bfa",
  },
  {
    number: "03",
    title: "Inovação",
    icon: "",
    description:
      "Desenvolvemos soluções exclusivas com IA que se tornam vantagem competitiva real, difíceis de replicar e impossíveis de ignorar. Saímos do lugar-comum e posicionamos sua empresa como referência no setor.",
    color: "#22c55e",
  },
];

const EDUCATION_COURSES = [
  {
    badge: "Vibe Coding Pro",
    icon: "",
    description:
      "Descubra os atalhos e estratégias para extrair o máximo dos seus projetos de vibe coding, sem precisar virar desenvolvedor. Sem jargões, sem teoria pesada. Só o essencial para você construir aplicações com segurança e levá-las à produção com confiança.",
    features: ["Sem pré-requisitos técnicos", "Do zero à produção", "Projetos práticos"],
  },
  {
    badge: "AI Pro",
    icon: "",
    description:
      "Capacitação prática para seu time ir muito além do uso básico de ferramentas de IA. Treinamento personalizado em soluções que multiplicam a produtividade real e formam equipes autônomas, que inovam por conta própria, sem depender de consultores externos.",
    features: ["Treinamento corporativo", "Equipes autônomas", "Produtividade real"],
  },
];

export default function HowItWorks() {
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
        // Set initial hidden states
        gsap.set(".consult-header", { opacity: 0, y: 32 });
        gsap.set(".pillar-card", { opacity: 0, y: 48, scale: 0.97 });
        gsap.set(".pillar-number", { opacity: 0, x: -16 });
        gsap.set(".edu-header", { opacity: 0, y: 32 });
        gsap.set(".edu-card", { opacity: 0, y: 40 });

        // Consultoria header
        gsap.to(".consult-header", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: ".consult-header", start: "top 85%", once: true },
        });

        // Pillar cards
        gsap.to(".pillar-card", {
          opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: "framerEase",
          scrollTrigger: { trigger: ".pillars-grid", start: "top 85%", once: true },
        });

        // Pillar numbers
        gsap.to(".pillar-number", {
          opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: "framerEase",
          scrollTrigger: { trigger: ".pillars-grid", start: "top 85%", once: true },
        });

        // Education header
        gsap.to(".edu-header", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: ".edu-header", start: "top 85%", once: true },
        });

        // Education cards
        gsap.to(".edu-card", {
          opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "framerEase",
          scrollTrigger: { trigger: ".edu-grid", start: "top 85%", once: true },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "120px 0", position: "relative" }}>
      {/* Section background decoration */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "0",
        width: "100%",
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(97,174,250,0.15) 50%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div className="section-container">

        {/* ── Consultoria Section ── */}
        <div id="consultoria-detail" style={{ marginBottom: "160px" }}>
          {/* Header */}
          <div className="consult-header" style={{ marginBottom: "64px" }}>
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}></span>
              <span style={{
                fontFamily: "Geist Mono, monospace",
                fontSize: "12px",
                color: "rgba(97,174,250,0.6)",
                letterSpacing: "0.06em",
              }}>
                PÁGINA DE CONSULTORIA
              </span>
            </div>

            <h2 className="h2-section" style={{ marginBottom: "20px", maxWidth: "700px" }}>
              Sua estratégia de IA merece sair do papel e entrar em produção.
            </h2>

            <p className="body-m" style={{ maxWidth: "640px" }}>
              Antes de construir para você, construímos para nós. Mergulhamos fundo nos seus processos, identificamos onde a IA gera valor real e entregamos soluções funcionais para posicionar sua empresa na vanguarda da inteligência artificial.
            </p>
          </div>

          {/* Subheading */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}>
            <div style={{
              height: "1px",
              width: "40px",
              background: "linear-gradient(90deg, #61aefa, transparent)",
              flexShrink: 0,
            }} />
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "rgba(117,117,117,0.9)",
              letterSpacing: "-0.01em",
            }}>
              Como podemos ajudar. Três pilares para transformar sua empresa com inteligência artificial
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="card-feature pillar-card"
                style={{
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top glow */}
                <div style={{
                  position: "absolute",
                  top: "-30px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "200px",
                  height: "100px",
                  background: `radial-gradient(ellipse, ${pillar.color}10 0%, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Number + Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="pillar-number" style={{
                    fontFamily: "Geist Mono, monospace",
                    fontWeight: 400,
                    fontSize: "48px",
                    color: `${pillar.color}25`,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}>
                    {pillar.number}
                  </span>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    background: `${pillar.color}12`,
                    border: `1px solid ${pillar.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}>
                    {pillar.icon}
                  </div>
                </div>

                <div>
                  <h4 style={{
                    fontFamily: "Geist, sans-serif",
                    fontWeight: 300,
                    fontSize: "22px",
                    color: "#fff",
                    letterSpacing: "-0.03em",
                    marginBottom: "12px",
                  }}>
                    {pillar.title}
                  </h4>
                  <p className="body-s" style={{ lineHeight: 1.6 }}>{pillar.description}</p>
                </div>

                {/* Bottom accent line */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "10%",
                  right: "10%",
                  height: "1px",
                  background: `linear-gradient(90deg, transparent 0%, ${pillar.color}30 50%, transparent 100%)`,
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Education Section ── */}
        <div id="educacao-detail">
          <div className="edu-header" style={{ marginBottom: "48px" }}>
            <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}></span>
              <span style={{
                fontFamily: "Geist Mono, monospace",
                fontSize: "12px",
                color: "rgba(97,174,250,0.6)",
                letterSpacing: "0.06em",
              }}>
                PÁGINA DE EDUCAÇÃO
              </span>
            </div>

            <h2 className="h2-section" style={{ maxWidth: "700px" }}>
              Pare de usar IA por tentativa e erro. Aprenda a dominar como quem constrói com ela todo dia.
            </h2>
          </div>

          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {EDUCATION_COURSES.map((course, idx) => (
              <div
                key={idx}
                className="card-feature edu-card"
                style={{
                  padding: "36px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "200px",
                  height: "200px",
                  background: "radial-gradient(ellipse, rgba(97,174,250,0.04) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{course.icon}</span>
                  <span style={{
                    background: "rgba(97,174,250,0.08)",
                    border: "1px solid rgba(97,174,250,0.2)",
                    borderRadius: "62px",
                    padding: "6px 16px",
                    fontSize: "13px",
                    fontFamily: "Geist Mono, monospace",
                    color: "rgba(97,174,250,0.8)",
                    letterSpacing: "0.04em",
                  }}>
                    {course.badge}
                  </span>
                </div>

                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "rgba(184,184,184,0.9)",
                  letterSpacing: "-0.01em",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {course.description}
                </p>

                {/* Feature chips */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {course.features.map((f, i) => (
                    <span key={i} style={{
                      fontFamily: "Geist Mono, monospace",
                      fontSize: "10px",
                      color: "rgba(97,174,250,0.6)",
                      background: "rgba(97,174,250,0.06)",
                      border: "1px solid rgba(97,174,250,0.12)",
                      borderRadius: "4px",
                      padding: "4px 10px",
                    }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
