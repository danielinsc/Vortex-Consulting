"use client";
import { useEffect, useRef } from "react";

// ─── Inline department visuals ────────────────────────────────────────────────

function TechVisual() {
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
      {[
        { label: "CTO", task: "Revisando arquitetura de microserviços", status: "working" },
        { label: "Full-Stack", task: "Implementando auth module", status: "working" },
        { label: "DevOps", task: "Deploy pipeline configurado", status: "active" },
        { label: "QA", task: "Ocioso, aguardando PR", status: "idle" },
      ].map((a) => (
        <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
            background: a.status === "working" ? "#999999" : a.status === "active" ? "#22c55e" : "#eab308",
          }} />
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(184,184,184,0.7)", minWidth: 56, letterSpacing: "0.02em" }}>{a.label}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.6)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.task}</span>
        </div>
      ))}
    </div>
  );
}

function FinanceVisual() {
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
        {[
          { label: "Receita MRR", value: "R$48.200", color: "#22c55e" },
          { label: "Custo Agentes", value: "R$1.240", color: "#999999" },
          { label: "Budget restante", value: "74%", color: "#f59e0b" },
          { label: "Burn rate", value: "R$312/dia", color: "#a78bfa" },
        ].map((m) => (
          <div key={m.label} style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1a1a1a",
            borderRadius: "8px",
            padding: "10px",
          }}>
            <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "14px", color: m.color, letterSpacing: "-0.03em" }}>{m.value}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(117,117,117,0.6)", marginTop: "3px" }}>{m.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(153, 153, 153, 0.4)", textAlign: "center" }}>
        CFO · Analista · Contador · em execução
      </p>
    </div>
  );
}

function MarketingVisual() {
  const campaigns = [
    { name: "Google Ads · Brand", status: "ativo", spend: "R$890/sem", badge: "#22c55e" },
    { name: "Meta Ads · Retargeting", status: "pausado", spend: "R$340/sem", badge: "#eab308" },
    { name: "Email · Onboarding", status: "ativo", spend: "-", badge: "#22c55e" },
  ];
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
      {campaigns.map((c) => (
        <div key={c.name} style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1a1a1a",
          borderRadius: "8px",
          padding: "8px 10px",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.badge, flexShrink: 0 }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(184,184,184,0.8)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.5)", flexShrink: 0 }}>{c.spend}</span>
        </div>
      ))}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(117,117,117,0.4)", textAlign: "center" }}>
        CMO · Ads Manager · Content Creator gerenciando
      </p>
    </div>
  );
}

function CustomerVisual() {
  const tickets = [
    { id: "SUP-041", title: "Erro no checkout", priority: "alta", status: "em andamento" },
    { id: "SUP-042", title: "Dúvida sobre plano Pro", priority: "media", status: "resolvido" },
    { id: "SUP-043", title: "Integração com API", priority: "baixa", status: "aberto" },
  ];
  const priorityColor: Record<string, string> = { alta: "#ef4444", media: "#f59e0b", baixa: "#999999" };
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
      {tickets.map((t) => (
        <div key={t.id} style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 0",
          borderBottom: "1px solid #111",
        }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.5)", flexShrink: 0 }}>{t.id}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(184,184,184,0.8)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: priorityColor[t.priority], flexShrink: 0 }} />
        </div>
      ))}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(117,117,117,0.4)", textAlign: "center", marginTop: "4px" }}>
        Support Agent · CS Manager · resolvendo tickets
      </p>
    </div>
  );
}

