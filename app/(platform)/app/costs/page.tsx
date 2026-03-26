"use client";

const AGENTS = [
  { name: "CEO", dept: "Executivo", model: "Opus", tokens: "1.2M", spend: 286, budget: 600, pct: 48 },
  { name: "CTO", dept: "Tecnologia", model: "Sonnet", tokens: "840K", spend: 198, budget: 560, pct: 35 },
  { name: "Full-Stack", dept: "Tecnologia", model: "Sonnet", tokens: "620K", spend: 147, budget: 500, pct: 29 },
  { name: "CMO", dept: "Marketing", model: "Sonnet", tokens: "480K", spend: 112, budget: 560, pct: 20 },
  { name: "CFO", dept: "Financeiro", model: "Haiku", tokens: "380K", spend: 64, budget: 560, pct: 12 },
  { name: "DevOps", dept: "Tecnologia", model: "Haiku", tokens: "210K", spend: 38, budget: 500, pct: 8 },
  { name: "Ads Manager", dept: "Marketing", model: "Haiku", tokens: "2.1M", spend: 312, budget: 325, pct: 96 },
  { name: "SDR", dept: "Vendas", model: "Sonnet", tokens: "340K", spend: 89, budget: 500, pct: 17 },
];

const TOTALS = { spend: 1246, budget: 3105, pct: 40 };

const HISTORY = [
  { month: "Jan", value: 820 },
  { month: "Fev", value: 1090 },
  { month: "Mar", value: 1246 },
];

export default function CostsPage() {
  const maxVal = Math.max(...HISTORY.map(h => h.value));

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Custos
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Rastreamento de tokens e gastos por agente
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#1a1a1a", borderRadius: "10px", overflow: "hidden", marginBottom: "32px" }}>
        {[
          { label: "Gasto este mês", value: `R$${TOTALS.spend.toLocaleString("pt-BR")}`, sub: `de R$${TOTALS.budget.toLocaleString("pt-BR")} total` },
          { label: "Budget disponível", value: `${100 - TOTALS.pct}%`, sub: `R$${(TOTALS.budget - TOTALS.spend).toLocaleString("pt-BR")} restantes` },
          { label: "Custo médio/issue", value: "R$1,82", sub: "abaixo do target R$2,50" },
        ].map((c) => (
          <div key={c.label} style={{ background: "#000", padding: "24px 28px" }}>
            <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "30px", color: "#fff", letterSpacing: "-0.04em", marginBottom: "4px" }}>{c.value}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>{c.label}</div>
            <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>{c.sub}</div>
          </div>
        ))}
      </div>

      {/* 2 cols */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px" }}>
        {/* Budget por agente */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
              BUDGET POR AGENTE — MARÇO 2026
            </span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
              hard-stop em 100%
            </span>
          </div>

          {AGENTS.map((a) => (
            <div key={a.name} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.7)", minWidth: 80 }}>{a.name}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{a.dept}</span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 5px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.25)" }}>
                    {a.model}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
                    R${a.spend} / R${a.budget}
                  </span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", minWidth: 36, textAlign: "right", color: a.pct > 90 ? "rgba(255,255,255,0.9)" : a.pct > 75 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)" }}>
                    {a.pct}%
                  </span>
                </div>
              </div>
              <div style={{ height: 3, background: "#111", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${a.pct}%`, borderRadius: "3px",
                  background: a.pct > 90 ? "rgba(255,255,255,0.7)" : a.pct > 75 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>
          ))}

          {/* Thresholds */}
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #111", display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              { pct: "60%", label: "Alerta — Orchestrator reavalia prioridades" },
              { pct: "80%", label: "Alerta — Tarefas de baixa prioridade pausadas" },
              { pct: "100%", label: "Hard-stop — Agente pausado automaticamente" },
            ].map((r, i) => (
              <div key={r.pct} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: i === 2 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", minWidth: 36 }}>{r.pct}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Histórico mensal */}
          <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", display: "block", marginBottom: "16px" }}>
              HISTÓRICO MENSAL
            </span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: 80 }}>
              {HISTORY.map((h) => (
                <div key={h.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)" }}>
                    R${h.value}
                  </span>
                  <div style={{
                    width: "100%",
                    height: `${(h.value / maxVal) * 60}px`,
                    background: h.month === "Mar" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                    borderRadius: "3px 3px 0 0",
                  }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{h.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Por departamento */}
          <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", display: "block", marginBottom: "14px" }}>
              POR DEPARTAMENTO
            </span>
            {[
              { dept: "Tecnologia", value: 383 },
              { dept: "Marketing", value: 424 },
              { dept: "Executivo", value: 286 },
              { dept: "Financeiro", value: 64 },
              { dept: "Vendas", value: 89 },
            ].map((d) => (
              <div key={d.dept} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", minWidth: 80 }}>{d.dept}</span>
                <div style={{ flex: 1, height: 3, background: "#111", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(d.value / 424) * 100}%`, background: "rgba(255,255,255,0.25)", borderRadius: "3px" }} />
                </div>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)", minWidth: 36, textAlign: "right" }}>
                  R${d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
