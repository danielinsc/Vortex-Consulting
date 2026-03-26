"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const ZOOM  = 2;
const STILE = 16;
const TILE  = STILE * ZOOM;  // 32 px per tile

// Map: 26×18 tiles → world 832×576 px
const COLS  = 26;
const ROWS  = 18;

// Character sprite: 112×96 — 7 frames×16px wide, 3 dirs×32px tall
const CFW = 16, CFH = 32;
const WFW = 16, WFH = 32;

// ─── Colors ───────────────────────────────────────────────────────────────────
const CLR = {
  corridor:    "#c8bc94",
  corridorAlt: "#bdb192",
  war:     "#5c7aaa",
  eng:     "#4e7e5a",
  mkt:     "#7a5298",
  fin:     "#a07830",
  sales:   "#307888",
  hr:      "#6b5a8c",
  data:    "#3a6870",
  product: "#7a5030",
  board:   "#8c3c3c",
  wallFace:   "#9aabba",
  wallTop:    "#c8d4de",
  wallShadow: "#7a8d9c",
  tagBg:    "rgba(20,20,28,0.82)",
  tagBdr:   "rgba(255,255,255,0.18)",
  bubbleBg: "rgba(18,18,24,0.88)",
  bubbleBdr:"rgba(255,255,255,0.15)",
  roomLbl:  "rgba(255,255,255,0.88)",
  roomLblBg:"rgba(8,8,14,0.75)",
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
type RoomId = "war"|"eng"|"mkt"|"fin"|"sales"|"hr"|"data"|"product"|"board";
interface Room { id:RoomId; name:string; x:number; y:number; w:number; h:number; color:string; floorIdx:number }

const ROOMS: Room[] = [
  { id:"war",     name:"War Room",         x:1,  y:1,  w:7, h:5, color:CLR.war,     floorIdx:2 },
  { id:"eng",     name:"Engineering",      x:9,  y:1,  w:8, h:5, color:CLR.eng,     floorIdx:4 },
  { id:"mkt",     name:"Marketing",        x:18, y:1,  w:7, h:5, color:CLR.mkt,     floorIdx:1 },
  { id:"fin",     name:"Finance",          x:1,  y:7,  w:7, h:5, color:CLR.fin,     floorIdx:3 },
  { id:"sales",   name:"Sales",            x:9,  y:7,  w:8, h:5, color:CLR.sales,   floorIdx:5 },
  { id:"hr",      name:"People & HR",      x:18, y:7,  w:7, h:5, color:CLR.hr,      floorIdx:6 },
  { id:"data",    name:"Data & Analytics", x:1,  y:13, w:7, h:5, color:CLR.data,    floorIdx:0 },
  { id:"product", name:"Product",          x:9,  y:13, w:8, h:5, color:CLR.product, floorIdx:3 },
  { id:"board",   name:"Board Room",       x:18, y:13, w:7, h:5, color:CLR.board,   floorIdx:2 },
];

// ─── Tile map ─────────────────────────────────────────────────────────────────
const T_VOID=0, T_FLOOR=1, T_WALL=2;

function buildMap() {
  const tiles  = new Uint8Array(COLS * ROWS);
  const roomOf = new Int8Array(COLS * ROWS).fill(-1);

  for (let c=0; c<COLS; c++) { tiles[6*COLS+c]=T_FLOOR; tiles[12*COLS+c]=T_FLOOR; }
  for (let r=0; r<ROWS; r++) { tiles[r*COLS+8]=T_FLOOR; tiles[r*COLS+17]=T_FLOOR; }

  ROOMS.forEach((rm, ri) => {
    for (let r=rm.y; r<rm.y+rm.h; r++) {
      for (let c=rm.x; c<rm.x+rm.w; c++) {
        const edge = r===rm.y||r===rm.y+rm.h-1||c===rm.x||c===rm.x+rm.w-1;
        tiles [r*COLS+c] = edge ? T_WALL : T_FLOOR;
        roomOf[r*COLS+c] = edge ? -1 : ri;
      }
    }
    const mc = Math.floor(rm.x+rm.w/2);
    const mr = Math.floor(rm.y+rm.h/2);
    const open = (c:number,r:number)=>{ if(c>=0&&c<COLS&&r>=0&&r<ROWS){ tiles[r*COLS+c]=T_FLOOR; roomOf[r*COLS+c]=ri; } };
    open(mc-1,rm.y); open(mc,rm.y); open(mc+1,rm.y);
    open(mc-1,rm.y+rm.h-1); open(mc,rm.y+rm.h-1);
    open(rm.x,mr-1); open(rm.x,mr); open(rm.x,mr+1);
    open(rm.x+rm.w-1,mr-1); open(rm.x+rm.w-1,mr);
  });
  return { tiles, roomOf };
}

function wallMask(tiles:Uint8Array, c:number, r:number){
  let m=0;
  if(r>0&&tiles[(r-1)*COLS+c]===T_WALL)m|=1;
  if(c<COLS-1&&tiles[r*COLS+c+1]===T_WALL)m|=2;
  if(r<ROWS-1&&tiles[(r+1)*COLS+c]===T_WALL)m|=4;
  if(c>0&&tiles[r*COLS+c-1]===T_WALL)m|=8;
  return m;
}

// ─── BFS ─────────────────────────────────────────────────────────────────────
function bfs(tiles:Uint8Array, fc:number, fr:number, tc:number, tr:number):[number,number][]{
  if(fc===tc&&fr===tr)return[];
  const vis=new Uint8Array(COLS*ROWS), prev=new Int32Array(COLS*ROWS).fill(-1);
  const q=[fr*COLS+fc]; vis[fr*COLS+fc]=1;
  const DC=[0,1,0,-1], DR=[-1,0,1,0];
  while(q.length){
    const cur=q.shift()!;
    const cr=Math.floor(cur/COLS), cc=cur%COLS;
    for(let d=0;d<4;d++){
      const nc=cc+DC[d], nr=cr+DR[d];
      if(nc<0||nc>=COLS||nr<0||nr>=ROWS)continue;
      const ni=nr*COLS+nc;
      if(vis[ni]||tiles[ni]===T_VOID||tiles[ni]===T_WALL)continue;
      vis[ni]=1; prev[ni]=cur;
      if(nc===tc&&nr===tr){
        const path:[number,number][]=[];
        let p=ni;
        while(p!==fr*COLS+fc){path.unshift([p%COLS,Math.floor(p/COLS)]);p=prev[p];}
        return path;
      }
      q.push(ni);
    }
  }
  return[];
}

// ─── Agent data ───────────────────────────────────────────────────────────────
type Status="running"|"idle"|"paused";
type Facing="down"|"up"|"left"|"right";
type AnimState="typing"|"idle"|"walking";

interface TodoStep { step: string; done: boolean; active: boolean }
interface LogEntry { time: string; msg: string; type: "info"|"success"|"warn" }

interface AgentDef {
  id:string; name:string; model:string; roomId:RoomId; dc:number; dr:number;
  status:Status; task:string; palette:number; spend:string;
  role: string;
  currentTask: { title: string; desc: string; startedAt: string; eta: string };
  todos: TodoStep[];
  log: LogEntry[];
}

interface Agent { def:AgentDef;px:number;py:number;path:[number,number][];anim:AnimState;facing:Facing;frame:number;frameTick:number;wanderTimer:number }

const AGENT_DEFS: AgentDef[] = [
  {
    id:"ceo", name:"CEO", model:"Opus", roomId:"war", dc:3, dr:3, status:"running", palette:0, spend:"R$286",
    role:"Estrategista-chefe. Decompõe OKRs, delega projetos, arbitra conflitos entre departamentos.",
    task:"Decompondo OKRs Q2",
    currentTask:{ title:"Planejamento Estratégico Q2 2026", desc:"Decomposição dos OKRs da empresa em projetos executáveis por departamento", startedAt:"09:14", eta:"11:30" },
    todos:[
      { step:"Revisar resultados Q1 e gaps de performance",  done:true,  active:false },
      { step:"Definir 3 OKRs principais para Q2",           done:true,  active:false },
      { step:"Decompor OKRs em KRs por departamento",       done:false, active:true  },
      { step:"Delegar KRs para cada head de área",          done:false, active:false },
      { step:"Configurar tracking semanal no dashboard",    done:false, active:false },
      { step:"Publicar planejamento no Board Room",         done:false, active:false },
    ],
    log:[
      { time:"09:14", msg:"Iniciou análise dos resultados Q1", type:"info" },
      { time:"09:41", msg:"OKR 1: Crescimento de receita 40% definido", type:"success" },
      { time:"10:02", msg:"OKR 2: NPS ≥ 72 definido", type:"success" },
      { time:"10:18", msg:"Iniciando decomposição por departamento", type:"info" },
    ],
  },
  {
    id:"cto", name:"CTO", model:"Sonnet", roomId:"eng", dc:10, dr:2, status:"running", palette:1, spend:"R$198",
    role:"Líder técnico. Arquitetura de sistemas, code review, decisões build-vs-buy e tech debt.",
    task:"Code review PR#42",
    currentTask:{ title:"Review: Novo módulo de billing Stripe", desc:"Code review do PR#42 que integra Stripe Checkout e webhooks de pagamento", startedAt:"08:55", eta:"10:45" },
    todos:[
      { step:"Checar lógica de criação de subscriptions",     done:true,  active:false },
      { step:"Validar tratamento de webhooks (idempotência)", done:true,  active:false },
      { step:"Revisar testes unitários e de integração",      done:false, active:true  },
      { step:"Verificar secrets e env vars no CI",            done:false, active:false },
      { step:"Aprovar ou solicitar changes",                  done:false, active:false },
    ],
    log:[
      { time:"08:55", msg:"PR#42 atribuído para review", type:"info" },
      { time:"09:12", msg:"Subscriptions logic aprovada", type:"success" },
      { time:"09:38", msg:"Webhooks: idempotência correta, aprovado", type:"success" },
      { time:"09:55", msg:"Iniciando review de testes", type:"info" },
      { time:"10:10", msg:"WARN: coverage de testes em 67%, abaixo do mínimo 80%", type:"warn" },
    ],
  },
  {
    id:"fst", name:"Full-Stack", model:"Sonnet", roomId:"eng", dc:13, dr:2, status:"running", palette:2, spend:"R$147",
    role:"Implementa features, corrige bugs, mantém CI/CD. Suporte a TypeScript, React, Node e PostgreSQL.",
    task:"Endpoint /api/agents",
    currentTask:{ title:"Implementar GET /api/agents com paginação", desc:"Criar endpoint REST para listar agentes ativos com filtros e paginação", startedAt:"09:30", eta:"12:00" },
    todos:[
      { step:"Definir schema da resposta (OpenAPI)",           done:true,  active:false },
      { step:"Criar rota Express com middleware de auth",      done:true,  active:false },
      { step:"Implementar query Drizzle com filtros",          done:false, active:true  },
      { step:"Adicionar paginação cursor-based",               done:false, active:false },
      { step:"Escrever testes de integração",                  done:false, active:false },
      { step:"Documentar no Swagger",                          done:false, active:false },
    ],
    log:[
      { time:"09:30", msg:"Iniciou implementação do endpoint", type:"info" },
      { time:"09:48", msg:"Schema OpenAPI definido e validado", type:"success" },
      { time:"10:05", msg:"Rota Express criada com JWT middleware", type:"success" },
      { time:"10:22", msg:"Implementando query com Drizzle ORM", type:"info" },
    ],
  },
  {
    id:"cmo", name:"CMO", model:"Sonnet", roomId:"mkt", dc:19, dr:2, status:"idle", palette:3, spend:"R$112",
    role:"Estratégia de marketing, brand, posicionamento e gestão de tráfego pago e orgânico.",
    task:"Aguardando aprovação de copy",
    currentTask:{ title:"Campanha de lançamento v2.0", desc:"Criação da copy e briefing criativo para campanha de lançamento da versão 2.0 da plataforma", startedAt:"08:00", eta:"—" },
    todos:[
      { step:"Pesquisar concorrentes e posicionamento atual", done:true,  active:false },
      { step:"Criar 3 variações de headline",                 done:true,  active:false },
      { step:"Enviar copy para aprovação do CEO",             done:true,  active:false },
      { step:"Aguardar feedback e iterar",                    done:false, active:true  },
      { step:"Briefar equipe de design",                      done:false, active:false },
      { step:"Configurar UTMs e rastreamento",                done:false, active:false },
    ],
    log:[
      { time:"08:00", msg:"Iniciou pesquisa de concorrentes", type:"info" },
      { time:"08:45", msg:"3 variações de headline criadas", type:"success" },
      { time:"09:10", msg:"Copy enviada ao CEO para revisão", type:"info" },
      { time:"09:10", msg:"Aguardando aprovação — em pausa", type:"warn" },
    ],
  },
  {
    id:"ads", name:"Ads Mgr", model:"Haiku", roomId:"mkt", dc:22, dr:3, status:"paused", palette:0, spend:"R$312",
    role:"Campanhas pagas Google e Meta, alocação de budget, ROAS, reporting diário automatizado.",
    task:"Budget mensal atingido",
    currentTask:{ title:"Campanhas Google Ads — Março 2026", desc:"Gestão das campanhas de performance para aquisição de leads qualificados", startedAt:"01/03", eta:"31/03" },
    todos:[
      { step:"Configurar campanhas Search e Display",    done:true,  active:false },
      { step:"Definir audiências e segmentações",        done:true,  active:false },
      { step:"Atingiu budget mensal de R$5.000",         done:true,  active:false },
      { step:"Aguardar renovação de budget em 01/04",   done:false, active:true  },
      { step:"Otimizar bidding com dados de março",      done:false, active:false },
    ],
    log:[
      { time:"01/03", msg:"Campanhas Search configuradas", type:"success" },
      { time:"15/03", msg:"CTR médio: 4.2% — acima da meta", type:"success" },
      { time:"22/03", msg:"WARN: 85% do budget consumido", type:"warn" },
      { time:"24/03", msg:"Budget esgotado — agente pausado", type:"warn" },
    ],
  },
  {
    id:"cfo", name:"CFO", model:"Haiku", roomId:"fin", dc:3, dr:9, status:"idle", palette:4, spend:"R$64",
    role:"Planejamento financeiro, fluxo de caixa, unit economics, runway e relatórios para investidores.",
    task:"Relatório Q1 gerado",
    currentTask:{ title:"Relatório Financeiro Q1 2026", desc:"Consolidação das métricas financeiras do trimestre para apresentação ao board", startedAt:"20/03", eta:"Concluído" },
    todos:[
      { step:"Consolidar receitas e despesas de jan-mar",  done:true, active:false },
      { step:"Calcular MRR, ARR e churn financeiro",       done:true, active:false },
      { step:"Projetar runway atual (meses restantes)",    done:true, active:false },
      { step:"Gerar PDF do relatório",                     done:true, active:false },
      { step:"Enviar para CEO e board",                    done:true, active:false },
    ],
    log:[
      { time:"20/03", msg:"Iniciou consolidação dos dados Q1", type:"info" },
      { time:"22/03", msg:"MRR: R$48.200 (+18% vs Q4 2025)", type:"success" },
      { time:"23/03", msg:"Runway: 14 meses calculado", type:"success" },
      { time:"24/03", msg:"Relatório PDF gerado e enviado", type:"success" },
    ],
  },
  {
    id:"sdr", name:"SDR", model:"Sonnet", roomId:"sales", dc:11, dr:9, status:"idle", palette:2, spend:"R$89",
    role:"Prospecção outbound, qualificação de leads via BANT, cold outreach multicanal e CRM.",
    task:"Prospecção Q2 gerada",
    currentTask:{ title:"Lista de prospecção Q2 — 200 leads", desc:"Pesquisa e qualificação de 200 empresas-alvo para outreach no segundo trimestre", startedAt:"18/03", eta:"Concluído" },
    todos:[
      { step:"Definir ICP (perfil de cliente ideal) para Q2",   done:true, active:false },
      { step:"Pesquisar 500 empresas no LinkedIn Sales Nav",     done:true, active:false },
      { step:"Qualificar com critérios BANT",                   done:true, active:false },
      { step:"Exportar 200 leads qualificados para o CRM",      done:true, active:false },
      { step:"Criar sequências de email automatizadas",          done:true, active:false },
    ],
    log:[
      { time:"18/03", msg:"ICP Q2 definido: SaaS B2B, 10-200 colaboradores", type:"success" },
      { time:"20/03", msg:"500 empresas pesquisadas no LinkedIn", type:"info" },
      { time:"22/03", msg:"200 leads qualificados — BANT completo", type:"success" },
      { time:"23/03", msg:"Sequências de email criadas e ativadas", type:"success" },
    ],
  },
  {
    id:"hrm", name:"HR Manager", model:"Haiku", roomId:"hr", dc:20, dr:9, status:"running", palette:3, spend:"R$55",
    role:"Onboarding de agentes, documentação de processos, cultura organizacional e gestão de capacidade.",
    task:"Onboarding 3 novos agentes",
    currentTask:{ title:"Onboarding: DevOps, Sec Engineer e UX Designer", desc:"Configuração e ativação de 3 novos agentes no workspace", startedAt:"10:00", eta:"14:00" },
    todos:[
      { step:"Criar perfis dos agentes no sistema",                done:true,  active:false },
      { step:"Configurar permissões e acessos por departamento",   done:true,  active:false },
      { step:"Integrar agentes ao Slack e ferramentas internas",   done:false, active:true  },
      { step:"Criar plano de 30 dias para cada agente",            done:false, active:false },
      { step:"Agendar 1:1 com heads de cada área",                 done:false, active:false },
    ],
    log:[
      { time:"10:00", msg:"Iniciou processo de onboarding", type:"info" },
      { time:"10:30", msg:"Perfis criados para os 3 agentes", type:"success" },
      { time:"11:00", msg:"Permissões configuradas", type:"success" },
      { time:"11:20", msg:"Integrando agentes ao Slack...", type:"info" },
    ],
  },
  {
    id:"da", name:"Data Analyst", model:"Sonnet", roomId:"data", dc:3, dr:15, status:"running", palette:1, spend:"R$120",
    role:"Análise de dados de produto e negócio, dashboards, anomalias, cohortes e modelos preditivos.",
    task:"Dashboard Q1 metrics",
    currentTask:{ title:"Dashboard executivo Q1 2026", desc:"Construção do dashboard consolidado com métricas de produto, growth e financeiro", startedAt:"09:00", eta:"13:00" },
    todos:[
      { step:"Coletar dados de todas as fontes (DB, GA4, Stripe)", done:true,  active:false },
      { step:"Limpar e normalizar datasets",                       done:true,  active:false },
      { step:"Construir queries de métricas-chave (DAU, MRR, NPS)",done:false, active:true  },
      { step:"Criar visualizações no Metabase",                    done:false, active:false },
      { step:"Configurar alertas automáticos de anomalias",        done:false, active:false },
      { step:"Apresentar para CEO e CFO",                          done:false, active:false },
    ],
    log:[
      { time:"09:00", msg:"Conectou com Postgres, GA4 e Stripe API", type:"success" },
      { time:"09:40", msg:"Datasets normalizados — 98.2% de dados válidos", type:"success" },
      { time:"10:15", msg:"Construindo queries de DAU/MAU", type:"info" },
      { time:"10:35", msg:"MRR query concluída: R$48.200", type:"success" },
    ],
  },
  {
    id:"pm", name:"Product Mgr", model:"Opus", roomId:"product", dc:11, dr:15, status:"running", palette:4, spend:"R$210",
    role:"Roadmap de produto, priorização por impacto, discovery com usuários e alinhamento com eng.",
    task:"Roadmap H1 2026",
    currentTask:{ title:"Roadmap de Produto H1 2026", desc:"Construção e priorização do roadmap dos próximos 6 meses com base em dados e feedback de usuários", startedAt:"08:30", eta:"12:00" },
    todos:[
      { step:"Analisar NPS e feedback dos últimos 90 dias",        done:true,  active:false },
      { step:"Mapear oportunidades por impacto × esforço",         done:true,  active:false },
      { step:"Alinhar com CTO viabilidade técnica das top 10",     done:false, active:true  },
      { step:"Priorizar e sequenciar features no roadmap",          done:false, active:false },
      { step:"Publicar roadmap para toda a empresa",               done:false, active:false },
      { step:"Criar milestones e tracking de progresso",           done:false, active:false },
    ],
    log:[
      { time:"08:30", msg:"Análise de 340 feedbacks de usuários iniciada", type:"info" },
      { time:"09:15", msg:"Top 3 pedidos: API pública, Webhooks, Mobile app", type:"success" },
      { time:"09:50", msg:"Matriz impacto × esforço construída", type:"success" },
      { time:"10:20", msg:"Em alinhamento com CTO sobre API pública", type:"info" },
    ],
  },
  {
    id:"dev", name:"DevOps", model:"Haiku", roomId:"eng", dc:15, dr:3, status:"idle", palette:5, spend:"R$38",
    role:"CI/CD, infraestrutura na AWS, monitoring com Datadog, alertas e automação de deploys.",
    task:"Pipeline CI/CD configurado",
    currentTask:{ title:"Pipeline de deploy automatizado", desc:"Configuração do pipeline completo CI/CD com testes, build e deploy automático para staging e prod", startedAt:"07/03", eta:"Concluído" },
    todos:[
      { step:"Configurar GitHub Actions para CI",                   done:true, active:false },
      { step:"Criar pipeline de testes automatizados",              done:true, active:false },
      { step:"Configurar build e push de imagem Docker",            done:true, active:false },
      { step:"Deploy automático para staging em push",              done:true, active:false },
      { step:"Deploy para prod via aprovação manual",               done:true, active:false },
      { step:"Configurar alertas Datadog",                          done:true, active:false },
    ],
    log:[
      { time:"07/03", msg:"GitHub Actions workflow criado", type:"success" },
      { time:"10/03", msg:"Pipeline de testes: 94% coverage", type:"success" },
      { time:"14/03", msg:"Docker build e push configurados", type:"success" },
      { time:"18/03", msg:"Datadog alertas configurados — pipeline completo", type:"success" },
    ],
  },
];

const tileCenter=(c:number,r:number):[number,number]=>[c*TILE+TILE/2, r*TILE+TILE/2];

function initAgents():Agent[]{
  return AGENT_DEFS.map(def=>{
    const[px,py]=tileCenter(def.dc,def.dr);
    return{def,px,py,path:[],anim:def.status==="running"?"typing":"idle",facing:"down",frame:0,frameTick:0,wanderTimer:Math.random()*5+2};
  });
}

// ─── Furniture ───────────────────────────────────────────────────────────────
interface Placed{sprite:string;c:number;r:number;sw:number;sh:number;zr:number;flip?:boolean}

function buildFurniture(sprites:SpriteMap):Placed[]{
  const out:Placed[]=[];
  const add=(sp:string,c:number,r:number,sw:number,sh:number,flip=false)=>{
    if(!sprites[sp])return;
    out.push({sprite:sp,c,r,sw,sh,zr:r+(sh*ZOOM)/TILE,flip});
  };

  add("desk",      2,2, 48,32);  add("pc_on",  2,2,16,32);
  add("chair",     3,4, 16,16);
  add("whiteboard",5,2, 32,32);

  add("desk",   10,2, 48,32);  add("pc_on", 10,2,16,32);
  add("chair",  11,4, 16,16);
  add("desk",   13,2, 48,32);  add("pc_on", 13,2,16,32);
  add("chair",  14,4, 16,16);
  add("cactus", 15,2, 16,32);

  add("desk",   19,2, 48,32);  add("pc_off",19,2,16,32);
  add("chair",  20,4, 16,16);
  add("sofa",   22,4, 32,16);
  add("plant",  23,2, 16,32);

  add("desk",   2,8,  48,32);  add("pc_on",  2,8,16,32);
  add("chair",  3,10, 16,16);
  add("book",   6,8,  16,32,true);

  add("desk",   10,8, 48,32);  add("pc_off",10,8,16,32);
  add("chair",  11,10,16,16);
  add("sofa",   13,10,32,16);
  add("cactus", 15,8, 16,32);

  add("desk",   19,8, 48,32);  add("pc_on", 19,8,16,32);
  add("chair",  20,10,16,16);
  add("sofa",   22,10,32,16);
  add("plant",  23,8, 16,32);

  add("desk",   2,14, 48,32);  add("pc_on",  2,14,16,32);
  add("chair",  3,16, 16,16);
  add("book",   6,14, 16,32);

  add("desk",   10,14,48,32);  add("pc_on", 10,14,16,32);
  add("chair",  11,16,16,16);
  add("whiteboard",13,14,32,32);
  add("cactus", 15,14,16,32);

  add("desk",   19,14,48,32);
  add("chair_b",20,14,16,16);
  add("chair",  20,16,16,16);
  add("chair",  22,16,16,16);
  add("plant",  23,14,16,32);
  add("plant",  19,16,16,32);

  return out;
}

// ─── Sprites ─────────────────────────────────────────────────────────────────
type SpriteMap=Record<string,HTMLImageElement>;
const SOURCES:[string,string][]=[
  ["char0","/pixel/characters/char_0.png"],
  ["char1","/pixel/characters/char_1.png"],
  ["char2","/pixel/characters/char_2.png"],
  ["char3","/pixel/characters/char_3.png"],
  ["char4","/pixel/characters/char_4.png"],
  ["char5","/pixel/characters/char_5.png"],
  ["floor0","/pixel/floors/floor_0.png"],["floor1","/pixel/floors/floor_1.png"],
  ["floor2","/pixel/floors/floor_2.png"],["floor3","/pixel/floors/floor_3.png"],
  ["floor4","/pixel/floors/floor_4.png"],["floor5","/pixel/floors/floor_5.png"],
  ["floor6","/pixel/floors/floor_6.png"],
  ["wall",  "/pixel/walls/wall_0.png"],
  ["desk",  "/pixel/furniture/DESK/DESK_FRONT.png"],
  ["chair", "/pixel/furniture/CUSHIONED_CHAIR/CUSHIONED_CHAIR_FRONT.png"],
  ["chair_b","/pixel/furniture/CUSHIONED_CHAIR/CUSHIONED_CHAIR_BACK.png"],
  ["pc_off","/pixel/furniture/PC/PC_FRONT_OFF.png"],
  ["pc_on", "/pixel/furniture/PC/PC_FRONT_ON_1.png"],
  ["plant", "/pixel/furniture/PLANT/PLANT.png"],
  ["whiteboard","/pixel/furniture/WHITEBOARD/WHITEBOARD.png"],
  ["sofa",  "/pixel/furniture/SOFA/SOFA_FRONT.png"],
  ["book",  "/pixel/furniture/BOOKSHELF/BOOKSHELF.png"],
  ["cactus","/pixel/furniture/CACTUS/CACTUS.png"],
];
function loadSprites(cb:(m:SpriteMap)=>void){
  const map:SpriteMap={};
  let n=SOURCES.length;
  for(const[k,src]of SOURCES){
    const img=new Image();
    img.onload =()=>{map[k]=img;if(--n===0)cb(map);};
    img.onerror=()=>{        if(--n===0)cb(map);};
    img.src=src;
  }
}

// ─── Renderer ────────────────────────────────────────────────────────────────
function render(
  ctx:CanvasRenderingContext2D, vw:number, vh:number,
  tiles:Uint8Array, roomOf:Int8Array, sprites:SpriteMap,
  furniture:Placed[], agents:Agent[], selId:string|null, t:number,
){
  ctx.imageSmoothingEnabled=false;
  ctx.clearRect(0,0,vw,vh);

  const worldW = COLS * TILE;
  const worldH = ROWS * TILE;
  const scale = Math.min(vw / worldW, vh / worldH);
  const ox = Math.round((vw - worldW * scale) / 2);
  const oy = Math.round((vh - worldH * scale) / 2);

  ctx.fillStyle="#0a0a0a";
  ctx.fillRect(0,0,vw,vh);

  ctx.save();
  ctx.translate(ox, oy);
  ctx.scale(scale, scale);

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const tile=tiles[r*COLS+c];
      if(tile===T_VOID)continue;
      const ri=roomOf[r*COLS+c];
      const px=c*TILE, py=r*TILE;
      if(ri>=0){
        ctx.fillStyle=ROOMS[ri].color;
        ctx.fillRect(px,py,TILE,TILE);
        const fk=`floor${ROOMS[ri].floorIdx}`;
        if(sprites[fk]){
          ctx.globalAlpha=0.15;
          ctx.drawImage(sprites[fk],0,0,STILE,STILE,px,py,TILE,TILE);
          ctx.globalAlpha=1;
        }
      } else {
        ctx.fillStyle=(c+r)%2===0?CLR.corridor:CLR.corridorAlt;
        ctx.fillRect(px,py,TILE,TILE);
        if(sprites["floor0"]){
          ctx.globalAlpha=0.08;
          ctx.drawImage(sprites["floor0"],0,0,STILE,STILE,px,py,TILE,TILE);
          ctx.globalAlpha=1;
        }
      }
    }
  }

  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(tiles[r*COLS+c]!==T_WALL)continue;
      const px=c*TILE, py=r*TILE;
      const mask=wallMask(tiles,c,r);
      if(sprites["wall"]){
        const sc2=(mask&3)*WFW, sr2=(mask>>2)*WFH;
        ctx.drawImage(sprites["wall"],sc2,sr2,WFW,WFH,px,py-TILE,TILE,TILE*2);
      } else {
        ctx.fillStyle=CLR.wallTop; ctx.fillRect(px,py-TILE*0.3,TILE,TILE*0.35);
        ctx.fillStyle=CLR.wallFace; ctx.fillRect(px,py-TILE*0.05,TILE,TILE*0.7);
        ctx.fillStyle=CLR.wallShadow; ctx.fillRect(px,py+TILE*0.6,TILE,TILE*0.4);
      }
    }
  }

  type Ent={z:number;draw:()=>void};
  const ents:Ent[]=[];

  for(const f of furniture){
    ents.push({z:f.zr, draw:()=>{
      const img=sprites[f.sprite]; if(!img)return;
      const dw=f.sw*ZOOM, dh=f.sh*ZOOM;
      const dx=f.c*TILE, dy=f.r*TILE;
      if(f.flip){
        ctx.save();ctx.translate(dx+dw,dy);ctx.scale(-1,1);
        ctx.drawImage(img,0,0,f.sw,f.sh,0,0,dw,dh);
        ctx.restore();
      } else {
        ctx.drawImage(img,0,0,f.sw,f.sh,dx,dy,dw,dh);
      }
    }});
  }

  for(const ag of agents){
    ents.push({z:ag.py/TILE, draw:()=>drawAgent(ctx,sprites,ag,ag.def.id===selId,t)});
  }

  ents.sort((a,b)=>a.z-b.z);
  for(const e of ents)e.draw();

  ctx.font="bold 7px 'Courier New',monospace";
  ctx.textAlign="center";
  ROOMS.forEach(rm=>{
    const wx=(rm.x+rm.w/2)*TILE, wy=(rm.y+1.15)*TILE;
    const lbl=rm.name.toUpperCase();
    const tw=ctx.measureText(lbl).width+10;
    const th=13;
    ctx.fillStyle=CLR.roomLblBg;
    ctx.strokeStyle="rgba(255,255,255,0.07)";
    ctx.lineWidth=0.5;
    ctx.beginPath();ctx.roundRect(wx-tw/2,wy-th+2,tw,th,3);
    ctx.fill();ctx.stroke();
    ctx.fillStyle=CLR.roomLbl;
    ctx.fillText(lbl,wx,wy);
  });

  ctx.restore();
  return{scale,ox,oy};
}