function OpsVisual() {
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center" }}>
      {[
        { label: "Scrum diário", status: "concluído", time: "09:00" },
        { label: "Review de tarefas", status: "em andamento", time: "14:00" },
        { label: "Relatório semanal", status: "agendado", time: "Sex 17:00" },
        { label: "Onboarding novo agente", status: "agendado", time: "Seg 10:00" },
      ].map((e, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            fontFamily: "Geist Mono, monospace",
            fontSize: "9px",
            color: "rgba(117,117,117,0.5)",
            minWidth: 52,
            flexShrink: 0,
          }}>{e.time}</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(184,184,184,0.8)", flex: 1 }}>{e.label}</span>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "9px",
            padding: "2px 7px",
            borderRadius: "62px",
            background: e.status === "concluído" ? "rgba(34,197,94,0.1)" : e.status === "em andamento" ? "rgba(153, 153, 153, 0.1)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${e.status === "concluído" ? "rgba(34,197,94,0.2)" : e.status === "em andamento" ? "rgba(153, 153, 153, 0.2)" : "#1a1a1a"}`,
            color: e.status === "concluído" ? "#22c55e" : e.status === "em andamento" ? "#999999" : "rgba(117,117,117,0.6)",
            flexShrink: 0,
          }}>
            {e.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function SalesVisual() {
  return (
    <div style={{ height: "200px", background: "#080808", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
      {[
        { stage: "Prospecção", count: 24, color: "#999999" },
        { stage: "Qualificação", count: 12, color: "#a78bfa" },
        { stage: "Proposta", count: 5, color: "#f59e0b" },
        { stage: "Fechamento", count: 2, color: "#22c55e" },
      ].map((s) => (
        <div key={s.stage} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.7)", minWidth: 80 }}>{s.stage}</span>
          <div style={{ flex: 1, height: 6, background: "#111", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(s.count / 24) * 100}%`, background: s.color, borderRadius: "3px" }} />
          </div>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.6)", minWidth: 16, textAlign: "right" }}>{s.count}</span>
        </div>
      ))}
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "rgba(117,117,117,0.4)", textAlign: "center", marginTop: "4px" }}>
        SDR · Account Executive · Sales Ops
      </p>
    </div>
  );
}

// ─── Use case data ────────────────────────────────────────────────────────────

const USE_CASES = [
  { title: "Equipe de tecnologia autônoma", visual: <TechVisual />, agents: ["CTO", "Full-Stack", "DevOps", "QA"] },
  { title: "CFO e analistas financeiros", visual: <FinanceVisual />, agents: ["CFO", "Analista", "Contador"] },
  { title: "Marketing e gestão de tráfego", visual: <MarketingVisual />, agents: ["CMO", "Ads Manager", "Content"] },
  { title: "Atendimento e customer success", visual: <CustomerVisual />, agents: ["Support Agent", "CS Manager"] },
  { title: "Operações e reuniões de scrum", visual: <OpsVisual />, agents: ["Ops Manager", "CEO", "CTO"] },
  { title: "Vendas e pipeline comercial", visual: <SalesVisual />, agents: ["SDR", "Account Exec", "Sales Ops"] },
];

const ALL_CASES = [...USE_CASES, ...USE_CASES, ...USE_CASES];

// ─── Component ────────────────────────────────────────────────────────────────

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 60,
          ease: "linear",
          repeat: -1,
        });
      }
    })();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "96px 0", overflow: "hidden" }}>
      <div className="section-container" style={{ marginBottom: "48px" }}>
        <h2 className="h2-section" style={{ textAlign: "center" }}>
          Um agente para cada área da sua empresa.
        </h2>
      </div>

      {/* Carousel */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div className="ticker-fade-left" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "160px", zIndex: 2 }} />
        <div className="ticker-fade-right" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "160px", zIndex: 2 }} />

        <div ref={trackRef} style={{ display: "flex", gap: "20px", width: "max-content" }}>
          {ALL_CASES.map((uc, idx) => (
            <div
              key={idx}
              className="card-feature"
              style={{ width: "300px", flexShrink: 0, overflow: "hidden" }}
            >
              {/* Visual mockup */}
              <div style={{ borderBottom: "1px solid #1a1a1a" }}>
                {uc.visual}
              </div>

              {/* Card footer */}
              <div style={{ padding: "20px 24px" }}>
                <h3 className="h3-card" style={{ fontSize: "16px", marginBottom: "10px" }}>{uc.title}</h3>
                {/* Agent chips */}
                <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "16px" }}>
                  {uc.agents.map((a) => (
                    <span key={a} style={{
                      fontFamily: "Geist Mono, monospace",
                      fontSize: "9px",
                      color: "rgba(153,153,153,0.6)",
                      background: "rgba(153, 153, 153, 0.06)",
                      border: "1px solid rgba(153, 153, 153, 0.15)",
                      borderRadius: "4px",
                      padding: "2px 7px",
                    }}>
                      {a}
                    </span>
                  ))}
                </div>
                <a href="/onboarding" className="btn-glass" style={{ padding: "9px 18px", fontSize: "13px" }}>
                  Explorar agentes
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
