"use client";

const AGENTS = [
  { name: "CEO", role: "Executive", status: "running", task: "Decompondo meta Q2 em projetos", model: "Opus", spend: "R$286", pct: 48 },
  { name: "CTO", role: "Tecnologia", status: "running", task: "Code review — auth module PR#42", model: "Sonnet", spend: "R$198", pct: 35 },
  { name: "Full-Stack", role: "Tecnologia", status: "running", task: "Implementando endpoint /api/agents", model: "Sonnet", spend: "R$147", pct: 29 },
  { name: "CMO", role: "Marketing", status: "idle", task: "Aguardando aprovação de campanha", model: "Sonnet", spend: "R$112", pct: 20 },
  { name: "CFO", role: "Financeiro", status: "idle", task: "Relatório mensal gerado", model: "Haiku", spend: "R$64", pct: 12 },
  { name: "Ads Manager", role: "Marketing", status: "paused", task: "Budget mensal atingido — pausado", model: "Haiku", spend: "R$312", pct: 96 },
];

const ACTIVITY = [
  { actor: "CTO", verb: "commitou código em", target: "ENG-042", time: "agora" },
  { actor: "Board", verb: "aprovou", target: "Deploy v2.1", time: "2min" },
  { actor: "Full-Stack", verb: "abriu PR para", target: "ENG-039", time: "5min" },
  { actor: "CFO", verb: "reportou custo para", target: "Budget Q1", time: "8min" },
  { actor: "CMO", verb: "criou campanha", target: "MKT-018", time: "20min" },
  { actor: "CEO", verb: "delegou tarefa para", target: "CTO", time: "34min" },
];

const statusDot = (s: string) => ({
  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
  background: s === "running" ? "#fff" : s === "paused" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
} as React.CSSProperties);

export default function DashboardPage() {
  return (
    <div style={{ padding: "40px 48px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
              3 AGENTES EM EXECUÇÃO
            </span>
          </div>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "26px", color: "#fff", letterSpacing: "-0.03em", margin: 0 }}>
            Dashboard
          </h1>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <a href="/app/approvals" style={btnGhost}>3 aprovações pendentes</a>
          <a href="/app/agents" style={btnPrimary}>+ Agente</a>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#1a1a1a", borderRadius: "10px", overflow: "hidden", marginBottom: "32px" }}>
        {[
          { value: "7", label: "Agentes ativos" },
          { value: "23", label: "Tarefas abertas" },
          { value: "R$847", label: "Custo este mês" },
          { value: "3", label: "Aprovações pendentes" },
        ].map((m) => (
          <div key={m.label} style={{ background: "#000", padding: "24px 28px" }}>
            <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "30px", color: "#fff", letterSpacing: "-0.04em", marginBottom: "4px" }}>
              {m.value}
            </div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>

        {/* Agents table */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #111" }}>
            <span style={labelMono}>AGENTES</span>
            <a href="/app/agents" style={linkStyle}>Ver todos →</a>
          </div>
          {/* Col headers */}
          <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 72px 60px 48px", gap: "12px", padding: "10px 20px", borderBottom: "1px solid #0d0d0d" }}>
            {["Agente", "Tarefa", "Modelo", "Gasto", "%"].map(h => (
              <span key={h} style={colHeader}>{h}</span>
            ))}
          </div>
          {AGENTS.map((a, i) => (
            <div key={a.name} style={{
              display: "grid", gridTemplateColumns: "120px 1fr 72px 60px 48px",
              gap: "12px", padding: "13px 20px", alignItems: "center",
              borderBottom: i < AGENTS.length - 1 ? "1px solid #080808" : "none",
              background: i % 2 === 0 ? "#000" : "#030303",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={statusDot(a.status)} />
                <div>
                  <div style={cellPrimary}>{a.name}</div>
                  <div style={cellMuted}>{a.role}</div>
                </div>
              </div>
              <span style={{ ...cellMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.task}</span>
              <span style={cellMono}>{a.model}</span>
              <span style={cellMono}>{a.spend}</span>
              <div>
                <div style={{ height: 2, background: "#111", borderRadius: "2px", overflow: "hidden", marginBottom: "3px" }}>
                  <div style={{ height: "100%", width: `${a.pct}%`, background: a.pct > 90 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)", borderRadius: "2px" }} />
                </div>
                <span style={{ ...cellMono, fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>{a.pct}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #111" }}>
            <span style={labelMono}>ATIVIDADE</span>
            <a href="/app/activity" style={linkStyle}>Ver tudo →</a>
          </div>
          {ACTIVITY.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              padding: "12px 20px",
              borderBottom: i < ACTIVITY.length - 1 ? "1px solid #080808" : "none",
              background: i % 2 === 0 ? "#000" : "#030303",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? "#fff" : "rgba(255,255,255,0.2)", flexShrink: 0, marginTop: 5 }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, flex: 1, margin: 0 }}>
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item.actor}</span>
                {" "}{item.verb}{" "}
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.target}</span>
              </p>
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", flexShrink: 0, paddingTop: 2 }}>{item.time}</span>
            </div>
          ))}
          {/* Quick links */}
          <div style={{ padding: "12px 20px", borderTop: "1px solid #111", display: "flex", flexDirection: "column", gap: "1px" }}>
            {[
              { href: "/app/clipmart", label: "ClipMart — contratar agentes" },
              { href: "/app/virtual-office", label: "Escritório Virtual" },
              { href: "/app/costs", label: "Análise de custos" },
            ].map(l => (
              <a key={l.href} href={l.href} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 0", textDecoration: "none",
                fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)",
                borderBottom: "1px solid #080808",
              }}>
                {l.label} <span style={{ opacity: 0.4 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Heartbeat bar */}
      <div style={{
        marginTop: "20px", background: "#000", border: "1px solid #1a1a1a",
        borderRadius: "10px", padding: "16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
            <span style={labelMono}>HEARTBEAT ATIVO — ciclo #2.847</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>Próximo em 4m 23s</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {[{ v: "99.5%", l: "Uptime" }, { v: "3", l: "Live" }, { v: "R$847", l: "Mês" }].map(s => (
            <div key={s.l} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "16px", color: "#fff", letterSpacing: "-0.03em" }}>{s.v}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────

const labelMono: React.CSSProperties = { fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" };
const linkStyle: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", textDecoration: "none" };
const colHeader: React.CSSProperties = { fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" };
const cellPrimary: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.85)" };
const cellMuted: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" };
const cellMono: React.CSSProperties = { fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)" };
const btnPrimary: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontSize: "13px", padding: "8px 16px", borderRadius: "6px", background: "#fff", color: "#000", textDecoration: "none", fontWeight: 500 };
const btnGhost: React.CSSProperties = { fontFamily: "Inter, sans-serif", fontSize: "13px", padding: "8px 16px", borderRadius: "6px", background: "transparent", border: "1px solid #222", color: "rgba(255,255,255,0.5)", textDecoration: "none" };
