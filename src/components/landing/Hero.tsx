import ECGLine from './ECGLine'
import MetricCard from './MetricCard'

interface HeroProps {
  onLogin: () => void
}

export default function Hero({ onLogin }: HeroProps) {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 100%)',
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.3,
          backgroundImage:
            'linear-gradient(#1E3048 1px, transparent 1px), linear-gradient(90deg, #1E3048 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(ellipse at 70% 50%, transparent 30%, #0A1628 80%)',
        }}
      />

      {/* Content */}
      <div
        className="pl-reveal"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '100px 48px 60px',
          maxWidth: 800,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#00BFA5',
            marginBottom: 28,
          }}
        >
          <span style={{ width: 28, height: 1, background: '#00BFA5', display: 'inline-block' }} />
          Plataforma de Pesquisa Biométrica
        </div>

        <h1
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: 'clamp(3rem, 6vw, 5.2rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: '#F0F4F8',
            marginBottom: 24,
            margin: '0 0 24px',
          }}
        >
          Dados que revelam
          <br />o que o{' '}
          <em style={{ fontStyle: 'italic', color: '#00BFA5' }}>corpo</em> diz.
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: '#8A9BB0',
            maxWidth: 480,
            lineHeight: 1.7,
            marginBottom: 44,
            fontWeight: 300,
          }}
        >
          PulseLab é uma plataforma acadêmica para coleta e análise de biomarcadores de estresse via smartwatch — projetada para pesquisadores que precisam de precisão.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <button
            onClick={onLogin}
            style={{
              background: '#00BFA5',
              color: '#0A1628',
              border: 'none',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '14px 36px',
              cursor: 'pointer',
              transition: 'opacity 0.2s, box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9'
              e.currentTarget.style.boxShadow = '0 0 28px rgba(0,191,165,0.35)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            Acessar Plataforma
          </button>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8A9BB0',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.82rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.2s',
              padding: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F0F4F8'
              const svg = e.currentTarget.querySelector('svg') as SVGElement | null
              if (svg) svg.style.transform = 'translateX(3px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#8A9BB0'
              const svg = e.currentTarget.querySelector('svg') as SVGElement | null
              if (svg) svg.style.transform = 'none'
            }}
          >
            Saiba mais
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ transition: 'transform 0.2s' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating metrics (desktop only) */}
      <div
        className="pl-metrics-strip"
        style={{
          position: 'absolute',
          right: 48,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <MetricCard label="HR Médio" value={72} unit="bpm · tempo real" pct={62} delay={300} />
        <MetricCard label="HRV" value={44} unit="ms · RMSSD" pct={55} delay={500} />
        <MetricCard label="SpO₂" value={97} unit="% · oximetria" pct={97} delay={700} />
      </div>

      <ECGLine />
    </div>
  )
}