// ─── Draw agent ──────────────────────────────────────────────────────────────
function drawAgent(ctx:CanvasRenderingContext2D,sprites:SpriteMap,ag:Agent,sel:boolean,t:number){
  const img=sprites[`char${ag.def.palette}`];
  const paused=ag.def.status==="paused";
  let row=0,flipX=false;
  switch(ag.facing){case"up":row=1;break;case"right":row=2;break;case"left":row=2;flipX=true;break;}
  let frame=1;
  if(ag.anim==="typing")frame=3+(ag.frame%2);
  else if(ag.anim==="walking")frame=ag.frame%3;
  const sx=frame*CFW, sy=row*CFH;
  const dw=CFW*ZOOM, dh=CFH*ZOOM;
  const dx=Math.round(ag.px-dw/2);
  const dy=Math.round(ag.py-dh);

  if(sel){
    ctx.strokeStyle="rgba(255,255,255,0.8)";ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.ellipse(ag.px,ag.py-3,dw*0.5,5,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
  }
  ctx.fillStyle="rgba(0,0,0,0.2)";
  ctx.beginPath();ctx.ellipse(ag.px,ag.py-2,dw*0.42,4,0,0,Math.PI*2);ctx.fill();

  if(img){
    if(paused)ctx.globalAlpha=0.4;
    ctx.imageSmoothingEnabled=false;
    if(flipX){
      ctx.save();ctx.translate(ag.px+dw/2,dy);ctx.scale(-1,1);
      ctx.drawImage(img,sx,sy,CFW,CFH,-dw,0,dw,dh);ctx.restore();
    } else {
      ctx.drawImage(img,sx,sy,CFW,CFH,dx,dy,dw,dh);
    }
    if(paused)ctx.globalAlpha=1;
  } else {
    ctx.fillStyle=paused?"#555":"#ccc";
    ctx.beginPath();ctx.arc(ag.px,ag.py-dh/2,dw*0.4,0,Math.PI*2);ctx.fill();
  }

  ctx.font="600 8px 'Inter',sans-serif";ctx.textAlign="center";
  const name=ag.def.name;
  const tw=ctx.measureText(name).width+14;
  const th=13;
  const tx=ag.px-tw/2, ty=dy-th-2;
  ctx.fillStyle=sel?"rgba(255,255,255,0.15)":CLR.tagBg;
  ctx.strokeStyle=sel?"rgba(255,255,255,0.5)":CLR.tagBdr;
  ctx.lineWidth=0.5;
  ctx.beginPath();ctx.roundRect(tx,ty,tw,th,6);ctx.fill();ctx.stroke();
  const dotC=ag.def.status==="running"
    ?`rgba(100,240,120,${0.7+0.3*Math.sin(t*4+ag.def.id.charCodeAt(0))})`
    :ag.def.status==="idle"?"rgba(200,200,200,0.5)":"rgba(220,80,80,0.6)";
  ctx.fillStyle=dotC;ctx.beginPath();ctx.arc(tx+5.5,ty+th/2,2.5,0,Math.PI*2);ctx.fill();
  ctx.fillStyle=sel?"#fff":"rgba(255,255,255,0.9)";
  ctx.fillText(name,ag.px+2.5,ty+th-3.5);

  if(ag.anim==="typing"&&ag.def.status==="running"){
    const bx=ag.px+dw*0.5, by=dy+4;
    ctx.fillStyle=CLR.bubbleBg;ctx.strokeStyle=CLR.bubbleBdr;ctx.lineWidth=0.5;
    ctx.beginPath();ctx.roundRect(bx,by,26,14,5);ctx.fill();ctx.stroke();
    const di=Math.floor(t*3.5)%3;
    for(let i=0;i<3;i++){
      ctx.fillStyle=i===di?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)";
      ctx.beginPath();ctx.arc(bx+5+i*7,by+7,i===di?2.2:1.5,0,Math.PI*2);ctx.fill();
    }
  }
  if(paused){
    ctx.fillStyle="rgba(200,80,80,0.85)";ctx.font="bold 6px monospace";ctx.textAlign="center";
    ctx.fillText("PAUSED",ag.px,dy-1);
  }
}

