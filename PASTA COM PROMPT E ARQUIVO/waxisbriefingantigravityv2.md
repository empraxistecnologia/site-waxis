# 🎬 Briefing + Prompt — Novo Site Waxis · **v2 (com prints reais)**
### Direção: **Scroll Cinematográfico** · Tema claro · Premium

> **⚠️ Esta é a versão 2 — substitui a anterior.** Agora ela é fiel ao produto real da Waxis (baseada nos prints do sistema) e mapeia cada tela dentro do scroll.
>
> **Como usar (Ruan):**
> 1. Cole **todo este documento** no Antigravity como instrução principal.
> 2. Anexe a pasta **`waxis-prints/`** (as telas reais, já com nomes) e a pasta `assets/img/` do zip anterior (logos).
> 3. Cada tela está referenciada pelo nome do arquivo (ex.: `03-brain-inteligencia-comercial.png`) no ponto exato onde deve aparecer.
> 4. Peça pro Antigravity construir seção por seção, revisando junto.

---

## 1. ⚡ PROMPT INICIAL (cole primeiro)

> Você é um designer/engenheiro front-end sênior especializado em sites cinematográficos premium (nível Apple, Stripe, Family.co, Igloo Inc, Linear). Construa o site institucional da **Waxis — Gestão Inteligente de Atendimento**: uma **plataforma completa de atendimento, vendas e inteligência comercial com IA** para WhatsApp, Instagram e Facebook.
>
> Tema **claro** (nunca escuro), identidade **única e sofisticada**, guiado por **animações acionadas pelo scroll** (scroll-telling): seções que se fixam, elementos que se montam conforme a rolagem, parallax, transições fluídas e microinterações. Sensação de produto de tecnologia caro e bem-acabado — o oposto de landing page genérica.
>
> Stack: **HTML + Tailwind + GSAP (ScrollTrigger) + Lenis (smooth scroll)** ou **Next.js + Tailwind + Framer Motion + GSAP**. Use as **capturas reais do sistema** (pasta `waxis-prints/`) como protagonistas — mostre o produto de verdade, com molduras de navegador/dispositivo elegantes, sombras suaves e reveals no scroll.
>
> Leia TODO o briefing antes de começar. Capriche obsessivamente em espaçamento, tipografia e ritmo. **Não** repita o layout clichê "texto-esquerda + mockup-direita"; cada seção tem composição própria. Siga rigorosamente a paleta e a lista "O que EVITAR".

---

## 2. O que a Waxis REALMENTE é (posicionamento)

A Waxis **não é só um CRM de WhatsApp** — é uma **central de operação comercial com IA**. O grande diferencial é a inteligência: a IA não só atende, ela **pontua leads, prevê fechamento, monitora SLA, prospecta clientes novos e dispara campanhas em vários canais**.

**Frase-âncora:** *Atenda, prospecte e venda — com inteligência artificial de verdade.*

**Público:** PMEs, agências, e-commerces, clínicas, concessionárias, imobiliárias e times comerciais que vivem do WhatsApp e querem escalar com organização e dados.

**Diferenciais para destacar no site:**
1. **BrAIn — Inteligência Comercial:** IA que lê as conversas e gera LeadScore, temperatura (quente/morno/frio), nível de risco, SLA, probabilidade de fechamento e detecta sinais/objeções. *(nenhum concorrente comum tem isso)*
2. **Prospecção ativa:** encontra clientes novos via Google Meu Negócio e CNPJ/CNAE e importa pro CRM.
3. **Campanhas em 4 canais:** WhatsApp, SMS, E-mail Marketing e **Voz por IA** (a IA liga e conversa).
4. **Ecossistema completo de Apps:** agenda, cobranças, propostas, documentos com assinatura, formulários, landing pages, NPS e muito mais — sem precisar de 10 ferramentas soltas.
5. **51 integrações** + API oficial da Meta.

---

## 3. Identidade da marca (obrigatório)

| Elemento | Valor |
|---|---|
| Azul-marinho (primária) | `#000068` |
| Roxo (destaque) | `#6800E0` |
| Roxo claro (glow/apoio) | `#8B3DFF` |
| Fundo | `#FFFFFF` + off-whites (`#F7F6FF`, `#FAFAFF`) |
| Texto forte | `#0B0B2B` · corrido | `#4C4C6A` |
| Sucesso | `#12B76A` · Alerta | `#F79009` · Risco | `#F04438` |

