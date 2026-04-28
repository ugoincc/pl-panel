# Handoff: PulseLab Admin Panel

## Overview

Painel administrativo da plataforma **PulseLab** para gerenciamento de dispositivos smartwatch conectados, participantes e estudos de pesquisa biométrica. Interface de uso interno exclusivo para pesquisadores e administradores autorizados.

---

## Sobre os Arquivos de Design

Os arquivos neste pacote são **protótipos de referência criados em HTML** — não são código de produção para copiar diretamente. A tarefa é **recriar esses designs no seu projeto React + TypeScript**, usando as bibliotecas e padrões já estabelecidos (Tailwind, lucide-react, etc.). Use o HTML como referência visual e comportamental.

---

## Fidelidade

**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, comportamentos de hover/click e interações estão todos definidos. A implementação deve recriar pixel a pixel usando os padrões existentes do codebase.

---

## Design Tokens

Mesmos tokens da landing page — consolidar em `tailwind.config.ts` ou variáveis globais:

```ts
export const tokens = {
  colors: {
    navy:        '#0A1628',
    navyLight:   '#152238',
    navyMid:     '#1E3048',
    navyHover:   '#1a2d47',
    teal:        '#00BFA5',
    tealDim:     'rgba(0,191,165,0.10)',
    tealGlow:    'rgba(0,191,165,0.30)',
    textPrimary: '#F0F4F8',
    textSec:     '#8A9BB0',
    divider:     '#1E3048',
    red:         '#E05C5C',
    amber:       '#D4A017',
  },
  fonts: {
    display: 'DM Serif Display',  // Google Fonts, pesos 400 e 400 italic
    body:    'Space Grotesk',     // Google Fonts, pesos 300 400 500 600
  },
}
```

---

## Arquitetura de Componentes

Sugestão de organização de arquivos no projeto:

```
src/
  components/
    admin/
      Shell.tsx            # Grid layout: topbar + sidebar + main
      Topbar.tsx
      Sidebar.tsx
      pages/
        DevicesPage.tsx    # Composição: SummaryRow + Toolbar + DevicesTable + DeviceDrawer
        ParticipantsPage.tsx
        StudiesPage.tsx
      shared/
        StatusPill.tsx
        BatteryCell.tsx
        HRVSpark.tsx
        DataTable.tsx      # Tabela genérica com sort e checkbox
        Drawer.tsx         # Drawer lateral genérico
        Sparkline.tsx      # Mini gráfico de linha SVG
        SummaryCard.tsx
```

---

## Layout Shell

**Grid CSS:**
```css
display: grid;
grid-template-columns: 220px 1fr;
grid-template-rows: 48px 1fr;
height: 100vh;
overflow: hidden;
```

- `grid-column: 1 / -1` → Topbar (linha 1, full width)
- `grid-column: 1` → Sidebar (linha 2, esquerda)
- `grid-column: 2` → Main (linha 2, direita)

---

## Componentes

### Topbar (height: 48px)
- Background `#152238`, border-bottom `#1E3048`
- **Esquerda:** logo PulseLab (ponto animado pulse + DM Serif Display 1rem) + separator 1px + breadcrumb (`Admin / {página}`)
- **Direita:** tag "⚠ Acesso restrito" (border, uppercase, 0.65rem) + ícone bell + avatar + username
- Avatar: 24×24, border-radius 50%, border 1px teal, iniciais em teal

### Sidebar (width: 220px)
- Background `#152238`, border-right `#1E3048`
- Grupos com label (0.6rem uppercase, `#8A9BB0`)
- Nav item: `padding: 9px 18px`, `border-left: 2px solid transparent`
- **Estado active:** `color: teal`, `border-left-color: teal`, `background: tealDim`
- Badge numérico: `background: tealDim`, `color: teal`, border-radius 9px, 0.6rem
- Itens: Dispositivos, Participantes, Estudos, Analytics · Configurações, Sair
- Ícones via `lucide-react`: `Watch`, `Users`, `BookOpen`, `BarChart3`, `Settings`, `LogOut`

