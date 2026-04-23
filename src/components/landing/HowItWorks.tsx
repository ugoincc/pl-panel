const steps = [
  {
    num: '01',
    title: 'Participante autoriza',
    desc: 'O participante instala o app no smartwatch e consente com a coleta de dados biométricos conforme TCLE.',
    tag: 'Consentimento informado',
  },
  {
    num: '02',
    title: 'Relógio coleta',
    desc: 'O Galaxy Watch monitora passivamente HR, HRV, SpO₂ e estresse sem intervenção ativa do participante.',
    tag: 'Coleta passiva contínua',
  },
  {
    num: '03',
    title: 'Pesquisador analisa',
    desc: 'Os dados sincronizam com a plataforma central, onde o pesquisador acessa dashboards, exporta séries temporais e gera relatórios.',
    tag: 'Análise centralizada',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: '96px 48px', maxWidth: 1200, margin: '0 auto' }}>
      <div
        className="pl-reveal"
        style={{
          fontSize: '0.68rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#00BFA5',
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ width: 20, height: 1, background: '#00BFA5', display: 'inline-block' }} />
        Protocolo
      </div>
      <h2
        className="pl-reveal pl-reveal-d1"
        style={{
          fontFamily: '"DM Serif Display", Georgia, serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#F0F4F8',
          marginBottom: 0,
        }}
      >
        Como funciona
      </h2>

      <div className="pl-steps-grid">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className={`pl-reveal pl-reveal-d${i + 1}`}
            style={{
              padding: '0 32px',
              ...(i === 0 ? { paddingLeft: 0 } : {}),
              ...(i === steps.length - 1 ? { paddingRight: 0 } : {}),
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                border: '1px solid #00BFA5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.3rem',
                color: '#00BFA5',
                marginBottom: 32,
                background: '#0A1628',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {step.num}
            </div>
            <div
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.3rem',
                color: '#F0F4F8',
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </div>
            <div
              style={{
                fontSize: '0.88rem',
                color: '#8A9BB0',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              {step.desc}
            </div>
            <div
              style={{
                display: 'inline-block',
                marginTop: 16,
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#00BFA5',
                background: 'rgba(0,191,165,0.12)',
                padding: '4px 10px',
                fontWeight: 500,
              }}
            >
              {step.tag}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
