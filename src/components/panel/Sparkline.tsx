export function Sparkline({
  vals,
  color = 'var(--primary)',
  h = 48,
}: {
  vals: number[]
  color?: string
  h?: number
}) {
  const max = Math.max(...vals),
    min = Math.min(...vals),
    range = max - min || 1
  const W = 330,
    pad = 8
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
    <svg viewBox={`0 0 ${W} ${h}`} className='w-full' height={h}>
      <defs>
        <linearGradient id={gradId} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={color} stopOpacity='0.15' />
          <stop offset='100%' stopColor={color} stopOpacity='0' />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <polyline
        points={polyPts}
        fill='none'
        stroke={color}
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <circle cx={lx} cy={ly} r='3' fill={color} />
    </svg>
  )
}
