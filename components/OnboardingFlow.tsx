"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: "saas",
    name: "SaaS Startup",
    icon: "",
    description: "Time técnico + growth",
    agents: ["CTO", "Full-Stack", "Product Manager", "Growth Hacker"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: "",
    description: "Operações + marketing",
    agents: ["CMO", "Ads Manager", "Customer Success", "Ops Manager"],
  },
  {
    id: "agency",
    name: "Agência Digital",
    icon: "",
    description: "Criação + gestão de clientes",
    agents: ["UX Designer", "Copywriter", "Account Exec", "Gestor de Tráfego"],
  },
  {
    id: "solo",
    name: "Solo Dev → Startup",
    icon: "",
    description: "Escale sozinho com IA",
    agents: ["CTO", "CMO", "Customer Success"],
  },
  {
    id: "blank",
    name: "Em branco",
    icon: "",
    description: "Monte do zero",
    agents: [],
  },
];

const PROVIDERS = [
  {
    id: "claude",
    name: "Claude",
    label: "Anthropic",
    color: "#d97757",
    placeholder: "sk-ant-api03-...",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L24 21H4L14 3Z" fill="#d97757" />
      </svg>
    ),
  },
  {
    id: "openai",
    name: "OpenAI",
    label: "GPT-4o / Codex",
    color: "#10a37f",
    placeholder: "sk-proj-...",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#10a37f" strokeWidth="2" />
        <path d="M10 14a4 4 0 0 1 8 0" stroke="#10a37f" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    label: "Google Gemini",
    color: "#4285f4",
    placeholder: "AIza...",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L18 14L14 24L10 14L14 4Z" fill="#4285f4" />
        <path d="M4 14L14 10L24 14L14 18L4 14Z" fill="#34a853" />
      </svg>
    ),
  },
  {
    id: "http",
    name: "HTTP / Custom",
    label: "Qualquer provider via API",
    color: "#61aefa",
    placeholder: "https://api.seumodelo.com/v1",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="12" rx="2" stroke="#61aefa" strokeWidth="1.5" />
        <path d="M9 14h10M14 11v6" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const AGENTS = [
  { id: "ceo", role: "CEO", dept: "Executive", icon: "", description: "Visão estratégica e alinhamento de missão" },
  { id: "cto", role: "CTO", dept: "Tecnologia", icon: "", description: "Arquitetura, código e stack de tecnologia" },
  { id: "cmo", role: "CMO", dept: "Marketing", icon: "", description: "Estratégia de marketing e crescimento" },
  { id: "cfo", role: "CFO", dept: "Financeiro", icon: "", description: "Finanças, forecasting e controle de custos" },
  { id: "fullstack", role: "Full-Stack Engineer", dept: "Tecnologia", icon: "", description: "Desenvolvimento front e backend" },
  { id: "content", role: "Content Creator", dept: "Marketing", icon: "", description: "Criação de conteúdo e copywriting" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "2px",
            flex: 1,
            borderRadius: "2px",
            background: i <= step ? "#61aefa" : "rgba(255,255,255,0.1)",
            transition: "background 0.4s ease",
          }}
        />
      ))}
    </div>
  );
}

