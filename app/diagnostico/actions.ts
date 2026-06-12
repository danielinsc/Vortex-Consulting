"use server";

import { computeScore, isPersonalEmail, type LeadClass } from "@/components/diagnostico/constants";
import { getServerSupabase } from "@/lib/supabase/server";

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
    nome: input.nome.trim(),
    whatsapp: input.whatsapp.replace(/\D/g, ""),
    email: input.email.trim(),
    empresa: input.empresa.trim(),
    nicho: input.nicho,
    nicho_outro: input.nicho === "outro" ? input.nicho_outro?.trim() || null : null,
    funcionarios: input.funcionarios,
    faturamento_anual: input.faturamento_anual || null,
    gargalo: input.gargalo,
    gargalo_outro: input.gargalo === "outro" ? input.gargalo_outro?.trim() || null : null,
    maturidade_ia: input.maturidade_ia,
    tarefas_repetitivas: input.tarefas_repetitivas,
    sistema_proprio: input.sistema_proprio,
    urgencia: input.urgencia,
    descricao: input.descricao?.trim() || null,
    consent: input.consent,
    email_pessoal: isPersonalEmail(input.email),
    lead_score: score,
    lead_class: leadClass,
    // Atribuição / contexto
    utm_source: input.utm_source || null,
    utm_medium: input.utm_medium || null,
    utm_campaign: input.utm_campaign || null,
    utm_content: input.utm_content || null,
    utm_term: input.utm_term || null,
    fbclid: input.fbclid || null,
    referrer: input.referrer || null,
    page_variant: input.page_variant || null,
  };

  // 4. Persistir no Supabase
  try {
    const supabase = getServerSupabase();
    const { error: dbError } = await supabase.from("leads").insert(lead);
    if (dbError) {
      console.error("[diagnostico] erro ao salvar lead:", dbError.message);
      return { ok: false, error: "Não foi possível enviar agora. Tente de novo em instantes." };
    }
  } catch (err) {
    console.error("[diagnostico] exceção ao salvar lead:", err);
    return { ok: false, error: "Não foi possível enviar agora. Tente de novo em instantes." };
  }

  console.log("[diagnostico] lead salvo", { class: leadClass, score, empresa: lead.empresa });

  // ─── TODO: notificar lead A via Resend (configurar depois) ────────────
  //   if (leadClass === "A") await sendLeadAlert(lead)

  return { ok: true, leadClass };
}
