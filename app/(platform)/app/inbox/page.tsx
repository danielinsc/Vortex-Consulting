"use client";
import { useState } from "react";

const MESSAGES = [
  { id: 1, from: "CTO", subject: "PR#42 — auth module pronto para review", body: "Implementei o módulo OAuth2 conforme especificado. Aguardando aprovação para merge em main.", time: "agora", read: false, tag: "Código" },
  { id: 2, from: "CEO", subject: "Delegação: análise de custo Q2 para CFO", body: "CFO, preciso de um breakdown de custo por departamento para a reunião de amanhã.", time: "5min", read: false, tag: "Delegação" },
  { id: 3, from: "Ads Manager", subject: "Budget 96% — solicitando expansão", body: "Atingi 96% do budget mensal. Campanha de maior ROAS pausada. Recomendo aprovação de +R$188.", time: "12min", read: false, tag: "Alerta" },
  { id: 4, from: "CMO", subject: "Campanha Google Ads aguardando aprovação", body: "Criei a campanha Q2 com copy e segmentação. ROI estimado 3.2x. Aguardando sua aprovação.", time: "30min", read: true, tag: "Aprovação" },
  { id: 5, from: "CFO", subject: "Relatório mensal Q1 gerado", body: "Relatório FIN-007 disponível no dashboard. Custo médio por issue: R$1,82 (abaixo do target).", time: "1h", read: true, tag: "Relatório" },
  { id: 6, from: "Full-Stack", subject: "Endpoint /api/agents implementado", body: "ENG-043 concluído. Endpoint com paginação, filtros por status e suporte a sorting. Tests passando.", time: "2h", read: true, tag: "Código" },
  { id: 7, from: "Board", subject: "OKRs Q2 aprovados", body: "Os 5 projetos estratégicos foram aprovados. CEO pode iniciar decomposição e atribuição de times.", time: "3h", read: true, tag: "Aprovação" },
];

const TABS = ["Todos", "Não lidos", "Aprovações", "Alertas"];

export default function InboxPage() {
  const [tab, setTab] = useState("Todos");
  const [selected, setSelected] = useState<number | null>(1);

  const filtered = MESSAGES.filter((m) => {
    if (tab === "Não lidos") return !m.read;
    if (tab === "Aprovações") return m.tag === "Aprovação";
    if (tab === "Alertas") return m.tag === "Alerta";
    return true;
  });

  const unread = MESSAGES.filter(m => !m.read).length;
  const selectedMsg = MESSAGES.find(m => m.id === selected);

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Caixa de entrada
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          {unread} não lidas · {MESSAGES.length} total
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px", padding: "3px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "8px", width: "fit-content" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "12px", height: "calc(100vh - 280px)", minHeight: 400 }}>
        {/* Message list */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {filtered.map((m, i) => (
            <div key={m.id} onClick={() => setSelected(m.id)} style={{
              padding: "14px 16px",
              borderBottom: i < filtered.length - 1 ? "1px solid #0d0d0d" : "none",
              background: selected === m.id ? "rgba(255,255,255,0.05)" : i % 2 === 0 ? "#000" : "#030303",
              cursor: "pointer",
              borderLeft: selected === m.id ? "2px solid #fff" : "2px solid transparent",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: m.read ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.85)", fontWeight: m.read ? 400 : 500 }}>
                  {m.from}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {!m.read && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{m.time}</span>
                </div>
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: m.read ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.65)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: "4px" }}>
                {m.subject}
              </div>
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 6px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "1px solid #111", color: "rgba(255,255,255,0.25)" }}>
                {m.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "24px" }}>
          {selectedMsg ? (
            <>
              <div style={{ marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #111" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "2px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.3)" }}>
                    {selectedMsg.tag}
                  </span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{selectedMsg.time}</span>
                </div>
                <h2 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "18px", color: "#fff", letterSpacing: "-0.02em", margin: "0 0 6px" }}>
                  {selectedMsg.subject}
                </h2>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>
                  de {selectedMsg.from}
                </span>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "0 0 24px" }}>
                {selectedMsg.body}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "none", background: "#fff", color: "#000", cursor: "pointer", fontWeight: 500 }}>
                  Responder
                </button>
                <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "1px solid #1a1a1a", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                  Delegar
                </button>
                <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 16px", borderRadius: "6px", border: "1px solid #111", background: "transparent", color: "rgba(255,255,255,0.2)", cursor: "pointer", marginLeft: "auto" }}>
                  Arquivar
                </button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "rgba(255,255,255,0.15)", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
              Selecione uma mensagem
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
