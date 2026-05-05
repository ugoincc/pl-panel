import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Watch, Users, BookOpen, BarChart3, Settings, LogOut,
  Search, Download, Plus, Eye, RefreshCw, Trash2, Bell, Pencil,
} from 'lucide-react'
import { UserButton } from '@clerk/react'

export const Route = createFileRoute('/_authenticated/panel/')({ component: PanelPage })

// ── Design tokens ──────────────────────────────────────────────────────────────
const C = {
  navy: '#0A1628',
  navyLight: '#152238',
  navyMid: '#1E3048',
  navyHover: '#1a2d47',
  teal: '#00BFA5',
  tealDim: 'rgba(0,191,165,0.10)',
  tealGlow: 'rgba(0,191,165,0.30)',
  text: '#F0F4F8',
  textSec: '#8A9BB0',
  divider: '#1E3048',
  red: '#E05C5C',
  amber: '#D4A017',
} as const

// ── Types ──────────────────────────────────────────────────────────────────────
type DeviceStatus = 'online' | 'offline' | 'syncing'
type StudyStatus = 'ativo' | 'concluído'
type ParticipantStatus = 'ativo' | 'pausado'

interface Device {
  id: string; model: string; status: DeviceStatus
  battery: number; participant: string; study: string
  lastSync: string; hr: number | null; hrv: number | null
  spo2: number | null; stress: number | null
}
interface Participant {
  id: string; name: string; age: number; study: string
  device: string; enrolled: string; status: ParticipantStatus
}
interface Study {
  id: string; title: string; pi: string
  devices: number; participants: number
  progress: number; status: StudyStatus
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const DEVICES: Device[] = [
  { id: 'GW-0041', model: 'Galaxy Watch 6 (44mm)', status: 'online', battery: 87, participant: 'P-014 · Carla M.', study: 'EST-2024-A', lastSync: '2026-04-23 08:42', hr: 68, hrv: 41, spo2: 98, stress: 28 },
  { id: 'GW-0038', model: 'Galaxy Watch 5 Pro', status: 'online', battery: 61, participant: 'P-009 · Rafael S.', study: 'EST-2024-A', lastSync: '2026-04-23 08:39', hr: 74, hrv: 36, spo2: 97, stress: 44 },
  { id: 'GW-0052', model: 'Galaxy Watch 6 (40mm)', status: 'syncing', battery: 45, participant: 'P-021 · Ines P.', study: 'EST-2024-B', lastSync: '2026-04-23 08:44', hr: 81, hrv: 29, spo2: 96, stress: 62 },
  { id: 'GW-0017', model: 'Galaxy Watch 4', status: 'offline', battery: 12, participant: 'P-003 · Bruno K.', study: 'EST-2024-A', lastSync: '2026-04-22 23:11', hr: null, hrv: null, spo2: null, stress: null },
  { id: 'GW-0063', model: 'Galaxy Watch 6 (44mm)', status: 'online', battery: 93, participant: 'P-028 · Ana L.', study: 'EST-2024-C', lastSync: '2026-04-23 08:41', hr: 65, hrv: 52, spo2: 99, stress: 18 },
  { id: 'GW-0029', model: 'Galaxy Watch 5', status: 'online', battery: 78, participant: 'P-011 · Diego V.', study: 'EST-2024-B', lastSync: '2026-04-23 08:38', hr: 72, hrv: 45, spo2: 98, stress: 33 },
  { id: 'GW-0044', model: 'Galaxy Watch 6 (40mm)', status: 'offline', battery: 0, participant: 'P-019 · Sofia R.', study: 'EST-2024-C', lastSync: '2026-04-21 14:55', hr: null, hrv: null, spo2: null, stress: null },
  { id: 'GW-0071', model: 'Galaxy Watch 6 (44mm)', status: 'syncing', battery: 55, participant: 'P-033 · Marco F.', study: 'EST-2024-A', lastSync: '2026-04-23 08:44', hr: 77, hrv: 38, spo2: 97, stress: 51 },
  { id: 'GW-0012', model: 'Galaxy Watch 4', status: 'online', battery: 66, participant: 'P-006 · Julia H.', study: 'EST-2024-B', lastSync: '2026-04-23 08:40', hr: 70, hrv: 43, spo2: 98, stress: 26 },
  { id: 'GW-0058', model: 'Galaxy Watch 5 Pro', status: 'online', battery: 82, participant: 'P-025 · Pedro N.', study: 'EST-2024-C', lastSync: '2026-04-23 08:37', hr: 63, hrv: 58, spo2: 99, stress: 15 },
]

const PARTICIPANTS: Participant[] = [
  { id: 'P-003', name: 'Bruno K.', age: 34, study: 'EST-2024-A', device: 'GW-0017', enrolled: '2026-01-10', status: 'ativo' },
  { id: 'P-006', name: 'Julia H.', age: 28, study: 'EST-2024-B', device: 'GW-0012', enrolled: '2026-01-15', status: 'ativo' },
  { id: 'P-009', name: 'Rafael S.', age: 41, study: 'EST-2024-A', device: 'GW-0038', enrolled: '2025-12-05', status: 'ativo' },
  { id: 'P-011', name: 'Diego V.', age: 29, study: 'EST-2024-B', device: 'GW-0029', enrolled: '2026-02-01', status: 'ativo' },
  { id: 'P-014', name: 'Carla M.', age: 36, study: 'EST-2024-A', device: 'GW-0041', enrolled: '2025-11-20', status: 'ativo' },
  { id: 'P-019', name: 'Sofia R.', age: 31, study: 'EST-2024-C', device: 'GW-0044', enrolled: '2026-03-08', status: 'pausado' },
  { id: 'P-021', name: 'Ines P.', age: 45, study: 'EST-2024-B', device: 'GW-0052', enrolled: '2026-01-22', status: 'ativo' },
  { id: 'P-025', name: 'Pedro N.', age: 38, study: 'EST-2024-C', device: 'GW-0058', enrolled: '2026-03-01', status: 'ativo' },
  { id: 'P-028', name: 'Ana L.', age: 26, study: 'EST-2024-C', device: 'GW-0063', enrolled: '2026-02-18', status: 'ativo' },
  { id: 'P-033', name: 'Marco F.', age: 52, study: 'EST-2024-A', device: 'GW-0071', enrolled: '2025-10-30', status: 'ativo' },
]

const STUDIES: Study[] = [
  { id: 'EST-2024-A', title: 'Estresse Crônico & HRV Longitudinal', pi: 'Dr. Martins', devices: 4, participants: 4, progress: 68, status: 'ativo' },
  { id: 'EST-2024-B', title: 'SpO₂ e Atividade Física Moderada', pi: 'Dr. Almeida', devices: 3, participants: 3, progress: 41, status: 'ativo' },
  { id: 'EST-2024-C', title: 'Biomarcadores & Ciclo Circadiano', pi: 'Dra. Ferreira', devices: 3, participants: 3, progress: 22, status: 'ativo' },
  { id: 'EST-2023-Z', title: 'HRV em Ambientes de Alta Demanda', pi: 'Dr. Costa', devices: 0, participants: 8, progress: 100, status: 'concluído' },
]

// ── Nav config ─────────────────────────────────────────────────────────────────
type NavId = 'devices' | 'participants' | 'studies' | 'analytics' | 'settings'

const NAV = [
  { id: 'devices' as NavId, label: 'Dispositivos', Icon: Watch, badge: '10' },
  { id: 'participants' as NavId, label: 'Participantes', Icon: Users, badge: '10' },
  { id: 'studies' as NavId, label: 'Estudos', Icon: BookOpen, badge: '4' },
  { id: 'analytics' as NavId, label: 'Analytics', Icon: BarChart3, badge: null },
]

const PAGE_META: Record<NavId, { title: string; sub: string; tabs: { id: string; label: string }[] }> = {
  devices: { title: 'Dispositivos', sub: 'Gerenciar smartwatches conectados e monitorar métricas ao vivo', tabs: [{ id: 'all', label: 'Dispositivos' }, { id: 'alerts', label: 'Alertas' }, { id: 'log', label: 'Log de eventos' }] },
  participants: { title: 'Participantes', sub: 'Cadastro e gerenciamento de participantes dos estudos', tabs: [{ id: 'all', label: 'Participantes' }, { id: 'consent', label: 'TCLEs' }] },
  studies: { title: 'Estudos', sub: 'Protocolos de pesquisa ativos e histórico', tabs: [{ id: 'all', label: 'Estudos' }, { id: 'protocols', label: 'Protocolos' }] },
  analytics: { title: 'Analytics', sub: 'Visualizações e relatórios consolidados', tabs: [{ id: 'all', label: 'Visão geral' }] },
  settings: { title: 'Configurações', sub: 'Configurações do sistema', tabs: [{ id: 'all', label: 'Geral' }] },
}

const TAB_COUNTS: Record<string, string> = { devices: '10', participants: '10', studies: '4' }

// ── Shared primitives ──────────────────────────────────────────────────────────

function Btn({
  variant, icon, children, onClick,
}: {
  variant: 'teal' | 'outline' | 'ghost'
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  const base: React.CSSProperties = {
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.06em',
    padding: '7px 16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6, border: 'none',
    transition: 'opacity 0.15s, background 0.15s, border-color 0.15s, color 0.15s',
  }
  let extra: React.CSSProperties
  if (variant === 'teal') extra = { background: C.teal, color: C.navy, opacity: hov ? 0.88 : 1 }
  else if (variant === 'outline') extra = { background: 'transparent', border: `1px solid ${hov ? C.textSec : C.divider}`, color: hov ? C.text : C.textSec }
  else extra = { background: hov ? C.navyMid : 'transparent', color: hov ? C.text : C.textSec, padding: '7px 10px' }
  return (
    <button style={{ ...base, ...extra }} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {icon}{children}
    </button>
  )
}

function IconBtn({ children, danger, title, onClick }: { children: React.ReactNode; danger?: boolean; title?: string; onClick?: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button title={title} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '4px 6px', cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hov ? C.navyMid : 'transparent',
        border: `1px solid ${hov ? (danger ? C.red : C.divider) : 'transparent'}`,
        color: hov ? (danger ? C.red : C.text) : C.textSec,
      }}>
      {children}
    </button>
  )
}

