"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { submitDiagnostico, type DiagnosticoInput } from "@/app/diagnostico/actions";
import {
  AMBER, AMBER_2, AMBER_GRADIENT, TRANSITION,
  NICHO_OPTIONS, FUNCIONARIOS_OPTIONS, FATURAMENTO_OPTIONS,
  GARGALO_OPTIONS, MATURIDADE_OPTIONS, TAREFAS_OPTIONS, SISTEMA_PROPRIO_OPTIONS, URGENCIA_OPTIONS,
  maskPhone, phoneDigits,
} from "./constants";
import { Field, TextInput, TextArea, Select, RadioGroup, Checkbox } from "./ui";

declare global {
  interface Window { fbq?: (...args: any[]) => void }
}

// ─── Estado do form (em memória — sobrevive a Voltar/Continuar) ──────────
type FormState = Record<string, string | boolean>;
const initialState: FormState = {
  nome: "", whatsapp: "",
  email: "", empresa: "", nicho: "", nicho_outro: "", funcionarios: "", faturamento_anual: "",
  gargalo: "", gargalo_outro: "", maturidade_ia: "", tarefas_repetitivas: "", sistema_proprio: "",
  urgencia: "", descricao: "", consent: false,
  website: "", // honeypot
};

type Action = { type: "set"; field: string; value: string | boolean };
function reducer(state: FormState, action: Action): FormState {
  return { ...state, [action.field]: action.value };
}

const TOTAL_STEPS = 4;

