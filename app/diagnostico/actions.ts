"use server";

import { computeScore, isPersonalEmail, type LeadClass } from "@/components/diagnostico/constants";

// ─── Payload enviado pelo formulário ────────────────────────────────────
export type DiagnosticoInput = {
  // Passo 1
  nome: string;
  whatsapp: string; // só dígitos (10–11)
  // Passo 2
  email: string;
  empresa: string;
  nicho: string;
  nicho_outro?: string;
  funcionarios: string;
  faturamento_anual?: string;
  // Passo 3
  gargalo: string;
  gargalo_outro?: string;
  maturidade_ia: string;
  tarefas_repetitivas: string;
  sistema_proprio: string;
  // Passo 4
  urgencia: string;
  descricao?: string;
  consent: boolean;
  // Ocultos
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  referrer?: string;
  page_variant?: string;
  // Honeypot — deve vir vazio
  website?: string;
};

export type DiagnosticoResult =
  | { ok: true; leadClass: LeadClass }
  | { ok: false; error: string };

// Validação mínima no servidor (espelha o cliente). Quando plugarmos o Zod,
// trocar este bloco por um schema z.object({...}).safeParse(input).
function validate(input: DiagnosticoInput): string | null {
  const required: [keyof DiagnosticoInput, string][] = [
    ["nome", "Informe seu nome"],
    ["whatsapp", "Informe seu WhatsApp"],
    ["email", "Informe seu e-mail"],
    ["empresa", "Informe a empresa"],
    ["nicho", "Selecione o nicho"],
    ["funcionarios", "Selecione o nº de funcionários"],
    ["gargalo", "Selecione a área que mais trava"],
    ["maturidade_ia", "Selecione a maturidade em IA"],
    ["tarefas_repetitivas", "Selecione o volume de tarefas repetitivas"],
    ["sistema_proprio", "Selecione o interesse em sistemas próprios"],
    ["urgencia", "Selecione a urgência"],
  ];
  for (const [field, msg] of required) {
    if (!String(input[field] ?? "").trim()) return msg;
  }
  if (input.nome.trim().split(/\s+/).length < 2) return "Informe nome e sobrenome";
  if (input.whatsapp.replace(/\D/g, "").length < 10) return "Informe seu WhatsApp com DDD";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return "Informe um e-mail válido";
  if (!input.consent) return "É preciso aceitar para receber o diagnóstico";
  return null;
}

export async function submitDiagnostico(input: DiagnosticoInput): Promise<DiagnosticoResult> {
  // 1. Honeypot — bot preencheu campo oculto → finge sucesso e descarta
  if (input.website && input.website.trim() !== "") {
    return { ok: true, leadClass: "C" };
  }

  // 2. Validação
  const error = validate(input);
  if (error) return { ok: false, error };

  // 3. Score (autoritativo no servidor)
  const { score, leadClass } = computeScore({
    funcionarios: input.funcionarios,
    faturamento_anual: input.faturamento_anual,
    urgencia: input.urgencia,
    maturidade_ia: input.maturidade_ia,
    sistema_proprio: input.sistema_proprio,
  });

  const lead = {
    ...input,
    whatsapp: input.whatsapp.replace(/\D/g, ""),
    email_pessoal: isPersonalEmail(input.email),
    lead_score: score,
    lead_class: leadClass,
    submitted_at: new Date().toISOString(),
  };

  // ─── TODO (configurar depois) ─────────────────────────────────────────
  // 4. Persistir no Supabase:
  //      const supabase = createServerClient()
  //      const { error } = await supabase.from('leads').insert(lead)
  //      if (error) return { ok: false, error: 'Não foi possível enviar. Tente de novo.' }
  //
  // 5. Notificar lead A (Resend):
  //      if (leadClass === 'A') await sendLeadAlert(lead)
  // ──────────────────────────────────────────────────────────────────────

  // Por enquanto: log no servidor para validar o fluxo ponta a ponta.
  console.log("[diagnostico] novo lead", { class: leadClass, score, empresa: lead.empresa });

  return { ok: true, leadClass };
}