- **Tipografia:** títulos em sans geométrica moderna (Plus Jakarta Sans / Sora / Satoshi / General Sans); corpo em Inter.
- **Logos (`assets/img/`):** `logo-waxis.png` (marinho), `logo-waxis-branco.png` (branco p/ fundo escuro), `favicon.png`, `icon-x.png` (símbolo "X"), `og-image.png`.
- **Norte visual = a própria tela de login da Waxis** (`waxis-prints/01-login.png`): repare no acabamento premium, no roxo vibrante, no "X" da marca e na fotografia com brilho roxo. O site deve ter ESSE nível de capricho (mas com fundo predominantemente claro).
- **Tom de voz:** direto, confiante, brasileiro, orientado a resultado.
- **Textos autênticos da marca (pode usar):** *"Gestão Inteligente de Atendimento"*, *"Centralize suas conversas, organize o atendimento e aumente a eficiência da sua equipe."*

---

## 4. 🎥 Direção de design: "Scroll Cinematográfico"

**Princípio:** o site conta uma história conforme rola. Cada seção tem entrada coreografada; a rolagem é o controle remoto do filme.

**Movimento (GSAP ScrollTrigger + Lenis):**
- Smooth scroll global (Lenis, inércia suave).
- Títulos revelados por máscara/clip-path (linha a linha).
- **Pin + scrub** nas seções-chave (o tour do produto).
- Parallax sutil no fundo, brilhos e no "X" da marca.
- Prints entram escalando/rotacionando de leve até assentar (revelação estilo Apple), dentro de molduras de navegador/notebook/celular.
- Contadores e barras animam ao entrar na viewport.
- Indicador de progresso lateral fininho; cursor customizado opcional.
- Respeite `prefers-reduced-motion`.

**Estética (claro premium):** muito respiro, grid com intenção, contraste tipográfico forte, gradiente mesh lavanda/branco suave em movimento lento, brilhos roxos pontuais, sombras suaves coloridas, cantos arredondados generosos, vidro fosco com moderação, **ícones customizados (nunca emoji)**.

**Referências de sensação:** `apple.com` · `stripe.com` · `family.co` · `igloo.inc` · `linear.app` · `arc.net`.
**Referências de copy/mercado:** `ia.zapresponder.com.br` · `respondechat.ai` · `botconversa.com.br` · `conversativa.com.br`.

---

## 5. 🚫 O que EVITAR (pra NÃO ter cara de site genérico/IA)

- ❌ Emoji como ícone → use ícones vetoriais customizados e consistentes.
- ❌ Gradiente roxo em tudo → roxo é destaque pontual; base clara e sóbria.
- ❌ Layout "texto-esquerda + mockup-direita" repetido → varie (full-bleed, horizontal, sobreposto, bento, assimétrico).
- ❌ "Pílulas de eyebrow" coloridas no topo de toda seção → no máximo em uma ou duas.
- ❌ Mockups falsos/desenhados → **use os prints reais** de `waxis-prints/`.
- ❌ Só "fade-in from bottom" → varie: máscara, escala, pin, horizontal, parallax.
- ❌ Cards de 3 colunas idênticos repetidos → quebre o ritmo.
- ✅ Busque: hierarquia clara, respiro, um "momento uau" por seção, detalhes de marca (o "X"), microinterações, consistência absoluta.

---

## 6. 🧭 Estrutura da HOME (seção a seção, com copy + scroll + prints reais)

### 6.1 — Header
Logo `logo-waxis.png`; menu: *Plataforma · Recursos · Prospecção · Planos · Contato*; botões *Entrar* e *Teste grátis*. Fixo, começa translúcido e ganha fundo claro + blur ao rolar. Menu mobile lateral.

### 6.2 — HERO (tela cheia)
- **Título (revelação por máscara):** "Atenda, prospecte e venda com **inteligência artificial** de verdade." (destaque em roxo).
  *Alternativas:* "A plataforma que atende, entende e fecha por você." / "Transforme conversas em vendas com IA que pensa junto."
- **Subtítulo:** "A Waxis centraliza WhatsApp, Instagram e Facebook, pontua cada lead com IA, prospecta clientes novos e dispara campanhas — tudo em um só lugar."
- **CTAs:** *Começar teste grátis* · *Ver a plataforma*.
- **Cinemática:** fundo mesh claro + "X" gigante translúcido em parallax. Ao rolar, o print do **BrAIn** (`waxis-prints/03-brain-inteligencia-comercial.png`) entra escalando dentro de uma moldura de navegador e se fixa (pin curto) — revelação de produto. Selo discreto "API Oficial da Meta".