// ─── Update agents ───────────────────────────────────────────────────────────
function updateAgents(agents:Agent[],tiles:Uint8Array,dt:number){
  const SPEED=TILE*5;
  for(const ag of agents){
    ag.frameTick+=dt;
    if(ag.frameTick>0.1){ag.frame++;ag.frameTick=0;}
    if(ag.path.length>0){
      ag.anim="walking";
      const[tc,tr]=ag.path[0];
      const[tx,ty]=tileCenter(tc,tr);
      const dx=tx-ag.px,dy=ty-ag.py,dist=Math.hypot(dx,dy);
      if(Math.abs(dx)>Math.abs(dy))ag.facing=dx>0?"right":"left";
      else ag.facing=dy>0?"down":"up";
      if(dist<SPEED*dt+1){
        ag.px=tx;ag.py=ty;ag.path.shift();
        if(!ag.path.length){ag.anim=ag.def.status==="running"?"typing":"idle";ag.facing="down";}
      } else {ag.px+=dx/dist*SPEED*dt;ag.py+=dy/dist*SPEED*dt;}
      continue;
    }
    if(ag.def.status==="idle"){
      ag.wanderTimer-=dt;
      if(ag.wanderTimer<=0){
        ag.wanderTimer=Math.random()*6+3;
        const rm=ROOMS.find(r=>r.id===ag.def.roomId);
        if(rm){
          for(let a=0;a<30;a++){
            const rc=rm.x+1+Math.floor(Math.random()*(rm.w-2));
            const rr=rm.y+1+Math.floor(Math.random()*(rm.h-2));
            if(tiles[rr*COLS+rc]!==T_FLOOR)continue;
            const cc=Math.round((ag.px-TILE/2)/TILE), cr=Math.round((ag.py-TILE)/TILE);
            const p=bfs(tiles,cc,cr,rc,rr);
            if(p.length>0&&p.length<=8){ag.path=p;break;}
          }
        }
      }
    }
    if(ag.def.status==="running"){
      const[tx,ty]=tileCenter(ag.def.dc,ag.def.dr);
      if(Math.abs(ag.px-tx)>2||Math.abs(ag.py-ty)>2){
        const cc=Math.round((ag.px-TILE/2)/TILE), cr=Math.round((ag.py-TILE)/TILE);
        ag.path=bfs(tiles,cc,cr,ag.def.dc,ag.def.dr);
      } else {ag.px=tx;ag.py=ty;ag.anim="typing";ag.facing="down";}
    }
  }
}

