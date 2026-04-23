export default function ECGLine() {
  const width = 1200
  const height = 140
  const mid = height / 2

  const path = `
    M 0 ${mid}
    L 80 ${mid} L 90 ${mid - 5} L 100 ${mid + 5} L 110 ${mid}
    L 180 ${mid} L 190 ${mid - 40} L 205 ${mid + 55} L 215 ${mid - 20} L 228 ${mid + 8} L 240 ${mid}
    L 280 ${mid} L 290 ${mid - 6} L 300 ${mid + 6} L 310 ${mid}
    L 440 ${mid} L 450 ${mid - 5} L 460 ${mid + 5} L 470 ${mid}
    L 540 ${mid} L 550 ${mid - 42} L 565 ${mid + 58} L 575 ${mid - 22} L 588 ${mid + 8} L 600 ${mid}
    L 640 ${mid} L 650 ${mid - 6} L 660 ${mid + 6} L 670 ${mid}
    L 800 ${mid} L 810 ${mid - 5} L 820 ${mid + 5} L 830 ${mid}
    L 900 ${mid} L 910 ${mid - 42} L 925 ${mid + 58} L 935 ${mid - 22} L 948 ${mid + 8} L 960 ${mid}
    L 1200 ${mid}
  `

  return (
    <svg
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 160,
        zIndex: 1,
        opacity: 0.55,
        pointerEvents: 'none',
      }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ecgGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#00BFA5" stopOpacity="0" />
          <stop offset="20%" stopColor="#00BFA5" stopOpacity="0.85" />
          <stop offset="80%" stopColor="#00BFA5" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00BFA5" stopOpacity="0" />
        </linearGradient>
        <filter id="ecgGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="url(#ecgGrad)"
        strokeWidth="1.5"
        pathLength="1"
        className="pl-ecg-line"
        filter="url(#ecgGlow)"
      />
    </svg>
  )
}