export default function DiagnosticoForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const hidden = useRef<Partial<DiagnosticoInput>>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const set = (field: string) => (value: string | boolean) => {
    dispatch({ type: "set", field, value });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };
  const val = (f: string) => String(state[f] ?? "");

  // Captura campos ocultos no load
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    hidden.current = {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
      utm_content: p.get("utm_content") || undefined,
      utm_term: p.get("utm_term") || undefined,
      fbclid: p.get("fbclid") || undefined,
      referrer: document.referrer || undefined,
      page_variant: p.get("v") || "default",
    };
  }, []);

  // Foco automático no primeiro campo a cada passo + scroll ao topo do card
  useEffect(() => {
    const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return () => clearTimeout(t);
  }, [step]);

  // ─── Validação por passo ──────────────────────────────────────────────
  function validateStep(s: number): Record<string, string> {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (val("nome").trim().split(/\s+/).filter(Boolean).length < 2) e.nome = "Informe nome e sobrenome";
      if (phoneDigits(val("whatsapp")).length < 10) e.whatsapp = "Informe seu WhatsApp com DDD";
    }
    if (s === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val("email"))) e.email = "Informe um e-mail válido";
      if (!val("empresa").trim()) e.empresa = "Informe o nome da empresa";
      if (!val("nicho")) e.nicho = "Selecione o nicho";
      if (val("nicho") === "outro" && !val("nicho_outro").trim()) e.nicho_outro = "Especifique o nicho";
      if (!val("funcionarios")) e.funcionarios = "Selecione o nº de funcionários";
    }
    if (s === 3) {
      if (!val("gargalo")) e.gargalo = "Selecione a área que mais trava";
      if (val("gargalo") === "outro" && !val("gargalo_outro").trim()) e.gargalo_outro = "Descreva a área";
      if (!val("maturidade_ia")) e.maturidade_ia = "Selecione uma opção";
      if (!val("tarefas_repetitivas")) e.tarefas_repetitivas = "Selecione uma opção";
      if (!val("sistema_proprio")) e.sistema_proprio = "Selecione uma opção";
    }
    if (s === 4) {
      if (!val("urgencia")) e.urgencia = "Selecione uma opção";
      if (state.consent !== true) e.consent = "É preciso aceitar para receber o diagnóstico";
    }
    return e;
  }

  function next() {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step < TOTAL_STEPS) setStep(step + 1);
      else handleSubmit();
    }
  }
  function back() {
    setSubmitError(null);
    if (step > 1) setStep(step - 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    const payload: DiagnosticoInput = {
      nome: val("nome").trim(),
      whatsapp: phoneDigits(val("whatsapp")),
      email: val("email").trim(),
      empresa: val("empresa").trim(),
      nicho: val("nicho"),
      nicho_outro: val("nicho") === "outro" ? val("nicho_outro").trim() : undefined,
      funcionarios: val("funcionarios"),
      faturamento_anual: val("faturamento_anual") || undefined,
      gargalo: val("gargalo"),
      gargalo_outro: val("gargalo") === "outro" ? val("gargalo_outro").trim() : undefined,
      maturidade_ia: val("maturidade_ia"),
      tarefas_repetitivas: val("tarefas_repetitivas"),
      sistema_proprio: val("sistema_proprio"),
      urgencia: val("urgencia"),
      descricao: val("descricao").trim() || undefined,
      consent: state.consent === true,
      website: val("website"),
      ...hidden.current,
    };
    try {
      const res = await submitDiagnostico(payload);
      if (res.ok) {
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "Lead", { content_name: "diagnostico", lead_class: res.leadClass });
        }
        setDone(true);
      } else {
        setSubmitError(res.error);
      }
    } catch {
      setSubmitError("Não foi possível enviar agora. Verifique a conexão e tente de novo.");
    } finally {
      setSubmitting(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
      e.preventDefault();
      if (!submitting) next();
    }
  }

  if (done) return <SuccessScreen />;

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div ref={cardRef} style={{ width: "100%", maxWidth: 560, margin: "0 auto" }}>
      {/* Card */}
      <div
        onKeyDown={onKeyDown}
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1c1c1c",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 40px 120px -40px rgba(255,106,26,0.12)",
        }}
      >
        {/* Barra de progresso */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: AMBER_GRADIENT,
            borderRadius: "0 3px 3px 0",
            transition: "width 0.5s cubic-bezier(0.12, 0.23, 0.28, 0.97)",
            boxShadow: `0 0 12px ${AMBER}`,
          }} />
        </div>

        <div style={{ padding: "32px 28px 28px" }}>
          {/* Passo X de 4 */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22,
          }}>
            <span style={{
              fontFamily: "Geist Mono, monospace", fontSize: 12, letterSpacing: "0.08em",
              color: AMBER, textTransform: "uppercase",
            }}>
              Passo {step} / {TOTAL_STEPS}
            </span>
            <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 12, color: "rgba(184,184,184,0.5)" }}>
              {STEP_TITLES[step - 1]}
            </span>
          </div>

          {/* Conteúdo do passo */}
          <div key={step} className="diag-step">
            {step === 1 && (
              <>
                <Field id="nome" label="Como podemos te chamar?" error={errors.nome}>
                  <TextInput
                    id="nome" ref={firstFieldRef as any} value={val("nome")} error={!!errors.nome}
                    placeholder="Nome e sobrenome" autoComplete="name"
                    onChange={(e) => set("nome")(e.target.value)}
                  />
                </Field>
                <Field id="whatsapp" label="WhatsApp" hint="É por onde enviamos seu diagnóstico." error={errors.whatsapp}>
                  <TextInput
                    id="whatsapp" inputMode="tel" value={val("whatsapp")} error={!!errors.whatsapp}
                    placeholder="(11) 99999-9999" autoComplete="tel"
                    onChange={(e) => set("whatsapp")(maskPhone(e.target.value))}
                  />
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field id="email" label="E-mail" error={errors.email}>
                  <TextInput
                    id="email" ref={firstFieldRef as any} type="email" value={val("email")} error={!!errors.email}
                    placeholder="voce@empresa.com.br" autoComplete="email"
                    onChange={(e) => set("email")(e.target.value)}
                  />
                </Field>
                <Field id="empresa" label="Empresa" error={errors.empresa}>
                  <TextInput
                    id="empresa" value={val("empresa")} error={!!errors.empresa}
                    placeholder="Nome da empresa" autoComplete="organization"
                    onChange={(e) => set("empresa")(e.target.value)}
                  />
                </Field>
                <Field id="nicho" label="Nicho" error={errors.nicho}>
                  <Select id="nicho" value={val("nicho")} error={!!errors.nicho}
                    placeholder="Selecione o setor" options={NICHO_OPTIONS}
                    onChange={set("nicho")} />
                </Field>
                {val("nicho") === "outro" && (
                  <Field id="nicho_outro" label="Qual nicho?" error={errors.nicho_outro}>
                    <TextInput id="nicho_outro" value={val("nicho_outro")} error={!!errors.nicho_outro}
                      placeholder="Descreva seu setor" onChange={(e) => set("nicho_outro")(e.target.value)} />
                  </Field>
                )}
                <Field id="funcionarios" label="Funcionários" error={errors.funcionarios}>
                  <Select id="funcionarios" value={val("funcionarios")} error={!!errors.funcionarios}
                    placeholder="Tamanho da equipe" options={FUNCIONARIOS_OPTIONS}
                    onChange={set("funcionarios")} />
                </Field>
                <Field id="faturamento_anual" label="Faturamento anual" optional
                  hint="Ajuda a calibrar o diagnóstico.">
                  <Select id="faturamento_anual" value={val("faturamento_anual")}
                    placeholder="Selecione a faixa" options={FATURAMENTO_OPTIONS}
                    onChange={set("faturamento_anual")} />
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <Field id="gargalo" label="Qual área mais trava sua operação hoje?" error={errors.gargalo}>
                  <Select id="gargalo" value={val("gargalo")} error={!!errors.gargalo}
                    placeholder="Selecione a área" options={GARGALO_OPTIONS}
                    onChange={set("gargalo")} />
                </Field>
                {val("gargalo") === "outro" && (
                  <Field id="gargalo_outro" label="Qual área?" error={errors.gargalo_outro}>
                    <TextInput id="gargalo_outro" value={val("gargalo_outro")} error={!!errors.gargalo_outro}
                      placeholder="Descreva a área" onChange={(e) => set("gargalo_outro")(e.target.value)} />
                  </Field>
                )}
                <Field id="maturidade_ia" label="O que sua empresa já fez com IA?" error={errors.maturidade_ia}>
                  <RadioGroup name="maturidade_ia" value={val("maturidade_ia")}
                    onChange={set("maturidade_ia")} options={MATURIDADE_OPTIONS} />
                </Field>
                <Field id="tarefas_repetitivas" label="Quanto do dia da sua equipe vai em tarefas repetitivas?" error={errors.tarefas_repetitivas}>
                  <Select id="tarefas_repetitivas" value={val("tarefas_repetitivas")} error={!!errors.tarefas_repetitivas}
                    placeholder="Selecione" options={TAREFAS_OPTIONS}
                    onChange={set("tarefas_repetitivas")} />
                </Field>
                <Field id="sistema_proprio"
                  label="Hoje você depende de softwares de terceiros para CRM, ERP e gestão de tarefas. Faria sentido ter sistemas próprios, sob medida da sua operação?"
                  error={errors.sistema_proprio}>
                  <RadioGroup name="sistema_proprio" value={val("sistema_proprio")}
                    onChange={set("sistema_proprio")} options={SISTEMA_PROPRIO_OPTIONS} />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field id="urgencia" label="Quando você quer isso rodando?" error={errors.urgencia}>
                  <RadioGroup name="urgencia" value={val("urgencia")}
                    onChange={set("urgencia")} options={URGENCIA_OPTIONS} />
                </Field>
                <Field id="descricao" label="Em uma frase: como funciona sua operação hoje?" optional>
                  <TextArea id="descricao" value={val("descricao")} maxLength={280}
                    placeholder="Ex.: clínica com 4 unidades, agendamento por WhatsApp, 12 atendentes…"
                    onChange={(e) => set("descricao")(e.target.value)} />
                </Field>
                <div style={{ marginTop: 4, marginBottom: 4 }}>
                  <Checkbox id="consent" checked={state.consent === true} onChange={set("consent")}>
                    Concordo em receber o diagnóstico e comunicações da Vortex. Seus dados são tratados conforme a LGPD.
                  </Checkbox>
                  {errors.consent && (
                    <p role="alert" style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "#ff5a4d", marginTop: 8 }}>
                      {errors.consent}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Honeypot (oculto) */}
          <input
            type="text" name="website" tabIndex={-1} autoComplete="off"
            value={val("website")} onChange={(e) => set("website")(e.target.value)}
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />

          {submitError && (
            <div role="alert" style={{
              background: "rgba(255,90,77,0.08)", border: "1px solid rgba(255,90,77,0.3)",
              borderRadius: 10, padding: "12px 14px", marginBottom: 16,
              fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#ff8077",
            }}>
              {submitError}
            </div>
          )}

          {/* Botões */}
          <div style={{ display: "flex", gap: 12, marginTop: 26, alignItems: "center" }}>
            {step > 1 && (
              <button type="button" onClick={back} disabled={submitting}
                style={{
                  background: "transparent", border: "1px solid #2a2a2a", borderRadius: 60,
                  color: "rgba(184,184,184,0.9)", fontFamily: "Inter, sans-serif", fontWeight: 500,
                  fontSize: 15, padding: "14px 22px", cursor: "pointer", transition: TRANSITION,
                  whiteSpace: "nowrap",
                }}>
                Voltar
              </button>
            )}
            <button
              type="button" onClick={next} disabled={submitting}
              className="diag-cta"
              style={{
                flex: 1, border: "none", borderRadius: 60,
                background: AMBER_GRADIENT, color: "#0B0B0B",
                fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 16,
                letterSpacing: "-0.01em", padding: "16px 24px",
                cursor: submitting ? "wait" : "pointer", transition: TRANSITION,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                opacity: submitting ? 0.85 : 1,
                boxShadow: "0 8px 30px -8px rgba(255,106,26,0.5)",
              }}>
              {submitting ? (
                <>
                  <Spinner /> Enviando…
                </>
              ) : step < TOTAL_STEPS ? (
                <>Continuar <Arrow /></>
              ) : (
                <>RECEBER MEU DIAGNÓSTICO <Arrow /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Reforço sob o card */}
      <p style={{
        textAlign: "center", marginTop: 18, fontFamily: "Inter, sans-serif",
        fontSize: 12.5, color: "rgba(184,184,184,0.45)", letterSpacing: "-0.01em",
      }}>
        Leva ~2 min · Diagnóstico em até 24h · Sem compromisso
      </p>
    </div>
  );
}

