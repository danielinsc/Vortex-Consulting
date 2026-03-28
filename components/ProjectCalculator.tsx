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

const TRANSITION = "all 0.4s cubic-bezier(0.12, 0.23, 0.28, 0.97)";

export default function ProjectCalculator() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>(["consultoria"]);
  const [complexity, setComplexity] = useState<Complexity>("simples");
  const [timeline, setTimeline] = useState<Timeline>("regular");
  const [addons, setAddons] = useState<string[]>([]);

  const toggleService = (value: ServiceType) => {
    setSelectedServices((prev) => {
      if (prev.includes(value)) {
        // Don't allow deselecting if it's the only one
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== value);
      }
      return [...prev, value];
    });
  };

  const toggleAddon = (id: string) => {
    setAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const calculatePrice = () => {
    const basePrices: Record<ServiceType, Record<Complexity, number>> = {
      consultoria:     { simples: 4000, medio: 9000, complexo: 18000 },
      desenvolvimento: { simples: 8000, medio: 20000, complexo: 45000 },
      automacao:       { simples: 5000, medio: 12000, complexo: 28000 },
    };
    let total = 0;
    selectedServices.forEach((service) => {
      total += basePrices[service][complexity];
    });
    addons.forEach((id) => {
      const addon = ADDONS.find((a) => a.id === id);
      if (addon) total += addon.price;
    });
    if (timeline === "urgente") total *= 1.4;
    if (timeline === "rapido") total *= 1.2;
    return Math.round(total);
  };

  const calculateAgencyCost = () => {
    const m: Record<Complexity, number> = { simples: 2.5, medio: 2.8, complexo: 3.2 };
    return Math.round(calculatePrice() * m[complexity]);
  };

  const calculateFreelancerCost = () => {
    const m: Record<Complexity, number> = { simples: 1.6, medio: 1.8, complexo: 2.0 };
    return Math.round(calculatePrice() * m[complexity]);
  };

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        gsap.set(".calc-reveal", { opacity: 0, y: 32 });
        gsap.to(".calc-reveal", {
          opacity: 1, y: 0, duration: 1.2, ease: "framerEase", stagger: 0.15,
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
    borderRadius: "16px",
    border: active ? "2px solid #555" : "2px solid #222",
    background: active ? "rgba(255,255,255,0.06)" : "transparent",
    boxShadow: active ? "rgba(255,255,255,0.08) 0px 0px 46px 0px inset" : "none",
    cursor: "pointer",
    transition: TRANSITION,
  });

  const checkboxStyle = (active: boolean): React.CSSProperties => ({
    width: 20, height: 20, borderRadius: 6,
    border: active ? "none" : "2px solid #444",
    background: active ? "#999" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: TRANSITION,
  });

  const cardStyle: React.CSSProperties = {
    padding: "28px",
    borderRadius: "16px",
    border: "2px solid #222",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "rgba(255,255,255,0) 0px 0px 46px 0px inset",
    transition: TRANSITION,
  };

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
          gridTemplateColumns: "1fr",
          borderRadius: "16px",
          border: "2px solid #222",
          overflow: "hidden",
        }}>
          {/* Responsive: stacks on mobile, side-by-side on desktop */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Left — Form */}
            <div style={{
              flex: "1 1 500px",
              padding: "48px",
              borderRight: "2px solid #222",
            }}>
              {/* Service Type — multiple selection */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px",
                  lineHeight: 1.3, letterSpacing: "-0.03em", color: "#fff", marginBottom: "6px",
                }}>
                  Que tipo de serviço você precisa?
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginBottom: "16px", letterSpacing: "-0.01em" }}>
                  Selecione um ou mais serviços
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {SERVICE_OPTIONS.map((opt) => {
                    const active = selectedServices.includes(opt.value);
                    return (
                      <label key={opt.value} style={radioStyle(active)} onClick={() => toggleService(opt.value)}>
                        <span style={checkboxStyle(active)}>
                          {active && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </span>
                        <div>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}>{opt.label}</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em", marginLeft: "8px" }}>{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div style={{ height: "2px", background: "#222", margin: "0 0 40px" }} />

              {/* Complexity */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px",
                  lineHeight: 1.3, letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px",
                }}>
                  Complexidade do projeto:
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {COMPLEXITY_OPTIONS.map((opt) => (
                    <label key={opt.value} style={radioStyle(complexity === opt.value)} onClick={() => setComplexity(opt.value)}>
                      <span style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: complexity === opt.value ? "5px solid #999" : "2px solid #555",
                        background: "transparent", flexShrink: 0, transition: TRANSITION,
                      }} />
                      <div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}>{opt.label}</span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em", marginLeft: "8px" }}>{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ height: "2px", background: "#222", margin: "0 0 40px" }} />

              {/* Add-ons */}
              <div style={{ marginBottom: "40px" }}>
                <h3 style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px",
                  lineHeight: 1.3, letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px",
                }}>
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
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}>{addon.label}</span>
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>
                        +R${addon.price.toLocaleString("pt-BR")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ height: "2px", background: "#222", margin: "0 0 40px" }} />

              {/* Timeline */}
              <div>
                <h3 style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px",
                  lineHeight: 1.3, letterSpacing: "-0.03em", color: "#fff", marginBottom: "16px",
                }}>
                  Quão rápido você precisa?
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <label key={opt.value} style={{ ...radioStyle(timeline === opt.value), justifyContent: "space-between" }} onClick={() => setTimeline(opt.value)}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: "50%",
                          border: timeline === opt.value ? "5px solid #999" : "2px solid #555",
                          background: "transparent", flexShrink: 0, transition: TRANSITION,
                        }} />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "#fff", letterSpacing: "-0.02em" }}>{opt.label}</span>
                      </div>
                      {opt.suffix && (
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>{opt.suffix}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Cost Estimation */}
            <div style={{
              flex: "1 1 400px",
              padding: "48px",
              background: "rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{
                  fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "24px",
                  lineHeight: 1.3, letterSpacing: "-0.03em", color: "#fff", marginBottom: "8px",
                }}>
                  Custo Estimado
                </h3>
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400,
                  color: "rgba(184,184,184,0.9)", lineHeight: 1.5, letterSpacing: "-0.02em",
                }}>
                  Estimativa instantânea para você ter uma ideia de quanto pode economizar conosco.
                </p>
              </div>

              {/* Selected services summary */}
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                  {selectedServices.length > 1 ? `${selectedServices.length} serviços selecionados:` : "1 serviço selecionado:"}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {selectedServices.map((s) => {
                    const opt = SERVICE_OPTIONS.find((o) => o.value === s);
                    return (
                      <span key={s} style={{
                        fontFamily: "Geist Mono, monospace",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.7)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "6px",
                        padding: "5px 12px",
                        letterSpacing: "0.02em",
                      }}>
                        {opt?.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
                {/* Agency Cost */}
                <div className="card-feature" style={cardStyle}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(184,184,184,0.9)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Agência típica cobra no mínimo
                  </p>
                  <p style={{
                    fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "36px",
                    color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1,
                  }}>
                    R${calculateAgencyCost().toLocaleString("pt-BR")}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", marginTop: "8px", letterSpacing: "-0.01em" }}>
                    + Tempo extra & custo adicional
                  </p>
                </div>

                {/* Freelancer Cost */}
                <div className="card-feature" style={cardStyle}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(184,184,184,0.9)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Freelancer comum cobra no mínimo
                  </p>
                  <p style={{
                    fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "36px",
                    color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1,
                  }}>
                    R${calculateFreelancerCost().toLocaleString("pt-BR")}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400, color: "rgba(117,117,117,0.9)", marginTop: "8px", letterSpacing: "-0.01em" }}>
                    + Dor de cabeça & idas e vindas
                  </p>
                </div>

                {/* Vortex Cost — highlighted */}
                <div style={{
                  ...cardStyle,
                  border: "2px solid #555",
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "rgba(255,255,255,0.08) 0px 0px 46px 0px inset",
                }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500, color: "#fff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                    Com a Vortex
                  </p>
                  <p style={{
                    fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "44px",
                    color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.1,
                  }}>
                    R${calculatePrice().toLocaleString("pt-BR")}
                  </p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 400, color: "rgba(184,184,184,0.9)", marginTop: "8px", letterSpacing: "-0.02em" }}>
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
      </div>
    </section>
  );
}
