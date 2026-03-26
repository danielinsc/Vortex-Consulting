"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ─── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "saas",
    name: "SaaS Startup",
    desc: "MVP rápido, crescimento orgânico e funil de vendas B2B automatizado.",
    agents: ["CEO", "CTO", "Full-Stack ×2", "PM", "SDR", "Customer Success"],
    budget: "R$800",
    icon: "◈",
    color: "#5c7aaa",
    goals: ["Lançar MVP", "Primeiros 100 usuários", "R$10K MRR"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    desc: "Operação completa 24/7: performance, conteúdo, suporte e financeiro.",
    agents: ["CEO", "Ads Manager", "Content Writer", "Suporte", "CFO"],
    budget: "R$600",
    icon: "◉",
    color: "#4e7e5a",
    goals: ["Configurar loja", "Lançar campanhas", "1.000 pedidos"],
  },
  {
    id: "agency",
    name: "Agência Digital",
    desc: "Time criativo e de entrega para múltiplos clientes em paralelo.",
    agents: ["CEO", "PM", "UX Designer", "Full-Stack", "Ads Manager", "SEO"],
    budget: "R$700",
    icon: "◇",
    color: "#7a5298",
    goals: ["Montar portfólio", "5 clientes", "Entregar projetos"],
  },
  {
    id: "content",
    name: "Creator / Influencer",
    desc: "Produção de conteúdo em escala, crescimento de audiência e monetização.",
    agents: ["Content Writer", "SEO", "Ads Manager", "UX Designer"],
    budget: "R$300",
    icon: "◎",
    color: "#307888",
    goals: ["100 posts em 90 dias", "10K seguidores", "Monetizar"],
  },
  {
    id: "solo",
    name: "Solo Dev → Startup",
    desc: "Do código ao produto: arquitetura, deploy e primeiros usuários pagantes.",
    agents: ["CTO", "Full-Stack", "DevOps", "PM"],
    budget: "R$400",
    icon: "◐",
    color: "#a07830",
    goals: ["Lançar v1", "Deploy em produção", "Primeiro cliente"],
  },
];

const ALL_AGENTS = [
  { id: "ceo",     name: "CEO",            model: "Opus",   dept: "Executivo",   color: "#5c7aaa" },
  { id: "cto",     name: "CTO",            model: "Opus",   dept: "Tecnologia",  color: "#4e7e5a" },
  { id: "fst",     name: "Full-Stack",     model: "Sonnet", dept: "Tecnologia",  color: "#4e7e5a" },
  { id: "devops",  name: "DevOps",         model: "Haiku",  dept: "Tecnologia",  color: "#4e7e5a" },
  { id: "pm",      name: "Product Mgr",    model: "Opus",   dept: "Produto",     color: "#7a5030" },
  { id: "ux",      name: "UX Designer",    model: "Sonnet", dept: "Produto",     color: "#7a5030" },
  { id: "cmo",     name: "CMO",            model: "Sonnet", dept: "Marketing",   color: "#7a5298" },
  { id: "ads",     name: "Ads Manager",    model: "Haiku",  dept: "Marketing",   color: "#7a5298" },
  { id: "seo",     name: "SEO",            model: "Haiku",  dept: "Marketing",   color: "#7a5298" },
  { id: "content", name: "Content Writer", model: "Haiku",  dept: "Marketing",   color: "#7a5298" },
  { id: "cfo",     name: "CFO",            model: "Haiku",  dept: "Financeiro",  color: "#a07830" },
  { id: "sdr",     name: "SDR",            model: "Sonnet", dept: "Vendas",      color: "#307888" },
  { id: "cs",      name: "Customer Success",model: "Haiku", dept: "Atendimento", color: "#6b5a8c" },
  { id: "support", name: "Suporte",        model: "Haiku",  dept: "Atendimento", color: "#6b5a8c" },
  { id: "hr",      name: "HR Manager",     model: "Haiku",  dept: "Operações",   color: "#3a6870" },
];

const MODEL_COLOR: Record<string, string> = {
  Opus: "rgba(180,140,255,0.7)",
  Sonnet: "rgba(100,180,255,0.7)",
  Haiku: "rgba(100,230,200,0.7)",
};

