"use client";
import { useEffect, useRef } from "react";

const PILLARS = [
  {
    number: "01",
    title: "Diagnóstico",
    icon: "",
    description:
      "Examinamos seus processos em profundidade para localizar onde a IA pode gerar retorno concreto. Priorizamos iniciativas por potencial de ROI e viabilidade de execução, entregando um roadmap claro que elimina achismos e transforma incerteza em decisão estratégica.",
    color: "#999999",
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
        background: "linear-gradient(90deg, transparent 0%, rgba(153, 153, 153, 0.15) 50%, transparent 100%)",
        pointerEvents: "none",
      }} />

      <div className="section-container">

        {/* ── Consultoria Section ── */}
        <div id="consultoria-detail" className="consult-layout" style={{ marginBottom: "160px" }}>

          {/* LEFT — Title + CTA */}
          <div className="consult-header consult-left">
            <h2 className="h2-section" style={{ marginBottom: "20px", maxWidth: "420px" }}>
              Processo simples,{" "}
              <span style={{ color: "rgba(153,153,153,0.5)" }}>
                resultados poderosos.
              </span>
            </h2>

            <p className="body-m" style={{ maxWidth: "380px", marginBottom: "32px" }}>
              Mergulhamos fundo nos seus processos, identificamos onde a IA gera valor real e entregamos soluções que posicionam sua empresa na vanguarda.
            </p>

            <a href="#contato" className="btn-glass" style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              Comece agora
            </a>
          </div>

          {/* RIGHT — Stacking cards on scroll */}
          <div className="consult-right">
            {PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="pillar-card-sticky"
                style={{
                  position: "sticky" as const,
                  top: `calc(20vh + ${idx * 10}px)`,
                  zIndex: idx + 1,
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  padding: "40px 36px",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "24px",
                  alignItems: "start",
                }}
              >
                {/* Large decorative number */}
                <span style={{
                  fontFamily: "Geist, sans-serif",
                  fontWeight: 700,
                  fontSize: "120px",
                  lineHeight: 0.85,
                  color: "rgba(255,255,255,0.06)",
                  letterSpacing: "-0.06em",
                  userSelect: "none",
                  pointerEvents: "none",
                }}>
                  {pillar.number}
                </span>

                {/* Content */}
                <div style={{ paddingTop: "4px" }}>
                  <h4 style={{
                    fontFamily: "Geist, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    marginBottom: "14px",
                  }}>
                    {pillar.title}
                  </h4>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(153,153,153,0.85)",
                    letterSpacing: "-0.01em",
                  }}>
                    {pillar.description}
                  </p>
                </div>
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
                color: "rgba(153,153,153,0.6)",
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
                  background: "radial-gradient(ellipse, rgba(153, 153, 153, 0.04) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{course.icon}</span>
                  <span style={{
                    background: "rgba(153, 153, 153, 0.08)",
                    border: "1px solid rgba(153, 153, 153, 0.2)",
                    borderRadius: "62px",
                    padding: "6px 16px",
                    fontSize: "13px",
                    fontFamily: "Geist Mono, monospace",
                    color: "rgba(153, 153, 153, 0.8)",
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
                      color: "rgba(153,153,153,0.6)",
                      background: "rgba(153, 153, 153, 0.06)",
                      border: "1px solid rgba(153,153,153,0.12)",
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
        .consult-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 60px;
          align-items: start;
        }

        .consult-left {
          position: sticky;
          top: 25vh;
        }

        .consult-right {
          display: block;
        }

        .pillar-card-sticky {
          margin-bottom: 3vh;
        }

        .pillar-card-sticky:last-child {
          margin-bottom: 3vh;
        }

        @media (max-width: 809px) {
          .consult-layout {
            grid-template-columns: 1fr !important;
            gap: 40px;
          }
          .consult-left {
            position: static !important;
          }
          .pillar-card-sticky {
            position: static !important;
            margin-bottom: 20px !important;
          }
          .edu-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
