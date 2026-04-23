import { useEffect, useState } from 'react'

interface NavProps {
  onLogin: () => void
}

export default function Nav({ onLogin }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 48px',
        borderBottom: scrolled ? '1px solid #1E3048' : '1px solid transparent',
        background: scrolled ? 'rgba(10,22,40,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}
    >
      <div
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: '1.35rem',
          letterSpacing: '-0.01em',
          color: '#F0F4F8',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          className="pl-logo-dot"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#00BFA5',
            boxShadow: '0 0 10px rgba(0,191,165,0.35)',
            flexShrink: 0,
          }}
        />
        PulseLab
      </div>
      <button
        onClick={onLogin}
        style={{
          background: 'transparent',
          border: '1px solid #00BFA5',
          color: '#00BFA5',
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: '0.8rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '9px 22px',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#00BFA5'
          e.currentTarget.style.color = '#0A1628'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#00BFA5'
        }}
      >
        Acessar Plataforma
      </button>
    </nav>
  )
}
