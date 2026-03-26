"use client";
import { useState } from "react";

const AGENTS = [
  { name: "CEO", role: "Executivo", model: "Opus", status: "running", task: "Decompondo meta Q2 em projetos estratégicos", spend: "R$286", pct: 48 },
  { name: "CTO", role: "Tecnologia", model: "Sonnet", status: "running", task: "Code review — auth module PR#42", spend: "R$198", pct: 35 },
  { name: "CMO", role: "Marketing", model: "Sonnet", status: "idle", task: "Aguardando aprovação de campanha Google Ads", spend: "R$112", pct: 20 },
  { name: "CFO", role: "Financeiro", model: "Haiku", status: "idle", task: "Relatório mensal Q1 gerado e enviado", spend: "R$64", pct: 12 },
  { name: "Full-Stack", role: "Tecnologia", model: "Sonnet", status: "running", task: "Implementando endpoint /api/agents", spend: "R$147", pct: 29 },
  { name: "DevOps", role: "Tecnologia", model: "Haiku", status: "idle", task: "Pipeline CI/CD configurado — aguardando deploy", spend: "R$38", pct: 8 },
  { name: "Ads Manager", role: "Marketing", model: "Haiku", status: "paused", task: "Pausado — budget mensal atingido (96%)", spend: "R$312", pct: 96 },
  { name: "SDR", role: "Vendas", model: "Sonnet", status: "idle", task: "Lista de prospecção de Q2 gerada", spend: "R$89", pct: 17 },
];

const TABS = ["Todos", "Em execução", "Ociosos", "Pausados"];

const statusDot = (s: string): React.CSSProperties => ({
  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
  background: s === "running" ? "#fff" : s === "paused" ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
});

const statusLabel: Record<string, string> = { running: "executando", idle: "ocioso", paused: "pausado" };

export default function AgentsPage() {
  const [tab, setTab] = useState("Todos");

  const filtered = AGENTS.filter((a) => {
    if (tab === "Em execução") return a.status === "running";
    if (tab === "Ociosos") return a.status === "idle";
    if (tab === "Pausados") return a.status === "paused";
    return true;
  });

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
            Agentes
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            {AGENTS.filter(a => a.status === "running").length} em execução · {AGENTS.length} total
          </p>
        </div>
        <a href="/app/clipmart" style={{
          fontFamily: "Inter, sans-serif", fontSize: "13px",
          padding: "8px 16px", borderRadius: "6px",
          background: "#fff", color: "#000", textDecoration: "none", fontWeight: 500,
        }}>
          + Contratar agente
        </a>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", padding: "3px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "8px", width: "fit-content" }}>
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            fontFamily: "Inter, sans-serif", fontSize: "12px",
            padding: "6px 14px", borderRadius: "5px", border: "none", cursor: "pointer",
            background: tab === t ? "#fff" : "transparent",
            color: tab === t ? "#000" : "rgba(255,255,255,0.35)",
            fontWeight: tab === t ? 500 : 400,
            transition: "all 0.15s",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "12px" }}>
        {filtered.map((a) => (
          <div key={a.name} style={{
            background: "#000", border: "1px solid #1a1a1a", borderRadius: "12px",
            padding: "20px", display: "flex", flexDirection: "column", gap: "14px",
          }}>
            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={statusDot(a.status)} />
                <div>
                  <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", color: "#fff", marginBottom: "2px" }}>{a.name}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>{a.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.3)" }}>
                  {a.model}
                </span>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>
                  {statusLabel[a.status]}
                </span>
              </div>
            </div>

            {/* Task */}
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "12px",
              color: "rgba(255,255,255,0.4)", lineHeight: 1.5,
              overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box",
              WebkitLineClamp: 2, WebkitBoxOrient: "vertical", margin: 0,
            }}>
              {a.task}
            </p>

            {/* Budget bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>Budget mensal</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{a.spend}</span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: a.pct > 90 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>
                    {a.pct}%
                  </span>
                </div>
              </div>
              <div style={{ height: 2, background: "#111", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${a.pct}%`, borderRadius: "2px",
                  background: a.pct > 90 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
                }} />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "6px" }}>
              <button style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", padding: "5px 12px", borderRadius: "6px", border: "1px solid #1a1a1a", background: "transparent", color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>
                Ver logs
              </button>
              <button style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", padding: "5px 12px", borderRadius: "6px", border: "1px solid #1a1a1a", background: "transparent", color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>
                {a.status === "paused" ? "Retomar" : "Pausar"}
              </button>
              <button style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", padding: "5px 12px", borderRadius: "6px", border: "1px solid #333", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", cursor: "pointer", marginLeft: "auto" }}>
                Delegar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
