"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

function NavItem({ href, label, icon, badge, liveCount, exact }: {
  href: string; label: string; icon: React.ReactNode;
  badge?: number; liveCount?: number; exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} style={{
      display: "flex", alignItems: "center", gap: "9px",
      padding: "6px 10px", borderRadius: "6px", textDecoration: "none",
      fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 400,
      letterSpacing: "-0.01em", transition: "background 0.1s",
      background: isActive ? "rgba(255,255,255,0.07)" : "transparent",
      color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
    }}>
      <span style={{ flexShrink: 0, lineHeight: 0 }}>{icon}</span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      {liveCount != null && liveCount > 0 && (
        <span style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>{liveCount}</span>
        </span>
      )}
      {badge != null && badge > 0 && (
        <span style={{
          fontFamily: "Geist Mono, monospace", fontSize: "10px",
          padding: "1px 6px", borderRadius: "4px",
          background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", flexShrink: 0,
        }}>{badge}</span>
      )}
    </Link>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500,
        color: "rgba(255,255,255,0.2)", padding: "0 10px", marginBottom: "2px",
        letterSpacing: "0.01em",
      }}>{label}</p>
      {children}
    </div>
  );
}

const I = {
  zap: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  grid: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  inbox: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>,
  circle: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>,
  target: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  folder: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  users: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  network: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/><circle cx="7" cy="13" r="2"/><circle cx="17" cy="13" r="2"/><line x1="10" y1="11" x2="7" y2="11"/><line x1="14" y1="11" x2="17" y2="11"/></svg>,
  plug: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8H6a2 2 0 0 0-2 2v2a7 7 0 0 0 14 0v-2a2 2 0 0 0-2-2z"/></svg>,
  home: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  store: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  dollar: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  activity: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  settings: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

export default function AppSidebar({ companyName = "Optimus" }: { companyName?: string }) {
  return (
    <aside style={{
      width: 224, minWidth: 224, height: "100dvh", background: "#000",
      borderRight: "1px solid #1a1a1a", display: "flex", flexDirection: "column",
      flexShrink: 0, position: "sticky", top: 0,
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "0 14px", height: 48, borderBottom: "1px solid #111", flexShrink: 0,
      }}>
        <div style={{
          width: 20, height: 20, borderRadius: "5px", background: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#000",
        }}>
          {I.zap}
        </div>
        <span style={{
          fontFamily: "Geist, sans-serif", fontWeight: 400, fontSize: "14px",
          color: "#fff", letterSpacing: "-0.02em", flex: 1, overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{companyName}</span>
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1, overflowY: "auto", padding: "10px 8px",
        display: "flex", flexDirection: "column", gap: "16px",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <NavItem href="/app" label="Dashboard" icon={I.grid} exact liveCount={3} />
          <NavItem href="/app/inbox" label="Caixa de entrada" icon={I.inbox} badge={5} />
        </div>

        <Section label="Trabalho">
          <NavItem href="/app/issues" label="Tarefas" icon={I.circle} />
          <NavItem href="/app/goals" label="Metas" icon={I.target} />
          <NavItem href="/app/approvals" label="Aprovações" icon={I.check} badge={3} />
        </Section>

        <Section label="Projetos">
          <NavItem href="/app/projects" label="Todos os projetos" icon={I.folder} />
        </Section>

        <Section label="Agentes">
          <NavItem href="/app/agents" label="Todos os agentes" icon={I.users} />
        </Section>

        <Section label="Empresa">
          <NavItem href="/app/org" label="Organização" icon={I.network} />
          <NavItem href="/app/virtual-office" label="Escritório Virtual" icon={I.home} />
          <NavItem href="/app/clipmart" label="ClipMart" icon={I.store} />
          <NavItem href="/app/integrations" label="Integrações" icon={I.plug} liveCount={13} />
          <NavItem href="/app/costs" label="Custos" icon={I.dollar} />
          <NavItem href="/app/activity" label="Atividade" icon={I.activity} />
          <NavItem href="/app/settings" label="Configurações" icon={I.settings} />
        </Section>
      </nav>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #111", padding: "10px 14px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}>
          OPTIMUS v1.0
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => { localStorage.removeItem("optimus_onboarded"); localStorage.removeItem("optimus_company"); window.location.href = "/onboarding"; }}
            style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.15)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            title="Resetar onboarding"
          >
            ↺
          </button>
          <Link href="/" style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.22)", textDecoration: "none" }}>
            ← LP
          </Link>
        </div>
      </div>
    </aside>
  );
}
