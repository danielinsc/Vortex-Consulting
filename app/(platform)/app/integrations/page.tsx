"use client";
import { useState } from "react";

const CATEGORIES = ["Todas", "CRM & Vendas", "Marketing", "Comunicação", "Pagamentos", "Desenvolvimento", "Analytics", "Produtividade", "IA & Dados"];

interface Integration {
  id: string;
  name: string;
  category: string;
  desc: string;
  status: "connected" | "available" | "coming_soon";
  logo: string; // emoji fallback
  color: string;
  features: string[];
  agentsUsing: string[];
}

const INTEGRATIONS: Integration[] = [
  // ── CRM & Vendas ──
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM & Vendas",
    desc: "CRM completo. Agentes criam, atualizam e qualificam leads, gerenciam pipeline e disparam automações de vendas.",
    status: "connected",
    logo: "🟠",
    color: "#FF7A59",
    features: ["Criar e atualizar contatos", "Gerenciar deals no pipeline", "Disparar sequências de email", "Relatórios de conversão"],
    agentsUsing: ["SDR", "Account Executive", "Revenue Ops", "Customer Success"],
  },
  {
    id: "linkedin",
    name: "LinkedIn Sales Nav",
    category: "CRM & Vendas",
    desc: "Prospecção e qualificação de leads. O SDR pesquisa ICP, coleta dados de contato e inicia conexões automaticamente.",
    status: "connected",
    logo: "🔷",
    color: "#0077B5",
    features: ["Busca avançada de leads", "Salvar leads em listas", "Enviar mensagens InMail", "Exportar para CRM"],
    agentsUsing: ["SDR"],
  },
  {
    id: "docusign",
    name: "DocuSign",
    category: "CRM & Vendas",
    desc: "Envio e assinatura digital de contratos. O AE prepara, envia e acompanha o status de assinatura sem intervenção humana.",
    status: "available",
    logo: "📝",
    color: "#FFB822",
    features: ["Enviar documentos para assinatura", "Acompanhar status em tempo real", "Notificar quando assinado", "Arquivar no Drive"],
    agentsUsing: ["Account Executive", "Legal Ops"],
  },

  // ── Marketing ──
  {
    id: "meta-ads",
    name: "Meta Ads",
    category: "Marketing",
    desc: "Criação e otimização de campanhas no Facebook e Instagram. O Ads Manager ajusta orçamentos e lances automaticamente.",
    status: "connected",
    logo: "🔵",
    color: "#1877F2",
    features: ["Criar campanhas e conjuntos", "Otimizar lances por ROAS", "Pausar anúncios com baixo CTR", "Relatório diário de performance"],
    agentsUsing: ["Ads Manager", "CMO"],
  },
  {
    id: "google-ads",
    name: "Google Ads",
    category: "Marketing",
    desc: "Campanhas Search, Display e Performance Max. Bidding automático com base em dados de conversão do CRM.",
    status: "connected",
    logo: "🟡",
    color: "#FBBC04",
    features: ["Campanhas Search e Display", "Smart bidding", "Relatórios de keywords", "Integração com GA4"],
    agentsUsing: ["Ads Manager", "CMO", "SEO Specialist"],
  },
  {
    id: "ahrefs",
    name: "Ahrefs",
    category: "Marketing",
    desc: "SEO, pesquisa de keywords e análise de backlinks. O SEO Specialist usa para auditorias e estratégias de conteúdo.",
    status: "available",
    logo: "🔍",
    color: "#F7941D",
    features: ["Pesquisa de keywords", "Análise de backlinks", "Site audit técnico", "Tracking de rankings"],
    agentsUsing: ["SEO Specialist", "Content Writer", "CMO"],
  },
  {
    id: "instantly",
    name: "Instantly",
    category: "Marketing",
    desc: "Sequências de cold email em escala. O SDR configura campanhas de outreach com personalização por ICP.",
    status: "available",
    logo: "⚡",
    color: "#6C5CE7",
    features: ["Sequências automatizadas", "Personalização por variável", "A/B test de subject lines", "Analytics de abertura/clique"],
    agentsUsing: ["SDR", "CMO"],
  },

  // ── Comunicação ──
  {
    id: "slack",
    name: "Slack",
    category: "Comunicação",
    desc: "Hub central de comunicação. Agentes enviam atualizações, alertas e relatórios para canais específicos.",
    status: "connected",
    logo: "💬",
    color: "#4A154B",
    features: ["Enviar mensagens e alertas", "Criar canais por projeto", "Notificações de anomalias", "Relatórios automáticos"],
    agentsUsing: ["CEO", "CTO", "DevOps", "Data Analyst", "HR Manager", "CS"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Comunicação",
    desc: "Atendimento ao cliente via WhatsApp. O agente de Suporte responde automaticamente com base na base de conhecimento.",
    status: "available",
    logo: "📱",
    color: "#25D366",
    features: ["Responder mensagens automáticas", "Escalação para humano", "Templates de mensagem", "Histórico de conversas"],
    agentsUsing: ["Suporte Técnico", "Customer Success"],
  },
  {
    id: "intercom",
    name: "Intercom",
    category: "Comunicação",
    desc: "Chat e suporte in-app. Agentes atendem usuários, criam tickets e atualizam a base de conhecimento automaticamente.",
    status: "connected",
    logo: "💙",
    color: "#1F8DED",
    features: ["Chat ao vivo e bot", "Triagem de tickets", "Base de conhecimento", "Onboarding automatizado"],
    agentsUsing: ["Suporte Técnico", "Customer Success"],
  },
  {
    id: "email",
    name: "Email (SMTP/Gmail)",
    category: "Comunicação",
    desc: "Envio e leitura de emails. Agentes processam inbox, respondem clientes e enviam relatórios periódicos.",
    status: "connected",
    logo: "📧",
    color: "#EA4335",
    features: ["Ler e responder emails", "Enviar relatórios automáticos", "Classificar e arquivar", "Integrações IMAP/SMTP"],
    agentsUsing: ["SDR", "CFO", "Customer Success", "HR Manager"],
  },

  // ── Pagamentos ──
  {
    id: "stripe",
    name: "Stripe",
    category: "Pagamentos",
    desc: "Gestão de assinaturas, pagamentos e webhooks. O CFO monitora MRR, churn e emite relatórios financeiros automáticos.",
    status: "connected",
    logo: "💳",
    color: "#635BFF",
    features: ["Monitorar MRR e ARR", "Processar reembolsos", "Webhooks de eventos", "Relatórios financeiros"],
    agentsUsing: ["CFO", "Contador", "Revenue Ops"],
  },
  {
    id: "pix",
    name: "Pix / Open Banking",
    category: "Pagamentos",
    desc: "Conciliação de extratos bancários e pagamentos via Pix. O Contador importa e categoriza transações automaticamente.",
    status: "available",
    logo: "🏦",
    color: "#32BCAD",
    features: ["Importar extratos", "Conciliação automática", "Pagamentos em lote", "Integração contábil"],
    agentsUsing: ["CFO", "Contador"],
  },

  // ── Desenvolvimento ──
  {
    id: "github",
    name: "GitHub",
    category: "Desenvolvimento",
    desc: "Repositório de código. Agentes abrem PRs, fazem code review, gerenciam issues e executam workflows de CI/CD.",
    status: "connected",
    logo: "🐙",
    color: "#24292F",
    features: ["Abrir e revisar PRs", "Criar e fechar issues", "Trigger de Actions", "Code search"],
    agentsUsing: ["CTO", "Full-Stack Engineer", "DevOps", "Security Engineer"],
  },
  {
    id: "linear",
    name: "Linear",
    category: "Desenvolvimento",
    desc: "Gestão de projetos e tasks. Agentes criam issues, atualizam status, estimam esforço e fecham ciclos de sprint.",
    status: "connected",
    logo: "📋",
    color: "#5E6AD2",
    features: ["Criar e atualizar issues", "Mover entre etapas", "Estimativas de esforço", "Relatórios de velocidade"],
    agentsUsing: ["CEO", "CTO", "PM", "Full-Stack Engineer", "DevOps"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "Desenvolvimento",
    desc: "Deploy de frontends. O Full-Stack e DevOps automatizam deploys por branch, preview environments e rollbacks.",
    status: "connected",
    logo: "▲",
    color: "#000000",
    features: ["Deploy automático por branch", "Preview environments", "Rollback em 1 clique", "Analytics de performance"],
    agentsUsing: ["Full-Stack Engineer", "DevOps"],
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Desenvolvimento",
    desc: "Monitoring e observabilidade. O DevOps configura alertas, dashboards e o agente reage automaticamente a anomalias.",
    status: "available",
    logo: "🐶",
    color: "#632CA6",
    features: ["APM e traces", "Logs centralizados", "Alertas automáticos", "Dashboards de infra"],
    agentsUsing: ["DevOps", "Security Engineer"],
  },

  // ── Analytics ──
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "Analytics",
    desc: "Analytics de produto e marketing. O Data Analyst extrai métricas de sessão, conversão e comportamento de usuário.",
    status: "connected",
    logo: "📊",
    color: "#E37400",
    features: ["Extrair métricas de tráfego", "Funis de conversão", "Análise de cohorte", "Relatórios automáticos"],
    agentsUsing: ["Data Analyst", "CMO", "Ads Manager"],
  },
  {
    id: "mixpanel",
    name: "Mixpanel",
    category: "Analytics",
    desc: "Product analytics. O PM e Data Analyst analisam retenção, feature adoption e identificam oportunidades de crescimento.",
    status: "available",
    logo: "🎯",
    color: "#7856FF",
    features: ["Event tracking", "Retenção e cohortes", "Funnels de ativação", "A/B tests de produto"],
    agentsUsing: ["PM", "Data Analyst"],
  },
  {
    id: "metabase",
    name: "Metabase",
    category: "Analytics",
    desc: "Dashboards executivos. O Data Analyst cria e mantém dashboards de negócio acessíveis para toda a equipe.",
    status: "connected",
    logo: "📈",
    color: "#509EE3",
    features: ["Criar dashboards", "Queries em SQL natural", "Alertas de métricas", "Compartilhar relatórios"],
    agentsUsing: ["Data Analyst", "CFO"],
  },

  // ── Produtividade ──
  {
    id: "notion",
    name: "Notion",
    category: "Produtividade",
    desc: "Base de conhecimento e wiki. Agentes documentam processos, atuam SOPs e escrevem relatórios estruturados.",
    status: "connected",
    logo: "⬛",
    color: "#000000",
    features: ["Criar e editar páginas", "Atualizar databases", "Templates de documentação", "Versionamento de SOPs"],
    agentsUsing: ["CEO", "PM", "HR Manager", "CS", "Legal Ops"],
  },
  {
    id: "drive",
    name: "Google Drive",
    category: "Produtividade",
    desc: "Armazenamento de arquivos e documentos. Agentes salvam relatórios, propostas e contratos automaticamente.",
    status: "connected",
    logo: "📁",
    color: "#34A853",
    features: ["Criar e editar documentos", "Gerenciar permissões", "Organizar por pasta", "Versioning automático"],
    agentsUsing: ["CFO", "Legal Ops", "HR Manager"],
  },
  {
    id: "sheets",
    name: "Google Sheets",
    category: "Produtividade",
    desc: "Planilhas para dados financeiros e operacionais. CFO e Contador exportam relatórios e projeções automaticamente.",
    status: "connected",
    logo: "🟩",
    color: "#0F9D58",
    features: ["Leitura e escrita de dados", "Fórmulas automáticas", "Gráficos dinâmicos", "Exportar para PDF"],
    agentsUsing: ["CFO", "Contador", "Revenue Ops"],
  },

  // ── IA & Dados ──
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "IA & Dados",
    desc: "Banco de dados principal. Agentes executam queries, analisam dados e geram relatórios diretamente do banco.",
    status: "connected",
    logo: "🐘",
    color: "#336791",
    features: ["Queries analíticas", "Criação de tabelas", "Índices e otimização", "Backup automático"],
    agentsUsing: ["Full-Stack Engineer", "Data Analyst", "Data Scientist", "DevOps"],
  },
  {
    id: "anthropic",
    name: "Anthropic API",
    category: "IA & Dados",
    desc: "Motor de inteligência dos agentes. Claude Opus, Sonnet e Haiku alimentam todo o raciocínio da plataforma.",
    status: "connected",
    logo: "🤖",
    color: "#D97757",
    features: ["Claude Opus para tarefas complexas", "Sonnet para tasks intermediárias", "Haiku para alta velocidade", "Context window longo"],
    agentsUsing: ["Todos os agentes"],
  },
  {
    id: "bigquery",
    name: "BigQuery",
    category: "IA & Dados",
    desc: "Data warehouse para análises em escala. O Data Scientist processa terabytes de dados para modelos preditivos.",
    status: "coming_soon",
    logo: "🔬",
    color: "#4285F4",
    features: ["Queries massivas em SQL", "ML integrado (BQML)", "Integração com Looker", "Exportação automática"],
    agentsUsing: ["Data Scientist", "Data Analyst"],
  },
];

