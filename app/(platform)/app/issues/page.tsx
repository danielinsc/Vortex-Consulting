"use client";
import { useState } from "react";

const ISSUES = [
  { id: "ENG-042", title: "Implementar módulo de autenticação OAuth2", status: "em andamento", priority: "alta", agent: "CTO", project: "Backend API", updated: "agora" },
  { id: "ENG-043", title: "Refatorar endpoint /api/agents para suporte a paginação", status: "em andamento", priority: "media", agent: "Full-Stack", project: "Backend API", updated: "5min" },
  { id: "ENG-044", title: "Setup CI/CD pipeline para staging environment", status: "aberto", priority: "media", agent: "DevOps", project: "Infraestrutura", updated: "12min" },
  { id: "MKT-018", title: "Criar copy para campanha Google Ads Q2", status: "em revisão", priority: "alta", agent: "CMO", project: "Growth Q2", updated: "20min" },
  { id: "FIN-007", title: "Relatório de custos por agente — Março 2026", status: "concluído", priority: "media", agent: "CFO", project: "Financeiro", updated: "1h" },
  { id: "ENG-039", title: "Corrigir bug no módulo de autorização (typo)", status: "concluído", priority: "baixa", agent: "Full-Stack", project: "Backend API", updated: "2h" },
  { id: "MKT-017", title: "Análise de performance das campanhas de fevereiro", status: "concluído", priority: "baixa", agent: "Ads Manager", project: "Growth Q2", updated: "3h" },
  { id: "EXE-011", title: "Definir OKRs Q2 e atribuir responsáveis por departamento", status: "em andamento", priority: "alta", agent: "CEO", project: "Estratégia", updated: "4h" },
];

const FILTERS = ["Todas", "Em andamento", "Em revisão", "Abertas", "Concluídas"];

const statusColor: Record<string, string> = {
  "em andamento": "rgba(255,255,255,0.7)",
  "em revisão": "rgba(255,255,255,0.5)",
  "aberto": "rgba(255,255,255,0.3)",
  "concluído": "rgba(255,255,255,0.2)",
};

const priorityDot: Record<string, string> = {
  alta: "rgba(255,255,255,0.8)",
  media: "rgba(255,255,255,0.4)",
  baixa: "rgba(255,255,255,0.15)",
};

export default function IssuesPage() {
  const [filter, setFilter] = useState("Todas");

  const filtered = ISSUES.filter((i) => {
    if (filter === "Em andamento") return i.status === "em andamento";
    if (filter === "Em revisão") return i.status === "em revisão";
    if (filter === "Abertas") return i.status === "aberto";
    if (filter === "Concluídas") return i.status === "concluído";
    return true;
  });

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
            Tarefas
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            {ISSUES.filter(i => i.status !== "concluído").length} ativas · {ISSUES.length} total
          </p>
        </div>
        <button style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", padding: "8px 16px", borderRadius: "6px", background: "#fff", color: "#000", border: "none", cursor: "pointer", fontWeight: 500 }}>
          + Nova tarefa
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", padding: "3px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "8px", width: "fit-content" }}>
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            fontFamily: "Inter, sans-serif", fontSize: "12px",
            padding: "6px 14px", borderRadius: "5px", border: "none", cursor: "pointer",
            background: filter === f ? "#fff" : "transparent",
            color: filter === f ? "#000" : "rgba(255,255,255,0.35)",
            fontWeight: filter === f ? 500 : 400,
            transition: "all 0.15s",
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 80px 100px 72px", gap: "12px", padding: "10px 20px", borderBottom: "1px solid #111" }}>
          {["ID", "Título", "Status", "Prioridade", "Agente", "Atualizado"].map((h) => (
            <span key={h} style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
              {h}
            </span>
          ))}
        </div>

        {filtered.map((issue, i) => (
          <div key={issue.id} style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr 120px 80px 100px 72px",
            gap: "12px",
            padding: "13px 20px",
            alignItems: "center",
            borderBottom: i < filtered.length - 1 ? "1px solid #080808" : "none",
            background: i % 2 === 0 ? "#000" : "#030303",
            cursor: "pointer",
          }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{issue.id}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {issue.title}
            </span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: statusColor[issue.status], padding: "2px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", textAlign: "center", whiteSpace: "nowrap" }}>
              {issue.status}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: priorityDot[issue.priority], flexShrink: 0 }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{issue.priority}</span>
            </div>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{issue.agent}</span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{issue.updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
