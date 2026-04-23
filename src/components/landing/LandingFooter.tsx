export default function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid #1E3048',
        padding: '40px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: '1rem',
          color: '#F0F4F8',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
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
        PulseLab Research Platform
      </div>

      <div
        style={{
          fontSize: '0.72rem',
          color: '#8A9BB0',
          letterSpacing: '0.08em',
          border: '1px solid #1E3048',
          padding: '6px 14px',
          textTransform: 'uppercase',
        }}
      >
        ⚠ Acesso restrito a pesquisadores autorizados
      </div>

      <div
        style={{
          fontSize: '0.75rem',
          color: '#8A9BB0',
          fontWeight: 300,
        }}
      >
        © 2026 · Uso exclusivamente acadêmico
      </div>
    </footer>
  )
}
