# Handoff: PulseLab Landing Page

## Overview

Landing page institucional da plataforma **PulseLab** — sistema acadêmico de coleta e análise de dados biométricos via smartwatch (Galaxy Watch / Wear OS). A página é a porta de entrada exclusiva para pesquisadores e administradores autorizados, com foco em credibilidade científica e acesso via login.

---

## Sobre os Arquivos de Design

Os arquivos neste pacote são **protótipos de referência criados em HTML** — não são código de produção para copiar diretamente. A tarefa é **recriar esses designs no ambiente do seu repositório** (React + TypeScript, com as bibliotecas e padrões já estabelecidos no projeto). Use os arquivos HTML como referência visual e comportamental.

O arquivo `index.html` é o protótipo principal. O `index-print.html` é uma variante com estilos de impressão para exportação em PDF (pode ser ignorado na implementação).

---

## Fidelidade

**Alta fidelidade (hifi).** O protótipo tem cores finais, tipografia, espaçamentos e interações definidas. A implementação deve recriar o visual pixel a pixel usando as bibliotecas existentes no codebase.

---

## Design Tokens

### Cores
```ts
const colors = {
  navy:         '#0A1628',  // fundo principal
  navyLight:    '#152238',  // fundo alternativo (seção sensores)
  navyMid:      '#1E3048',  // dividers, bordas
  teal:         '#00BFA5',  // acento principal
  tealDim:      'rgba(0,191,165,0.12)',
  tealGlow:     'rgba(0,191,165,0.35)',
  textPrimary:  '#F0F4F8',
  textSec:      '#8A9BB0',
};
```

### Tipografia
```ts
// Títulos / display
fontDisplay: 'DM Serif Display'  // pesos: 400 (regular), 400 italic

// Corpo / UI
fontBody: 'Space Grotesk'  // pesos: 300, 400, 500, 600
```
Importar via Google Fonts:
```
https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@300;400;500;600
```

### Espaçamento
- Padding de seção: `96px` vertical, `48px` horizontal (mobile: `72px` / `24px`)
- Gap entre cards: `2px` (sensor grid)
- Max-width do conteúdo: `1200px`

### Bordas e Sombras
- Sem border-radius — design angular/clínico
- Borda padrão: `1px solid #1E3048`
- Glow do teal: `box-shadow: 0 0 28px rgba(0,191,165,0.35)`

---

## Seções / Componentes

### 1. Nav (fixo, sticky)
- Logo à esquerda: ponto animado (pulse) + "PulseLab" em DM Serif Display 1.35rem
- Botão à direita: "Acessar Plataforma" — outline teal, fill no hover
- Ao scrollar >40px: `background: rgba(10,22,40,0.88)` + `backdrop-filter: blur(12px)` + borda inferior

### 2. Hero
**Layout:** full-viewport height, conteúdo alinhado à esquerda, max-width 800px, padding-top 100px.

**Elementos:**
- Eyebrow label: `0.72rem`, `letter-spacing: 0.16em`, uppercase, teal, com linha de 28px antes
- H1: DM Serif Display, `clamp(3rem, 6vw, 5.2rem)`, line-height 1.08. Palavra em itálico teal: "corpo"
- Subtítulo: `1.05rem`, `#8A9BB0`, font-weight 300, max-width 480px
- CTA primário: background teal, cor navy, uppercase, font-weight 600, `14px 36px`. Hover: opacity 0.9 + glow + translateY(-1px)
- CTA secundário: ghost, com seta SVG que desloca 3px no hover
- Background: grid de linhas `64px × 64px` em `#1E3048`, opacity 30% + vignette radial da direita

**ECG animado (elemento principal do hero):**
- SVG posicionado absolutamente no bottom do hero, `height: 160px`, `opacity: 0.55`
- Path SVG com `pathLength="1"`, `stroke-dasharray: 1`, animação CSS `ecg-draw` 4s infinite:
  - 0%: `stroke-dashoffset: 1`, opacity 0
  - 5%: opacity 1
  - 80%: opacity 1
  - 100%: `stroke-dashoffset: 0`, opacity 0
- Stroke: gradiente horizontal teal (fade nas bordas), `strokeWidth: 1.5`, filtro glow (feGaussianBlur 2.5)
- Path representa um traçado de ECG realista: linhas planas com 3 grupos de pico QRS ao longo de 1200px

**Métricas flutuantes (desktop only, ocultar em mobile):**
- 3 cards à direita, posição absoluta, `top: 50%` `right: 48px`
- Cada card: fundo `rgba(21,34,56,0.7)`, borda `#1E3048`, backdrop-blur 8px, padding `16px 20px`
- Campos: label (0.65rem uppercase), valor numérico (DM Serif 1.9rem), unidade (teal 0.7rem), barra de progresso 2px
- Valores variam levemente a cada ~2.2s (±2 bpm simulado)

