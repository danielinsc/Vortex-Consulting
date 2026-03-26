"use client";
import { useState } from "react";

const CATEGORIES = ["Todos", "Executivo", "Tecnologia", "Marketing", "Financeiro", "Produto", "Vendas", "Atendimento", "Operações", "Templates"];

interface Listing {
  id: string;
  name: string;
  category: string;
  desc: string;
  longDesc: string;
  tools: string[];
  integrations: string[];
  model: string;
  price: "Grátis" | "Starter" | "Pro";
  rating: number;
  installs: number;
  badge: string | null;
  autonomy: "Alta" | "Média" | "Supervisionada";
}

const LISTINGS: Listing[] = [
  // ── Executivo ──
  {
    id: "ceo",
    name: "CEO",
    category: "Executivo",
    desc: "Estrategista-chefe. Decompõe OKRs em projetos, delega para heads de área, arbitra conflitos e mantém o roadmap da empresa alinhado.",
    longDesc: "O agente CEO atua como orquestrador principal da empresa autônoma. Ele lê os objetivos trimestrais, decompõe em KRs mensuráveis, distribui para os agentes de cada departamento e acompanha o progresso semanal. Capaz de identificar bloqueios e realinhar prioridades dinamicamente.",
    tools: ["Bash", "Read", "Write", "WebSearch", "Agent"],
    integrations: ["Notion", "Linear", "Slack", "Google Drive"],
    model: "Opus",
    price: "Grátis",
    rating: 4.9,
    installs: 1240,
    badge: "Destaque",
    autonomy: "Alta",
  },
  {
    id: "coo",
    name: "COO",
    category: "Executivo",
    desc: "Operações do dia a dia. Garante execução dos processos, remove bloqueios entre departamentos e mantém a cadência operacional da empresa.",
    longDesc: "O COO monitora o fluxo de trabalho entre agentes, identifica gargalos operacionais e redistribui carga. Gera relatórios diários de status para o CEO e mantém os SOPs (procedimentos operacionais) atualizados.",
    tools: ["Read", "Write", "WebSearch", "Agent"],
    integrations: ["Slack", "Linear", "Notion", "HubSpot"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.7,
    installs: 640,
    badge: null,
    autonomy: "Alta",
  },

  // ── Tecnologia ──
  {
    id: "cto",
    name: "CTO",
    category: "Tecnologia",
    desc: "Líder técnico. Arquitetura de sistemas, decisões build-vs-buy, code review estratégico e gestão da dívida técnica.",
    longDesc: "O CTO define e evolui a arquitetura da plataforma, revisa PRs críticos, avalia ferramentas e bibliotecas, e mantém o engineering handbook atualizado. Coordena DevOps, Full-Stack e Security em projetos de maior escala.",
    tools: ["Bash", "Read", "Write", "Glob", "Grep", "Agent"],
    integrations: ["GitHub", "Linear", "Slack", "Datadog"],
    model: "Opus",
    price: "Grátis",
    rating: 4.8,
    installs: 980,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "fullstack",
    name: "Full-Stack Engineer",
    category: "Tecnologia",
    desc: "Implementa features end-to-end, corrige bugs, escreve testes e faz deploys. Suporte a TypeScript, React, Node.js e PostgreSQL.",
    longDesc: "O Full-Stack Engineer recebe tasks do Linear, implementa no branch correto, escreve testes unitários e de integração, abre PR e responde a reviews. Opera em monorepos e conhece padrões modernos de API (REST, GraphQL, tRPC).",
    tools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"],
    integrations: ["GitHub", "Linear", "Vercel", "Supabase"],
    model: "Sonnet",
    price: "Grátis",
    rating: 4.9,
    installs: 1580,
    badge: "Popular",
    autonomy: "Alta",
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    category: "Tecnologia",
    desc: "CI/CD, infraestrutura na AWS, monitoring com Datadog, gestão de secrets e automação de deploys com zero downtime.",
    longDesc: "O DevOps configura pipelines GitHub Actions, gerencia clusters ECS/EKS, configura alarmes Datadog e garante que o ambiente de staging seja idêntico ao de produção. Executa rollbacks automáticos em caso de erros.",
    tools: ["Bash", "Read", "Write"],
    integrations: ["GitHub", "AWS", "Datadog", "Terraform"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.6,
    installs: 640,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "security",
    name: "Security Engineer",
    category: "Tecnologia",
    desc: "Auditorias de segurança, OWASP Top 10, gestão de secrets, compliance SOC2/LGPD e pen testing automatizado.",
    longDesc: "O Security Engineer analisa o código em busca de vulnerabilidades (SQLi, XSS, IDOR), verifica configurações de infraestrutura, audita políticas IAM, e gera relatórios de compliance. Integra com scanners como Snyk e Semgrep.",
    tools: ["Bash", "Grep", "Glob", "Read", "WebSearch"],
    integrations: ["GitHub", "Snyk", "AWS IAM", "Datadog"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.7,
    installs: 380,
    badge: null,
    autonomy: "Supervisionada",
  },
  {
    id: "datascientist",
    name: "Data Scientist",
    category: "Tecnologia",
    desc: "Modelos preditivos, análise de cohorte, churn prediction, LTV estimation e relatórios de experimentos A/B.",
    longDesc: "O Data Scientist constrói e mantém modelos de ML usando Python e scikit-learn, conduz análises exploratórias, implementa pipelines de dados e publica insights em dashboards do Metabase.",
    tools: ["Bash", "Read", "Write", "WebSearch"],
    integrations: ["PostgreSQL", "Metabase", "BigQuery", "Jupyter"],
    model: "Opus",
    price: "Pro",
    rating: 4.8,
    installs: 290,
    badge: null,
    autonomy: "Média",
  },

  // ── Marketing ──
  {
    id: "cmo",
    name: "CMO",
    category: "Marketing",
    desc: "Estratégia de marketing, brand, posicionamento, gestão de tráfego pago e orgânico, e calendário de conteúdo.",
    longDesc: "O CMO define o posicionamento da marca, coordena as campanhas pagas e orgânicas, revisa copies e criativos, e reporta ROAS e CAC semanalmente para o CEO. Gerencia os agentes Ads Manager, Content Writer e SEO.",
    tools: ["WebSearch", "Read", "Write", "WebFetch"],
    integrations: ["HubSpot", "Google Analytics", "Meta Ads", "Notion"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.7,
    installs: 820,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "adsmanager",
    name: "Ads Manager",
    category: "Marketing",
    desc: "Campanhas Google Ads e Meta Ads, alocação de budget, otimização de ROAS e reporting automatizado diário.",
    longDesc: "O Ads Manager cria e otimiza campanhas de performance, ajusta lances com base em dados históricos, segmenta audiências, realiza testes A/B de criativos e envia relatórios diários de ROAS e CPL para o CMO.",
    tools: ["WebFetch", "Read", "Write", "WebSearch"],
    integrations: ["Google Ads", "Meta Ads", "Google Analytics", "Slack"],
    model: "Haiku",
    price: "Starter",
    rating: 4.6,
    installs: 430,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "contentwriter",
    name: "Content Writer",
    category: "Marketing",
    desc: "Blog posts, threads do Twitter/X, newsletters e roteiros de vídeo. SEO-optimized, on-brand, entrega direto no CMS.",
    longDesc: "O Content Writer pesquisa tópicos relevantes, cria rascunhos com base nas diretrizes de brand, otimiza para SEO (meta tags, headings, keywords) e publica diretamente no Ghost/WordPress via API. Mantém cadência de publicação consistente.",
    tools: ["WebSearch", "WebFetch", "Read", "Write"],
    integrations: ["Ghost", "WordPress", "Notion", "Ahrefs"],
    model: "Haiku",
    price: "Starter",
    rating: 4.5,
    installs: 560,
    badge: null,
    autonomy: "Média",
  },
  {
    id: "seo",
    name: "SEO Specialist",
    category: "Marketing",
    desc: "Audit técnico de SEO, pesquisa de keywords, otimização on-page e relatórios de ranking mensais.",
    longDesc: "O SEO Specialist realiza auditorias técnicas completas (Core Web Vitals, sitemap, structured data), identifica oportunidades de keywords com Ahrefs/Semrush, otimiza meta tags e propõe estratégias de link building.",
    tools: ["WebSearch", "WebFetch", "Read", "Write"],
    integrations: ["Ahrefs", "Google Search Console", "Notion", "WordPress"],
    model: "Haiku",
    price: "Starter",
    rating: 4.6,
    installs: 310,
    badge: null,
    autonomy: "Alta",
  },

  // ── Financeiro ──
  {
    id: "cfo",
    name: "CFO",
    category: "Financeiro",
    desc: "Planejamento financeiro, fluxo de caixa, unit economics, runway e relatórios trimestrais para investidores.",
    longDesc: "O CFO consolida receitas (Stripe), despesas e métricas de unit economics (CAC, LTV, Payback). Gera projeções de runway, prepara relatórios para o board e emite alertas quando métricas saem da faixa esperada.",
    tools: ["Read", "Write", "WebFetch", "Bash"],
    integrations: ["Stripe", "Conta Azul", "Google Sheets", "Notion"],
    model: "Haiku",
    price: "Starter",
    rating: 4.8,
    installs: 710,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "accountant",
    name: "Contador",
    category: "Financeiro",
    desc: "Conciliação bancária, categorização de despesas, emissão de NFes e relatórios para DRE mensal.",
    longDesc: "O Contador importa extratos bancários, categoriza automaticamente as transações, emite notas fiscais via API da prefeitura, e monta o DRE mensal para o CFO. Compatível com regime Simples Nacional e Lucro Presumido.",
    tools: ["Read", "Write", "WebFetch", "Bash"],
    integrations: ["Conta Azul", "Open Banking", "NFe API", "Google Sheets"],
    model: "Haiku",
    price: "Starter",
    rating: 4.6,
    installs: 420,
    badge: null,
    autonomy: "Supervisionada",
  },

  // ── Produto ──
  {
    id: "pm",
    name: "Product Manager",
    category: "Produto",
    desc: "Roadmap de produto, priorização por impacto × esforço, discovery com usuários e alinhamento com engenharia.",
    longDesc: "O PM coleta e analisa feedback de usuários, mapeia oportunidades com a matriz impacto × esforço, escreve PRDs detalhados, cria e prioriza epics no Linear e alinha com o CTO viabilidade técnica de cada feature.",
    tools: ["WebSearch", "Read", "Write", "WebFetch", "Agent"],
    integrations: ["Linear", "Notion", "Mixpanel", "Intercom"],
    model: "Opus",
    price: "Starter",
    rating: 4.8,
    installs: 690,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "ux",
    name: "UX/UI Designer",
    category: "Produto",
    desc: "Wireframes, protótipos Figma, design system e handoff detalhado para devs. Baseado em dados de usabilidade.",
    longDesc: "O UX/UI Designer realiza análises de usabilidade, propõe soluções de UI baseadas em dados (heatmaps, session recordings), cria componentes no Figma e documenta o design system. Gera specs de handoff automáticas para o time de dev.",
    tools: ["WebFetch", "Read", "Write", "WebSearch"],
    integrations: ["Figma", "Hotjar", "Notion", "Linear"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.8,
    installs: 690,
    badge: null,
    autonomy: "Média",
  },
  {
    id: "dataanalyst",
    name: "Data Analyst",
    category: "Produto",
    desc: "Dashboards executivos, análise de funil, cohortes de retenção, anomalias e modelos preditivos de churn.",
    longDesc: "O Data Analyst extrai dados do banco e ferramentas de analytics, constrói dashboards no Metabase, analisa cohortes de retenção e ativação, detecta anomalias e gera alertas automáticos quando métricas saem do padrão.",
    tools: ["Bash", "Read", "Write", "WebFetch"],
    integrations: ["PostgreSQL", "Metabase", "Mixpanel", "GA4"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.7,
    installs: 520,
    badge: null,
    autonomy: "Alta",
  },

  // ── Vendas ──
  {
    id: "sdr",
    name: "SDR",
    category: "Vendas",
    desc: "Prospecção outbound, qualificação via BANT, cold outreach multicanal (email + LinkedIn) e gestão de pipeline no CRM.",
    longDesc: "O SDR define o ICP, pesquisa leads no LinkedIn Sales Navigator, qualifica com critérios BANT, envia sequências de cold email personalizadas e registra todas as interações no HubSpot. Gera 50+ leads qualificados por semana.",
    tools: ["WebSearch", "WebFetch", "Read", "Write"],
    integrations: ["HubSpot", "LinkedIn Sales Nav", "Instantly", "Slack"],
    model: "Sonnet",
    price: "Starter",
    rating: 4.5,
    installs: 520,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "ae",
    name: "Account Executive",
    category: "Vendas",
    desc: "Gestão de deals no funil, elaboração de propostas personalizadas, follow-up estratégico e fechamento de contratos.",
    longDesc: "O AE pega leads qualificados do SDR, realiza discovery calls (resumidas via transcrição), elabora propostas comerciais personalizadas, conduz negociações e monitora o pipeline com previsão de fechamento no CRM.",
    tools: ["Read", "Write", "WebFetch", "WebSearch"],
    integrations: ["HubSpot", "DocuSign", "Notion", "Slack"],
    model: "Sonnet",
    price: "Pro",
    rating: 4.7,
    installs: 310,
    badge: null,
    autonomy: "Supervisionada",
  },
  {
    id: "revenueops",
    name: "Revenue Ops",
    category: "Vendas",
    desc: "Otimização do funil de vendas, análise de conversão por estágio, forecasting e automação de processos no CRM.",
    longDesc: "O Revenue Ops analisa as taxas de conversão em cada estágio do funil, identifica gargalos, configura automações no HubSpot, gera forecasts de receita e reporta métricas de pipeline para o CEO e CFO.",
    tools: ["Read", "Write", "WebFetch", "Bash"],
    integrations: ["HubSpot", "Stripe", "Google Sheets", "Slack"],
    model: "Haiku",
    price: "Starter",
    rating: 4.6,
    installs: 280,
    badge: null,
    autonomy: "Alta",
  },

  // ── Atendimento ──
  {
    id: "cs",
    name: "Customer Success",
    category: "Atendimento",
    desc: "Onboarding de clientes, health score, expansão de conta, prevenção de churn e NPS automatizado.",
    longDesc: "O CS conduz o onboarding estruturado de novos clientes (checklist automatizado), monitora health score baseado em uso, identifica contas em risco de churn e propõe ações de expansão (upsell/cross-sell) para o AE.",
    tools: ["Read", "Write", "WebFetch", "WebSearch"],
    integrations: ["Intercom", "HubSpot", "Mixpanel", "Slack"],
    model: "Haiku",
    price: "Starter",
    rating: 4.7,
    installs: 370,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "support",
    name: "Suporte Técnico",
    category: "Atendimento",
    desc: "Triagem e resolução de tickets L1/L2, base de conhecimento auto-atualizada e escalação automática para devs.",
    longDesc: "O agente de Suporte resolve tickets de nível L1 (FAQ, onboarding, configuração) e L2 (troubleshooting técnico), atualiza automaticamente a base de conhecimento com cada resolução e escala para o time de eng quando necessário.",
    tools: ["Read", "Write", "WebSearch", "WebFetch"],
    integrations: ["Intercom", "Linear", "Notion", "Slack"],
    model: "Haiku",
    price: "Grátis",
    rating: 4.6,
    installs: 840,
    badge: "Popular",
    autonomy: "Alta",
  },

  // ── Operações / RH ──
  {
    id: "hr",
    name: "HR Manager",
    category: "Operações",
    desc: "Onboarding de agentes e colaboradores, SOPs, cultura organizacional, políticas de gestão de capacidade.",
    longDesc: "O HR Manager gerencia o ciclo de vida dos agentes no workspace: onboarding, configuração de permissões, documentação de processos (SOPs), avaliações de performance e gestão da cultura organizacional.",
    tools: ["Read", "Write", "WebSearch", "Agent"],
    integrations: ["Notion", "Slack", "Linear", "Google Drive"],
    model: "Haiku",
    price: "Starter",
    rating: 4.5,
    installs: 310,
    badge: null,
    autonomy: "Alta",
  },
  {
    id: "legalops",
    name: "Legal Ops",
    category: "Operações",
    desc: "Revisão de contratos, compliance LGPD, termos de serviço, NDA e monitoramento de riscos regulatórios.",
    longDesc: "O Legal Ops revisa contratos usando templates e listas de verificação jurídica, monitora mudanças regulatórias relevantes, mantém o DPA e Termos de Serviço atualizados e gera relatórios de conformidade LGPD.",
    tools: ["Read", "Write", "WebSearch", "WebFetch"],
    integrations: ["DocuSign", "Notion", "Google Drive", "Slack"],
    model: "Sonnet",
    price: "Pro",
    rating: 4.7,
    installs: 190,
    badge: null,
    autonomy: "Supervisionada",
  },

  // ── Templates ──
  {
    id: "tpl-saas",
    name: "SaaS Startup",
    category: "Templates",
    desc: "Time completo para SaaS B2B: CEO + CTO + 2 Full-Stack Engineers + PM + Designer + SDR + CS. Budget: R$800/mês.",
    longDesc: "Pack otimizado para startups SaaS em fase de crescimento. Inclui orquestração automática entre agentes, workflows de desenvolvimento ágil, funil de vendas outbound e customer success automatizado.",
    tools: [],
    integrations: ["GitHub", "Linear", "HubSpot", "Stripe", "Slack"],
    model: "Múltiplos",
    price: "Grátis",
    rating: 4.9,
    installs: 890,
    badge: "Template",
    autonomy: "Alta",
  },
  {
    id: "tpl-ecomm",
    name: "E-commerce Operation",
    category: "Templates",
    desc: "Operação completa de e-commerce: CEO + Ads Manager + Content Writer + Suporte + Contador. Budget: R$600/mês.",
    longDesc: "Pack para e-commerces que querem operar 24/7 sem time humano. Cobre aquisição paga, criação de conteúdo, atendimento ao cliente, conciliação financeira e relatórios automáticos de performance.",
    tools: [],
    integrations: ["Shopify", "Meta Ads", "Google Ads", "Intercom", "Conta Azul"],
    model: "Múltiplos",
    price: "Grátis",
    rating: 4.7,
    installs: 620,
    badge: "Template",
    autonomy: "Alta",
  },
  {
    id: "tpl-agency",
    name: "Agência Digital",
    category: "Templates",
    desc: "Pack para agências: Ads Manager + SEO + Content Writer + UX Designer + Suporte. Budget: R$700/mês.",
    longDesc: "Automatize a entrega de resultados para clientes de agência. Os agentes trabalham em paralelo em múltiplos clientes, com relatórios automáticos de performance e criação de conteúdo em escala.",
    tools: [],
    integrations: ["Google Ads", "Meta Ads", "Ahrefs", "WordPress", "Slack"],
    model: "Múltiplos",
    price: "Grátis",
    rating: 4.6,
    installs: 410,
    badge: "Template",
    autonomy: "Alta",
  },
];

const AUTONOMY_COLOR: Record<string, string> = {
  "Alta": "rgba(100,240,120,0.7)",
  "Média": "rgba(240,184,100,0.7)",
  "Supervisionada": "rgba(200,200,200,0.4)",
};

const MODEL_COLOR: Record<string, string> = {
  "Opus": "rgba(180,140,255,0.6)",
  "Sonnet": "rgba(100,180,255,0.6)",
  "Haiku": "rgba(100,230,200,0.6)",
  "Múltiplos": "rgba(200,200,200,0.4)",
};

function AgentModal({ item, onClose }: { item: Listing; onClose: () => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onClose}>
      <div style={{
        background: "#000", border: "1px solid #222", borderRadius: 14,
        width: "min(560px, 90vw)", maxHeight: "85vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #111" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                {item.badge && (
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, padding: "2px 8px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
                    {item.badge}
                  </span>
                )}
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{item.category.toUpperCase()}</span>
              </div>
              <h2 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 22, color: "#fff", margin: 0, letterSpacing: "-0.03em" }}>{item.name}</h2>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4, flexShrink: 0 }}>×</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 20px" }}>{item.longDesc}</p>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
            {[
              ["Modelo", item.model, MODEL_COLOR[item.model] || "rgba(200,200,200,0.4)"],
              ["Autonomia", item.autonomy, AUTONOMY_COLOR[item.autonomy]],
              ["Avaliação", `★ ${item.rating}`, "rgba(255,200,100,0.7)"],
            ].map(([label, value, color]) => (
              <div key={label} style={{ background: "#050505", border: "1px solid #111", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", marginBottom: 4, letterSpacing: "0.04em" }}>{label.toUpperCase()}</div>
                <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 12, color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Tools */}
          {item.tools.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 8 }}>FERRAMENTAS</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.tools.map(t => (
                  <span key={t} style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, padding: "3px 9px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.45)" }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {item.integrations.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 8 }}>INTEGRAÇÕES</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {item.integrations.map(t => (
                  <span key={t} style={{ fontFamily: "Geist Mono, monospace", fontSize: 10, padding: "3px 9px", borderRadius: 4, background: "rgba(100,180,255,0.06)", border: "1px solid rgba(100,180,255,0.15)", color: "rgba(100,180,255,0.7)" }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            {item.installs.toLocaleString("pt-BR")} instalações
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: "1px solid #111", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            {item.price === "Grátis" ? "Gratuito" : `Plano ${item.price}`}
          </span>
          <button style={{
            fontFamily: "Inter, sans-serif", fontSize: 13, padding: "8px 20px", borderRadius: 8,
            border: "none", cursor: "pointer",
            background: item.price === "Grátis" ? "#fff" : "rgba(255,255,255,0.08)",
            color: item.price === "Grátis" ? "#000" : "rgba(255,255,255,0.7)",
            fontWeight: 500,
          }}>
            {item.price === "Grátis" ? "Instalar grátis" : "Fazer upgrade"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClipMartPage() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Listing | null>(null);

  const filtered = LISTINGS.filter((l) => {
    const matchCat = category === "Todos" || l.category === category;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const runningCount = LISTINGS.filter(l => l.category !== "Templates").length;
  const templateCount = LISTINGS.filter(l => l.category === "Templates").length;

  return (
    <div style={{ padding: "32px 40px" }}>
      {selected && <AgentModal item={selected} onClose={() => setSelected(null)} />}

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", padding: "2px 10px", borderRadius: "62px", background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
            ClipMart
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
            {runningCount} agentes · {templateCount} templates · 9 categorias
          </span>
        </div>
        <h1 style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "28px", color: "#fff", letterSpacing: "-0.03em", margin: "0 0 4px" }}>
          Marketplace de agentes
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", margin: 0 }}>
          Instale agentes individualmente ou em packs de equipe. Cada agente opera com ferramentas reais e integrações nativas.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "20px", maxWidth: 480 }}>
        <input
          type="text"
          placeholder="Buscar agentes, templates, integrações..."
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "10px" }}>
        {filtered.map((item) => (
          <div key={item.id}
            onClick={() => setSelected(item)}
            style={{
              background: "#000", border: "1px solid #1a1a1a", borderRadius: "12px",
              padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
              position: "relative", cursor: "pointer", transition: "border-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#333")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#1a1a1a")}
          >
            {/* Badges */}
            <div style={{ display: "flex", gap: 6, position: "absolute", top: 14, right: 14 }}>
              {item.badge && (
                <span style={{
                  fontFamily: "Geist Mono, monospace", fontSize: "9px",
                  padding: "2px 8px", borderRadius: "4px",
                  background: item.badge === "Template" ? "rgba(100,180,255,0.08)" : "rgba(255,255,255,0.05)",
                  border: item.badge === "Template" ? "1px solid rgba(100,180,255,0.2)" : "1px solid #1a1a1a",
                  color: item.badge === "Template" ? "rgba(100,180,255,0.7)" : "rgba(255,255,255,0.4)",
                  letterSpacing: "0.04em",
                }}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Name + category */}
            <div style={{ minWidth: 0, paddingRight: item.badge ? 60 : 0 }}>
              <div style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: "15px", color: "#fff", marginBottom: "3px" }}>{item.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>{item.category.toUpperCase()}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: MODEL_COLOR[item.model] || "rgba(255,255,255,0.25)" }}>{item.model}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
              {item.desc}
            </p>

            {/* Integrations preview */}
            {item.integrations.length > 0 && (
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {item.integrations.slice(0, 4).map(i => (
                  <span key={i} style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "2px 6px", borderRadius: 3, background: "rgba(100,180,255,0.05)", border: "1px solid rgba(100,180,255,0.12)", color: "rgba(100,180,255,0.5)" }}>{i}</span>
                ))}
                {item.integrations.length > 4 && (
                  <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.2)" }}>+{item.integrations.length - 4}</span>
                )}
              </div>
            )}

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "10px", color: "rgba(255,255,255,0.2)" }}>
                  ★ {item.rating}
                </span>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", color: "rgba(255,255,255,0.15)" }}>
                  {item.installs.toLocaleString("pt-BR")} inst.
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: "9px", padding: "2px 6px", borderRadius: 3, background: "rgba(255,255,255,0.04)", border: "1px solid #111", color: AUTONOMY_COLOR[item.autonomy] }}>
                  {item.autonomy}
                </span>
                <button style={{
                  fontFamily: "Inter, sans-serif", fontSize: "12px",
                  padding: "5px 14px", borderRadius: "6px", border: "1px solid #1a1a1a", cursor: "pointer",
                  background: item.price === "Grátis" ? "rgba(255,255,255,0.06)" : "transparent",
                  color: item.price === "Grátis" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
                }} onClick={e => { e.stopPropagation(); setSelected(item); }}>
                  {item.price === "Grátis" ? "Instalar" : item.price}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: "60px 0", textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.2)" }}>Nenhum agente encontrado para "{search}"</p>
        </div>
      )}
    </div>
  );
}
