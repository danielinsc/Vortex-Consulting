"use client";
import { useState } from "react";

const APPROVALS = [
  { id: "APR-001", agent: "CTO", action: "Publicar pacote npm @optimus/auth v3.2.0 em produção", risk: "alto", status: "pending", time: "5min", detail: "Afeta 12 dependentes. Requer aprovação do Board." },
  { id: "APR-002", agent: "CMO", action: "Ativar campanha Google Ads — R$4.200/mês por 30 dias", risk: "medio", status: "pending", time: "18min", detail: "ROI estimado 3.2x com base em campanha anterior." },
  { id: "APR-003", agent: "CFO", action: "Aumentar budget mensal do Ads Manager para R$500", risk: "medio", status: "pending", time: "1h", detail: "Agente pausado em 96%. Proposta: +R$188 para completar o mês." },
  { id: "APR-004", agent: "CEO", action: "Decompor meta Q2 em 5 projetos e atribuir times", risk: "baixo", status: "approved", time: "2h", detail: "Decomposição aprovada pelo Board. Execução iniciada." },
  { id: "APR-005", agent: "Full-Stack", action: "Refatorar módulo de autenticação (typo + deps)", risk: "baixo", status: "approved", time: "3h", detail: "Auto-aprovado — risco baixo classificado pelo Orchestrator." },
  { id: "APR-006", agent: "DevOps", action: "Migrar banco para PostgreSQL 17 em staging", risk: "alto", status: "rejected", time: "5h", detail: "Rejeitado — migração agendada para próxima janela de manutenção." },
];

const TABS = ["Todos", "Pendentes", "Aprovados", "Rejeitados"];

export default function ApprovalsPage() {
  const [tab, setTab] = useState("Pendentes");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = APPROVALS.filter((a) => {
    if (tab === "Pendentes") return a.status === "pending";
    if (tab === "Aprovados") return a.status === "approved";
    if (tab === "Rejeitados") return a.status === "rejected";
    return true;
  });

  const pending = APPROVALS.filter(a => a.status === "pending").length;

  const riskOpacity: Record<string, string> = { baixo: "rgba(255,255,255,0.2)", medio: "rgba(255,255,255,0.4)", alto: "rgba(255,255,255,0.7)" };
  const statusLabel: Record<string, string> = { pending: "pendente", approved: "aprovado", rejected: "rejeitado" };

  return (
    <div style={{ padding: "32px 40px", maxWidth: 900 }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Aprovações
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          {pending} ação{pending !== 1 ? "ões" : ""} aguardando sua decisão
        </p>
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
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            {t}
            {t === "Pendentes" && pending > 0 && (
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 5px", borderRadius: "3px", background: tab === t ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.1)", color: tab === t ? "#000" : "rgba(255,255,255,0.5)" }}>
                {pending}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {filtered.map((item) => {
          const isOpen = expanded === item.id;
          return (
            <div key={item.id} style={{
              background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden",
            }}>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{item.id}</span>
                      <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>{item.agent}</span>
                      <span style={{
                        fontFamily: "Geist Mono, monospace", fontSize: "9px",
                        padding: "2px 7px", borderRadius: "4px",
                        background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a",
                        color: riskOpacity[item.risk],
                      }}>
                        risco {item.risk}
                      </span>
                    </div>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: "0 0 12px" }}>
                      {item.action}
                    </p>
                    {isOpen && (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.5, margin: "0 0 12px", borderLeft: "2px solid #1a1a1a", paddingLeft: 12 }}>
                        {item.detail}
                      </p>
                    )}
                    {item.status === "pending" && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "none", cursor: "pointer", background: "#fff", color: "#000", fontWeight: 500 }}>
                          Aprovar
                        </button>
                        <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "1px solid #1a1a1a", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.4)" }}>
                          Rejeitar
                        </button>
                        <button onClick={() => setExpanded(isOpen ? null : item.id)} style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "1px solid #111", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.25)", marginLeft: "auto" }}>
                          {isOpen ? "Ocultar" : "Detalhes"}
                        </button>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", flexShrink: 0 }}>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "2px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: item.status === "pending" ? "rgba(255,255,255,0.6)" : item.status === "approved" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}>
                      {statusLabel[item.status]}
                    </span>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
            Nenhuma aprovação nesta categoria.
          </div>
        )}
      </div>
    </div>
  );
}