### 3. Seção "O que é"
- Grid 2 colunas (1fr 1fr), gap 80px, alinhado ao topo
- Coluna esquerda: 3 parágrafos, `0.97rem`, `#8A9BB0`, font-weight 300, line-height 1.8
- Coluna direita: 3 stats com borda esquerda teal 2px, padding-left 20px
  - Números: DM Serif 2.2rem; Descrição: 0.8rem `#8A9BB0`

### 4. Seção "Dados Coletados"
- Background `#152238`, borda top/bottom `#1E3048`
- Grid de 4 cards (1fr × 4), gap 2px
- **Todos os cards têm a mesma altura** — usar `align-items: stretch` no grid, `height: 100%` + `display: flex; flex-direction: column` nos cards
- Cada card: padding `36px 28px`, ícone circular teal (44×44, borda 1px teal), nome do sensor (uppercase teal 0.68rem), título (DM Serif 1.25rem), descrição (0.82rem), amostra de dado em monospace verde-teal
- Hover: linha teal 2px desliza da esquerda no topo do card (`scaleX 0→1`)
- Sensores: **HR** (Frequência Cardíaca), **HRV** (Variabilidade Cardíaca), **SpO₂** (Saturação de Oxigênio), **EDA/Estresse** (Nível de Estresse)

### 5. Seção "Como Funciona"
- Grid 3 colunas, com linha horizontal conectando os números (pseudo-element, opacity 40%)
- Cada step: número em círculo (56×56, borda teal), título DM Serif 1.3rem, descrição 0.88rem, tag pill teal (background `rgba(0,191,165,0.12)`)
- Steps: **01** Participante autoriza → **02** Relógio coleta → **03** Pesquisador analisa

### 6. Modal de Login
- Overlay: `rgba(10,22,40,0.88)` + `backdrop-filter: blur(6px)`
- Card: `#152238`, borda `#1E3048`, padding `44px 40px`, sem border-radius
- Campos: e-mail institucional + senha, inputs no estilo da paleta
- Botão submit: btn-primary full-width
- Validação simulada: após 1.6s retorna "Credenciais inválidas"

### 7. Rodapé
- Flex row, 3 itens: logo, aviso de acesso restrito (uppercase, com ⚠), copyright
- Borda superior `#1E3048`, padding `40px 48px`

---

## Interações e Animações

| Elemento | Comportamento |
|---|---|
| Nav | Transparente → glassmorphism ao scroll >40px |
| Logo dot | Pulse: scale 1→1.5, opacity 1→0.7, 1.4s infinite |
| Hero h1 | fade-up 0.7s ao carregar |
| ECG SVG | draw-on: stroke-dashoffset 1→0, 4s cubic-bezier(0.4,0,0.2,1) infinite |
| Métricas | Valor ±2 aleatório a cada 2.2s, barra de progresso anima 1s ease |
| Sensor card hover | Linha teal desliza no topo (scaleX 0→1, 0.35s) + bg ligeiramente mais claro |
| Btn primary hover | opacity 0.9 + glow box-shadow + translateY(-1px) |
| Btn secondary hover | seta desloca translateX(3px) |
| Modal | Abre/fecha com estado React, overlay escurece com backdrop-filter |
| Seções | .reveal: fade-up 0.7s, delays escalonados 0.1s por elemento |

---

## Responsividade

| Breakpoint | Mudanças |
|---|---|
| ≤900px | Padding reduzido (24px horizontal); métricas hero ocultas; about-grid 1 coluna; sensor-grid 2 colunas; steps 1 coluna |
| ≤600px | sensor-grid 1 coluna |

---

## Assets / Ícones

Todos os ícones são SVGs inline (stroke, sem fill), estilo line-art 1.5px. Não há imagens externas. Ícones usados:
- **HR**: heart (SVG path de coração)
- **HRV**: polyline de onda
- **SpO₂**: círculo com face (placeholder)
- **Estresse**: círculo com ponteiro de relógio

Substituir pelos equivalentes do `lucide-react` no codebase (já disponível conforme brief):
- `Heart`, `Activity`, `Smile`, `Clock`

---

## Arquivos neste Pacote

| Arquivo | Descrição |
|---|---|
| `index.html` | Protótipo principal completo (React + Babel inline) |
| `index-print.html` | Variante com estilos de impressão A4 landscape |
| `README.md` | Este documento |

---

## Notas para o Desenvolvedor

1. O protótipo usa React + Babel inline para facilitar a visualização — no codebase, dividir em componentes separados: `<Nav>`, `<Hero>`, `<ECGLine>`, `<MetricCard>`, `<SensorCard>`, `<HowItWorks>`, `<LoginModal>`.
2. O brief menciona Tailwind utilitário — os tokens de cor acima podem virar variáveis no `tailwind.config.ts`.
3. A animação do ECG usa `pathLength="1"` para normalizar o comprimento do path — manter este atributo no SVG de produção.
4. O modal de login é simulado — conectar ao endpoint de autenticação real do backend.
5. As métricas flutuantes no hero são decorativas (dados aleatórios) — em produção, podem exibir dados reais da sessão mais recente ou ser mantidas como decoração estática.
