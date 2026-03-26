"use client";

const ACTIVITY = [
  { id: 1, actor: "CTO", verb: "commitou código em", target: "ENG-042", time: "agora", type: "Código" },
  { id: 2, actor: "Board", verb: "aprovou", target: "Deploy v2.1", time: "2min", type: "Aprovação" },
  { id: 3, actor: "Full-Stack", verb: "abriu PR para", target: "ENG-039", time: "5min", type: "Código" },
  { id: 4, actor: "CFO", verb: "reportou custo para", target: "Budget Q1", time: "8min", type: "Custo" },
  { id: 5, actor: "CMO", verb: "criou campanha", target: "MKT-018", time: "12min", type: "Tarefa" },
  { id: 6, actor: "CEO", verb: "delegou tarefa para", target: "CTO", time: "20min", type: "Delegação" },
  { id: 7, actor: "Ads Manager", verb: "pausado — budget atingiu", target: "96%", time: "35min", type: "Alerta" },
  { id: 8, actor: "DevOps", verb: "configurou pipeline CI/CD para", target: "staging", time: "1h", type: "Código" },
  { id: 9, actor: "Board", verb: "aprovou meta", target: "OKR Q2", time: "1h 20min", type: "Aprovação" },
  { id: 10, actor: "SDR", verb: "qualificou lead para", target: "Account Exec", time: "2h", type: "Vendas" },
  { id: 11, actor: "CTO", verb: "fez code review em", target: "PR#38", time: "2h 30min", type: "Código" },
  { id: 12, actor: "CFO", verb: "gerou relatório mensal", target: "FIN-007", time: "3h", type: "Relatório" },
];

export default function ActivityPage() {
  return (
    <div style={{ padding: "32px 40px", maxWidth: 800 }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Atividade
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Audit trail completo — cada ação rastreada com ator e timestamp
        </p>
      </div>

      <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 100px", gap: "12px", padding: "10px 20px", borderBottom: "1px solid #111" }}>
          {["Evento", "Tipo", "Quando"].map((h) => (
            <span key={h} style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
              {h}
            </span>
          ))}
        </div>

        {ACTIVITY.map((item, i) => (
          <div key={item.id} style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 100px",
            gap: "12px",
            padding: "13px 20px",
            alignItems: "center",
            borderBottom: i < ACTIVITY.length - 1 ? "1px solid #080808" : "none",
            background: i % 2 === 0 ? "#000" : "#030303",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                background: i === 0 ? "#fff" : "rgba(255,255,255,0.15)",
                boxShadow: i === 0 ? "0 0 6px rgba(255,255,255,0.4)" : "none",
              }} />
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4, margin: 0 }}>
                <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item.actor}</span>
                {" "}{item.verb}{" "}
                <span style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Geist Mono, monospace", fontSize: "11px" }}>{item.target}</span>
              </p>
            </div>
            <span style={{
              fontFamily: "Geist Mono, monospace", fontSize: "9px",
              padding: "2px 7px", borderRadius: "4px",
              background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a",
              color: "rgba(255,255,255,0.3)", textAlign: "center",
            }}>
              {item.type}
            </span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", textAlign: "right" }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
