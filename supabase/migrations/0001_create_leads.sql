-- Tabela de leads do /diagnostico
-- Inserção feita apenas pela server action (service_role, que ignora RLS).
-- RLS fica LIGADA e sem políticas públicas: anon/authenticated não acessam.

create table if not exists public.leads (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),

  -- Identificação
  nome               text not null,
  whatsapp           text not null,
  email              text not null,
  empresa            text not null,

  -- Empresa
  nicho              text not null,
  nicho_outro        text,
  funcionarios       text not null,
  faturamento_anual  text,

  -- Operação
  gargalo            text not null,
  gargalo_outro      text,
  maturidade_ia      text not null,
  tarefas_repetitivas text not null,
  sistema_proprio    text not null,

  -- Contexto
  urgencia           text not null,
  descricao          text,
  consent            boolean not null default false,

  -- Scoring (autoritativo no servidor)
  email_pessoal      boolean,
  lead_score         integer,
  lead_class         text check (lead_class in ('A','B','C')),

  -- Atribuição
  utm_source         text,
  utm_medium         text,
  utm_campaign       text,
  utm_content        text,
  utm_term           text,
  fbclid             text,
  referrer           text,
  page_variant       text
);

-- Listagem por prioridade e recência no painel
create index if not exists leads_class_created_idx
  on public.leads (lead_class, created_at desc);

-- RLS ligada, sem políticas → bloqueia anon/authenticated.
-- A service_role usada na server action ignora RLS e consegue inserir.
alter table public.leads enable row level security;
