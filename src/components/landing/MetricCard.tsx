import { useEffect, useState } from 'react'

interface MetricCardProps {
  label: string
  value: number
  unit: string
  pct: number
  delay?: number
}

export default function MetricCard({ label, value, unit, pct, delay = 0 }: MetricCardProps) {
  const [visible, setVisible] = useState(false)
  const [currentVal, setCurrentVal] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    const id = setInterval(() => {
      const delta = (Math.random() - 0.5) * 4
      setCurrentVal((v) => Math.round(v + delta))
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        background: 'rgba(21,34,56,0.7)',
        border: '1px solid #1E3048',
        padding: '16px 20px',
        minWidth: 130,
        backdropFilter: 'blur(8px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s',
      }}
    >
      <div
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#8A9BB0',
          marginBottom: 6,
          fontFamily: '"Space Grotesk", sans-serif',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: '1.9rem',
          color: '#F0F4F8',
          lineHeight: 1,
        }}
      >
        {currentVal}
      </div>
      <div
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '0.7rem',
          color: '#00BFA5',
          marginTop: 4,
          fontWeight: 500,
        }}
      >
        {unit}
      </div>
      <div
        style={{
          marginTop: 8,
          height: 2,
          background: '#1E3048',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            background: '#00BFA5',
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  )
}
