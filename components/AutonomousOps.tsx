"use client";
import { useEffect, useRef } from "react";

// ─── Heartbeat cycle node ─────────────────────────────────────────────────────

function HeartbeatNode({ icon, label, sublabel, active, index }: {
  icon: string;
  label: string;
  sublabel: string;
  active?: boolean;
  index: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", flex: "0 0 auto" }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "14px",
          background: active ? "rgba(153,153,153,0.12)" : "rgba(255,255,255,0.04)",
          border: active ? "1px solid rgba(153,153,153,0.35)" : "1px solid #222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          position: "relative",
        }}
      >
        {icon}
        {active && (
          <span style={{
            position: "absolute",
            top: -4, right: -4,
            width: 10, height: 10,
            borderRadius: "50%",
            background: "#22c55e",
            border: "2px solid #000",
            boxShadow: "0 0 6px #22c55e",
          }} />
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: active ? "#fff" : "rgba(184,184,184,0.7)", fontWeight: 400 }}>{label}</div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(117,117,117,0.5)", marginTop: "3px" }}>{sublabel}</div>
      </div>
    </div>
  );
}

// ─── Arrow ────────────────────────────────────────────────────────────────────

function Arrow() {
  return (
    <div style={{ display: "flex", alignItems: "center", color: "rgba(153,153,153,0.25)", fontSize: "18px", flexShrink: 0, paddingBottom: "28px" }}>
      →
    </div>
  );
}

// ─── Capability card ──────────────────────────────────────────────────────────

function CapCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="card-feature" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <span style={{ fontSize: "20px", lineHeight: 1 }}>{icon}</span>
      <div>
        <h4 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", color: "#fff", marginBottom: "8px", letterSpacing: "-0.02em" }}>
          {title}
        </h4>
        <p className="body-s">{description}</p>
      </div>
    </div>
  );
}

// ─── Live cost ticker ──────────────────────────────────────────────────────────

