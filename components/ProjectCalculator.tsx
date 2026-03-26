"use client";
import { useState, useEffect, useRef } from "react";

type ServiceType = "consultoria" | "desenvolvimento" | "automacao";
type Complexity = "simples" | "medio" | "complexo";
type Timeline = "regular" | "rapido" | "urgente";

const SERVICE_OPTIONS: { value: ServiceType; label: string; desc: string }[] = [
  { value: "consultoria", label: "Consultoria de IA", desc: "Estratégia, diagnóstico e roadmap" },
  { value: "desenvolvimento", label: "Desenvolvimento com IA", desc: "Produto, MVP ou integração" },
  { value: "automacao", label: "Automação de Processos", desc: "Fluxos, bots e pipelines inteligentes" },
];

const COMPLEXITY_OPTIONS: { value: Complexity; label: string; desc: string }[] = [
  { value: "simples", label: "Simples", desc: "1 processo ou funcionalidade" },
  { value: "medio", label: "Médio", desc: "3–5 processos integrados" },
  { value: "complexo", label: "Complexo", desc: "Sistema completo, múltiplas integrações" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string; suffix?: string }[] = [
  { value: "urgente", label: "Em 7 dias", suffix: "+40%" },
  { value: "rapido", label: "Em 14 dias", suffix: "+20%" },
  { value: "regular", label: "Prazo normal" },
];

const ADDONS = [
  { id: "integracao", label: "Integração com sistemas existentes", price: 2000 },
  { id: "capacitacao", label: "Capacitação da equipe", price: 1500 },
  { id: "suporte", label: "Suporte contínuo (3 meses)", price: 3000 },
];

export default function ProjectCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [serviceType, setServiceType] = useState<ServiceType>("consultoria");
  const [complexity, setComplexity] = useState<Complexity>("simples");
  const [timeline, setTimeline] = useState<Timeline>("regular");
  const [addons, setAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const calculatePrice = () => {
    const basePrices: Record<ServiceType, Record<Complexity, number>> = {
      consultoria:    { simples: 4000, medio: 9000, complexo: 18000 },
      desenvolvimento: { simples: 8000, medio: 20000, complexo: 45000 },
      automacao:       { simples: 5000, medio: 12000, complexo: 28000 },
    };

    let total = basePrices[serviceType][complexity];

    // Add-ons
    addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) total += addon.price;
    });

    // Timeline multiplier
    if (timeline === "urgente") total *= 1.4;
    if (timeline === "rapido") total *= 1.2;

    return Math.round(total);
  };

  const calculateAgencyCost = () => {
    const multipliers: Record<Complexity, number> = { simples: 2.5, medio: 2.8, complexo: 3.2 };
    return Math.round(calculatePrice() * multipliers[complexity]);
  };

  const calculateFreelancerCost = () => {
    const multipliers: Record<Complexity, number> = { simples: 1.6, medio: 1.8, complexo: 2.0 };
    return Math.round(calculatePrice() * multipliers[complexity]);
  };

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(".calc-reveal", { opacity: 0, y: 32 });
        gsap.to(".calc-reveal", {
          opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        });
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  const radioStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px 20px",
    borderRadius: "12px",
    border: active ? "1px solid #555" : "1px solid #222",
    background: active ? "rgba(255,255,255,0.06)" : "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  });

  const checkboxStyle = (active: boolean): React.CSSProperties => ({
    width: 20, height: 20, borderRadius: 6,
    border: active ? "none" : "1px solid #444",
    background: active ? "#999" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: "all 0.3s ease",
  });

  return (
    <section ref={sectionRef} id="pricing" style={{ background: "#000", padding: "120px 0", position: "relative" }}>
      <div className="section-container">
        {/* Header */}
        <div className="calc-reveal" style={{ marginBottom: "64px" }}>
          <h2 className="h2-section" style={{ maxWidth: "700px" }}>
            Preços flexíveis para cada etapa.
            <br />
            <span style={{ color: "rgba(184,184,184,0.9)" }}>
              Experimente a calculadora de estimativa.
            </span>
          </h2>
        </div>

        {/* Calculator Grid */}
        <div className="calc-reveal" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: "16px",
          border: "1px solid #222",
          overflow: "hidden",
        }}>
          {/* Left — Form */}
          <div style={{ padding: "48px", borderRight: "1px solid #222" }}>
            {/* Service Type */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px", color: "#fff", marginBottom: "16px" }}>
                Que tipo de serviço você precisa?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {SERVICE_OPTIONS.map((opt) => (
                  <label key={opt.value} style={radioStyle(serviceType === opt.value)} onClick={() => setServiceType(opt.value)}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: serviceType === opt.value ? "5px solid #999" : "1px solid #555",
                      background: "transparent", flexShrink: 0, transition: "all 0.3s ease",
                    }} />
                    <div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff" }}>{opt.label}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginLeft: "8px" }}>{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#222", margin: "0 0 40px" }} />

            {/* Complexity */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px", color: "#fff", marginBottom: "16px" }}>
                Complexidade do projeto:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {COMPLEXITY_OPTIONS.map((opt) => (
                  <label key={opt.value} style={radioStyle(complexity === opt.value)} onClick={() => setComplexity(opt.value)}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%",
                      border: complexity === opt.value ? "5px solid #999" : "1px solid #555",
                      background: "transparent", flexShrink: 0, transition: "all 0.3s ease",
                    }} />
                    <div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff" }}>{opt.label}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginLeft: "8px" }}>{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#222", margin: "0 0 40px" }} />

            {/* Add-ons */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px", color: "#fff", marginBottom: "16px" }}>
                Complementos:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ADDONS.map((addon) => (
                  <label
                    key={addon.id}
                    style={{ ...radioStyle(addons.includes(addon.id)), justifyContent: "space-between" }}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={checkboxStyle(addons.includes(addon.id))}>
                        {addons.includes(addon.id) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff" }}>{addon.label}</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)" }}>
                      +R${addon.price.toLocaleString("pt-BR")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#222", margin: "0 0 40px" }} />

            {/* Timeline */}
            <div>
              <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px", color: "#fff", marginBottom: "16px" }}>
                Quão rápido você precisa?
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {TIMELINE_OPTIONS.map((opt) => (
                  <label key={opt.value} style={{ ...radioStyle(timeline === opt.value), justifyContent: "space-between" }} onClick={() => setTimeline(opt.value)}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: timeline === opt.value ? "5px solid #999" : "1px solid #555",
                        background: "transparent", flexShrink: 0, transition: "all 0.3s ease",
                      }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff" }}>{opt.label}</span>
                    </div>
                    {opt.suffix && (
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)" }}>{opt.suffix}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Cost Estimation */}
          <div style={{ padding: "48px", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "24px", color: "#fff", marginBottom: "8px" }}>
                Custo Estimado
              </h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(184,184,184,0.9)", lineHeight: 1.5 }}>
                Estimativa instantânea para você ter uma ideia de quanto pode economizar conosco.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Agency Cost */}
              <div style={{
                padding: "28px", borderRadius: "16px",
                border: "1px solid #222", background: "rgba(255,255,255,0.03)",
              }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(184,184,184,0.9)", marginBottom: "8px" }}>
                  Agência típica cobra no mínimo
                </p>
                <p style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "36px",
                  color: "#fff", letterSpacing: "-0.03em",
                }}>
                  R${calculateAgencyCost().toLocaleString("pt-BR")}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginTop: "8px" }}>
                  + Tempo extra & custo adicional
                </p>
              </div>

              {/* Freelancer Cost */}
              <div style={{
                padding: "28px", borderRadius: "16px",
                border: "1px solid #222", background: "rgba(255,255,255,0.03)",
              }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(184,184,184,0.9)", marginBottom: "8px" }}>
                  Freelancer comum cobra no mínimo
                </p>
                <p style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "36px",
                  color: "#fff", letterSpacing: "-0.03em",
                }}>
                  R${calculateFreelancerCost().toLocaleString("pt-BR")}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginTop: "8px" }}>
                  + Dor de cabeça & idas e vindas
                </p>
              </div>

              {/* Vortex Cost */}
              <div style={{
                padding: "28px", borderRadius: "16px",
                border: "1px solid #999", background: "rgba(153,153,153,0.06)",
                position: "relative",
              }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#fff", marginBottom: "8px" }}>
                  Com a Vortex
                </p>
                <p style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "44px",
                  color: "#fff", letterSpacing: "-0.03em",
                }}>
                  R${calculatePrice().toLocaleString("pt-BR")}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(184,184,184,0.9)", marginTop: "8px" }}>
                  Economize dinheiro, tempo & dor de cabeça
                </p>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contato"
              className="btn-glass"
              style={{
                display: "flex", justifyContent: "center", marginTop: "32px",
                padding: "16px 32px", background: "#fff", color: "#000", borderRadius: "62px",
                fontSize: "15px", width: "100%",
              }}
            >
              Solicitar orçamento detalhado
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
