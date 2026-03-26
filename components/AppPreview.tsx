"use client";
import { useEffect, useRef } from "react";

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  {
    label: "Dashboard", active: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>,
  },
  {
    label: "Agentes", active: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
  },
  {
    label: "Escritório", active: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.2"/></svg>,
  },
  {
    label: "Financeiro", active: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10L5 6.5L7.5 8.5L12 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: "ClipMart", active: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M3.5 3.5V2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1M2.5 3.5l1 8h7l1-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: "Aprovações", active: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5L2 4V7.5C2 10 4.2 12.3 7 13C9.8 12.3 12 10 12 7.5V4L7 1.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M4.5 7L6 8.5L9.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

const SIDEBAR_AGENTS = [
  { name: "CEO", status: "active" },
  { name: "CTO", status: "working" },
  { name: "CMO", status: "idle" },
  { name: "CFO", status: "active" },
];

const STATUS_DOT: Record<string, string> = {
  active: "#22c55e",
  working: "#61aefa",
  idle: "#eab308",
  error: "#ef4444",
};

function AppSidebar() {
  return (
    <div style={{
      width: 160,
      flexShrink: 0,
      borderRight: "1px solid #1a1a1a",
      display: "flex",
      flexDirection: "column",
      background: "#000",
    }}>
      {/* Company name bar */}
      <div style={{
        height: 40,
        borderBottom: "1px solid #111",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: "8px",
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "3px", background: "#61aefa", flexShrink: 0 }} />
        <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "12px", color: "rgba(184,184,184,0.9)", letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Acme Corp
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: "8px 6px", display: "flex", flexDirection: "column", gap: "1px" }}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 8px",
            borderRadius: "6px",
            background: item.active ? "rgba(255,255,255,0.06)" : "transparent",
            color: item.active ? "#fff" : "rgba(117,117,117,0.7)",
          }}>
            <span style={{ flexShrink: 0, opacity: item.active ? 1 : 0.6 }}>{item.icon}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.label}
            </span>
            {item.label === "Aprovações" && (
              <span style={{ marginLeft: "auto", background: "#ef4444", borderRadius: "62px", width: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", color: "#fff", fontFamily: "Geist Mono, monospace", flexShrink: 0 }}>
                3
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Agents section */}
      <div style={{ padding: "0 6px 8px", marginTop: "4px", borderTop: "1px solid #111" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(117,117,117,0.5)", padding: "8px 8px 4px" }}>
          Agentes
        </p>
        {SIDEBAR_AGENTS.map((a) => (
          <div key={a.name} style={{ display: "flex", alignItems: "center", gap: "7px", padding: "4px 8px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[a.status], flexShrink: 0 }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(117,117,117,0.7)", letterSpacing: "-0.01em" }}>{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Metric Cards ─────────────────────────────────────────────────────────────

const METRICS = [
  { label: "Agentes", value: "7", sub: "3 em execução", accent: "#22c55e" },
  { label: "Tarefas abertas", value: "23", sub: "↑ 4 hoje", accent: "#61aefa" },
  { label: "Custo este mês", value: "R$847", sub: "66% do budget", accent: "#f59e0b" },
  { label: "Em execução", value: "3", sub: "ciclo ativo", accent: "#a78bfa" },
];

function MetricsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "12px" }}>
      {METRICS.map((m) => (
        <div key={m.label} style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1a1a1a",
          borderRadius: "8px",
          padding: "12px",
        }}>
          <p style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "18px", letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
            {m.value}
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(117,117,117,0.7)", marginTop: "4px", letterSpacing: "-0.01em" }}>
            {m.label}
          </p>
          <p style={{ fontFamily: "Geist Mono, monospace", fontSize: "8px", color: m.accent, marginTop: "3px", opacity: 0.8 }}>
            {m.sub}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Active Agents Panel ──────────────────────────────────────────────────────

const ACTIVE_AGENTS = [
  { name: "CTO", task: "Revisando PR #142, refactor do módulo de billing", status: "working", since: "8min" },
  { name: "CMO", task: "Ocioso, aguardando nova tarefa", status: "idle", since: "22min" },
  { name: "CFO", task: "Gerando relatório de custos Q1", status: "active", since: "3min" },
];

function AgentsPanel() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid #1a1a1a",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #111", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, color: "rgba(117,117,117,0.7)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Agentes Ativos
        </span>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(97,174,250,0.5)" }}>3 / 7</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {ACTIVE_AGENTS.map((a, i) => (
          <div key={a.name} style={{
            padding: "10px 12px",
            borderBottom: i < ACTIVE_AGENTS.length - 1 ? "1px solid #0e0e0e" : "none",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, paddingTop: "1px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: STATUS_DOT[a.status] }} />
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(184,184,184,0.8)", letterSpacing: "0.02em", minWidth: 30 }}>
                {a.name}
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.7)", lineHeight: 1.4, letterSpacing: "-0.01em", flex: 1 }}>
              {a.task}
            </p>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.4)", flexShrink: 0 }}>{a.since}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Activity Feed ────────────────────────────────────────────────────────────

const ACTIVITY = [
  { actor: "CTO", verb: "checkout de", target: "ENG-042", time: "agora", dot: "#61aefa" },
  { actor: "Board", verb: "aprovou", target: "Deploy v2.1", time: "2min", dot: "#22c55e" },
  { actor: "CMO", verb: "criou", target: "MKT-018", time: "5min", dot: "#61aefa" },
  { actor: "CFO", verb: "registrou custo", target: "R$284", time: "11min", dot: "#f59e0b" },
  { actor: "CTO", verb: "comentou em", target: "ENG-039", time: "18min", dot: "#61aefa" },
  { actor: "CMO", verb: "solicitou aprovação", target: "Budget Ads", time: "24min", dot: "#ef4444" },
];

function ActivityFeed() {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid #1a1a1a",
      borderRadius: "8px",
      overflow: "hidden",
    }}>
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #111" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 500, color: "rgba(117,117,117,0.7)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Atividade Recente
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {ACTIVITY.map((e, i) => (
          <div key={i} style={{
            padding: "8px 12px",
            borderBottom: i < ACTIVITY.length - 1 ? "1px solid #0e0e0e" : "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: e.dot, flexShrink: 0 }} />
            <p style={{ flex: 1, fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.8)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              <span style={{ color: "rgba(184,184,184,0.9)", fontWeight: 500 }}>{e.actor}</span>
              {" "}{e.verb}{" "}
              <span style={{ color: "rgba(184,184,184,0.75)" }}>{e.target}</span>
            </p>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.4)", flexShrink: 0 }}>{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function AppPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");
      CustomEase.create("framerScale", "0.12, 0.23, 0.5, 1");

      ctx = gsap.context(() => {
        gsap.fromTo(".app-header",
          { opacity: 0.001, y: 32 },
          { opacity: 1, y: 0, duration: 1.2, ease: "framerEase",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
        );
        gsap.fromTo(frameRef.current,
          { opacity: 0.001, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: "framerScale", delay: 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "112px 0", overflow: "hidden" }}>
      <div className="section-container">

        {/* Header */}
        <div className="app-header" style={{ opacity: 0.001, textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(97,174,250,0.6)",
            marginBottom: "16px",
          }}>
            O App
          </p>
          <h2 className="h2-section" style={{ maxWidth: "600px", margin: "0 auto 16px" }}>
            O painel que você queria ter
          </h2>
          <p className="body-m" style={{ maxWidth: "480px", margin: "0 auto" }}>
            Dashboard em tempo real com métricas, agentes ativos, feed de atividade e controle total. Tudo em um lugar.
          </p>
        </div>

        {/* App frame */}
        <div
          ref={frameRef}
          style={{
            opacity: 0.001,
            border: "1px solid #222",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#050505",
            boxShadow: "0 0 0 1px #111, 0 32px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Browser chrome */}
          <div style={{
            height: 36,
            background: "#080808",
            borderBottom: "1px solid #1a1a1a",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: "6px",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
            <div style={{
              flex: 1,
              margin: "0 12px",
              height: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid #1a1a1a",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              paddingLeft: "8px",
            }}>
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.4)" }}>
                app.optimus.ai / dashboard
              </span>
            </div>
          </div>

          {/* App layout */}
          <div style={{ display: "flex", height: 420 }}>
            <AppSidebar />

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Top bar */}
              <div style={{
                height: 40,
                borderBottom: "1px solid #111",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                gap: "8px",
              }}>
                <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "12px", color: "rgba(117,117,117,0.6)", letterSpacing: "-0.02em" }}>
                  Dashboard
                </span>
                <span style={{ color: "#333", fontSize: "10px" }}>/</span>
                <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "12px", color: "rgba(184,184,184,0.8)", letterSpacing: "-0.02em" }}>
                  Acme Corp
                </span>
                {/* Live indicator */}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(34,197,94,0.7)" }}>live</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: "12px", overflow: "hidden", display: "flex", flexDirection: "column", gap: "10px" }}>
                <MetricsRow />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flex: 1, minHeight: 0 }}>
                  <AgentsPanel />
                  <ActivityFeed />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Callout chips below frame */}
        <div style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "32px",
        }}>
          {[
            "Dashboard em tempo real",
            "Sidebar com org chart",
            "Métricas por empresa",
            "Feed de atividade",
            "Status dos agentes",
            "Navegação por módulo",
          ].map((chip) => (
            <span key={chip} style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "rgba(117,117,117,0.7)",
              letterSpacing: "-0.01em",
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="rgba(97,174,250,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="width: 160px"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