function CostDashboard() {
  return (
    <div style={{ background: "#080808", border: "1px solid #1a1a1a", borderRadius: "16px", padding: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e" }} />
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.6)", letterSpacing: "0.04em" }}>HEARTBEAT EM EXECUÇÃO</span>
        </div>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(153, 153, 153, 0.5)" }}>ciclo #2.847</span>
      </div>

      {/* Agent rows */}
      {[
        { name: "CEO", task: "Decompondo meta Q2 em projetos", tokens: "1.2M", pct: 48, status: "running", model: "Opus" },
        { name: "CTO", task: "Code review, auth module", tokens: "840K", pct: 35, status: "running", model: "Sonnet" },
        { name: "CMO", task: "Aguardando aprovação de campanha", tokens: "320K", pct: 18, status: "waiting", model: "Sonnet" },
        { name: "Full-Stack", task: "Implementando endpoint /api/agents", tokens: "1.8M", pct: 72, status: "running", model: "Sonnet" },
        { name: "Ads Mgr", task: "Ocioso, próximo ciclo em 4h", tokens: "2.1M", pct: 96, status: "idle", model: "Haiku" },
      ].map((a) => (
        <div key={a.name} style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                background: a.status === "running" ? "#999999" : a.status === "waiting" ? "#f59e0b" : "#333",
                boxShadow: a.status === "running" ? "0 0 5px rgba(153, 153, 153, 0.5)" : "none",
              }} />
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.8)" }}>{a.name}</span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "160px" }}>{a.task}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "8px", color: "rgba(153, 153, 153, 0.4)", padding: "1px 5px", background: "rgba(153, 153, 153, 0.06)", borderRadius: "3px" }}>{a.model}</span>
              <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: a.pct > 90 ? "#ef4444" : a.pct > 70 ? "#f59e0b" : "rgba(117,117,117,0.5)" }}>{a.pct}%</span>
            </div>
          </div>
          <div style={{ height: 3, background: "#111", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${a.pct}%`,
              background: a.pct > 90 ? "#ef4444" : a.pct > 70 ? "#f59e0b" : "rgba(153,153,153,0.6)",
              borderRadius: "3px",
            }} />
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #111" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(117,117,117,0.5)" }}>Budget mensal total</span>
        <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "14px", color: "#fff", letterSpacing: "-0.03em" }}>R$847 <span style={{ color: "rgba(117,117,117,0.4)", fontSize: "10px" }}>/ R$2.000</span></span>
      </div>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: "",
    title: "Delegação automática",
    description: "Quando um agente encontra trabalho fora de sua competência, cria sub-tarefa e atribui ao agente certo automaticamente, sem intervenção humana.",
  },
  {
    icon: "",
    title: "Self-healing",
    description: "Falhas são tratadas com backoff exponencial. Após 3 tentativas, o Orchestrator escala o problema ao agente sênior ou ao Board.",
  },
  {
    icon: "",
    title: "Relatórios automáticos",
    description: "Cada agente gera daily digest: o que fez, quanto custou, blockers e próximos passos. Weekly summary consolidado para o Board.",
  },
  {
    icon: "",
    title: "Knowledge sharing",
    description: "Quando um agente aprende algo novo (nova API, padrão, workaround), registra na base de conhecimento compartilhada, disponível para todos os agentes da empresa.",
  },
];

const HEARTBEAT_NODES = [
  { icon: "", label: "Acorda", sublabel: "timer / on-demand", active: false },
  { icon: "", label: "Checkout", sublabel: "tarefa atômica", active: true },
  { icon: "", label: "Executa", sublabel: "Claude, OpenAI...", active: true },
  { icon: "", label: "Reporta", sublabel: "custo + status", active: false },
  { icon: "", label: "Dorme", sublabel: "até próximo ciclo", active: false },
];

export default function AutonomousOps() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        gsap.fromTo(".ops-node",
          { opacity: 0.001, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "framerEase",
            scrollTrigger: { trigger: ".ops-heartbeat", start: "top 85%", once: true } }
        );
        gsap.fromTo(".ops-cap",
          { opacity: 0.001, y: 28 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "framerEase",
            scrollTrigger: { trigger: ".ops-caps", start: "top 85%", once: true } }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#080808", padding: "96px 0" }}>
      <div className="section-container">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(153, 153, 153, 0.06)",
            border: "1px solid rgba(153, 153, 153, 0.15)",
            borderRadius: "62px",
            padding: "6px 16px",
            marginBottom: "24px",
          }}>
            <span className="badge-dot-pulse" />
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "11px", color: "rgba(153, 153, 153, 0.8)", letterSpacing: "0.04em" }}>
              AUTONOMOUS OPS · 24/7
            </span>
          </div>
          <h2 className="h2-section" style={{ marginBottom: "16px" }}>
            Sua empresa opera enquanto<br />você dorme.
          </h2>
          <p className="body-m" style={{ maxWidth: "520px", margin: "0 auto" }}>
            O motor de heartbeat do Optimus executa ciclos contínuos: acorda cada agente, distribui tarefas, coleta resultados e dorme novamente. Tudo autônomo, tudo auditado.
          </p>
        </div>

        {/* Heartbeat cycle */}
        <div className="ops-heartbeat" style={{ marginBottom: "64px" }}>
          <p style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(153, 153, 153, 0.5)", letterSpacing: "0.06em", textAlign: "center", marginBottom: "32px" }}>
            HEARTBEAT LOOP · CICLO DE ORQUESTRAÇÃO
          </p>
          <div style={{
            background: "#000",
            border: "1px solid #1a1a1a",
            borderRadius: "20px",
            padding: "40px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            {HEARTBEAT_NODES.map((node, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div className="ops-node" style={{ opacity: 0.001 }}>
                  <HeartbeatNode {...node} index={i} />
                </div>
                {i < HEARTBEAT_NODES.length - 1 && <Arrow />}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{
              fontFamily: "Geist Mono, monospace",
              fontSize: "10px",
              color: "rgba(153, 153, 153, 0.4)",
              background: "rgba(153,153,153,0.05)",
              border: "1px solid rgba(153, 153, 153, 0.1)",
              borderRadius: "62px",
              padding: "5px 16px",
            }}>
              Ciclo repete automaticamente · Checkout atômico, sem duplicação · Custo rastreado em tempo real
            </span>
          </div>
        </div>

        {/* 2-col: dashboard + capabilities */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          {/* Left: live cost dashboard */}
          <div>
            <p style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.5)", letterSpacing: "0.04em", marginBottom: "16px" }}>
              CONTROLE DE CUSTO POR AGENTE
            </p>
            <CostDashboard />
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { pct: 60, label: "Alerta: Orchestrator reavalia prioridades", color: "#f59e0b" },
                { pct: 80, label: "Alerta: Pause tarefas de baixa prioridade", color: "#ef4444" },
                { pct: 100, label: "Hard-stop: Agente pausado automaticamente", color: "#ef4444" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: r.color, flexShrink: 0, minWidth: 32 }}>{r.pct}%</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(117,117,117,0.6)" }}>{r.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: capabilities */}
          <div className="ops-caps" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.5)", letterSpacing: "0.04em", marginBottom: "4px" }}>
              INTELIGÊNCIA DO MOTOR
            </p>
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="ops-cap" style={{ opacity: 0.001 }}>
                <CapCard {...cap} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div style={{ marginTop: "64px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#1a1a1a", border: "1px solid #1a1a1a", borderRadius: "16px", overflow: "hidden" }}>
          {[
            { value: "99.5%", label: "Uptime do heartbeat", sub: "SLA garantido" },
            { value: "<$0.50", label: "Custo por issue resolvida", sub: "otimização de modelo automática" },
            { value: ">80%", label: "Taxa de self-healing", sub: "falhas recuperadas sem intervenção" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#080808", padding: "32px", textAlign: "center" }}>
              <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "36px", color: "#fff", letterSpacing: "-0.04em", marginBottom: "8px" }}>{s.value}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(184,184,184,0.8)", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(117,117,117,0.5)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 809px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
