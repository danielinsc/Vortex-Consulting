"use client";

const GOALS = [
  {
    id: "OKR-Q2-01",
    objective: "Lançar v2.0 da plataforma com módulo de agentes",
    owner: "CTO",
    progress: 62,
    dueDate: "Jun 2026",
    keyResults: [
      { label: "Endpoints de API documentados", progress: 85 },
      { label: "Módulo de auth OAuth2 implementado", progress: 70 },
      { label: "Dashboard de agentes ao vivo", progress: 40 },
      { label: "Testes de integração cobrindo 80%+", progress: 55 },
    ],
  },
  {
    id: "OKR-Q2-02",
    objective: "Atingir R$50K MRR até fim do trimestre",
    owner: "CEO",
    progress: 38,
    dueDate: "Jun 2026",
    keyResults: [
      { label: "Pipeline com 200 leads qualificados", progress: 60 },
      { label: "Fechar 15 novos clientes Starter", progress: 30 },
      { label: "Churn abaixo de 3%", progress: 90 },
      { label: "NPS acima de 45", progress: 25 },
    ],
  },
  {
    id: "OKR-Q2-03",
    objective: "Reduzir custo médio por issue para R$1,50",
    owner: "CFO",
    progress: 78,
    dueDate: "Jun 2026",
    keyResults: [
      { label: "Migrar 60% dos agentes para Haiku", progress: 75 },
      { label: "Budget hard-stop implementado", progress: 100 },
      { label: "Relatórios automáticos semanais ativos", progress: 80 },
      { label: "Alertas de 80% configurados por agente", progress: 60 },
    ],
  },
  {
    id: "OKR-Q2-04",
    objective: "Campanha de aquisição com ROAS 3x+",
    owner: "CMO",
    progress: 22,
    dueDate: "Jun 2026",
    keyResults: [
      { label: "Campanha Google Ads ativa e otimizada", progress: 15 },
      { label: "Landing page com conversão 4%+", progress: 35 },
      { label: "Conteúdo orgânico: 20 posts publicados", progress: 20 },
      { label: "Email nurture com 5 sequências ativas", progress: 10 },
    ],
  },
];

export default function GoalsPage() {
  const overall = Math.round(GOALS.reduce((acc, g) => acc + g.progress, 0) / GOALS.length);

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
            Metas
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            OKRs Q2 · {overall}% de progresso geral
          </p>
        </div>
        <button style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", padding: "8px 16px", borderRadius: "6px", background: "#fff", color: "#000", border: "none", cursor: "pointer", fontWeight: 500 }}>
          + Nova meta
        </button>
      </div>

      {/* Overall bar */}
      <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px 24px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>PROGRESSO GERAL — Q2 2026</span>
            <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "20px", color: "#fff", letterSpacing: "-0.03em" }}>{overall}%</span>
          </div>
          <div style={{ height: 4, background: "#111", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${overall}%`, background: "rgba(255,255,255,0.4)", borderRadius: "4px", transition: "width 0.5s ease" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "24px", flexShrink: 0 }}>
          {[{ v: "4", l: "Objetivos" }, { v: "16", l: "Key Results" }, { v: "Jun 2026", l: "Deadline" }].map(s => (
            <div key={s.l} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "16px", color: "#fff", letterSpacing: "-0.03em" }}>{s.v}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {GOALS.map((goal) => (
          <div key={goal.id} style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ flex: 1, minWidth: 0, paddingRight: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{goal.id}</span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 6px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.3)" }}>
                    {goal.owner}
                  </span>
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.4 }}>
                  {goal.objective}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "24px", color: "#fff", letterSpacing: "-0.03em" }}>{goal.progress}%</div>
                <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{goal.dueDate}</div>
              </div>
            </div>

            {/* Objective progress bar */}
            <div style={{ height: 3, background: "#111", borderRadius: "3px", overflow: "hidden", marginBottom: "16px" }}>
              <div style={{ height: "100%", width: `${goal.progress}%`, background: "rgba(255,255,255,0.35)", borderRadius: "3px" }} />
            </div>

            {/* Key Results */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {goal.keyResults.map((kr, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, paddingRight: 8 }}>
                      {kr.label}
                    </span>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: kr.progress === 100 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                      {kr.progress}%
                    </span>
                  </div>
                  <div style={{ height: 2, background: "#111", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${kr.progress}%`, background: kr.progress === 100 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
