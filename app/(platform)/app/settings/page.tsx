"use client";
import { useState } from "react";

const SECTIONS = ["Geral", "Agentes", "Faturamento", "API", "Notificações", "Equipe"];

export default function SettingsPage() {
  const [section, setSection] = useState("Geral");

  return (
    <div style={{ padding: "32px 40px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Configurações
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Gerencie sua organização e preferências
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px" }}>
        {/* Sidebar nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => setSection(s)} style={{
              fontFamily: "Inter, sans-serif", fontSize: "13px",
              padding: "8px 12px", borderRadius: "6px", border: "none", cursor: "pointer", textAlign: "left",
              background: section === s ? "rgba(255,255,255,0.07)" : "transparent",
              color: section === s ? "#fff" : "rgba(255,255,255,0.35)",
              transition: "all 0.1s",
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {section === "Geral" && (
            <>
              <SettingsCard title="Nome da empresa">
                <SettingsField label="Nome" value="Optimus" />
                <SettingsField label="Slug" value="optimus-corp" />
              </SettingsCard>
              <SettingsCard title="Idioma e região">
                <SettingsField label="Idioma" value="Português (BR)" />
                <SettingsField label="Fuso horário" value="America/Sao_Paulo (UTC-3)" />
                <SettingsField label="Moeda" value="BRL (R$)" />
              </SettingsCard>
              <SettingsCard title="Zona de perigo" danger>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>Deletar organização</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>Esta ação é permanente e irreversível.</div>
                  </div>
                  <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 14px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                    Deletar
                  </button>
                </div>
              </SettingsCard>
            </>
          )}

          {section === "Agentes" && (
            <>
              <SettingsCard title="Orquestrador">
                <SettingToggle label="Heartbeat automático" desc="Ciclo de execução a cada 5 minutos" defaultOn />
                <SettingToggle label="Auto-delegação" desc="Agentes podem delegar tarefas sem aprovação humana" defaultOn />
                <SettingToggle label="Self-healing" desc="Agentes corrigem erros automaticamente quando possível" defaultOn />
              </SettingsCard>
              <SettingsCard title="Budget e limites">
                <SettingsField label="Budget global/mês" value="R$5.000" />
                <SettingToggle label="Hard-stop em 100%" desc="Pausar agente automaticamente ao atingir o limite" defaultOn />
                <SettingToggle label="Alertas em 80%" desc="Notificar quando agente atingir 80% do budget" defaultOn />
              </SettingsCard>
            </>
          )}

          {section === "API" && (
            <>
              <SettingsCard title="Chaves de API">
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>Chave de produção</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ flex: 1, fontFamily: "Geist Mono, monospace", fontSize: "12px", color: "rgba(255,255,255,0.4)", background: "#050505", border: "1px solid #1a1a1a", borderRadius: 6, padding: "8px 12px" }}>
                      opt_live_••••••••••••••••••••••••
                    </div>
                    <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "8px 14px", borderRadius: 6, border: "1px solid #1a1a1a", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
                      Revelar
                    </button>
                  </div>
                </div>
                <button style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", padding: "7px 14px", borderRadius: 6, border: "1px solid #1a1a1a", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
                  + Gerar nova chave
                </button>
              </SettingsCard>
              <SettingsCard title="Webhooks">
                <SettingsField label="Endpoint" value="https://api.suaempresa.com/webhooks/optimus" />
                <SettingToggle label="Ativo" desc="Enviar eventos para o endpoint configurado" defaultOn />
              </SettingsCard>
            </>
          )}

          {(section === "Faturamento" || section === "Notificações" || section === "Equipe") && (
            <SettingsCard title={section}>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", padding: "20px 0" }}>
                Configurações de {section.toLowerCase()} em breve.
              </div>
            </SettingsCard>
          )}
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, children, danger }: { title: string; children: React.ReactNode; danger?: boolean }) {
  return (
    <div style={{
      background: "#000",
      border: danger ? "1px solid rgba(255,255,255,0.1)" : "1px solid #1a1a1a",
      borderRadius: "10px", overflow: "hidden",
    }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #0d0d0d" }}>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>
          {title.toUpperCase()}
        </span>
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

function SettingsField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", marginBottom: 6 }}>{label}</div>
      <input
        defaultValue={value}
        style={{
          width: "100%", maxWidth: 400,
          fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)",
          background: "#050505", border: "1px solid #1a1a1a", borderRadius: 6,
          padding: "8px 12px", outline: "none", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function SettingToggle({ label, desc, defaultOn }: { label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>{label}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{desc}</div>
      </div>
      <button onClick={() => setOn(!on)} style={{
        width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer", flexShrink: 0,
        background: on ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)",
        position: "relative", transition: "background 0.2s",
      }}>
        <span style={{
          position: "absolute", top: 3, left: on ? 18 : 3,
          width: 14, height: 14, borderRadius: "50%",
          background: on ? "#fff" : "rgba(255,255,255,0.3)",
          transition: "left 0.2s",
        }} />
      </button>
    </div>
  );
}
