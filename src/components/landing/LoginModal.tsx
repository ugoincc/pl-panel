import { useState } from 'react'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !pass) {
      setErr('Preencha todos os campos.')
      return
    }
    setErr('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setErr('Credenciais inválidas ou acesso não autorizado.')
    }, 1600)
  }

  if (!open) return null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0A1628',
    border: '1px solid #1E3048',
    color: '#F0F4F8',
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '0.9rem',
    padding: '10px 14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.72rem',
    color: '#8A9BB0',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: 6,
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'rgba(10,22,40,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#152238',
          border: '1px solid #1E3048',
          padding: '44px 40px',
          minWidth: 340,
          maxWidth: 400,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: '1.5rem',
            color: '#F0F4F8',
            marginBottom: 6,
          }}
        >
          Acesso Restrito
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: '#8A9BB0',
            marginBottom: 28,
            fontWeight: 300,
          }}
        >
          Exclusivo para pesquisadores autorizados.
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>E-mail institucional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={inputStyle}
            />
          </div>

          {err && (
            <div style={{ fontSize: '0.78rem', color: '#ff6b6b', marginBottom: 16 }}>{err}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px 0',
              background: '#00BFA5',
              color: '#0A1628',
              border: 'none',
              fontFamily: '"Space Grotesk", sans-serif',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s, box-shadow 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.boxShadow = '0 0 28px rgba(0,191,165,0.35)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = loading ? '0.7' : '1'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'none'
            }}
          >
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>

        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#8A9BB0',
            cursor: 'pointer',
            fontSize: '1.1rem',
            lineHeight: 1,
            padding: 4,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