// ─── Agent Detail Panel ───────────────────────────────────────────────────────
function AgentDetailPanel({ def, onClose }: { def: AgentDef; onClose: () => void }) {
  const [tab, setTab] = useState<"tasks"|"log">("tasks");
  const doneCount = def.todos.filter(t => t.done).length;
  const progress = Math.round((doneCount / def.todos.length) * 100);
  const statusColor = def.status === "running" ? "#64f078" : def.status === "idle" ? "rgba(200,200,200,0.5)" : "rgba(255,80,80,0.5)";
  const statusLabel = def.status === "running" ? "Executando" : def.status === "idle" ? "Ocioso" : "Pausado";
  const room = ROOMS.find(r => r.id === def.roomId);

  return (
    <div style={{ background: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, display: "flex", flexDirection: "column", overflow: "hidden", flex: 1, minHeight: 0 }}>
      {/* Agent header */}
      <div style={{ padding: "12px 14px", borderBottom: "1px solid #111", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
            <span style={{ fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 15, color: "#fff" }}>{def.name}</span>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.25)", cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 0 }}>×</button>
        </div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "0 0 8px", lineHeight: 1.5 }}>{def.role}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.35)" }}>{def.model}</span>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.35)" }}>{room?.name}</span>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "rgba(255,255,255,0.35)" }}>{def.spend}</span>
        </div>
      </div>

      {/* Current task */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #0d0d0d", flexShrink: 0 }}>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", marginBottom: 5 }}>TAREFA ATUAL</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.8)", marginBottom: 3, lineHeight: 1.4 }}>{def.currentTask.title}</div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "0 0 8px", lineHeight: 1.5 }}>{def.currentTask.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>Início: {def.currentTask.startedAt}</span>
          <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>ETA: {def.currentTask.eta}</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: statusColor, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontFamily: "Geist Mono, monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>{doneCount}/{def.todos.length} etapas · {progress}%</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #0d0d0d", flexShrink: 0 }}>
        {(["tasks","log"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, fontFamily: "Inter, sans-serif", fontSize: 10, padding: "7px 0",
            background: "transparent", border: "none", cursor: "pointer",
            color: tab === t ? "#fff" : "rgba(255,255,255,0.25)",
            borderBottom: tab === t ? "1px solid rgba(255,255,255,0.5)" : "1px solid transparent",
            marginBottom: -1,
          }}>
            {t === "tasks" ? "Todo List" : "Log"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        {tab === "tasks" && (
          <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 3 }}>
            {def.todos.map((todo, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 8px", borderRadius: 6,
                background: todo.active ? "rgba(255,255,255,0.04)" : "transparent",
                border: todo.active ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
              }}>
                <span style={{
                  width: 14, height: 14, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: todo.done ? "rgba(100,240,120,0.15)" : todo.active ? "rgba(255,255,255,0.08)" : "transparent",
                  border: todo.done ? "1px solid rgba(100,240,120,0.4)" : todo.active ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.1)",
                }}>
                  {todo.done && <span style={{ color: "#64f078", fontSize: 8, lineHeight: 1 }}>✓</span>}
                  {todo.active && !todo.done && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.6)", display: "block" }} />}
                </span>
                <span style={{
                  fontFamily: "Inter, sans-serif", fontSize: 10, lineHeight: 1.5,
                  color: todo.done ? "rgba(255,255,255,0.25)" : todo.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                  textDecoration: todo.done ? "line-through" : "none",
                }}>
                  {todo.step}
                </span>
              </div>
            ))}
          </div>
        )}
        {tab === "log" && (
          <div style={{ padding: "8px 14px", display: "flex", flexDirection: "column", gap: 2 }}>
            {[...def.log].reverse().map((entry, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: i < def.log.length - 1 ? "1px solid #080808" : "none" }}>
                <span style={{ fontFamily: "Geist Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", flexShrink: 0, paddingTop: 1 }}>{entry.time}</span>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                  background: entry.type === "success" ? "#64f078" : entry.type === "warn" ? "#f0b864" : "rgba(255,255,255,0.3)",
                }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{entry.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function VirtualOfficePage(){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const wrapRef  =useRef<HTMLDivElement>(null);
  const renderInfo=useRef({scale:1,ox:0,oy:0});
  const st=useRef({
    sprites:{} as SpriteMap, agents:[] as Agent[],
    tiles:new Uint8Array(), roomOf:new Int8Array(),
    furniture:[] as Placed[],
    selId:null as string|null,
    vw:832,vh:576, ready:false,
  });
  const raf=useRef(0), lastT=useRef(0), tSec=useRef(0);
  const[selId,setSelId]=useState<string|null>(null);
  const[ready,setReady]=useState(false);

  useEffect(()=>{
    const{tiles,roomOf}=buildMap();
    const s=st.current;
    s.tiles=tiles; s.roomOf=roomOf;
    s.agents=initAgents();
    loadSprites(sprites=>{
      s.sprites=sprites;
      s.furniture=buildFurniture(sprites);
      s.ready=true;
      setReady(true);
    });
  },[]);

  useEffect(()=>{
    function loop(now:number){
      const dt=Math.min((now-lastT.current)/1000,0.1);
      lastT.current=now; tSec.current+=dt;
      const s=st.current;
      if(s.ready){
        updateAgents(s.agents,s.tiles,dt);
        const c=canvasRef.current;
        if(c){
          const ctx=c.getContext("2d")!;
          const info=render(ctx,s.vw,s.vh,s.tiles,s.roomOf,s.sprites,s.furniture,s.agents,s.selId,tSec.current);
          renderInfo.current=info;
        }
      }
      raf.current=requestAnimationFrame(loop);
    }
    raf.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(raf.current);
  },[]);

  useEffect(()=>{
    const wrap=wrapRef.current; if(!wrap)return;
    const obs=new ResizeObserver(entries=>{
      for(const e of entries){
        const{width,height}=e.contentRect;
        const s=st.current; s.vw=width; s.vh=height;
        if(canvasRef.current){canvasRef.current.width=width;canvasRef.current.height=height;}
      }
    });
    obs.observe(wrap); return()=>obs.disconnect();
  },[]);

  const handleClick=useCallback((e:React.MouseEvent<HTMLCanvasElement>)=>{
    const s=st.current;
    const{scale,ox,oy}=renderInfo.current;
    const rect=canvasRef.current!.getBoundingClientRect();
    const cssX=(e.clientX-rect.left)*(s.vw/rect.width);
    const cssY=(e.clientY-rect.top)*(s.vh/rect.height);
    const wx=(cssX-ox)/scale;
    const wy=(cssY-oy)/scale;
    let hit:string|null=null;
    for(const ag of s.agents){
      const dw=CFW*ZOOM, dh=CFH*ZOOM;
      if(wx>ag.px-dw/2&&wx<ag.px+dw/2&&wy>ag.py-dh&&wy<ag.py){hit=ag.def.id;break;}
    }
    const newSel=hit===s.selId?null:hit;
    s.selId=newSel; setSelId(newSel);
  },[]);

  const selDef=AGENT_DEFS.find(a=>a.id===selId)??null;

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",padding:"14px 18px",gap:8,background:"#050505"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#64f078",flexShrink:0}}/>
            <span style={{fontFamily:"Geist Mono,monospace",fontSize:9,color:"rgba(255,255,255,0.3)",letterSpacing:"0.07em"}}>
              {AGENT_DEFS.filter(a=>a.status==="running").length} AGENTES LIVE · {ROOMS.length} DEPARTAMENTOS
            </span>
          </div>
          <h1 style={{fontFamily:"Geist,sans-serif",fontWeight:300,fontSize:18,color:"#fff",letterSpacing:"-0.03em",margin:0}}>Virtual Office</h1>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"flex-end",maxWidth:440}}>
          {ROOMS.map(r=>(
            <span key={r.id} style={{fontFamily:"Inter,sans-serif",fontSize:9,padding:"2px 7px",borderRadius:3,
              background:r.color+"26",border:`1px solid ${r.color}55`,color:`${r.color}ee`,whiteSpace:"nowrap"}}>
              {r.name}
            </span>
          ))}
        </div>
      </div>

      {/* Canvas + sidebar */}
      <div style={{display:"flex",gap:8,flex:1,minHeight:0}}>

        {/* Canvas */}
        <div ref={wrapRef} style={{flex:1,background:"#0a0a0a",border:"1px solid #1a1a1a",borderRadius:10,overflow:"hidden",position:"relative",minHeight:0}}>
          {!ready&&(
            <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"Geist Mono,monospace",fontSize:10,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em"}}>LOADING...</span>
            </div>
          )}
          <canvas ref={canvasRef} onClick={handleClick}
            style={{display:"block",width:"100%",height:"100%",imageRendering:"pixelated",cursor:"crosshair"}}/>
        </div>

        {/* Right sidebar — expands when agent is selected */}
        <div style={{
          width: selDef ? 280 : 192,
          display:"flex",flexDirection:"column",gap:8,flexShrink:0,
          transition:"width 0.2s ease",
        }}>

          {/* Agent detail panel — only when selected */}
          {selDef ? (
            <AgentDetailPanel def={selDef} onClose={()=>{st.current.selId=null;setSelId(null);}} />
          ) : (
            <>
              {/* Hint card */}
              <div style={{background:"#000",border:"1px solid #1a1a1a",borderRadius:10,padding:12}}>
                <p style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"rgba(255,255,255,0.18)",margin:0,lineHeight:1.6}}>
                  Clique num agente para ver tarefas, todo list e log de atividade.
                </p>
              </div>

              {/* Agent list */}
              <div style={{background:"#000",border:"1px solid #1a1a1a",borderRadius:10,overflow:"hidden",flex:1,overflowY:"auto"}}>
                <div style={{padding:"7px 12px",borderBottom:"1px solid #111",position:"sticky",top:0,background:"#000"}}>
                  <span style={{fontFamily:"Geist Mono,monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.07em"}}>AGENTES ({AGENT_DEFS.length})</span>
                </div>
                {AGENT_DEFS.map((a,i)=>(
                  <div key={a.id}
                    onClick={()=>{const n=a.id===selId?null:a.id;st.current.selId=n;setSelId(n);}}
                    style={{display:"flex",alignItems:"center",gap:7,padding:"7px 12px",
                      borderBottom:i<AGENT_DEFS.length-1?"1px solid #080808":"none",
                      background:selId===a.id?"rgba(255,255,255,0.04)":"transparent",
                      cursor:"pointer",
                      borderLeft:selId===a.id?"2px solid rgba(255,255,255,0.35)":"2px solid transparent"}}>
                    <span style={{width:5,height:5,borderRadius:"50%",flexShrink:0,
                      background:a.status==="running"?"#64f078":a.status==="idle"?"rgba(255,255,255,0.3)":"rgba(255,80,80,0.4)"}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontFamily:"Inter,sans-serif",fontSize:11,color:"rgba(255,255,255,0.7)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</div>
                      <div style={{fontFamily:"Geist Mono,monospace",fontSize:8,color:"rgba(255,255,255,0.2)"}}>{ROOMS.find(r=>r.id===a.roomId)?.name}</div>
                    </div>
                    <span style={{fontFamily:"Geist Mono,monospace",fontSize:8,color:"rgba(255,255,255,0.18)",flexShrink:0}}>{a.model}</span>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{background:"#000",border:"1px solid #1a1a1a",borderRadius:10,padding:"8px 12px"}}>
                {[["#64f078","Executando"],["rgba(200,200,200,0.5)","Ocioso"],["rgba(255,80,80,0.45)","Pausado"]].map(([c,l])=>(
                  <div key={l} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:c,flexShrink:0}}/>
                    <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:"rgba(255,255,255,0.25)"}}>{l}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* When agent selected: compact list below the detail panel */}
          {selDef && (
            <div style={{background:"#000",border:"1px solid #1a1a1a",borderRadius:10,overflow:"hidden",maxHeight:140,overflowY:"auto",flexShrink:0}}>
              {AGENT_DEFS.map((a,i)=>(
                <div key={a.id}
                  onClick={()=>{const n=a.id===selId?null:a.id;st.current.selId=n;setSelId(n);}}
                  style={{display:"flex",alignItems:"center",gap:7,padding:"6px 12px",
                    borderBottom:i<AGENT_DEFS.length-1?"1px solid #080808":"none",
                    background:selId===a.id?"rgba(255,255,255,0.06)":"transparent",
                    cursor:"pointer",
                    borderLeft:selId===a.id?"2px solid rgba(255,255,255,0.4)":"2px solid transparent"}}>
                  <span style={{width:5,height:5,borderRadius:"50%",flexShrink:0,
                    background:a.status==="running"?"#64f078":a.status==="idle"?"rgba(255,255,255,0.3)":"rgba(255,80,80,0.4)"}}/>
                  <span style={{fontFamily:"Inter,sans-serif",fontSize:10,color:selId===a.id?"rgba(255,255,255,0.8)":"rgba(255,255,255,0.4)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{a.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