function StepLabel({ step, total }: { step: number; total: number }) {
  const labels = ["Empresa", "Template", "Provedor", "Agente", "Pronto"];
  return (
    <p style={{
      fontFamily: "Geist Mono, monospace",
      fontSize: "11px",
      color: "rgba(97,174,250,0.7)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    }}>
      {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {labels[step]}
    </p>
  );
}

function GlassInput({
  placeholder,
  value,
  onChange,
  type = "text",
  label,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  label?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: 500,
          color: "rgba(117,117,117,0.8)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "rgba(97,174,250,0.4)" : "#222"}`,
          borderRadius: "12px",
          padding: "14px 18px",
          fontFamily: "Inter, sans-serif",
          fontSize: "15px",
          color: "#fff",
          outline: "none",
          transition: "border-color 0.25s ease",
          letterSpacing: "-0.01em",
        }}
      />
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepCompany({
  name, setName, mission, setMission,
}: {
  name: string; setName: (v: string) => void;
  mission: string; setMission: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 48px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          Vamos criar<br />sua empresa
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>
          Dê um nome e uma missão. Os agentes vão trabalhar com isso como norte.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <GlassInput
          label="Nome da empresa"
          placeholder="ex: Acme Corp"
          value={name}
          onChange={setName}
        />
        <GlassInput
          label="Missão em uma frase"
          placeholder="ex: Automatizar o financeiro de PMEs brasileiras com IA"
          value={mission}
          onChange={setMission}
        />
      </div>
    </div>
  );
}

function StepTemplate({
  selected,
  setSelected,
}: {
  selected: string; setSelected: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 48px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          Comece com<br />um template
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>
          Times pré-configurados do ClipMart prontos para trabalhar.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {TEMPLATES.map((t) => {
          const isSelected = selected === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                width: "100%",
                background: isSelected ? "rgba(97,174,250,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isSelected ? "rgba(97,174,250,0.35)" : "#1e1e1e"}`,
                borderRadius: "14px",
                padding: "18px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "22px", flexShrink: 0, lineHeight: 1 }}>{t.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", color: "#fff", letterSpacing: "-0.02em" }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(117,117,117,0.7)" }}>
                    · {t.description}
                  </span>
                </div>
                {t.agents.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {t.agents.map((a) => (
                      <span key={a} style={{
                        fontFamily: "Geist Mono, monospace",
                        fontSize: "10px",
                        color: isSelected ? "rgba(97,174,250,0.7)" : "rgba(117,117,117,0.6)",
                        background: isSelected ? "rgba(97,174,250,0.08)" : "rgba(255,255,255,0.04)",
                        border: "1px solid",
                        borderColor: isSelected ? "rgba(97,174,250,0.2)" : "#1a1a1a",
                        borderRadius: "4px",
                        padding: "2px 7px",
                        transition: "all 0.2s",
                      }}>
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {isSelected && (
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "rgba(97,174,250,0.15)",
                  border: "1px solid rgba(97,174,250,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5L4 7L8 3" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepProvider({
  selected, setSelected, apiKey, setApiKey,
}: {
  selected: string; setSelected: (v: string) => void;
  apiKey: string; setApiKey: (v: string) => void;
}) {
  const provider = PROVIDERS.find((p) => p.id === selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 48px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          Conecte seu<br />provedor de IA
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>
          Traga sua API key. Suportamos qualquer modelo ou provedor.
        </p>
      </div>

      {/* Provider grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {PROVIDERS.map((p) => {
          const isSel = selected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                background: isSel ? `${p.color}0d` : "rgba(255,255,255,0.02)",
                border: `1px solid ${isSel ? `${p.color}55` : "#1e1e1e"}`,
                borderRadius: "14px",
                padding: "20px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              {p.icon}
              <div>
                <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "14px", color: "#fff", letterSpacing: "-0.02em" }}>
                  {p.name}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(117,117,117,0.7)", marginTop: "2px" }}>
                  {p.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* API Key input — appears when provider selected */}
      {provider && (
        <div
          style={{
            opacity: selected ? 1 : 0,
            transform: "translateY(0)",
            transition: "opacity 0.3s ease",
          }}
        >
          <GlassInput
            label="API Key"
            placeholder={provider.placeholder}
            value={apiKey}
            onChange={setApiKey}
            type="password"
          />
          <p style={{
            marginTop: "8px",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "rgba(117,117,117,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2L6 6M6 8L6 8.5" stroke="rgba(117,117,117,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="6" cy="6" r="5" stroke="rgba(117,117,117,0.3)" strokeWidth="1" />
            </svg>
            Chave criptografada localmente, nunca compartilhada
          </p>
        </div>
      )}
    </div>
  );
}

function StepAgent({
  selected, setSelected,
}: {
  selected: string; setSelected: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h2 style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 48px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          Contrate seu<br />primeiro agente
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em" }}>
          Do ClipMart. Você pode contratar mais a qualquer momento.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {AGENTS.map((a) => {
          const isSel = selected === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                background: isSel ? "rgba(97,174,250,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${isSel ? "rgba(97,174,250,0.35)" : "#1e1e1e"}`,
                borderRadius: "14px",
                padding: "18px 16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <span style={{ fontSize: "20px", lineHeight: 1 }}>{a.icon}</span>
                {isSel && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div>
                <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "14px", color: "#fff", letterSpacing: "-0.02em", marginBottom: "2px" }}>
                  {a.role}
                </div>
                <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: isSel ? "rgba(97,174,250,0.6)" : "rgba(117,117,117,0.5)", letterSpacing: "0.02em" }}>
                  {a.dept}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(117,117,117,0.6)", marginTop: "6px", lineHeight: 1.4 }}>
                  {a.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSuccess({ companyName, agentId }: { companyName: string; agentId: string }) {
  const agent = AGENTS.find((a) => a.id === agentId);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      if (ringRef.current) {
        gsap.fromTo(ringRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
        );
      }
    })();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", textAlign: "center", paddingTop: "16px" }}>
      {/* Animated checkmark ring */}
      <div
        ref={ringRef}
        style={{
          position: "relative",
          width: 96,
          height: 96,
          opacity: 0,
        }}
      >
        {/* Outer glow ring */}
        <div style={{
          position: "absolute",
          inset: -12,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(97,174,250,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: "rgba(97,174,250,0.08)",
          border: "1px solid rgba(97,174,250,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20L17 27L30 13" stroke="#61aefa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div>
        <h2 style={{
          fontFamily: "Geist, sans-serif",
          fontWeight: 300,
          fontSize: "clamp(28px, 4vw, 48px)",
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 1.1,
          marginBottom: "12px",
        }}>
          {companyName || "Sua empresa"}<br />está pronta
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(117,117,117,0.9)", letterSpacing: "-0.01em", maxWidth: "380px" }}>
          {agent
            ? `${agent.icon} ${agent.role} está configurado e pronto para começar. Abra o Escritório Virtual para acompanhar tudo.`
            : "Sua empresa autônoma está configurada. Abra o Escritório Virtual para começar."}
        </p>
      </div>

      {/* Mini status row */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid #1e1e1e",
        borderRadius: "16px",
        padding: "20px 24px",
        display: "flex",
        gap: "32px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {[
          { label: "Empresa", value: companyName || "—" },
          { label: "Agente", value: agent ? agent.role : "—" },
          { label: "Status", value: "Online" },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "rgba(117,117,117,0.6)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "4px" }}>
              {item.label}
            </div>
            <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", color: item.label === "Status" ? "#22c55e" : "rgba(184,184,184,0.9)", letterSpacing: "-0.02em" }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function OnboardingFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const TOTAL_STEPS = 5;

  // Step 0
  const [companyName, setCompanyName] = useState("");
  const [mission, setMission] = useState("");
  // Step 1
  const [template, setTemplate] = useState("saas");
  // Step 2
  const [provider, setProvider] = useState("claude");
  const [apiKey, setApiKey] = useState("");
  // Step 3
  const [agent, setAgent] = useState("cto");

  // Animate content on step change
  const animateTransition = useCallback(async (forward: boolean, cb: () => void) => {
    const { gsap } = await import("gsap");
    const el = contentRef.current;
    if (!el) { cb(); return; }

    await gsap.to(el, { opacity: 0, x: forward ? -24 : 24, duration: 0.25, ease: "power2.in" });
    cb();
    gsap.fromTo(el,
      { opacity: 0, x: forward ? 24 : -24 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  }, []);

  const next = useCallback(() => {
    if (step >= TOTAL_STEPS - 1) return;
    animateTransition(true, () => setStep((s) => s + 1));
  }, [step, animateTransition]);

  const back = useCallback(() => {
    if (step === 0) return;
    animateTransition(false, () => setStep((s) => s - 1));
  }, [step, animateTransition]);

  // Mount animation
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: "framerEase" }
      );
    })();
  }, []);

  // Validate step before advancing
  const canAdvance = () => {
    if (step === 0) return companyName.trim().length > 0;
    if (step === 1) return !!template;
    if (step === 2) return !!provider;
    if (step === 3) return !!agent;
    return true;
  };

  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        pointerEvents: "none",
      }} />
      {/* Radial glow */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "400px",
        background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(97,174,250,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "540px",
          background: "rgba(255,255,255,0.015)",
          border: "1px solid #1a1a1a",
          borderRadius: "24px",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          opacity: 0,
        }}
      >
        {/* Header: logo + progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="18" height="13" viewBox="0 0 22 16" fill="none">
              <path d="M6 1L2 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M11 1L7 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M16 1L12 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", letterSpacing: "-0.03em", color: "rgba(184,184,184,0.8)" }}>
              Optimus
            </span>
          </div>

          {/* Progress */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <StepLabel step={step} total={TOTAL_STEPS} />
              {step > 0 && step < TOTAL_STEPS - 1 && (
                <button
                  onClick={back}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(117,117,117,0.7)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Voltar
                </button>
              )}
            </div>
            <ProgressBar step={step} total={TOTAL_STEPS} />
          </div>
        </div>

        {/* Step content */}
        <div ref={contentRef}>
          {step === 0 && (
            <StepCompany name={companyName} setName={setCompanyName} mission={mission} setMission={setMission} />
          )}
          {step === 1 && (
            <StepTemplate selected={template} setSelected={setTemplate} />
          )}
          {step === 2 && (
            <StepProvider selected={provider} setSelected={setProvider} apiKey={apiKey} setApiKey={setApiKey} />
          )}
          {step === 3 && (
            <StepAgent selected={agent} setSelected={setAgent} />
          )}
          {step === 4 && (
            <StepSuccess companyName={companyName} agentId={agent} />
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {!isLastStep ? (
            <button
              onClick={next}
              disabled={!canAdvance()}
              className="btn-glass"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px 24px",
                background: canAdvance() ? "rgba(97,174,250,0.12)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${canAdvance() ? "rgba(97,174,250,0.3)" : "#1a1a1a"}`,
                color: canAdvance() ? "#61aefa" : "rgba(117,117,117,0.5)",
                fontSize: "15px",
                cursor: canAdvance() ? "pointer" : "not-allowed",
                transition: "all 0.25s ease",
              }}
            >
              Continuar
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <a
              href="#"
              className="btn-glass"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px 24px",
                background: "rgba(97,174,250,0.12)",
                border: "1px solid rgba(97,174,250,0.3)",
                color: "#61aefa",
                fontSize: "15px",
              }}
            >
              Abrir Escritório Virtual
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}

          {step === 0 && (
            <p style={{ textAlign: "center", fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(117,117,117,0.5)", letterSpacing: "-0.01em" }}>
              Sem cartão de crédito · Cancele quando quiser
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