// ── Cell components ────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; color: string; label: string; dotClass?: string }> = {
    online: { bg: 'rgba(0,191,165,0.10)', color: C.teal, label: 'Online', dotClass: 'admin-dot-online' },
    offline: { bg: 'rgba(224,92,92,0.10)', color: C.red, label: 'Offline' },
    syncing: { bg: 'rgba(212,160,23,0.10)', color: C.amber, label: 'Sincronizando', dotClass: 'admin-dot-syncing' },
    ativo: { bg: 'rgba(0,191,165,0.10)', color: C.teal, label: 'Ativo', dotClass: 'admin-dot-online' },
    pausado: { bg: 'rgba(212,160,23,0.10)', color: C.amber, label: 'Pausado' },
    concluído: { bg: 'rgba(224,92,92,0.10)', color: C.red, label: 'Concluído' },
  }
  const c = cfg[status] ?? { bg: C.navyMid, color: C.textSec, label: status }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 8px', fontSize: '0.66rem', fontWeight: 500,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      background: c.bg, color: c.color,
    }}>
      <span className={c.dotClass} style={{
        width: 5, height: 5, borderRadius: '50%', background: c.color, flexShrink: 0,
        boxShadow: c.dotClass ? `0 0 4px ${c.color}` : 'none',
      }} />
      {c.label}
    </span>
  )
}

