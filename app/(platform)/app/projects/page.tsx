"use client";

const PROJECTS = [
  { id: "PRJ-001", name: "Backend API v2", dept: "Tecnologia", status: "em andamento", issues: 12, done: 8, agents: ["CTO", "Full-Stack", "DevOps"], updated: "agora" },
  { id: "PRJ-002", name: "Growth Q2", dept: "Marketing", status: "em andamento", issues: 9, done: 3, agents: ["CMO", "Ads Manager"], updated: "12min" },
  { id: "PRJ-003", name: "Estratégia Q2", dept: "Executivo", status: "em andamento", issues: 5, done: 2, agents: ["CEO"], updated: "20min" },
  { id: "PRJ-004", name: "Infraestrutura", dept: "Tecnologia", status: "em andamento", issues: 7, done: 4, agents: ["DevOps"], updated: "1h" },
  { id: "PRJ-005", name: "Financeiro Q1", dept: "Financeiro", status: "concluído", issues: 6, done: 6, agents: ["CFO"], updated: "2h" },
  { id: "PRJ-006", name: "Prospecção Q2", dept: "Vendas", status: "planejamento", issues: 4, done: 0, agents: ["SDR"], updated: "3h" },
];

const statusOpacity: Record<string, string> = {
  "em andamento": "rgba(255,255,255,0.7)",
  "concluído": "rgba(255,255,255,0.3)",
  "planejamento": "rgba(255,255,255,0.4)",
};

export default function ProjectsPage() {
  const active = PROJECTS.filter(p => p.status === "em andamento").length;

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
            Projetos
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
            {active} em andamento · {PROJECTS.length} total
          </p>
        </div>
        <button style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", padding: "8px 16px", borderRadius: "6px", background: "#fff", color: "#000", border: "none", cursor: "pointer", fontWeight: 500 }}>
          + Novo projeto
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "10px" }}>
        {PROJECTS.map((project) => {
          const pct = Math.round((project.done / project.issues) * 100);
          return (
            <div key={project.id} style={{
              background: "#000", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "20px",
              display: "flex", flexDirection: "column", gap: "14px",
              opacity: project.status === "concluído" ? 0.6 : 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{project.id}</span>
                    <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "1px 6px", borderRadius: "3px", background: "rgba(255,255,255,0.04)", border: "1px solid #111", color: "rgba(255,255,255,0.25)" }}>
                      {project.dept}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "16px", color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                    {project.name}
                  </h3>
                </div>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: statusOpacity[project.status], padding: "2px 8px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 12 }}>
                  {project.status}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>
                    {project.done}/{project.issues} issues
                  </span>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: pct === 100 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}>
                    {pct}%
                  </span>
                </div>
                <div style={{ height: 2, background: "#111", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {project.agents.map((a, i) => (
                    <span key={i} style={{
                      fontFamily: "Geist Mono, monospace", fontSize: "9px",
                      padding: "2px 7px", borderRadius: "3px",
                      background: "rgba(255,255,255,0.04)", border: "1px solid #111",
                      color: "rgba(255,255,255,0.3)",
                    }}>
                      {a}
                    </span>
                  ))}
                </div>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>{project.updated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