### Page Header
- Padding `24px 28px 0`, border-bottom `#1E3048`
- Título: DM Serif Display 1.5rem + subtítulo 0.75rem `#8A9BB0`
- **Tabs** abaixo do título:
  - Item: `padding: 10px 20px`, `border-bottom: 2px solid transparent`, 0.78rem
  - Ativo: `color: teal`, `border-bottom-color: teal`, font-weight 500
  - Badge interno: `background: navyMid` (inativo) ou `tealDim + color teal` (ativo)

---

## Página: Dispositivos

### SummaryRow (4 cards, gap: 1px, background: divider como gap)
Cada card: `background: navy`, `padding: 14px 20px`
| Card | Valor | Delta |
|---|---|---|
| Dispositivos online | contagem, cor teal | "↑ de N totais" |
| Offline | contagem, cor red | "Atenção" |
| Bateria média | `N%` | "todos os dispositivos" |
| FC média | `N bpm` | "participantes online" |

### Toolbar
- Search input: `background: navyLight`, border, padding `7px 10px 7px 30px`, ícone Search sobreposto
- Filter select: mesmo estilo do input
- Direita: count label + botão "Exportar" (outline) + botão "Vincular" (teal)

### Tabela de Dispositivos

**Colunas:**
| Col | Conteúdo |
|---|---|
| checkbox | `<input type="checkbox">` 14×14 |
| Dispositivo | Ícone Watch 28×28 (navy-mid bg, border divider, border-radius 6px) + ID (font-weight 500) + modelo (0.68rem, text-sec) |
| Status | `<StatusPill>` |
| Bateria | `<BatteryCell>` |
| HRV | `<HRVSpark>` — 6 barrinhas verticais 3px wide, cor teal, opacity 0.6 |
| Participante | Dot 5px + nome |
| Estudo | texto `text-sec` |
| Último Sync | hora + data em linha separada (0.65rem, opacity 0.6) |
| Ações | 3 icon-buttons: Eye, RefreshCw, Trash2 |

**Comportamento de linha:**
- Hover: `background: navyLight`
- Click: abre Drawer + row recebe `background: tealDim`
- Colunas clicáveis no header ordenam ASC/DESC (indicador ↑↓)

### StatusPill
```tsx
// Variantes: online | offline | syncing | ativo | pausado | concluído
// Estrutura: dot (5px, border-radius 50%) + label uppercase 0.66rem
// online:   background tealDim,  color teal,  dot pisca (animation blink 2s)
// offline:  background red/10%,  color red
// syncing:  background amber/10%, color amber, dot pisca rápido (0.8s)
```

### BatteryCell
```tsx
// Barra 36×9px, border divider, sem border-radius
// Fill: cor depende do nível
//   > 50%: teal
//   > 20%: amber (#D4A017)
//   ≤ 20%: red (#E05C5C)
// Percentual à direita, mesma cor do fill, 0.72rem
```

### HRVSpark
```tsx
// 6 barrinhas, height: 18px container
// Cada barra: width 3px, gap 2px, border-radius 1px
// Altura proporcional ao valor (normalizado ao max)
// Cor teal, opacity 0.6
// Se sem dado: dash "—"
```

### Device Drawer (width: 380px)
Drawer lateral direito, abre ao clicar na linha.

**Overlay:** `background: rgba(10,22,40,0.6)`, `backdrop-filter: blur(2px)`

**Seções:**
1. **Header** — ID + modelo + botão fechar (✕)
2. **Status atual** — StatusPill + BatteryCell lado a lado
3. **Informações** — grid 2 col: Participante, Estudo, Última hora, Data
4. **Métricas ao vivo** — grid 2 col: FC, HRV, SpO₂, Estresse + 2 Sparklines (FC e HRV)
5. **Ações** — 4 botões full-width empilhados:
   - "Forçar sincronização" → primary (teal)
   - "Exportar dados" → secondary (outline)
   - "Editar vínculo" → secondary
   - "Desvincular dispositivo" → danger (border red, color red)

### Sparkline (componente SVG inline)
```tsx
// Props: vals: number[], color: string, height: number
// Normaliza min/max, plota polyline + área com gradiente alpha
// Ponto final destacado (circle r=3)
// Padding interno: 8px
```

---

## Página: Participantes

