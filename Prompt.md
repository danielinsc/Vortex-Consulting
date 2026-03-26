# CLAUDE CODE PROMPT — Optimus (Framer → Next.js + GSAP)

> Cole este prompt no Claude Code junto com o arquivo HTML `Optimus___Modelo_de_IA_para_SaaS_e_Fintech_para_Framer.html`. O Claude Code deve ler o HTML como referência e gerar um projeto Next.js com App Router, Tailwind CSS e GSAP.

---

## CONTEXTO

Convertendo a landing page **Optimus** (https://getoptimus.framer.ai/) — uma plataforma SaaS de consultoria de investimentos com IA (portfólio analytics, risk assessment, AI advisor "Orion") — de Framer export (532KB) para Next.js + React + Tailwind + GSAP. Theme preto puro (#000) com accent azul suave (#61aefa) e rosa/coral (#f24). Design ultra-clean, minimal, tipografia light (Geist 300), cards glass escuros com glow inset branco.

---

## DESIGN SYSTEM

### Cores
```css
--bg-body: rgb(0, 0, 0);                           /* preto puro */
--bg-card: rgb(8, 8, 8);                            /* #080808 — cards base */
--bg-elevated: rgb(34, 34, 34);                     /* #222 — surfaces elevadas, borders */
--bg-glass: rgba(255, 255, 255, 0.06);              /* glass cards — 26x uso */
--bg-glass-hover: rgba(255, 255, 255, 0.08);        /* hover */
--bg-glass-light: rgba(255, 255, 255, 0.24);        /* glass mais visível */

--accent-blue: #61aefa;                             /* azul suave — destaques, links */
--accent-blue-ghost: rgba(0, 144, 227, 0.3);       /* #0090e34d — ghost azul */
--accent-coral: #f24;                               /* #ff2244 — accent coral/vermelho */

--text-white: #fff;                                 /* headings */
--text-body: rgba(184, 184, 184, 0.9);              /* #b8b8b8e6 — body text principal */
--text-muted: rgba(161, 161, 161, 0.9);             /* #a1a1a1e6 — body secondary */
--text-dim: rgba(117, 117, 117, 0.9);               /* #757575e6 — labels dim */
--text-invisible: rgba(0, 0, 0, 0);                 /* transparente */

--border-card: 2px solid rgb(34, 34, 34);           /* borda dos cards — #222 */
```

### Fonte PRINCIPAL (2 fontes)
```
Geist: 300 (light) — headings. O peso 300 é a assinatura — ultra-fino, elegante.
Inter: 400 (regular), 500 (medium) — body text, botões.
Geist Mono: 400 — números grandes decorativos (172px stat numbers).
```
**Geist 300** para headings é KEY — dá o visual premium/minimal. Inter para body.

### Tipografia
- **H1 Hero**: `Geist 300, 64px, line-height: 1.1, letter-spacing: -0.04em, color: #fff`
- **H2 Section**: `Geist 300, 40px, line-height: 1.1, letter-spacing: -0.04em, color: #fff`
- **H3 Card title**: `Geist 300, 24px, line-height: 1.3, letter-spacing: -0.03em, color: #fff`
- **Body large**: `Inter 400, 20px, line-height: 1.3, letter-spacing: -0.02em, color: #fff`
- **Body default**: `Inter 400, 16px, line-height: 1.4, letter-spacing: -0.02em, color: #b8b8b8e6`
- **Body small**: `Inter 400, 14px, line-height: 1.2, letter-spacing: -0.01em, color: #b8b8b8e6`
- **Button text**: `Inter 500, 16px, line-height: 24px, letter-spacing: -0.02em, color: #fff`
- **Stat number (giant)**: `Geist Mono 400, 172px, line-height: 1.1, letter-spacing: -0.04em, color: #b8b8b8e6`

### Botão Primary (branco sólido, pill)
```css
background-color: rgb(255, 255, 255);
border-radius: 62px;
color: black;
font: 500 16px/24px "Inter";
letter-spacing: -0.02em;
```

### Botão Secondary (outline glass)
```css
background: rgba(255, 255, 255, 0.06);
border-radius: 62px;
color: #fff;
/* ou com border: */ border: 2px solid rgb(34, 34, 34);
```

### Cards (glass escuro com glow inset branco)
```css
background: rgba(255, 255, 255, 0.06);             /* glass */
border-radius: 16px;
border: 2px solid rgb(34, 34, 34);                  /* borda #222 */
box-shadow: rgba(255, 255, 255, 0) 0px 0px 46px 0px inset; /* glow inset — 6x uso */
/* Hover: box-shadow: rgba(255, 255, 255, 0.08) 0px 0px 46px 0px inset; */
```

### Pricing Card
```css
background: rgba(255, 255, 255, 0.06);
border-radius: 16px;
border: 2px solid rgb(34, 34, 34);
/* PRO card: possivelmente highlighted com accent-blue border ou glow */
```

### Badge "ótimo" (aparece em vários feature cards)
```css
/* Pill pequeno com texto "ótimo" — provavelmente tradução de "great" ou "optimus" badge */
background: rgba(255, 255, 255, 0.06);
border-radius: 62px;
```

---

## SEÇÕES — ESTRUTURA E CONTEÚDO COMPLETO

### 1. NAVBAR (`Naviagtion` — sim, typo do Framer)
- Logo: SVG `LJeXWLIT2HXuCM1a9ZIEtRDwc.svg` (light) / `lJ9ShwZSbozRB7H7qFiUKNCo.svg` (dark)
- Links: provavelmente Características · Como Funciona · Casos de Uso · Preços
- Right nav (`RightNavigation`): CTA "Comece agora" — pill branco
- Background: preto com possible blur no scroll

### 2. HERO
- **Badge**: "ótimo" — pill glass
- **H1**: "Decisões de investimento orientadas por inteligência"
  - `Geist 300, 64px, lh: 1.1, ls: -0.04em`
- **CTA**: "Comece agora" — pill branco 62px radius
- **Subtitle**: "Conecte seu portfólio e desbloqueie análises com inteligência artificial."
- **Body**: "Obtenha insights em tempo real, avaliações de risco e orientações estratégicas personalizadas para seus objetivos financeiros."
- **Sub-heading**: "Conheça a Orion — sua consultora de investimentos em IA."
- **Hero image**: `YiSZBoFuDbDBmZ3kiLxAO6ApU0.jpg` — screenshot do dashboard
- **Animation**: hero image scale 1.05→1 (zoom out sutil, dur: 2s) + elements y:24, opacity:0, stagger delays 0.2/0.4/0.6

### 3. SOCIAL PROOF / TRUST (`TrustSection`)
- **Label**: "Aprovado por milhares de investidores em todo o mundo."
- **4 Stats** (com números grandes Geist Mono):
  - "B+" — Análise do valor da carteira
  - "K+" — Informações fornecidas
  - "K+" — Investidores ativos
  - (sem número) — Satisfação do usuário
- **Trust logos ticker**: Marquee horizontal de logos de empresas/corretoras
- Avatares de investidores (muitas imagens na seção Testimonial)

### 4. SECURITY (`Maximum Security`)
- **H3**: "Segurança de nível bancário"
- **Security features** (pills/badges):
  - "Criptografia AES-256"
  - "Acesso somente leitura"
  - "Nunca executa negociações"
  - "Você mantém o controle"
  - "Todas as decisões são suas."
- **Sub-labels**: "análise baseada em IA" · "Monitoramento 24 horas por dia, 7 dias por semana"

### 5. FEATURES BENTO (`Features`)
- **H2**: "Tudo o que você precisa para investir com confiança."
- **4 Feature Cards** (bento grid — 2 grandes + 2 médios):

  **Card 1 — Análises de portfólio em tempo real**
  - "ótimo" badge + "$125.000 Valor total"
  - "Análise instantânea de alocação, exposição ao risco e oportunidades de rebalanceamento."
  - Image: `3SNOb9LXz61SY8V2LtiZ38qvHlM.webp`

  **Card 2 — Pergunte qualquer coisa a Orion** (AI assistant)
  - "Pesquise qualquer ação, ETF ou estratégia com respostas baseadas em dados em segundos."
  - Image: `Y8n3ghRlKUFzOKUpId376ZsSMw.jpeg`

  **Card 3 — Notificações personalizadas**
  - "Alertas oportunos sobre mudanças de portfólio e oportunidades de mercado relevantes."
  - Image: `XWxTTs5fZfd0XPtpY3zCAXusBU.jpeg`

  **Card 4 — Entenda sua exposição**
  - "Quantifique o risco da sua carteira e veja como a volatilidade do mercado pode afetar seus investimentos."
  - Image: `TqpeEXuxz5eCT9kOPqj8UlQBVas.jpeg`

- Card style: `bg: rgba(255,255,255,0.06), radius: 16px, border: 2px solid #222, shadow: inset glow`

### 6. HOW IT WORKS (`HowItWorks`)
- **H2**: "Processo simples, resultados poderosos."
- **CTA**: "Comece agora"
- **4 Steps** (`StepCard`):
  1. **"01 — Conecte suas contas"** — "Conecte suas contas de corretagem usando acesso seguro e somente leitura. Integramos com mais de 300 instituições financeiras..."
  2. **"02 — A IA analisa instantaneamente"** — "A Orion avalia seu portfólio em segundos, analisando a alocação, a exposição ao risco..."
  3. **"03 — Receba informações personalizadas"** — "Obtenha recomendações claras e práticas, personalizadas para seus objetivos..."
  4. **"04 — Tome decisões informadas"** — "Execute as operações através da sua corretora quando estiver pronto..."

### 7. USE CASES (carousel/slideshow)
- **H2**: "Perfeito para todos os tipos de investidores."
- **4 Use Case Cards** (horizontal scroll ou carousel — `Slideshow (Mobile)`, `UseCaseCard`):
  1. **"Planejando a aposentadoria"** — "Simule diferentes cenários, otimize as estratégias de retirada..." — `rYvdAx9sLSLdqaxcHtDOvWaHE.jpg`
  2. **"Reequilibrando seu portfólio"** — "Identifique desvios na alocação, receba recomendações de rebalanceamento..." — `aDrS0eGfWaQHhHTRoTtiXYB7F50.jpg`
  3. **"Otimizando para fins tributários"** — "Descubra oportunidades de aproveitamento de perdas fiscais..." — `7jNfwqyWg2h9bPHq57xSdM2Hw0.jpg`
  4. **"Gerenciamento do risco de portfólio"** — "Quantifique sua exposição com métricas avançadas..." — `yhDc6LpwLqOkHyxsHiRrgMR7FU.jpg`
- CTA por card: "Comece agora" / "Comece a construir"
- Os cards se repetem no HTML (carousel loop — 5 cópias!)

### 8. BENEFITS
- **H2**: "Invista de forma inteligente, não com mais esforço."
- **6 Benefit items** (grid 2×3 ou 3×2):
  1. "Economize horas de pesquisa" — "A IA analisa os mercados instantaneamente..."
  2. "Otimizar o desempenho" — "Identifique oportunidades e melhore os retornos..."
  3. "Mantenha-se à frente dos mercados" — "Monitoramento 24/7 alerta sobre mudanças críticas..."
  4. "Tome decisões confiantes" — "Informações baseadas em dados eliminam suposições..."
  5. "Reduza erros dispendiosos" — "Identifique riscos antes que afetem seu portfólio."
  6. "Aprenda enquanto investe" — "Entenda o raciocínio por trás de cada recomendação."

### 9. PRICING (`Pricing`, `Plans`)
- **H2**: "Planos que se adaptam ao seu portfólio."
- **Toggle**: Mensal / Anual (com badge "20% de desconto")
- **3 Plan Cards**:

  **Livre — €0/mês**
  - "Ideal para novos investidores..."
  - CTA: "Comece grátis"
  - Features: 1 conta, portfolio até $50k, 10 queries AI/mês, análise básica, email semanal, conteúdo educacional

  **Pró — €29/mês** (badge "Popular")
  - "Para investidores ativos..."
  - CTA: "Comece o teste gratuito de 14 dias."
  - Features: contas ilimitadas, portfolio ilimitado, queries ilimitadas, métricas avançadas, alertas real-time, tax-loss, suporte prioritário

  **Negócios — (preço custom)/mês**
  - "Ferramentas premium e orientação especializada..."
  - CTA: "Solicitar demonstração"
  - Features: tudo do Pro + video calls CFA, modelagem personalizada, opções, alt investments, API, suporte telefônico, early access

- Plan card style: `radius: 16px, border: 2px solid #222, bg: glass`
- Pricing image: `3azoMUvww6v2YfzABBOTpFBMGDA.png`

### 10. FAQ
- **H2**: "Suas perguntas, respondidas de forma clara."
- **6 Accordion items**:
  1. "O que é Optimus?"
  2. "Como a Optimus acessa minhas contas?"
  3. "Meus dados estão seguros?"
  4. "O Optimus pode executar transações para mim?"
  5. "Quais corretoras vocês apoiam?"
  6. "Quem é Orion?"

### 11. TESTIMONIAL
- **Quote**: "A Optimus me ajudou a reequilibrar meu portfólio de maneiras que eu jamais teria descoberto sozinho. A IA identificou ineficiências que eu não havia percebido por anos."
- **Author**: Marcus Rodriguez, Gerente de Produto na Coinbase
- **Avatar grid**: ~30 avatares/logos de investidores (muitas imagens)
- Key avatar: `QUuzHQ68NwZejrT2tm9GkWWCfs.jpg` e muitos outros na seção Testimonial

### 12. CTA FINAL (`FinalCTA`)
- **H2**: "Junte-se a mais de 10.000 investidores"
- **Body**: "Conecte seu portfólio e obtenha insights com inteligência artificial em minutos. Sem necessidade de cartão de crédito."
- **CTA**: "Inicie o teste gratuito" — pill branco
- **Badge**: "ótimo"

### 13. FOOTER
- **Tagline**: "A Optimus ajuda investidores individuais a tomar decisões mais inteligentes com inteligência de portfólio baseada em IA."
- **Columns**: Páginas (Lar, Preços, Blog, Contato) · Navegação (Características, Como funciona, Casos de uso)
- **Bottom**: "©2026 Optimus. Todos os direitos reservados." · "Criado por Arthur em Framer"

---

## GSAP ANIMATIONS

### Hero (on page load — tween, y:24, stagger)
```javascript
// Badge: y:24, delay:0.2, dur:1.5
gsap.from('.hero-badge', { opacity: 0, y: 24, duration: 1.5, ease: "power2.out", delay: 0.2 });
// H1: y:24, delay:0.4, dur:1.5
gsap.from('.hero-h1', { opacity: 0, y: 24, duration: 1.5, ease: "power2.out", delay: 0.4 });
// CTA: y:24, delay:0.6, dur:1.5
gsap.from('.hero-cta', { opacity: 0, y: 24, duration: 1.5, ease: "power2.out", delay: 0.6 });
// Hero image: scale 1.05→1, dur:2
gsap.from('.hero-image', { scale: 1.05, duration: 2, ease: "power2.out" });
```

### Section content (scroll triggered)
```javascript
// Pattern: y:24-40, opacity:0, dur:1-1.5, tween
gsap.from(element, {
  scrollTrigger: { trigger: section, start: "top 85%" },
  y: 24, opacity: 0, duration: 1, ease: "power2.out"
});
// With stagger for cards:
gsap.from('.card', { y: 24, opacity: 0, stagger: 0.2, duration: 1, ease: "power2.out" });
```

### Use Case carousel
```javascript
// Horizontal scroll ou auto-play carousel
// Cards deslizam lateralmente
```

### FAQ Accordion
```javascript
gsap.to(answer, { height: "auto", duration: 0.3, ease: "power2.out" });
```

### Card glow inset on hover
```css
/* Transição de box-shadow transparente → branco sutil */
transition: box-shadow 0.4s ease;
/* hover: */ box-shadow: rgba(255, 255, 255, 0.08) 0px 0px 46px 0px inset;
```

---

## ASSETS

### Imagens (prefixar com `https://framerusercontent.com/images/`)
- **Favicon**: `LJeXWLIT2HXuCM1a9ZIEtRDwc.svg` (light), `lJ9ShwZSbozRB7H7qFiUKNCo.svg` (dark)
- **OG**: `1nZGPnK97xzJxDOfRKsmYPC9n8.jpg`
- **Hero**: `YiSZBoFuDbDBmZ3kiLxAO6ApU0.jpg` (dashboard screenshot)
- **Features**: `3SNOb9LXz61SY8V2LtiZ38qvHlM.webp`, `Y8n3ghRlKUFzOKUpId376ZsSMw.jpeg`, `XWxTTs5fZfd0XPtpY3zCAXusBU.jpeg`, `TqpeEXuxz5eCT9kOPqj8UlQBVas.jpeg`
- **Use Cases**: `rYvdAx9sLSLdqaxcHtDOvWaHE.jpg`, `aDrS0eGfWaQHhHTRoTtiXYB7F50.jpg`, `7jNfwqyWg2h9bPHq57xSdM2Hw0.jpg`, `yhDc6LpwLqOkHyxsHiRrgMR7FU.jpg`
- **Pricing**: `3azoMUvww6v2YfzABBOTpFBMGDA.png`
- **Testimonial avatars** (~30 images): `QUuzHQ68NwZejrT2tm9GkWWCfs.jpg`, `CfT3n8NOghssCpbhbqq07uGjeQ.jpg`, `qtiiq4ylWBg6n6HkE6xkszfRMU.jpg`, `2QFUZg5KR3EqZsBaeH1IWTv3A.jpg`, `P9kQxXc4KGRfAl5cgxEYKcUCxXw.jpg`, `WVjzq4M9tCUPIftKMF6dF1BCWA.jpg`, `kMnTyVQHixI963Bw6Nk2ZZxc.jpg`, `tV3lCdEhNbDipRwd2jLzl7AfEKA.jpg`, `7jNfwqyWg2h9bPHq57xSdM2Hw0.jpg`, e muitos outros

---

## NOTAS TÉCNICAS

1. **Geist 300 (light weight)** para headings é a assinatura visual. Inter para body. Geist Mono 400 para stat numbers gigantes (172px).

2. **Cards glass com glow inset branco** — `box-shadow: rgba(255,255,255,0) 0px 0px 46px inset` que transiciona para `rgba(255,255,255,0.08)` no hover. 6x uso.

3. **Border-radius 62px** para botões (pill), **16px** para cards, **8px** para inner elements, **12px** para badges.

4. **Border: 2px solid #222** nos cards — mais grossa que os outros templates.

5. **Preto puro #000** como fundo, **#080808** para cards base, **#222** para bordas. Palette ultra-escura.

6. **Accent azul suave #61aefa** — usado em destaques e links. Accent coral #f24 como accent secundário.

7. **Use Cases carousel** — Os cards repetem 5x no HTML, indicando carousel infinito. Implementar com scroll horizontal ou auto-play.

8. **~30 avatares no Testimonial** — Grid/flow de avatares de investidores. Muitas imagens.

9. **Hero image zoom-out** — scale 1.05→1, duration 2s. Efeito cinema sutil.

10. **Animations tween** (NOT spring) — y:24px, dur:1-1.5s. Movimento lento e elegante, combinando com a tipografia light.

11. **Breakpoints**: `≥1200px` desktop, `810-1199px` tablet, `≤809px` mobile.

12. **Pricing toggle** — Mensal/Anual com badge "20% de desconto".