### 6.3 — Prova social (faixa)
"Empresas de todo o Brasil já vendem mais com a Waxis." + logos de tecnologia/parceiros (Meta, Google, WhatsApp API, OpenAI, ElevenLabs) em marquee suave.

### 6.4 — 🎯 CENTERPIECE: "Do caos à operação inteligente" (pin + scrub)
Seção fixa onde a cena se transforma no scroll:
- Estado 1 — "Hoje: mensagens espalhadas em vários celulares, leads esfriando e nenhuma visão do que vende."
- Estado 2 — "Com a Waxis: tudo centralizado, cada lead pontuado pela IA e cada oportunidade no funil." → revela o print do **Dashboard** (`02-dashboard-inicio.png`).
Este é o principal "momento uau".

### 6.5 — Canais omnichannel (convergência no scroll)
"Todos os seus canais em um só lugar." Ícones de WhatsApp, Instagram, Facebook, SMS, E-mail e Voz entram das bordas e convergem para o "X" da Waxis.

### 6.6 — 🖥️ TOUR DA PLATAFORMA (pin horizontal / scrollytelling) — o coração do site
Seção fixa: o texto à esquerda muda enquanto os **prints reais** passam à direita conforme o scroll. Um módulo por vez:

1. **BrAIn — Inteligência Comercial** ⭐ — "Sua IA não só responde: ela pensa como vendedor. Pontua cada lead (LeadScore), mede temperatura e risco, monitora SLA e prevê a chance de fechamento — e ainda detecta objeções na conversa." → `03-brain-inteligencia-comercial.png`
2. **Funil Kanban comercial** — "Do primeiro contato ao 'fechado': arraste os cards por etapa, veja probabilidade e valor de cada oportunidade e nunca perca um follow-up." → `04-kanban-funil-comercial.png`
3. **Prospecção ativa** — "Não espere o cliente chegar: encontre empresas novas pelo Google Meu Negócio ou por CNPJ/CNAE e importe direto pro CRM." → `07-prospeccao.png`
4. **Campanhas multicanal** — "Alcance sua base por WhatsApp, SMS, E-mail e até por **Voz com IA** — a IA liga, conversa seguindo seu roteiro e encerra sozinha." → `05-campanhas-multicanal.png`
5. **Automações & Workflows** — "Coloque o operacional no piloto automático: chatbot, follow-ups por etapa do Kanban, sequências, aniversários e workflows por evento." → `06-automacoes.png`
6. **Ecossistema de Apps** — "Agenda, cobranças, propostas, documentos com assinatura, formulários, landing pages, NPS e muito mais — sem sair da Waxis." → `08-ecossistema-de-apps.png`

### 6.7 — Números (full-bleed, contadores)
Métricas que animam ao entrar: **500+** empresas · **51** integrações · **4 canais** de campanha · **24/7** de IA. *(valores editáveis)*

### 6.8 — Por que Waxis (bento grid, revelações escalonadas)
Blocos de tamanhos variados: **IA que dá inteligência comercial** (LeadScore, risco, SLA) · **Prospecção ativa inclusa** · **API Oficial da Meta** (sem bloqueio) · **Sua base é sua** (o funcionário sai, o cliente fica) · **100% na nuvem + app** · **Onboarding + suporte humano** · **Sem fidelidade**.

### 6.9 — Antes / Depois (transição no scroll)
**Sem a Waxis** (mensagens perdidas, lead esfria, sem previsão de vendas, prospecção manual) → **Com a Waxis** (tudo centralizado, IA pontua e prevê, prospecção automática, campanhas em 4 canais).

### 6.10 — Integrações + selo Meta
"Conecte a Waxis a tudo que você já usa." Mostrar o print `09-integracoes.png` e destacar: Asaas, Mercado Pago, Stripe, InfinitePay, ElevenLabs, Google, Instagram, Webhooks, API. Card destacado: **Parceira Oficial da Meta**. "51 integrações e crescendo."

### 6.11 — Planos (SEM valores → "Agendar demonstração")
Três planos, botão *Agendar demonstração* / *Falar com a equipe* no lugar do preço:
- **Essencial** — atendimento centralizado, CRM/Kanban, 1 funil, automações básicas, app mobile.
- **Profissional** *(Mais popular)* — BrAIn (IA comercial), campanhas multicanal, prospecção, funis ilimitados, API e integrações.
- **Enterprise** — alto volume, atendentes ilimitados, IA avançada, Voz IA, gerente dedicado, ecossistema completo de apps.
Nota: "Todos incluem teste grátis de 7 dias, sem cartão."

