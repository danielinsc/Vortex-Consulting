"use client";
import { useState, useEffect, useRef } from "react";

const FAQS = [
  {
    q: "O que diferencia vocês de outras consultorias de IA?",
    a: "A diferença está na prática. Enquanto a maioria entrega decks com recomendações, nós entregamos soluções que funcionam. Construímos produtos reais, enfrentamos obstáculos reais e chegamos a respostas reais, porque já percorremos esse caminho antes de você.",
  },
  {
    q: "Que tipo de empresa mais se beneficia?",
    a: "Empresas de serviços profissionais com até 500 colaboradores que querem crescer em receita sem crescer proporcionalmente em equipe. O perfil ideal é o de organizações com processos intensivos em conhecimento, que lidam com documentos e dados, e que buscam produtividade estrutural, não ajustes superficiais. Funciona especialmente bem para lideranças que apostam em times mais capacitados, não em times maiores.",
  },
  {
    q: "Qual o investimento e como calcular o retorno?",
    a: "O investimento é calibrado conforme o escopo de cada projeto, mas nossas implementações costumam se pagar em até 6 meses por meio de economia operacional e ganhos de produtividade. Sempre iniciamos com um diagnóstico para mapear o potencial de retorno antes de qualquer comprometimento maior.",
  },
  {
    q: "Quanto tempo minha equipe precisará dedicar?",
    a: "Indicamos um sponsor interno como ponto de contato único, o que evita dispersão. Esse profissional dedicará de 2 a 4 horas semanais para alinhamentos e validações durante a implementação. A execução é responsabilidade nossa, não da sua operação.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
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
        gsap.set(".faq-title", { opacity: 0, y: 32 });
        gsap.set(".faq-item", { opacity: 0, y: 24 });

        gsap.to(".faq-title", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
        gsap.to(".faq-item", {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "framerEase",
          scrollTrigger: { trigger: ".faq-list", start: "top 85%", once: true },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "120px 0", position: "relative" }}>
      {/* Top border */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent 0%, #222 30%, #222 70%, transparent 100%)",
      }} />

      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 className="faq-title h2-section">
            Perguntas frequentes sobre Consultoria
          </h2>
        </div>

        <div className="faq-list" style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="faq-item"
                style={{ borderBottom: "1px solid #1a1a1a" }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "28px 0",
                    gap: "16px",
                    textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "Geist, sans-serif",
                    fontWeight: 300,
                    fontSize: "18px",
                    color: isOpen ? "#fff" : "rgba(184,184,184,0.9)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                  }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isOpen ? "rgba(97,174,250,0.1)" : "rgba(255,255,255,0.06)",
                      border: isOpen ? "1px solid rgba(97,174,250,0.3)" : "1px solid #222",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "none",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2V10M2 6H10" stroke={isOpen ? "#61aefa" : "white"} strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "500px" : "0",
                    transition: "max-height 0.4s cubic-bezier(0.12, 0.23, 0.28, 0.97)",
                  }}
                >
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "rgba(184,184,184,0.9)",
                    letterSpacing: "-0.01em",
                    paddingBottom: "28px",
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
