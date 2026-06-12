// ─── Diagnóstico — opções, tipos e scoring ──────────────────────────────
// Fonte da verdade dos campos do formulário. O scoring é recalculado no
// servidor (actions.ts) a partir destes mesmos valores.

export const AMBER = "#FF6A1A";
export const AMBER_2 = "#FF8C3A";
export const AMBER_GRADIENT = "linear-gradient(135deg, #FF6A1A 0%, #FF8C3A 100%)";
export const TRANSITION = "all 0.4s cubic-bezier(0.12, 0.23, 0.28, 0.97)";

export type Option = { value: string; label: string };

export const NICHO_OPTIONS: Option[] = [
  { value: "saude", label: "Saúde" },
  { value: "varejo", label: "Varejo & E-commerce" },
  { value: "servicos", label: "Serviços profissionais (advocacia, contabilidade, agências)" },
  { value: "industria", label: "Indústria" },
  { value: "educacao", label: "Educação" },
  { value: "financeiro", label: "Financeiro" },
  { value: "tecnologia", label: "Tecnologia" },
  { value: "outro", label: "Outro" },
];

export const FUNCIONARIOS_OPTIONS: Option[] = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-500", label: "201–500" },
  { value: "500+", label: "500+" },
];

export const FATURAMENTO_OPTIONS: Option[] = [
  { value: "ate-1m", label: "Até R$ 1M" },
  { value: "1-5m", label: "R$ 1M–5M" },
  { value: "5-20m", label: "R$ 5M–20M" },
  { value: "20-100m", label: "R$ 20M–100M" },
  { value: "acima-100m", label: "Acima de R$ 100M" },
  { value: "nao-informar", label: "Prefiro não informar" },
];

export const GARGALO_OPTIONS: Option[] = [
  { value: "comercial", label: "Comercial & vendas" },
  { value: "atendimento", label: "Atendimento ao cliente" },
  { value: "financeiro", label: "Financeiro & cobrança" },
  { value: "marketing", label: "Marketing & conteúdo" },
  { value: "processos", label: "Processos internos & retrabalho" },
  { value: "dados", label: "Gestão & visibilidade de dados" },
  { value: "outro", label: "Outro" },
];

export const MATURIDADE_OPTIONS: Option[] = [
  { value: "nada", label: "Nada ainda — estamos avaliando" },
  { value: "ferramentas-soltas", label: "Usamos ferramentas soltas (ChatGPT, etc.) sem processo" },
  { value: "projeto-falhou", label: "Tentamos um projeto que não foi pra frente" },
  { value: "ja-rodando", label: "Já temos IA rodando em parte da operação" },
];

export const TAREFAS_OPTIONS: Option[] = [
  { value: "menos-20", label: "Menos de 20%" },
  { value: "20-40", label: "20–40%" },
  { value: "40-60", label: "40–60%" },
  { value: "mais-60", label: "Mais de 60%" },
  { value: "nao-sei", label: "Não sei estimar" },
];

export const SISTEMA_PROPRIO_OPTIONS: Option[] = [
  { value: "quero-proprio", label: "Sim — quero parar de depender de ferramentas de terceiros" },
  { value: "avaliando", label: "Talvez — depende do custo e do retorno" },
  { value: "ja-proprio", label: "Já temos sistema próprio sob medida" },
  { value: "satisfeito", label: "Não — as ferramentas atuais já atendem bem" },
];

export const URGENCIA_OPTIONS: Option[] = [
  { value: "agora", label: "O quanto antes — é prioridade agora" },
  { value: "3-meses", label: "Próximos 3 meses" },
  { value: "este-ano", label: "Este ano" },
  { value: "pesquisando", label: "Só estou pesquisando" },
];

// ─── Lead scoring (espelhado no servidor) ───────────────────────────────

const FUNCIONARIOS_SCORE: Record<string, number> = {
  "1-10": 1, "11-50": 2, "51-200": 3, "201-500": 4, "500+": 5,
};
const FATURAMENTO_SCORE: Record<string, number> = {
  "ate-1m": 0, "1-5m": 1, "5-20m": 2, "20-100m": 3, "acima-100m": 4, "nao-informar": 1,
};
const URGENCIA_SCORE: Record<string, number> = {
  "agora": 4, "3-meses": 3, "este-ano": 1, "pesquisando": 0,
};
const MATURIDADE_SCORE: Record<string, number> = {
  "nada": 1, "ferramentas-soltas": 2, "projeto-falhou": 3, "ja-rodando": 2,
};
const SISTEMA_PROPRIO_SCORE: Record<string, number> = {
  "quero-proprio": 4, "avaliando": 2, "ja-proprio": 1, "satisfeito": 0,
};

export type LeadClass = "A" | "B" | "C";

export function computeScore(input: {
  funcionarios: string;
  faturamento_anual?: string;
  urgencia: string;
  maturidade_ia: string;
  sistema_proprio: string;
}): { score: number; leadClass: LeadClass } {
  const score =
    (FUNCIONARIOS_SCORE[input.funcionarios] ?? 0) +
    (FATURAMENTO_SCORE[input.faturamento_anual ?? "nao-informar"] ?? 1) +
    (URGENCIA_SCORE[input.urgencia] ?? 0) +
    (MATURIDADE_SCORE[input.maturidade_ia] ?? 0) +
    (SISTEMA_PROPRIO_SCORE[input.sistema_proprio] ?? 0);

  const leadClass: LeadClass = score >= 12 ? "A" : score >= 7 ? "B" : "C";
  return { score, leadClass };
}

// Domínios de e-mail pessoal → flag email_pessoal
const PERSONAL_DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "live.com", "yahoo.com", "yahoo.com.br", "icloud.com", "bol.com.br"];
export function isPersonalEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return domain ? PERSONAL_DOMAINS.includes(domain) : false;
}

// ─── Máscara WhatsApp BR ────────────────────────────────────────────────
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}