function BatteryCell({ pct }: { pct: number }) {
  const col = pct > 50 ? C.teal : pct > 20 ? C.amber : C.red
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ width: 36, height: 9, border: `1px solid ${C.divider}`, borderRadius: 2, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: col, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: '0.72rem', color: col }}>{pct}%</span>
    </div>
  )
}

function HRVSpark({ vals }: { vals: number[] | null }) {
  if (!vals) return <span style={{ color: C.textSec, fontSize: '0.7rem' }}>—</span>
  const max = Math.max(...vals)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 18 }}>
      {vals.map((v, i) => (
        <div key={i} style={{ width: 3, height: Math.round((v / max) * 18), background: C.teal, borderRadius: 1, opacity: 0.6 }} />
      ))}
    </div>
  )
}

function Sparkline({ vals, color = C.teal, h = 48 }: { vals: number[]; color?: string; h?: number }) {
  const max = Math.max(...vals), min = Math.min(...vals), range = max - min || 1
  const W = 330, pad = 8
  const pts = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (W - pad * 2)
    const y = h - pad - ((v - min) / range) * (h - pad * 2)
    return [x, y] as [number, number]
  })
  const polyPts = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `M ${pad} ${h} ${pts.map(([x, y]) => `L ${x} ${y}`).join(' ')} L ${W - pad} ${h} Z`
  const gradId = `sg${color.replace(/[^a-z0-9]/gi, '')}`
  const [lx, ly] = pts[pts.length - 1]
  return (
    <svg viewBox={`0 0 ${W} ${h}`} style={{ width: '100%', height: h }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <polyline points={polyPts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="3" fill={color} />
    </svg>
  )
}

// ── Device Drawer ──────────────────────────────────────────────────────────────

function DeviceDrawer({ device, onClose }: { device: Device | null; onClose: () => void }) {
  if (!device) return null
  const hrSpark = device.hr ? [device.hr - 8, device.hr - 4, device.hr + 2, device.hr - 1, device.hr + 5, device.hr, device.hr - 2] : null
  const hrvSpark = device.hrv ? [device.hrv - 12, device.hrv - 5, device.hrv + 3, device.hrv - 2, device.hrv + 7, device.hrv, device.hrv - 4] : null

  const sec: React.CSSProperties = { padding: '16px 24px', borderBottom: `1px solid ${C.divider}` }
  const secLabel: React.CSSProperties = {
    fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
    color: C.textSec, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
  }

  const drawerBtns = [
    { label: 'Forçar sincronização', v: 'primary' },
    { label: 'Exportar dados', v: 'secondary' },
    { label: 'Editar vínculo', v: 'secondary' },
    { label: 'Desvincular dispositivo', v: 'danger' },
  ] as const

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(2px)', zIndex: 200 }} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 380,
        background: C.navyLight, borderLeft: `1px solid ${C.divider}`,
        zIndex: 201, overflowY: 'auto', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${C.divider}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.1rem', color: C.text }}>{device.id}</div>
            <div style={{ fontSize: '0.72rem', color: C.textSec, marginTop: 3 }}>{device.model}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.textSec, cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: 2 }}>✕</button>
        </div>

        <div style={sec}>
          <div style={secLabel}>Status atual</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <StatusPill status={device.status} />
            <BatteryCell pct={device.battery} />
          </div>
        </div>

        <div style={sec}>
          <div style={secLabel}>Informações</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['Participante', device.participant],
              ['Estudo', device.study],
              ['Último sync', device.lastSync?.split(' ')[1] ?? '—'],
              ['Data', device.lastSync?.split(' ')[0] ?? '—'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: '0.65rem', color: C.textSec, letterSpacing: '0.06em' }}>{label}</span>
                <span style={{ fontSize: '0.82rem', color: C.text, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={sec}>
          <div style={secLabel}>Métricas ao vivo</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[
              { label: 'FC', val: device.hr ? `${device.hr} bpm` : '—', color: device.hr ? C.teal : C.text },
              { label: 'HRV (RMSSD)', val: device.hrv ? `${device.hrv} ms` : '—', color: C.text },
              { label: 'SpO₂', val: device.spo2 ? `${device.spo2}%` : '—', color: C.text },
              { label: 'Estresse', val: device.stress != null ? `${device.stress}/100` : '—', color: C.text },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: '0.65rem', color: C.textSec }}>{label}</span>
                <span style={{ fontSize: '0.82rem', color, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
          {hrSpark && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: '0.65rem', color: C.textSec, marginBottom: 8 }}>FC — últimas 7 leituras</div>
              <Sparkline vals={hrSpark} color={C.teal} />
            </div>
          )}
          {hrvSpark && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: '0.65rem', color: C.textSec, marginBottom: 8 }}>HRV — últimas 7 leituras</div>
              <Sparkline vals={hrvSpark} color="#7B8FD4" />
            </div>
          )}
        </div>

        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {drawerBtns.map(({ label, v }) => {
            const s: React.CSSProperties =
              v === 'primary' ? { background: C.teal, color: C.navy, border: 'none' }
                : v === 'danger' ? { background: 'transparent', border: `1px solid rgba(224,92,92,0.3)`, color: C.red }
                  : { background: 'transparent', border: `1px solid ${C.divider}`, color: C.textSec }
            return (
              <button key={label} style={{
                width: '100%', padding: '9px', textAlign: 'center', cursor: 'pointer',
                fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem',
                fontWeight: 500, letterSpacing: '0.06em', transition: 'all 0.15s',
                ...s,
              }}>{label}</button>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ── Devices tab ────────────────────────────────────────────────────────────────

function DevicesTab({ density }: { density: 'normal' | 'compact' }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setFilter] = useState('todos')
  const [sortCol, setSortCol] = useState<keyof Device>('id')
  const [sortAsc, setSortAsc] = useState(true)
  const [selected, setSelected] = useState<Device | null>(null)

  const rp = density === 'compact' ? '7px 10px' : '11px 10px'

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    let d = DEVICES.filter(r =>
      (statusFilter === 'todos' || r.status === statusFilter) &&
      (r.id.toLowerCase().includes(q) || r.participant.toLowerCase().includes(q) || r.study.toLowerCase().includes(q))
    )
    d.sort((a, b) => {
      const va = String(a[sortCol] ?? ''), vb = String(b[sortCol] ?? '')
      return sortAsc ? va.localeCompare(vb, undefined, { numeric: true }) : vb.localeCompare(va, undefined, { numeric: true })
    })
    return d
  }, [query, statusFilter, sortCol, sortAsc])

  function toggleSort(col: keyof Device) {
    if (sortCol === col) setSortAsc(v => !v)
    else { setSortCol(col); setSortAsc(true) }
  }

  const thBase: React.CSSProperties = {
    textAlign: 'left', padding: '0 10px 10px', fontSize: '0.63rem',
    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: C.textSec, borderBottom: `1px solid ${C.divider}`,
    whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none',
  }

  const onlineDevices = DEVICES.filter(d => d.status === 'online')
  const avgBattery = Math.round(DEVICES.reduce((s, d) => s + d.battery, 0) / DEVICES.length)
  const avgHR = Math.round(onlineDevices.filter(d => d.hr != null).reduce((s, d) => s + (d.hr ?? 0), 0) / (onlineDevices.filter(d => d.hr != null).length || 1))

  return (
    <>
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: C.divider, borderBottom: `1px solid ${C.divider}`, flexShrink: 0 }}>
        {[
          { label: 'Dispositivos online', val: onlineDevices.length, valCol: C.teal, delta: `↑ de ${DEVICES.length} totais`, deltaCol: C.teal },
          { label: 'Offline', val: DEVICES.filter(d => d.status === 'offline').length, valCol: C.red, delta: 'Atenção', deltaCol: C.red },
          { label: 'Bateria média', val: avgBattery, unit: '%', delta: 'todos os dispositivos', deltaCol: C.teal },
          { label: 'FC média', val: avgHR, unit: ' bpm', delta: 'participantes online', deltaCol: C.teal },
        ].map(({ label, val, unit, valCol, delta, deltaCol }) => (
          <div key={label} style={{ background: C.navy, padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textSec }}>{label}</div>
            <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.4rem', color: valCol, lineHeight: 1 }}>
              {val}{unit && <span style={{ fontSize: '0.8rem', fontFamily: '"Space Grotesk", sans-serif', color: C.textSec }}>{unit}</span>}
            </div>
            <div style={{ fontSize: '0.65rem', color: deltaCol }}>{delta}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderBottom: `1px solid ${C.divider}`, flexShrink: 0, background: C.navy }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: C.textSec, pointerEvents: 'none' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por ID, participante..."
            style={{ width: '100%', background: C.navyLight, border: `1px solid ${C.divider}`, color: C.text, fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.78rem', padding: '7px 10px 7px 30px', outline: 'none' }} />
        </div>
        <select value={statusFilter} onChange={e => setFilter(e.target.value)}
          style={{ background: C.navyLight, border: `1px solid ${C.divider}`, color: C.textSec, fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.75rem', padding: '7px 10px', outline: 'none', cursor: 'pointer' }}>
          <option value="todos">Todos os status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="syncing">Sincronizando</option>
        </select>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.72rem', color: C.textSec }}>{filtered.length} dispositivos</span>
          <Btn variant="outline" icon={<Download size={12} />}>Exportar</Btn>
          <Btn variant="teal" icon={<Plus size={12} />}>Vincular</Btn>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.78rem' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 32, paddingLeft: 0, cursor: 'default' }}>
                <input type="checkbox" style={{ width: 14, height: 14, accentColor: C.teal }} />
              </th>
              {([['id', 'Dispositivo'], ['status', 'Status'], ['battery', 'Bateria']] as [keyof Device, string][]).map(([col, lbl]) => (
                <th key={col} style={{ ...thBase, color: sortCol === col ? C.teal : C.textSec }} onClick={() => toggleSort(col)}>
                  {lbl} {sortCol === col ? (sortAsc ? '↑' : '↓') : ''}
                </th>
              ))}
              <th style={{ ...thBase, cursor: 'default' }}>HRV</th>
              {([['participant', 'Participante'], ['study', 'Estudo'], ['lastSync', 'Último Sync']] as [keyof Device, string][]).map(([col, lbl]) => (
                <th key={col} style={{ ...thBase, color: sortCol === col ? C.teal : C.textSec }} onClick={() => toggleSort(col)}>
                  {lbl} {sortCol === col ? (sortAsc ? '↑' : '↓') : ''}
                </th>
              ))}
              <th style={{ ...thBase, cursor: 'default' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => {
              const spark = d.hrv ? [d.hrv - 12, d.hrv - 5, d.hrv + 3, d.hrv - 2, d.hrv + 7, d.hrv] : null
              const sel = selected?.id === d.id
              return (
                <tr key={d.id} onClick={() => setSelected(p => p?.id === d.id ? null : d)}
                  style={{ borderBottom: `1px solid ${C.divider}`, transition: 'background 0.12s', cursor: 'pointer', background: sel ? C.tealDim : 'transparent' }}
                  onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLTableRowElement).style.background = C.navyLight }}
                  onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = sel ? C.tealDim : 'transparent' }}>
                  <td style={{ padding: rp, paddingLeft: 0, width: 32 }} onClick={e => e.stopPropagation()}>
                    <input type="checkbox" style={{ width: 14, height: 14, accentColor: C.teal }} />
                  </td>
                  <td style={{ padding: rp }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, border: `1px solid ${C.divider}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.textSec, flexShrink: 0, background: C.navyMid }}>
                        <Watch size={13} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: C.text, fontSize: '0.78rem' }}>{d.id}</div>
                        <div style={{ fontSize: '0.68rem', color: C.textSec }}>{d.model}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: rp }}><StatusPill status={d.status} /></td>
                  <td style={{ padding: rp }}><BatteryCell pct={d.battery} /></td>
                  <td style={{ padding: rp }}><HRVSpark vals={spark} /></td>
                  <td style={{ padding: rp }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.textSec, flexShrink: 0, display: 'inline-block' }} />
                      {d.participant}
                    </div>
                  </td>
                  <td style={{ padding: rp, color: C.textSec }}>{d.study}</td>
                  <td style={{ padding: rp }}>
                    <div style={{ fontSize: '0.72rem', color: C.textSec }}>{d.lastSync?.split(' ')[1]}</div>
                    <div style={{ fontSize: '0.65rem', color: C.textSec, opacity: 0.6 }}>{d.lastSync?.split(' ')[0]}</div>
                  </td>
                  <td style={{ padding: rp }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <IconBtn title="Ver detalhes" onClick={() => setSelected(p => p?.id === d.id ? null : d)}><Eye size={13} /></IconBtn>
                      <IconBtn title="Sincronizar"><RefreshCw size={13} /></IconBtn>
                      <IconBtn title="Remover" danger><Trash2 size={13} /></IconBtn>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 48, textAlign: 'center', color: C.textSec, fontSize: '0.82rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Watch size={32} style={{ opacity: 0.3 }} />
            <span>Nenhum dispositivo encontrado</span>
          </div>
        )}
      </div>

      <DeviceDrawer device={selected} onClose={() => setSelected(null)} />
    </>
  )
}

// ── Participants tab ───────────────────────────────────────────────────────────

function ParticipantsTab({ density }: { density: 'normal' | 'compact' }) {
  const [query, setQuery] = useState('')
  const rp = density === 'compact' ? '7px 10px' : '11px 10px'

  const filtered = PARTICIPANTS.filter(p => {
    const q = query.toLowerCase()
    return p.id.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.study.toLowerCase().includes(q)
  })

  const thBase: React.CSSProperties = {
    textAlign: 'left', padding: '0 10px 10px', fontSize: '0.63rem',
    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: C.textSec, borderBottom: `1px solid ${C.divider}`, whiteSpace: 'nowrap', userSelect: 'none',
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderBottom: `1px solid ${C.divider}`, flexShrink: 0, background: C.navy }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 260 }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: C.textSec, pointerEvents: 'none' }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar participante..."
            style={{ width: '100%', background: C.navyLight, border: `1px solid ${C.divider}`, color: C.text, fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.78rem', padding: '7px 10px 7px 30px', outline: 'none' }} />
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: '0.72rem', color: C.textSec }}>{filtered.length} participantes</span>
          <Btn variant="outline" icon={<Download size={12} />}>Exportar</Btn>
          <Btn variant="teal" icon={<Plus size={12} />}>Adicionar</Btn>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.78rem' }}>
          <thead>
            <tr>
              <th style={{ ...thBase, width: 32, paddingLeft: 0 }}><input type="checkbox" style={{ width: 14, height: 14, accentColor: C.teal }} /></th>
              {['ID', 'Nome', 'Idade', 'Estudo', 'Dispositivo', 'Ingresso', 'Status', 'Ações'].map(h => (
                <th key={h} style={thBase}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}
                style={{ borderBottom: `1px solid ${C.divider}`, transition: 'background 0.12s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.navyLight}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                <td style={{ padding: rp, paddingLeft: 0, width: 32 }}><input type="checkbox" style={{ width: 14, height: 14, accentColor: C.teal }} /></td>
                <td style={{ padding: rp, color: C.teal, fontWeight: 500, fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.id}</td>
                <td style={{ padding: rp, fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: rp, color: C.textSec }}>{p.age} anos</td>
                <td style={{ padding: rp, color: C.textSec }}>{p.study}</td>
                <td style={{ padding: rp }}>
                  <span style={{ fontSize: '0.72rem', background: C.navyMid, padding: '2px 8px', color: C.textSec }}>{p.device}</span>
                </td>
                <td style={{ padding: rp, color: C.textSec, fontSize: '0.75rem' }}>{p.enrolled}</td>
                <td style={{ padding: rp }}><StatusPill status={p.status} /></td>
                <td style={{ padding: rp }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <IconBtn title="Ver"><Eye size={13} /></IconBtn>
                    <IconBtn title="Editar"><Pencil size={13} /></IconBtn>
                    <IconBtn title="Remover" danger><Trash2 size={13} /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ── Studies tab ────────────────────────────────────────────────────────────────

function StudiesTab({ density }: { density: 'normal' | 'compact' }) {
  const rp = density === 'compact' ? '7px 10px' : '11px 10px'
  const thBase: React.CSSProperties = {
    textAlign: 'left', padding: '0 10px 10px', fontSize: '0.63rem',
    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: C.textSec, borderBottom: `1px solid ${C.divider}`, whiteSpace: 'nowrap', userSelect: 'none',
  }
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 28px', borderBottom: `1px solid ${C.divider}`, flexShrink: 0, background: C.navy }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <Btn variant="outline" icon={<Download size={12} />}>Exportar</Btn>
          <Btn variant="teal" icon={<Plus size={12} />}>Novo estudo</Btn>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: '0.78rem' }}>
          <thead>
            <tr>
              {['ID', 'Título', 'Investigador', 'Dispositivos', 'Participantes', 'Progresso', 'Status', 'Ações'].map(h => (
                <th key={h} style={thBase}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDIES.map(s => (
              <tr key={s.id}
                style={{ borderBottom: `1px solid ${C.divider}`, transition: 'background 0.12s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = C.navyLight}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                <td style={{ padding: rp, fontFamily: 'monospace', fontSize: '0.78rem', color: C.teal }}>{s.id}</td>
                <td style={{ padding: rp, fontWeight: 500, maxWidth: 260 }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 220 }}>{s.title}</div>
                </td>
                <td style={{ padding: rp, color: C.textSec }}>{s.pi}</td>
                <td style={{ padding: rp, textAlign: 'center' }}>{s.devices}</td>
                <td style={{ padding: rp, textAlign: 'center' }}>{s.participants}</td>
                <td style={{ padding: rp, minWidth: 100 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ flex: 1, height: 4, background: C.navyMid, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${s.progress}%`, background: s.progress === 100 ? C.textSec : C.teal, transition: 'width 0.5s' }} />
                    </div>
                    <span style={{ fontSize: '0.68rem', color: C.textSec, minWidth: 28 }}>{s.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: rp }}><StatusPill status={s.status} /></td>
                <td style={{ padding: rp }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <IconBtn title="Ver"><Eye size={13} /></IconBtn>
                    <IconBtn title="Editar"><Pencil size={13} /></IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ── Panel Page ─────────────────────────────────────────────────────────────────

function PanelPage() {
  const [activeNav, setActiveNav] = useState<NavId>('devices')
  const [activeTab, setActiveTab] = useState('all')
  const [density, setDensity] = useState<'normal' | 'compact'>(() => {
    if (typeof window === 'undefined') return 'compact'
    return (localStorage.getItem('pulselab_density') as 'normal' | 'compact') ?? 'compact'
  })

  function navigate(nav: NavId) {
    setActiveNav(nav)
    setActiveTab('all')
  }

  function toggleDensity() {
    const next = density === 'compact' ? 'normal' : 'compact'
    setDensity(next)
    localStorage.setItem('pulselab_density', next)
  }

  const page = PAGE_META[activeNav]

  return (
    <div className="pl-dark" style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      gridTemplateRows: '48px 1fr',
      height: '100vh',
      overflow: 'hidden',
      fontSize: 13,
      lineHeight: 1.5,
    }}>

      {/* ── Topbar ── */}
      <div style={{
        gridColumn: '1 / -1', gridRow: 1,
        background: C.navyLight, borderBottom: `1px solid ${C.divider}`,
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, zIndex: 10,
      }}>
        <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1rem', color: C.text, display: 'flex', alignItems: 'center', gap: 8, marginRight: 8, whiteSpace: 'nowrap' }}>
          <div className="pl-logo-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, boxShadow: `0 0 8px ${C.tealGlow}`, flexShrink: 0 }} />
          PulseLab
        </div>
        <div style={{ width: 1, height: 20, background: C.divider }} />
        <div style={{ fontSize: '0.72rem', color: C.textSec, letterSpacing: '0.06em' }}>
          Admin <span style={{ color: C.teal }}>/ {page.title}</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textSec, border: `1px solid ${C.divider}`, padding: '3px 8px' }}>
            ⚠ Acesso restrito
          </div>
          <IconBtn title="Notificações"><Bell size={15} /></IconBtn>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', padding: '4px 8px' }}>
            <UserButton />
          </div>
        </div>
      </div>

      {/* ── Sidebar ── */}
      <div style={{ gridColumn: 1, gridRow: 2, background: C.navyLight, borderRight: `1px solid ${C.divider}`, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.textSec, padding: '12px 18px 6px', opacity: 0.7 }}>Principal</div>
        {NAV.map(({ id, label, Icon, badge }) => {
          const active = activeNav === id
          return (
            <div key={id} onClick={() => navigate(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: active ? 500 : 400, transition: 'background 0.15s, color 0.15s', borderLeft: `2px solid ${active ? C.teal : 'transparent'}`, background: active ? C.tealDim : 'transparent', color: active ? C.teal : C.textSec, userSelect: 'none' }}
              onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.background = C.navyHover; el.style.color = C.text } }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = active ? C.tealDim : 'transparent'; el.style.color = active ? C.teal : C.textSec }}>
              <Icon size={14} style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
              {label}
              {badge && <span style={{ marginLeft: 'auto', background: C.tealDim, color: C.teal, fontSize: '0.6rem', fontWeight: 600, padding: '1px 6px', borderRadius: 9 }}>{badge}</span>}
            </div>
          )
        })}

        <div style={{ height: 1, background: C.divider, margin: '8px 0' }} />
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.textSec, padding: '12px 18px 6px', opacity: 0.7 }}>Sistema</div>

        {[{ id: 'settings' as NavId, label: 'Configurações', Icon: Settings }].map(({ id, label, Icon }) => {
          const active = activeNav === id
          return (
            <div key={id} onClick={() => navigate(id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', cursor: 'pointer', fontSize: '0.8rem', transition: 'background 0.15s, color 0.15s', borderLeft: `2px solid ${active ? C.teal : 'transparent'}`, background: active ? C.tealDim : 'transparent', color: active ? C.teal : C.textSec, userSelect: 'none' }}
              onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.background = C.navyHover; el.style.color = C.text } }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = active ? C.tealDim : 'transparent'; el.style.color = active ? C.teal : C.textSec }}>
              <Icon size={14} style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }} />
              {label}
            </div>
          )
        })}

        <div style={{ marginTop: 'auto', borderTop: `1px solid ${C.divider}`, paddingTop: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 18px', cursor: 'pointer', fontSize: '0.8rem', transition: 'background 0.15s, color 0.15s', borderLeft: '2px solid transparent', color: C.textSec, userSelect: 'none' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = C.navyHover; el.style.color = C.text }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = C.textSec }}>
            <LogOut size={14} style={{ flexShrink: 0, opacity: 0.7 }} />
            Sair
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ gridColumn: 2, gridRow: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.navy }}>

        {/* Page header */}
        <div style={{ padding: '24px 28px 0', borderBottom: `1px solid ${C.divider}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.5rem', color: C.text, lineHeight: 1 }}>{page.title}</div>
              <div style={{ fontSize: '0.75rem', color: C.textSec, marginTop: 4, fontWeight: 300 }}>{page.sub}</div>
            </div>
            <button onClick={toggleDensity} title={`Densidade: ${density}`}
              style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: C.textSec, border: `1px solid ${C.divider}`, background: 'transparent', padding: '3px 8px', cursor: 'pointer' }}>
              {density === 'compact' ? 'Compacto' : 'Normal'}
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            {page.tabs.map(t => (
              <div key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding: '10px 20px', fontSize: '0.78rem', fontWeight: activeTab === t.id ? 500 : 400, color: activeTab === t.id ? C.teal : C.textSec, cursor: 'pointer', borderBottom: `2px solid ${activeTab === t.id ? C.teal : 'transparent'}`, transition: 'color 0.15s, border-color 0.15s', display: 'flex', alignItems: 'center', gap: 7, userSelect: 'none', whiteSpace: 'nowrap' }}>
                {t.label}
                {TAB_COUNTS[t.id] && (
                  <span style={{ fontSize: '0.62rem', padding: '1px 5px', borderRadius: 8, background: activeTab === t.id ? C.tealDim : C.navyMid, color: activeTab === t.id ? C.teal : C.textSec }}>
                    {TAB_COUNTS[t.id]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Page content */}
        {activeNav === 'devices' && activeTab === 'all' ? <DevicesTab density={density} /> :
          activeNav === 'participants' && activeTab === 'all' ? <ParticipantsTab density={density} /> :
            activeNav === 'studies' && activeTab === 'all' ? <StudiesTab density={density} /> :
              (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: C.textSec, fontSize: '0.82rem' }}>
                  <BarChart3 size={32} style={{ opacity: 0.3 }} />
                  <span>Em desenvolvimento</span>
                </div>
              )
        }
      </div>
    </div>
  )
}