const STEP_TITLES = ["Identificação", "Empresa", "Operação", "Contexto"];

function Arrow() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
      <path d="M1 7H14M14 7L8.5 1.5M14 7L8.5 12.5" stroke="#0B0B0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <span className="diag-spinner" style={{
      width: 16, height: 16, borderRadius: "50%",
      border: "2px solid rgba(11,11,11,0.3)", borderTopColor: "#0B0B0B",
      display: "inline-block",
    }} />
  );
}

// ─── Tela de sucesso (substitui o form) ─────────────────────────────────
function SuccessScreen() {
  return (
    <div className="diag-success" style={{ width: "100%", maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        width: 72, height: 72, borderRadius: "50%", margin: "0 auto 28px",
        border: `1.5px solid ${AMBER}`, display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,106,26,0.06)", boxShadow: `0 0 50px -10px ${AMBER}`,
      }}>
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className="diag-check">
          <path d="M2 14L12 24L32 2" stroke={AMBER_2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="h2-section" style={{ fontSize: 36, marginBottom: 18 }}>
        Diagnóstico em produção.
      </h1>
      <p className="body-m" style={{ fontSize: 16.5, lineHeight: 1.55, maxWidth: 460, margin: "0 auto 18px" }}>
        Em até 24h você recebe no seu WhatsApp e e-mail um diagnóstico com os pontos
        da sua operação onde IA gera retorno primeiro — priorizados por ROI e viabilidade.
      </p>
      <p style={{
        fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "rgba(184,184,184,0.55)",
        letterSpacing: "-0.01em", marginBottom: 36,
      }}>
        Análise feita por gente, não por robô. Ironicamente.
      </p>
      <a
        href="https://instagram.com/vortexai.io" target="_blank" rel="noopener noreferrer"
        style={{
          fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "rgba(184,184,184,0.7)",
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7,
          transition: TRANSITION,
        }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
        </svg>
        @vortexai.io
      </a>
    </div>
  );
}
