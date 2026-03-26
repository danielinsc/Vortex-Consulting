"use client";
import { useEffect, useRef, useState } from "react";

// ─── Tab data ──────────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "agents",
    label: "Agentes & Times",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M12 9c1.7 0 3 1.3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Times autônomos que funcionam como uma empresa real",
    description:
      "Cada agente tem papel, responsabilidades e entende a missão da empresa. Eles operam em ciclos de heartbeat: acordam, verificam tarefas, executam e reportam.",
    features: [
      "28+ agentes pré-configurados no ClipMart",
      "Hierarquia de org chart com reporting lines",
      "Heartbeat engine: estado persistente entre ciclos",
      "Execução atômica, sem tarefas duplicadas",
      "Reuniões de scrum entre agentes com agenda automática",
      "Compatível com Claude, OpenAI, Gemini, Cursor e HTTP",
    ],
    visual: {
      type: "org",
      nodes: [
        { label: "CEO", status: "active", x: 50, y: 8 },
        { label: "CTO", status: "active", x: 20, y: 40 },
        { label: "CMO", status: "idle", x: 50, y: 40 },
        { label: "CFO", status: "active", x: 80, y: 40 },
        { label: "Full-Stack", status: "working", x: 10, y: 72 },
        { label: "Ads Mgr", status: "idle", x: 50, y: 72 },
      ],
    },
  },
  {
    id: "office",
    label: "Escritório Virtual",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 4V3M8 4V2M11 4V3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="5" y="8" width="2" height="2" rx="0.5" fill="currentColor" opacity="0.5" />
        <rect x="9" y="8" width="2" height="2" rx="0.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    title: "Veja seus agentes trabalhando em tempo real",
    description:
      "Um ambiente visual estilo pixel art onde você acompanha cada agente: quem está trabalhando, em reunião, ocioso ou com erro. Clique para ver tarefas e gastos.",
    features: [
      "Mapa isométrico pixel art com departamentos",
      "Status em tempo real: ativo, ocioso, em reunião, erro",
      "Clique no agente para ver tarefas e transcrição",
      "Sala de reunião para scrums automáticos",
      "Áreas separadas por departamento",
      "Conectado a dados reais, não é decoração",
    ],
    visual: {
      type: "office",
      rooms: ["Executive", "Tech", "Marketing", "Finance", "Operations"],
    },
  },
  {
    id: "finance",
    label: "Controle Financeiro",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 12L6 8L9 10L13 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13" cy="5" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    title: "Gastos previsíveis. Nunca estoure o budget.",
    description:
      "Cada agente tem um orçamento mensal em tokens. Hard-stop automático quando o limite é atingido. Rastreamento granular por agente, tarefa, projeto e empresa.",
    features: [
      "Orçamento por agente com hard-stop automático",
      "Rastreamento de tokens em tempo real (BRL e USD)",
      "Incidentes de budget com alertas soft e hard",
      "Histórico de gastos por modelo, agente e projeto",
      "Billing via Stripe (USD) e Pix (BRL)",
      "Dashboard financeiro com gráficos de consumo",
    ],
    visual: {
      type: "finance",
      bars: [
        { label: "CTO", pct: 72, color: "#61aefa" },
        { label: "CMO", pct: 45, color: "#61aefa" },
        { label: "CFO", pct: 88, color: "#f59e0b" },
        { label: "Full-Stack", pct: 30, color: "#61aefa" },
        { label: "Ads Mgr", pct: 95, color: "#ef4444" },
      ],
    },
  },
  {
    id: "governance",
    label: "Governança & Audit",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2L3 5V9C3 11.8 5.2 14.4 8 15C10.8 14.4 13 11.8 13 9V5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Você é o board. Os agentes executam, você aprova.",
    description:
      "Gates de aprovação obrigatórios para decisões críticas. Audit trail imutável com rollback de qualquer ação. Conformidade com LGPD e isolamento total por empresa.",
    features: [
      "Gates de aprovação configuráveis por tipo de decisão",
      "Audit trail imutável de todas as ações dos agentes",
      "Rollback de qualquer decisão com um clique",
      "Rastreamento completo de tool calls e raciocínio",
      "Isolamento total de dados multi-empresa",
      "Conformidade LGPD com consentimento e retenção",
    ],
    visual: {
      type: "audit",
      events: [
        { type: "approval", label: "Deploy aprovado", time: "agora" },
        { type: "action", label: "Código commitado", time: "2min" },
        { type: "approval", label: "Budget aumentado", time: "15min" },
        { type: "action", label: "Agente contratado", time: "1h" },
      ],
    },
  },
  {
    id: "clipmart",
    label: "ClipMart",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 4h12M4 4V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 8h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    title: "Marketplace de agentes prontos para contratar",
    description:
      "28+ templates de agentes, 8 packs de times e 5 templates de empresa completos. Importe em segundos e comece a operar.",
    features: [
      "28+ agentes: CEO, CFO, CMO, CTO, Devs, Designers, SDRs",
      "8 packs de times pré-configurados por departamento",
      "5 templates de empresa prontos (SaaS, E-commerce, Agência…)",
      "Sistema de plugins com SDK para extensões customizadas",
      "Comissão de 15-30% para criadores do marketplace",
      "Listagens gratuitas e pagas com reviews",
    ],
    visual: {
      type: "clipmart",
      cards: [
        { role: "CEO", dept: "Executive", icon: "👑" },
        { role: "CTO", dept: "Tecnologia", icon: "💻" },
        { role: "CMO", dept: "Marketing", icon: "📣" },
        { role: "CFO", dept: "Financeiro", icon: "💰" },
        { role: "Full-Stack", dept: "Tecnologia", icon: "⚙️" },
        { role: "UX Designer", dept: "Produto", icon: "🎨" },
      ],
    },
  },
];

