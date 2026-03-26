"use client";

const ORG = {
  ceo: { name: "CEO", role: "Chief Executive", model: "Opus", status: "running", reports: ["CTO", "CMO", "CFO"] },
  nodes: [
    {
      name: "CTO", role: "Chief Technology", model: "Sonnet", status: "running",
      reports: ["Full-Stack", "DevOps", "Security Eng."],
    },
    {
      name: "CMO", role: "Chief Marketing", model: "Sonnet", status: "idle",
      reports: ["Ads Manager", "Content Writer"],
    },
    {
      name: "CFO", role: "Chief Financial", model: "Haiku", status: "idle",
      reports: ["Accountant"],
    },
  ],
};

const DEPTS = [
  { name: "Tecnologia", agents: 4, budget: "R$1.820", spend: "R$383", pct: 21 },
  { name: "Marketing", agents: 2, budget: "R$1.120", spend: "R$424", pct: 38 },
  { name: "Executivo", agents: 1, budget: "R$600", spend: "R$286", pct: 48 },
  { name: "Financeiro", agents: 1, budget: "R$560", spend: "R$64", pct: 11 },
  { name: "Vendas", agents: 1, budget: "R$500", spend: "R$89", pct: 18 },
];

const statusDot = (s: string): React.CSSProperties => ({
  width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
  background: s === "running" ? "#fff" : "rgba(255,255,255,0.15)",
});

function AgentNode({ name, role, model, status, indent = false }: { name: string; role: string; model: string; status: string; indent?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "8px", background: "#000", border: "1px solid #1a1a1a", marginLeft: indent ? 24 : 0 }}>
      <span style={statusDot(status)} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>{name}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>{role}</div>
      </div>
      <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 6px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "1px solid #111", color: "rgba(255,255,255,0.25)", flexShrink: 0 }}>
        {model}
      </span>
    </div>
  );
}

export default function OrgPage() {
  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Organização
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Hierarquia e estrutura da empresa
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
        {/* Org chart */}
        <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "24px" }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", display: "block", marginBottom: "20px" }}>
            HIERARQUIA
          </span>

          {/* CEO */}
          <AgentNode name={ORG.ceo.name} role={ORG.ceo.role} model={ORG.ceo.model} status={ORG.ceo.status} />

          {/* L2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            {ORG.nodes.map((node) => (
              <div key={node.name}>
                {/* Connector */}
                <div style={{ display: "flex", alignItems: "stretch", gap: "0", marginBottom: "4px" }}>
                  <div style={{ width: 24, borderLeft: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a", marginBottom: 10, marginLeft: 12, borderBottomLeftRadius: 4 }} />
                  <div style={{ flex: 1 }}>
                    <AgentNode name={node.name} role={node.role} model={node.model} status={node.status} />
                  </div>
                </div>
                {/* Reports */}
                <div style={{ display: "flex", gap: "6px", marginLeft: 36, flexWrap: "wrap", marginBottom: 8 }}>
                  {node.reports.map((r) => (
                    <span key={r} style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "3px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.03)", border: "1px solid #111", color: "rgba(255,255,255,0.25)" }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", display: "block", marginBottom: "16px" }}>
              DEPARTAMENTOS
            </span>
            {DEPTS.map((d) => (
              <div key={d.name} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)", marginRight: 8 }}>{d.name}</span>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{d.agents} agente{d.agents > 1 ? "s" : ""}</span>
                  </div>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>{d.spend}</span>
                </div>
                <div style={{ height: 2, background: "#111", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${d.pct}%`, background: "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#000", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "20px" }}>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", display: "block", marginBottom: "14px" }}>
              RESUMO
            </span>
            {[
              { label: "Total de agentes", value: "9" },
              { label: "Em execução", value: "3" },
              { label: "Departamentos", value: "5" },
              { label: "Budget total/mês", value: "R$4.600" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #0d0d0d" }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
