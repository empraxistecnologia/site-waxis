# Waxis Design System

## Direction

Uma central de comando comercial clara e precisa. O site começa com conversas dispersas e usa o movimento para revelar contexto, responsáveis, prioridades e próximos passos. A referência de ritmo é a Zig; a identidade visual nasce do “X” da Waxis, das telas reais do sistema e do contraste entre azul profundo, branco e roxo elétrico.

## Scene

Um dono de empresa acompanha a operação durante um dia de alto volume. A interface deve parecer nítida sob a luz de um escritório, transmitir domínio imediato e revelar profundidade conforme a rolagem avança.

## Color

| Token | Hex | Role |
|---|---:|---|
| Navy Core | `#000068` | Marca, títulos, superfícies de alta autoridade |
| Electric Violet | `#6800E0` | Ação principal e estados decisivos |
| Signal Violet | `#8B3DFF` | Luz, movimento e detalhes do “X” |
| Ink | `#0B0B2B` | Texto principal |
| Operational Gray | `#4C4C6A` | Texto secundário |
| Cloud | `#F7F6FF` | Seções claras de apoio |
| White | `#FFFFFF` | Superfície dominante |
| Success | `#12B76A` | SLA cumprido, lead saudável, conclusão |
| Warning | `#F79009` | Atenção e oportunidade esfriando |
| Risk | `#F04438` | Atraso, perda e risco comercial |

Na implementação nova, converter os tokens para OKLCH preservando a aparência e verificando contraste. Roxo é sinal, não papel de parede. Estados verde, âmbar e vermelho devem comunicar situação operacional, não decorar.

## Typography

- Display: buscar uma sans contemporânea de personalidade técnica e humana, evitando as escolhas genéricas já usadas nas versões anteriores. A seleção final deve ser validada em um catálogo real antes da implementação.
- Body: sans altamente legível para português, com boa diferenciação de caracteres e altura-x generosa.
- Utility: a própria família de corpo em peso médio para dados e legendas; não usar monospace como fantasia tecnológica.
- Títulos com `text-wrap: balance`, tracking nunca menor que `-0.04em` e máximo de `6rem`.
- Corpo limitado a aproximadamente 70 caracteres por linha.

## Layout

- Hero de tela cheia com tese à esquerda e uma cena operacional viva ocupando o restante da composição.
- Uma narrativa vertical principal, com poucas seções fixadas e estados claramente diferentes.
- Telas reais entram em escala generosa, sem molduras exageradas ou mockups falsos.
- Alternar momentos claros de explicação com superfícies azul-marinho de síntese e decisão.
- Evitar grids repetitivos de três cards. Recursos secundários podem usar listas editoriais, trilhos horizontais ou agrupamentos por trabalho realizado.

## Signature

O “Pulso da Operação”: conversas entram descentralizadas, perdem contexto e acumulam atraso; o “X” da Waxis as conecta a históricos, responsáveis e prioridades. O gesto culmina na tela real da BrAIn ou do dashboard. O ponteiro altera profundidade e tensão no hero; o scroll controla a transformação.

## Motion

- Entrada do hero coreografada em uma única sequência.
- Smooth scroll com inércia moderada e sem interferir na navegação nativa.
- Pin + scrub em no máximo três momentos centrais: caos para controle, tour da inteligência e oferta de implantação.
- Transições baseadas em máscara, escala, profundidade e continuidade espacial; evitar aplicar o mesmo fade vertical em todas as seções.
- Usar `transform`, `opacity`, `clip-path` e máscaras com parcimônia.
- Easing exponencial de saída, sem bounce ou elastic.
- `prefers-reduced-motion` mostra todo o conteúdo em estados estáticos claros.
- No mobile, substituir pins longos por etapas verticais e desativar paralaxe de ponteiro.

## Imagery

- Usar os prints reais existentes em `assets/img/prints/` como principal prova visual.
- A tela de login orienta o contraste e a energia da marca, mas não deve ditar toda a home.
- BrAIn, dashboard, Kanban e prospecção são protagonistas; integrações e ecossistema entram como amplitude.
- Não fabricar telas, métricas, clientes ou estados do produto.

## Components

### Navigation

Fixa e discreta, com logo escura em superfícies claras. “Agendar demonstração” recebe o peso principal; “Teste grátis” permanece visível sem competir.

### Calls to action

Botões com raio controlado, estados de foco evidentes e verbos consistentes. Primário em roxo sólido; secundário estrutural, não um clone menos saturado.

### Product frames

Moldura mínima, preservando a proporção das capturas. Sombras devem sugerir profundidade real e nunca esconder detalhes da interface.

### Proof

Até haver volume, usar produto demonstrável, recursos verificáveis e relatos autorizados dos dois clientes. Não exibir contadores vazios, números de mercado como se fossem próprios ou marcas de parceiros sem autorização.

### Offer

Apresentar dois caminhos dentro da mesma plataforma:

1. “Sua equipe configura” — acesso, documentação e suporte.
2. “A Waxis implanta” — diagnóstico, configuração, automações, treinamento e acompanhamento.

## Content hierarchy

1. Dor reconhecível.
2. Promessa de controle.
3. Transformação visual do caos.
4. Produto real e BrAIn.
5. Continuidade, histórico, SLA e follow-up.
6. Amplitude do ecossistema.
7. Plataforma autônoma ou implantação assistida.
8. Demonstração e teste grátis.

## Quality constraints

- Responsivo, acessível e funcional sem animação.
- Sem gradient text.
- Sem cards com raios acima de 16px.
- Sem texto de prova não validado.
- Sem dependência de hover para compreender ou operar.
- Nenhum efeito pode atrasar a leitura do hero ou a ação principal.