// ─── Step bar ─────────────────────────────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  const steps = ["Escolha o template", "Configure", "Monte o time"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: i < step ? "#64f078" : i === step ? "#fff" : "rgba(255,255,255,0.08)",
              border: i <= step ? "none" : "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.3s",
            }}>
              {i < step
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                : <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: i === step ? "#000" : "rgba(255,255,255,0.3)", fontWeight: 600 }}>{i + 1}</span>
              }
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: i === step ? "#fff" : i < step ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)", whiteSpace: "nowrap", transition: "color 0.3s" }}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 48, height: 1, background: i < step ? "rgba(100,240,120,0.3)" : "rgba(255,255,255,0.08)", margin: "0 12px", transition: "background 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Launch animation ──────────────────────────────────────────────────────────
function LaunchScreen({ companyName }: { companyName: string }) {
  const [phase, setPhase] = useState(0);
  const lines = [
    "Inicializando workspace...",
    "Configurando agentes de IA...",
    "Conectando integrações...",
    "Ativando heartbeat 24/7...",
    `${companyName} está no ar.`,
  ];

  useEffect(() => {
    const timers = lines.map((_, i) =>
      setTimeout(() => setPhase(i + 1), i * 620 + 300)
    );
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 8 }}>
      <style>{`@keyframes spinRing{to{transform:rotate(360deg)}} @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ position: "relative", marginBottom: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(100,240,120,0.08)", border: "1px solid rgba(100,240,120,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>⚡</div>
        <div style={{ position: "absolute", inset: -8, borderRadius: 24, border: "1px solid rgba(100,240,120,0.15)", animation: "spinRing 2s linear infinite" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "Geist Mono, monospace", fontSize: 12, textAlign: "left", minWidth: 300 }}>
        {lines.map((line, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            opacity: phase > i ? 1 : 0,
            transform: phase > i ? "translateY(0)" : "translateY(8px)",
            transition: "all 0.4s ease",
            color: i === lines.length - 1 ? "#64f078" : "rgba(255,255,255,0.5)",
          }}>
            <span style={{ color: i === lines.length - 1 ? "#64f078" : "rgba(100,240,120,0.6)", fontSize: 10 }}>✓</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [budget, setBudget] = useState("R$800");
  const [selectedAgents, setSelectedAgents] = useState<Set<string>>(new Set());
  const [launching, setLaunching] = useState(false);

  const handleSelectTemplate = (id: string) => {
    setSelectedTemplate(id);
    const tpl = TEMPLATES.find(t => t.id === id)!;
    const preselect = new Set<string>();
    tpl.agents.forEach(name => {
      const found = ALL_AGENTS.find(a =>
        name.toLowerCase().includes(a.name.toLowerCase().split(" ")[0]) ||
        a.name.toLowerCase().split(" ")[0].includes(name.toLowerCase().split(" ")[0])
      );
      if (found) preselect.add(found.id);
    });
    // always include CEO for most templates
    if (id !== "content") preselect.add("ceo");
    setSelectedAgents(preselect);
  };

  const toggleAgent = (id: string) => {
    setSelectedAgents(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleLaunch = () => {
    setLaunching(true);
    localStorage.setItem("optimus_onboarded", "1");
    localStorage.setItem("optimus_company", companyName.trim() || "Minha Empresa");
    setTimeout(() => router.push("/app"), 4200);
  };

  const tpl = TEMPLATES.find(t => t.id === selectedTemplate);
  const canNext0 = !!selectedTemplate;
  const canNext1 = companyName.trim().length >= 2;
  const canLaunch = selectedAgents.size > 0;

  return (
    <div style={{ minHeight: "100dvh", background: "#000", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 56, borderBottom: "1px solid #111", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <span style={{ fontFamily: "Geist, sans-serif", fontSize: 14, color: "#fff", fontWeight: 400, letterSpacing: "-0.02em" }}>Optimus</span>
        </div>
        {!launching && (
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
            CONFIGURAÇÃO INICIAL
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "52px 24px 60px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 820 }}>

          {launching ? (
            <LaunchScreen companyName={companyName || "sua empresa"} />
          ) : (
            <>
              <StepBar step={step} />

              {/* ── Step 0: Template ── */}
              {step === 0 && (
                <div>
                  <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 30, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 8px" }}>
                    Que tipo de empresa você quer montar?
                  </h1>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 32px", lineHeight: 1.6 }}>
                    Escolha um template — você pode personalizar depois.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
                    {TEMPLATES.map(t => (
                      <div key={t.id} onClick={() => handleSelectTemplate(t.id)} style={{
                        background: selectedTemplate === t.id ? `${t.color}12` : "#050505",
                        border: `1px solid ${selectedTemplate === t.id ? t.color + "55" : "#1a1a1a"}`,
                        borderRadius: 12, padding: "18px 20px", cursor: "pointer",
                        transition: "border-color 0.15s, background 0.15s",
                        position: "relative",
                      }}
                        onMouseEnter={e => { if (selectedTemplate !== t.id) e.currentTarget.style.borderColor = "#2a2a2a"; }}
                        onMouseLeave={e => { if (selectedTemplate !== t.id) e.currentTarget.style.borderColor = "#1a1a1a"; }}
                      >
                        {selectedTemplate === t.id && (
                          <div style={{ position: "absolute", top: 14, right: 14, width: 18, height: 18, borderRadius: "50%", background: "#64f078", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                        )}
                        <div style={{ fontSize: 18, marginBottom: 10, color: t.color }}>{t.icon}</div>
                        <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 15, color: "#fff", marginBottom: 4 }}>{t.name}</div>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "0 0 14px", lineHeight: 1.6 }}>{t.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                          {t.goals.map(g => (
                            <span key={g} style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: `${t.color}15`, border: `1px solid ${t.color}28`, color: `${t.color}cc` }}>{g}</span>
                          ))}
                        </div>
                        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.18)" }}>
                          {t.agents.length} agentes · {t.budget}/mês
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Step 1: Configure ── */}
              {step === 1 && tpl && (
                <div>
                  <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 30, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 8px" }}>
                    Configure sua empresa
                  </h1>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 36px" }}>
                    Template: <span style={{ color: tpl.color, fontWeight: 500 }}>{tpl.name}</span>
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8, letterSpacing: "0.03em" }}>NOME DA EMPRESA *</label>
                      <input autoFocus type="text" placeholder="ex: Acme Corp, NovaTech, MeuSaaS…"
                        value={companyName} onChange={e => setCompanyName(e.target.value)}
                        style={{
                          width: "100%", padding: "12px 16px", background: "#050505",
                          border: `1px solid ${companyName.length >= 2 ? "rgba(100,240,120,0.35)" : "#1a1a1a"}`,
                          borderRadius: 8, fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8, letterSpacing: "0.03em" }}>SETOR / NICHO</label>
                      <input type="text" placeholder="ex: Fintech, Saúde, EdTech, E-commerce…"
                        value={sector} onChange={e => setSector(e.target.value)}
                        style={{
                          width: "100%", padding: "12px 16px", background: "#050505",
                          border: "1px solid #1a1a1a", borderRadius: 8,
                          fontFamily: "Inter, sans-serif", fontSize: 14,
                          color: "#fff", outline: "none", boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", display: "block", marginBottom: 8, letterSpacing: "0.03em" }}>BUDGET MENSAL</label>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {["R$300", "R$500", "R$800", "R$1.500", "Custom"].map(b => (
                          <button key={b} onClick={() => setBudget(b)} style={{
                            fontFamily: "Geist Mono, monospace", fontSize: 11,
                            padding: "8px 16px", borderRadius: 6, cursor: "pointer",
                            background: budget === b ? "rgba(255,255,255,0.08)" : "transparent",
                            border: `1px solid ${budget === b ? "rgba(255,255,255,0.25)" : "#1a1a1a"}`,
                            color: budget === b ? "#fff" : "rgba(255,255,255,0.35)",
                            transition: "all 0.15s",
                          }}>{b}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: "#050505", border: "1px solid #111", borderRadius: 10, padding: "16px 20px" }}>
                      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 10 }}>METAS DO TEMPLATE</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                        {tpl.goals.map((g, i) => (
                          <div key={g} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", flexShrink: 0, width: 16 }}>G{i + 1}</span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 2: Agents ── */}
              {step === 2 && (
                <div>
                  <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 30, color: "#fff", letterSpacing: "-0.04em", margin: "0 0 8px" }}>
                    Monte seu time de IA
                  </h1>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", margin: "0 0 32px" }}>
                    <span style={{ color: "#64f078", fontWeight: 500 }}>{selectedAgents.size} agente{selectedAgents.size !== 1 ? "s" : ""}</span> selecionado{selectedAgents.size !== 1 ? "s" : ""} · operam 24/7 sem intervenção
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 28 }}>
                    {ALL_AGENTS.map(ag => {
                      const sel = selectedAgents.has(ag.id);
                      return (
                        <div key={ag.id} onClick={() => toggleAgent(ag.id)} style={{
                          background: sel ? `${ag.color}10` : "#050505",
                          border: `1px solid ${sel ? ag.color + "45" : "#1a1a1a"}`,
                          borderRadius: 10, padding: "12px 14px",
                          cursor: "pointer", transition: "all 0.12s",
                          display: "flex", alignItems: "center", gap: 10,
                        }}
                          onMouseEnter={e => { if (!sel) e.currentTarget.style.borderColor = "#2a2a2a"; }}
                          onMouseLeave={e => { if (!sel) e.currentTarget.style.borderColor = "#1a1a1a"; }}
                        >
                          <div style={{
                            width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                            background: sel ? `${ag.color}18` : "rgba(255,255,255,0.04)",
                            border: `1px solid ${sel ? ag.color + "35" : "rgba(255,255,255,0.06)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {sel
                              ? <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={ag.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              : <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>+</span>
                            }
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: sel ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: sel ? 500 : 400, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ag.name}</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.18)" }}>{ag.dept}</span>
                              <span style={{ width: 2, height: 2, borderRadius: "50%", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
                              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: MODEL_COLOR[ag.model] }}>{ag.model}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: "#050505", border: "1px solid #111", borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 4 }}>CUSTO ESTIMADO</div>
                      <div style={{ fontFamily: "Geist, sans-serif", fontSize: 20, color: "#fff", fontWeight: 300 }}>
                        R${(selectedAgents.size * 68).toLocaleString("pt-BR")}
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>/mês</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 24, textAlign: "right" }}>
                      <div>
                        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 4 }}>UPTIME</div>
                        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 16, color: "#64f078" }}>24/7</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 4 }}>AUTONOMIA</div>
                        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 16, color: "rgba(180,140,255,0.8)" }}>Alta</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Nav buttons ── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 40, paddingTop: 24, borderTop: "1px solid #111" }}>
                <button onClick={() => setStep(s => Math.max(0, s - 1))}
                  disabled={step === 0}
                  style={{
                    fontFamily: "Inter, sans-serif", fontSize: 13,
                    padding: "10px 20px", borderRadius: 8,
                    border: "1px solid #1a1a1a", background: "transparent",
                    color: step === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.4)",
                    cursor: step === 0 ? "not-allowed" : "pointer", transition: "color 0.15s",
                  }}>
                  ← Voltar
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {step === 2 && selectedAgents.size > 0 && (
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>
                      {selectedAgents.size} agentes prontos
                    </span>
                  )}

                  {step < 2 ? (
                    <button onClick={() => setStep(s => s + 1)}
                      disabled={step === 0 ? !canNext0 : !canNext1}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 500,
                        padding: "10px 28px", borderRadius: 8, border: "none", cursor: "pointer",
                        background: (step === 0 ? canNext0 : canNext1) ? "#fff" : "rgba(255,255,255,0.07)",
                        color: (step === 0 ? canNext0 : canNext1) ? "#000" : "rgba(255,255,255,0.2)",
                        transition: "all 0.2s",
                      }}>
                      Continuar →
                    </button>
                  ) : (
                    <button onClick={handleLaunch} disabled={!canLaunch}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                        padding: "11px 32px", borderRadius: 8, border: "none",
                        cursor: canLaunch ? "pointer" : "not-allowed",
                        background: canLaunch ? "#64f078" : "rgba(255,255,255,0.07)",
                        color: canLaunch ? "#000" : "rgba(255,255,255,0.2)",
                        transition: "all 0.2s",
                        display: "flex", alignItems: "center", gap: 8,
                      }}>
                      <span>⚡</span> Lançar empresa
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