**Colunas:** checkbox · ID (monospace, teal) · Nome · Idade · Estudo · Dispositivo (chip navyMid) · Ingresso · Status · Ações

---

## Página: Estudos

**Colunas:** ID (monospace, teal) · Título · Investigador · Dispositivos · Participantes · Progresso (barra 4px height) · Status · Ações

**Barra de progresso:** width `100%`, height 4px, background navyMid, fill teal (ou text-sec se 100%)

---

## Interações e Animações

| Elemento | Comportamento |
|---|---|
| Pulse dot (logo) | `scale: 1→1.6, opacity: 1→0.6`, 1.4s ease-in-out infinite |
| Status dot online | `opacity: 1→0.4`, 2s ease infinite |
| Status dot syncing | `opacity: 1→0.4`, 0.8s ease infinite |
| Nav item hover | `background: #1a2d47`, `color: textPrimary`, 0.15s |
| Row hover | `background: navyLight`, 0.12s |
| Row selected | `background: tealDim` |
| Icon button hover | border aparece + navyMid bg |
| Icon button danger hover | border red + color red |
| Drawer | entra da direita, overlay fecha ao clicar fora |
| Battery fill | `transition: width 0.3s` |
| Progress bar estudos | `transition: width 0.5s` |
| Topbar user hover | `background: navyMid` |

---

## Densidade da Tabela

O design suporta dois modos (user preference, salvo em localStorage):

| Modo | Row padding |
|---|---|
| `normal` | `11px 10px` |
| `compact` | `7px 10px` |

**Default salvo:** `compact` (ajustado pelo usuário via Tweaks).

---

## Dados / Tipos TypeScript

```ts
type DeviceStatus = 'online' | 'offline' | 'syncing';
type StudyStatus  = 'ativo' | 'concluído';
type ParticipantStatus = 'ativo' | 'pausado';

interface Device {
  id: string;          // 'GW-0041'
  model: string;
  status: DeviceStatus;
  battery: number;     // 0–100
  participant: string; // 'P-014 · Carla M.'
  study: string;       // 'EST-2024-A'
  lastSync: string;    // 'YYYY-MM-DD HH:mm'
  hr: number | null;
  hrv: number | null;
  spo2: number | null;
  stress: number | null;
}

interface Participant {
  id: string;
  name: string;
  age: number;
  study: string;
  device: string;
  enrolled: string;    // 'YYYY-MM-DD'
  status: ParticipantStatus;
}

interface Study {
  id: string;
  title: string;
  pi: string;
  devices: number;
  participants: number;
  progress: number;    // 0–100
  status: StudyStatus;
}
```

---

## Ícones (lucide-react)

| Elemento | Ícone Lucide |
|---|---|
| Dispositivos (nav) | `Watch` |
| Participantes (nav) | `Users` |
| Estudos (nav) | `BookOpen` |
| Analytics (nav) | `BarChart3` |
| Configurações | `Settings` |
| Sair | `LogOut` |
| Busca | `Search` |
| Filtro | `Filter` |
| Ver detalhes | `Eye` |
| Sincronizar | `RefreshCw` |
| Excluir | `Trash2` |
| Adicionar | `Plus` |
| Exportar | `Download` |
| Notificações | `Bell` |
| Editar | `Edit` |

---

## Arquivos neste Pacote

| Arquivo | Descrição |
|---|---|
| `Admin Panel.html` | Protótipo completo e interativo |
| `README.md` | Este documento |

---

## Notas para o Desenvolvedor

1. **Density preference** → salvar em `localStorage` com chave `pulselab_density`. Default: `compact`.
2. **Drawer** → pode usar `Sheet` do shadcn/ui ou implementar do zero com `position: fixed` como no protótipo.
3. **Tabela** → implementar sort client-side para dados estáticos; para dados reais, usar sort server-side via query params.
4. **Sparkline** → pode usar `recharts` (já disponível conforme brief) com `<AreaChart>` ou `<LineChart>` minimizado. O protótipo usa SVG inline para zero-dependency.
5. **Dados** → conectar aos endpoints reais da API PulseLab. Os dados no protótipo são mock para visualização.
6. **Autenticação** → a rota `/admin` deve exigir role `researcher` ou `admin`. Redirecionar para login se não autenticado.