### 6.12 — Depoimentos (placeholders — trocar por reais)
3 cards 5★ (ex.: Loja Bella Moda, AC Veículos, Clínica Vitalitá). **Marcar como exemplos a substituir.**

### 6.13 — FAQ (acordeão limpo)
1. Preciso instalar algo? → Não, 100% nuvem (navegador + app).
2. Vários atendentes no mesmo número? → Sim, com distribuição automática.
3. O que é o BrAIn? → A inteligência comercial da Waxis: pontua leads, mede risco/SLA e prevê fechamento.
4. Como funciona a prospecção? → Busca empresas por Google Meu Negócio ou CNPJ/CNAE e importa pro CRM.
5. Usa a API Oficial da Meta? → Sim, homologada — estabilidade e sem bloqueio.
6. Tem fidelidade? → Não, cancele quando quiser.
7. Como é o teste grátis? → 7 dias, sem cartão, com onboarding.

### 6.14 — CTA final (fechamento cinematográfico)
Bloco grande com gradiente da marca, parallax e o "X" ao fundo: **"Pronto para vender com inteligência?"** + *Começar teste grátis* / *Agendar demonstração*. Microcopy: sem cartão · onboarding incluso · cancele quando quiser.

### 6.15 — Footer
Logo `logo-waxis-branco.png` em fundo marinho escuro; colunas (Plataforma, Recursos, Empresa, Legal), redes sociais, © ano Waxis, selos de parceiro.

---

## 7. Outras páginas

- **Contato (`contato.html`)** — formulário (nome, empresa, e-mail, WhatsApp, assunto, mensagem, consentimento LGPD) que **envia para `empraxisassessoria@gmail.com`** via **EmailJS** (ou Formspree). Botão de WhatsApp. *(A lógica já existe no zip anterior — reaproveite.)*
- **Privacidade** e **Termos** — textos LGPD já prontos no zip; reaproveitar e reestilizar.
- **Blog + Painel administrativo** — **FASE FUTURA**. Só preparar a rota `/blog`; depois plugar Supabase/Firebase (se estático) ou API/CMS (se Next.js).

---

## 8. Requisitos técnicos

- **Responsivo** impecável; no mobile, simplifique os pins pra não travar.
- **Performance:** prints em WebP/AVIF, lazy-load, animações via transform/opacity, sem layout shift.
- **Acessibilidade:** contraste AA, foco visível, `alt` nas imagens, `prefers-reduced-motion`.
- **SEO:** metas por página, Open Graph (`og-image.png`), `robots.txt`, `sitemap.xml`.
- **PWA:** manter `site.webmanifest` + favicons.
- **Formulário:** validação + feedback; enviar para `empraxisassessoria@gmail.com`.

---

## 9. 🖼️ Índice dos prints reais (pasta `waxis-prints/`)

| Arquivo | Tela | Onde usar |
|---|---|---|
| `01-login.png` | Login (premium, referência de acabamento) | Referência de estética / seção "Entrar" |
| `02-dashboard-inicio.png` | Dashboard / relatório do dia | Centerpiece (6.4) |
| `03-brain-inteligencia-comercial.png` | BrAIn — Inteligência Comercial | Hero (6.2) + Tour item 1 |
| `04-kanban-funil-comercial.png` | Funil Kanban comercial | Tour item 2 |
| `05-campanhas-multicanal.png` | Campanhas (WhatsApp/SMS/E-mail/Voz IA) | Tour item 4 |
| `06-automacoes.png` | Automações & Workflows | Tour item 5 |
| `07-prospeccao.png` | Prospecção (Google/CNPJ) | Tour item 3 |
| `08-ecossistema-de-apps.png` | Ecossistema de Apps | Tour item 6 |
| `09-integracoes.png` | Integrações (51) | Seção de integrações (6.10) |

---

## 10. ✅ Checklist de qualidade final

- [ ] Cada seção tem composição própria (não repetiu o clichê texto+mockup).
- [ ] Zero emoji como ícone; ícones customizados consistentes.
- [ ] Lenis + pelo menos 3 momentos de scroll cinematográfico marcantes.
- [ ] Prints reais aplicados com molduras elegantes nos lugares certos.
- [ ] Paleta respeitada (base clara, roxo pontual).
- [ ] BrAIn e Prospecção em destaque (são os diferenciais).
- [ ] Mobile fluido; formulário enviando pro e-mail certo.
- [ ] Passou no teste "isso parece um produto caro e único?" — se não, refine.

---

*v2 preparada com base nos prints reais do sistema. Anexar no Antigravity: pasta `waxis-prints/` + logos de `assets/img/`.*
