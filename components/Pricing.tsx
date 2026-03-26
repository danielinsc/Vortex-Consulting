"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PLANS = [
  {
    name: "Free",
    desc: "Ideal para explorar a plataforma, conhecer o ClipMart e testar seus primeiros agentes de IA.",
    price: { monthly: "R$0", annual: "R$0" },
    period: "/mês",
    cta: "Comece grátis",
    popular: false,
    features: [
      "1 empresa ativa",
      "Até 3 agentes simultâneos",
      "Acesso ao ClipMart (templates gratuitos)",
      "Escritório Virtual básico",
      "Audit trail de 7 dias",
      "Suporte via comunidade",
    ],
  },
  {
    name: "Starter",
    desc: "Para fundadores e times que querem operar com agentes de IA de forma séria e estruturada.",
    price: { monthly: "R$97", annual: "R$77" },
    period: "/mês",
    cta: "Teste grátis por 14 dias",
    popular: true,
    features: [
      "Empresas ilimitadas",
      "Agentes ilimitados",
      "ClipMart completo (28+ templates)",
      "Escritório Virtual com pixel art",
      "Controle de orçamento por agente",
      "Aprovações e gates de decisão",
      "Suporte prioritário por e-mail",
    ],
  },
  {
    name: "Enterprise",
    desc: "Para organizações que precisam de escala, isolamento de dados e suporte dedicado.",
    price: { monthly: "Custom", annual: "Custom" },
    period: "",
    cta: "Solicitar demonstração",
    popular: false,
    features: [
      "Multi-empresa com isolamento total",
      "SSO e controle de acesso avançado",
      "Plugin SDK para integrações customizadas",
      "Integrações ERP (ContaAzul, Omie, etc.)",
      "SLA garantido e suporte telefônico",
      "Onboarding dedicado",
      "Acesso antecipado a novos agentes",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
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
        gsap.fromTo(".plan-card",
          { opacity: 0.001, y: 48 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "framerEase",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#080808", padding: "128px 0" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 className="h2-section" style={{ marginBottom: "24px" }}>
            Planos que crescem com sua operação.
          </h2>

          {/* Toggle */}
          <div
            style={{
              display: "inline-flex",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid #222",
              borderRadius: "62px",
              padding: "4px",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setAnnual(false)}
              style={{
                background: !annual ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                borderRadius: "62px",
                padding: "8px 20px",
                color: !annual ? "#fff" : "rgba(184,184,184,0.9)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              Mensal
            </button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                background: annual ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                borderRadius: "62px",
                padding: "8px 20px",
                color: annual ? "#fff" : "rgba(184,184,184,0.9)",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Anual
              <span
                style={{
                  background: "rgba(153, 153, 153, 0.15)",
                  border: "1px solid rgba(153, 153, 153, 0.3)",
                  color: "#999999",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "62px",
                  fontWeight: 500,
                }}
              >
                20% de desconto
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className="plan-card"
              style={{
                background: plan.popular ? "#080808" : "transparent",
                border: plan.popular ? "1px solid #999999" : "1px solid #222",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                position: "relative",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(153, 153, 153, 0.15)",
                    border: "1px solid rgba(153, 153, 153, 0.3)",
                    borderRadius: "62px",
                    padding: "4px 16px",
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                    color: "#999999",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Popular
                </div>
              )}

              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(117,117,117,0.6)", marginBottom: "8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span
                    style={{
                      fontFamily: "Geist, sans-serif",
                      fontWeight: 300,
                      fontSize: "48px",
                      letterSpacing: "-0.04em",
                      color: "#fff",
                    }}
                  >
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.period && (
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(117,117,117,0.9)" }}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.7)", marginTop: "12px", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                  {plan.desc}
                </p>
              </div>

              <a
                href="/onboarding"
                className="btn-glass"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "14px 24px",
                  background: plan.popular ? "rgba(153, 153, 153, 0.15)" : "rgba(255,255,255,0.06)",
                  border: plan.popular ? "1px solid rgba(153, 153, 153, 0.3)" : "1px solid transparent",
                  color: plan.popular ? "#999999" : "#fff",
                }}
              >
                {plan.cta}
              </a>

              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "24px" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(117,117,117,0.7)", marginBottom: "16px", letterSpacing: "-0.01em", textTransform: "uppercase" }}>
                  Incluído
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {plan.features.map((feat, fi) => (
                    <div key={fi} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ color: "#999999", fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>✓</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(184,184,184,0.9)", lineHeight: 1.4 }}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing image */}
        <div style={{ marginTop: "64px", textAlign: "center" }}>
          <Image
            src="https://framerusercontent.com/images/3azoMUvww6v2YfzABBOTpFBMGDA.png"
            alt="Pricing comparison"
            width={800}
            height={400}
            style={{ maxWidth: "100%", borderRadius: "16px", border: "1px solid #222" }}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 810px) and (max-width: 1199px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