// ─── Visual renderers ──────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  active: "#22c55e",
  idle: "#eab308",
  working: "#61aefa",
  error: "#ef4444",
};

function OrgVisual({ nodes }: { nodes: Array<{ label: string; status: string; x: number; y: number }> }) {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* Lines: CEO → CTO, CMO, CFO */}
        <line x1="50%" y1="18%" x2="20%" y2="36%" stroke="#222" strokeWidth="1" />
        <line x1="50%" y1="18%" x2="50%" y2="36%" stroke="#222" strokeWidth="1" />
        <line x1="50%" y1="18%" x2="80%" y2="36%" stroke="#222" strokeWidth="1" />
        {/* CTO → Full-Stack */}
        <line x1="20%" y1="52%" x2="10%" y2="68%" stroke="#222" strokeWidth="1" />
        {/* CMO → Ads */}
        <line x1="50%" y1="52%" x2="50%" y2="68%" stroke="#222" strokeWidth="1" />
      </svg>
      {nodes.map((n) => (
        <div
          key={n.label}
          style={{
            position: "absolute",
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: "translate(-50%, -50%)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid #222",
            borderRadius: "10px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_COLORS[n.status], flexShrink: 0 }} />
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(184,184,184,0.8)", letterSpacing: "0.02em" }}>
            {n.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function OfficeVisual({ rooms }: { rooms: string[] }) {
  const deptColors: Record<string, string> = {
    Executive: "#61aefa",
    Tech: "#22c55e",
    Marketing: "#f59e0b",
    Finance: "#a78bfa",
    Operations: "#fb923c",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", justifyContent: "center" }}>
      {rooms.map((room) => (
        <div key={room} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 10,
            height: 10,
            borderRadius: "3px",
            background: deptColors[room] ? `${deptColors[room]}33` : "#222",
            border: `1px solid ${deptColors[room] ?? "#222"}55`,
            flexShrink: 0,
          }} />
          <div style={{
            flex: 1,
            height: 32,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${deptColors[room] ?? "#222"}22`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: "6px",
          }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.7)" }}>{room}</span>
            <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: deptColors[room] ?? "#333", opacity: 0.7 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function FinanceVisual({ bars }: { bars: Array<{ label: string; pct: number; color: string }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%", justifyContent: "center" }}>
      {bars.map((b) => (
        <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.8)", letterSpacing: "0.02em" }}>{b.label}</span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: b.pct > 90 ? "#ef4444" : b.pct > 75 ? "#f59e0b" : "rgba(117,117,117,0.6)" }}>
              {b.pct}%
            </span>
          </div>
          <div style={{ height: 4, background: "#111", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${b.pct}%`,
              borderRadius: "4px",
              background: b.pct > 90 ? "#ef4444" : b.pct > 75 ? "#f59e0b" : b.color,
              transition: "width 0.6s ease",
            }} />
          </div>
        </div>
      ))}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(117,117,117,0.5)", marginTop: "4px" }}>
        Budget mensal por agente · hard-stop automático
      </p>
    </div>
  );
}

function AuditVisual({ events }: { events: Array<{ type: string; label: string; time: string }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0", height: "100%", justifyContent: "center" }}>
      {events.map((e, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", paddingBottom: i < events.length - 1 ? "16px" : 0, position: "relative" }}>
          {/* Line */}
          {i < events.length - 1 && (
            <div style={{ position: "absolute", left: 9, top: 20, bottom: 0, width: 1, background: "#1a1a1a" }} />
          )}
          {/* Dot */}
          <div style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: e.type === "approval" ? "rgba(97,174,250,0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${e.type === "approval" ? "rgba(97,174,250,0.3)" : "#222"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            zIndex: 1,
          }}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              {e.type === "approval"
                ? <path d="M1.5 4L3 5.5L6.5 2.5" stroke="#61aefa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                : <circle cx="4" cy="4" r="1.5" fill="rgba(117,117,117,0.5)" />
              }
            </svg>
          </div>
          <div style={{ flex: 1, paddingTop: "1px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(184,184,184,0.9)", letterSpacing: "-0.01em" }}>
              {e.label}
            </span>
            <span style={{ marginLeft: "8px", fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.5)" }}>
              {e.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClipMartVisual({ cards }: { cards: Array<{ role: string; dept: string; icon: string }> }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", height: "100%", alignContent: "center" }}>
      {cards.map((c) => (
        <div key={c.role} style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1a1a1a",
          borderRadius: "10px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}>
          <span style={{ fontSize: "16px", lineHeight: 1 }}>{c.icon}</span>
          <div>
            <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "12px", color: "rgba(184,184,184,0.9)", letterSpacing: "-0.02em" }}>
              {c.role}
            </div>
            <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(97,174,250,0.5)", marginTop: "2px" }}>
              {c.dept}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TabVisual({ tab }: { tab: typeof TABS[number] }) {
  const v = tab.visual as any;
  if (tab.id === "agents") return <OrgVisual nodes={v.nodes} />;
  if (tab.id === "office") return <OfficeVisual rooms={v.rooms} />;
  if (tab.id === "finance") return <FinanceVisual bars={v.bars} />;
  if (tab.id === "governance") return <AuditVisual events={v.events} />;
  if (tab.id === "clipmart") return <ClipMartVisual cards={v.cards} />;
  return null;
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PlatformShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        gsap.fromTo(".showcase-header",
          { opacity: 0.001, y: 32 },
          { opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
        );
        gsap.fromTo(".showcase-tabs",
          { opacity: 0.001, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: "framerEase", delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
        );
        gsap.fromTo(".showcase-panel",
          { opacity: 0.001, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: "framerEase", delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  // Animate content on tab change
  const handleTabChange = async (idx: number) => {
    if (idx === activeTab) return;
    const { gsap } = await import("gsap");
    const el = contentRef.current;
    if (el) {
      await gsap.to(el, { opacity: 0, y: 8, duration: 0.15, ease: "power2.in" });
      setActiveTab(idx);
      gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
    } else {
      setActiveTab(idx);
    }
  };

  const tab = TABS[activeTab];

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "112px 0", borderTop: "1px solid #111" }}>
      <div className="section-container">

        {/* Header */}
        <div className="showcase-header" style={{ opacity: 0.001, textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(97,174,250,0.6)",
            marginBottom: "16px",
          }}>
            Plataforma Completa
          </p>
          <h2 className="h2-section" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Tudo que você precisa para operar AI&#8209;First
          </h2>
        </div>

        {/* Tab pills */}
        <div
          className="showcase-tabs"
          style={{
            opacity: 0.001,
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          {TABS.map((t, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={t.id}
                onClick={() => handleTabChange(idx)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "9px 16px",
                  borderRadius: "62px",
                  border: `1px solid ${isActive ? "rgba(97,174,250,0.35)" : "#222"}`,
                  background: isActive ? "rgba(97,174,250,0.08)" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#61aefa" : "rgba(117,117,117,0.8)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ opacity: isActive ? 1 : 0.6 }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          className="showcase-panel"
          style={{
            opacity: 0.001,
            background: "rgba(255,255,255,0.015)",
            border: "1px solid #1a1a1a",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <div ref={contentRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "440px" }}>

            {/* Left: text */}
            <div style={{
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              borderRight: "1px solid #1a1a1a",
            }}>
              {/* Tab badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#61aefa", opacity: 0.8 }}>{tab.icon}</span>
                <span style={{
                  fontFamily: "Geist Mono, monospace",
                  fontSize: "11px",
                  color: "rgba(97,174,250,0.6)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {tab.label}
                </span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: "Geist, sans-serif",
                  fontWeight: 300,
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  lineHeight: 1.25,
                  marginBottom: "12px",
                }}>
                  {tab.title}
                </h3>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                  color: "rgba(117,117,117,0.9)",
                }}>
                  {tab.description}
                </p>
              </div>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {tab.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "rgba(97,174,250,0.1)",
                      border: "1px solid rgba(97,174,250,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2.5" stroke="#61aefa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(184,184,184,0.85)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: visual */}
            <div style={{
              padding: "40px",
              background: "rgba(0,0,0,0.4)",
              position: "relative",
              overflow: "hidden",
              minHeight: "360px",
            }}>
              {/* Subtle glow */}
              <div style={{
                position: "absolute",
                top: "-40px",
                right: "-40px",
                width: "200px",
                height: "200px",
                background: "radial-gradient(ellipse, rgba(97,174,250,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
              <TabVisual tab={tab} />
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="border-right: 1px solid #1a1a1a"] {
            border-right: none !important;
            border-bottom: 1px solid #1a1a1a !important;
          }
        }
      `}</style>
    </section>
  );
}
