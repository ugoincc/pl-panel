import type { ReactNode } from 'react'

interface SensorCardProps {
  abbr: string
  name: string
  desc: string
  sample: string
  icon: ReactNode
}

export default function SensorCard({ abbr, name, desc, sample, icon }: SensorCardProps) {
  return (
    <div className="pl-sensor-card">
      <div className="pl-sensor-icon">{icon}</div>
      <div
        style={{
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#00BFA5',
          marginBottom: 8,
        }}
      >
        {abbr}
      </div>
      <div
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: '1.25rem',
          color: '#F0F4F8',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontSize: '0.82rem',
          color: '#8A9BB0',
          lineHeight: 1.65,
          fontWeight: 300,
          flexGrow: 1,
        }}
      >
        {desc}
      </div>
      <div
        style={{
          marginTop: 20,
          fontFamily: '"Courier New", monospace',
          fontSize: '0.72rem',
          color: 'rgba(0,191,165,0.6)',
          borderTop: '1px solid #1E3048',
          paddingTop: 16,
        }}
      >
        {sample}
      </div>
    </div>
  )
}