const STATUS_LABEL: Record<string, string> = {
  connected: "Conectado",
  available: "Disponível",
  coming_soon: "Em breve",
};
const STATUS_COLOR: Record<string, string> = {
  connected: "#64f078",
  available: "rgba(200,200,200,0.45)",
  coming_soon: "rgba(255,200,100,0.5)",
};
const STATUS_BG: Record<string, string> = {
  connected: "rgba(100,240,120,0.08)",
  available: "rgba(255,255,255,0.04)",
  coming_soon: "rgba(255,200,100,0.06)",
};

export default function IntegrationsPage() {
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");

  const filtered = INTEGRATIONS.filter(i => {
    const matchCat = category === "Todas" || i.category === category;
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()) || i.agentsUsing.some(a => a.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const connectedCount = INTEGRATIONS.filter(i => i.status === "connected").length;

  return (
    <div style={{ padding: "32px 40px" }}>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", padding: "2px 10px", borderRadius: "62px", background: "rgba(100,240,120,0.06)", border: "1px solid rgba(100,240,120,0.15)", color: "rgba(100,240,120,0.7)", letterSpacing: "0.04em" }}>
            {connectedCount} conectadas
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            {INTEGRATIONS.length} integrações · {CATEGORIES.length - 1} categorias
          </span>
        </div>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Integrações
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Conecte suas ferramentas para que os agentes operem com dados reais em tempo real.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: 480 }}>
        <input
          type="text"
          placeholder="Buscar integrações, agentes, ferramentas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "10px 16px 10px 40px",
            background: "#000", border: "1px solid #1a1a1a", borderRadius: "8px",
            fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#fff",
            outline: "none", boxSizing: "border-box",
          }}
        />
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)", pointerEvents: "none" }}
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "24px", flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            fontFamily: "Inter, sans-serif", fontSize: "12px",
            padding: "5px 12px", borderRadius: "62px", cursor: "pointer",
            background: category === cat ? "#fff" : "rgba(255,255,255,0.04)",
            border: `1px solid ${category === cat ? "#fff" : "#1a1a1a"}`,
            color: category === cat ? "#000" : "rgba(255,255,255,0.3)",
            fontWeight: category === cat ? 500 : 400,
            transition: "all 0.15s",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "10px" }}>
        {filtered.map((item) => (
          <div key={item.id} style={{
            background: "#000", border: "1px solid #1a1a1a", borderRadius: "12px",
            padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: item.color + "18", border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {item.logo}
                </div>
                <div>
                  <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 15, color: "#fff" }}>{item.name}</div>
                  <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{item.category.toUpperCase()}</div>
                </div>
              </div>
              <span style={{
                fontFamily: "Geist Mono, monospace", fontSize: "9px", flexShrink: 0,
                padding: "3px 8px", borderRadius: "4px", letterSpacing: "0.04em",
                background: STATUS_BG[item.status], color: STATUS_COLOR[item.status],
                border: `1px solid ${STATUS_COLOR[item.status]}40`,
              }}>
                {STATUS_LABEL[item.status]}
              </span>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: 0 }}>
              {item.desc}
            </p>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {item.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: item.color + "aa", flexShrink: 0 }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{f}</span>
                </div>
              ))}
            </div>

            {/* Agents using */}
            <div>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.05em", marginBottom: 5 }}>AGENTES QUE USAM</div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {item.agentsUsing.map(a => (
                  <span key={a} style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid #111", color: "rgba(255,255,255,0.35)" }}>{a}</span>
                ))}
              </div>
            </div>

            {/* Action */}
            <div style={{ marginTop: 2 }}>
              {item.status === "connected" ? (
                <button style={{
                  width: "100%", fontFamily: "Inter, sans-serif", fontSize: "12px",
                  padding: "7px 0", borderRadius: 6, cursor: "pointer",
                  background: "transparent", border: "1px solid #1a1a1a",
                  color: "rgba(255,255,255,0.3)",
                }}>
                  Gerenciar conexão
                </button>
              ) : item.status === "available" ? (
                <button style={{
                  width: "100%", fontFamily: "Inter, sans-serif", fontSize: "12px",
                  padding: "7px 0", borderRadius: 6, cursor: "pointer",
                  background: "rgba(255,255,255,0.06)", border: "1px solid #222",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  Conectar
                </button>
              ) : (
                <button disabled style={{
                  width: "100%", fontFamily: "Inter, sans-serif", fontSize: "12px",
                  padding: "7px 0", borderRadius: 6, cursor: "not-allowed",
                  background: "transparent", border: "1px solid #111",
                  color: "rgba(255,255,255,0.18)",
                }}>
                  Em breve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>Nenhuma integração encontrada para "{search}"</p>
        </div>
      )}
    </div>
  );
}
