import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Heart, Activity, Smile, Clock } from 'lucide-react'
import { Route as panelRoute } from './panel/index.tsx'
import Nav from '../components/landing/Nav'
import Hero from '../components/landing/Hero'
import SensorCard from '../components/landing/SensorCard'
import HowItWorks from '../components/landing/HowItWorks'
import LandingFooter from '../components/landing/LandingFooter'

export const Route = createFileRoute('/')({ component: LandingPage })

const sensors = [
  {
    abbr: 'HR',
    name: 'Frequência Cardíaca',
    desc: 'Batimentos por minuto coletados continuamente pelo sensor óptico PPG do Galaxy Watch.',
    sample: '→ 68 bpm  · 72 bpm  · 75 bpm',
    icon: <Heart size={18} strokeWidth={1.5} />,
  },
  {
    abbr: 'HRV',
    name: 'Variabilidade Cardíaca',
    desc: 'Intervalo R-R entre batimentos — indicador direto da modulação autonômica e do estado de estresse.',
    sample: '→ SDNN: 42ms · RMSSD: 38ms',
    icon: <Activity size={18} strokeWidth={1.5} />,
  },
  {
    abbr: 'SpO₂',
    name: 'Saturação de Oxigênio',
    desc: 'Porcentagem de hemoglobina oxigenada no sangue, medida por espectroscopia óptica.',
    sample: '→ 98%  · 97%  · 98%',
    icon: <Smile size={18} strokeWidth={1.5} />,
  },
  {
    abbr: 'EDA',
    name: 'Nível de Estresse',
    desc: 'Índice composto derivado de HRV e dados de atividade — proxy não-invasivo de carga alostática.',
    sample: '→ Score: 32 · 41 · 38',
    icon: <Clock size={18} strokeWidth={1.5} />,
  },
]

function LandingPage() {
  const router = useRouter()

  return (
    <div className="landing">
      <Nav />

      <Hero />

      {/* ── O que é ── */}
      <section id="about" style={{ padding: '96px 48px', maxWidth: 1200, margin: '0 auto' }}>
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
          <span
            style={{ width: 20, height: 1, background: '#00BFA5', display: 'inline-block' }}
          />
          Sobre a plataforma
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
          Uma infraestrutura para pesquisa
          <br />
          <em style={{ fontStyle: 'italic', color: '#00BFA5' }}>séria</em> em biomarcadores.
        </h2>

        <div
          className="pl-about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
            marginTop: 56,
          }}
        >
          <div className="pl-reveal pl-reveal-d2">
            <p
              style={{
                color: '#8A9BB0',
                lineHeight: 1.8,
                fontWeight: 300,
                fontSize: '0.97rem',
                margin: 0,
              }}
            >
              PulseLab centraliza a gestão de estudos longitudinais com dados biométricos coletados
              passivamente por smartwatches Wear OS. A plataforma elimina a necessidade de planilhas
              manuais e fragmentação de dados — cada participante gera uma série temporal contínua,
              acessível em tempo real.
            </p>
            <p
              style={{
                color: '#8A9BB0',
                lineHeight: 1.8,
                fontWeight: 300,
                fontSize: '0.97rem',
                marginTop: 20,
              }}
            >
              O foco do sistema é o estudo do estresse crônico e seus correlatos fisiológicos —
              HRV, cortisol e ativação do sistema nervoso autônomo. Dados sensíveis são tratados
              conforme diretrizes éticas vigentes, com controle granular de acesso por estudo.
            </p>
            <p
              style={{
                color: '#8A9BB0',
                lineHeight: 1.8,
                fontWeight: 300,
                fontSize: '0.97rem',
                marginTop: 20,
              }}
            >
              A arquitetura é modular: pesquisadores configuram protocolos, administram participantes
              e exportam dados em formatos compatíveis com R, Python e SPSS.
            </p>
          </div>

          <div
            className="pl-reveal pl-reveal-d3"
            style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 8 }}
          >
            {[
              { num: '4', desc: 'Biomarcadores monitorados continuamente' },
              { num: '24h', desc: 'Coleta passiva sem intervenção do participante' },
              { num: '∞', desc: 'Séries temporais exportáveis em CSV, JSON, HDF5' },
            ].map(({ num, desc }) => (
              <div
                key={num}
                style={{ borderLeft: '2px solid #00BFA5', padding: '4px 0 4px 20px' }}
              >
                <div
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: '2.2rem',
                    color: '#F0F4F8',
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{ fontSize: '0.8rem', color: '#8A9BB0', marginTop: 4, fontWeight: 300 }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: '#1E3048',
          margin: '0 48px',
        }}
      />

      {/* ── Dados Coletados ── */}
      <div
        style={{
          background: '#152238',
          borderTop: '1px solid #1E3048',
          borderBottom: '1px solid #1E3048',
          padding: '96px 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>
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
            <span
              style={{ width: 20, height: 1, background: '#00BFA5', display: 'inline-block' }}
            />
            Sensores
          </div>

          <h2
            className="pl-reveal pl-reveal-d1"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#F0F4F8',
              marginBottom: 20,
            }}
          >
            Dados coletados
          </h2>

          <p
            className="pl-reveal pl-reveal-d2"
            style={{
              color: '#8A9BB0',
              fontSize: '0.97rem',
              lineHeight: 1.75,
              maxWidth: 620,
              fontWeight: 300,
              marginBottom: 0,
            }}
          >
            Quatro fluxos de dados biométricos coletados continuamente pelo sensor óptico e
            acelerômetro do Galaxy Watch, sincronizados com a plataforma via Wear OS API.
          </p>

          <div
            className="pl-sensor-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 2,
              marginTop: 56,
              alignItems: 'stretch',
            }}
          >
            {sensors.map((s, i) => (
              <div key={s.abbr} className={`pl-reveal pl-reveal-d${i + 1}`} style={{ display: 'flex' }}>
                <SensorCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <HowItWorks />

      {/* Divider */}
      <div style={{ height: 1, background: '#1E3048', margin: '0 48px' }} />

      {/* ── CTA ── */}
      <div
        style={{
          textAlign: 'center',
          padding: '120px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,191,165,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

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
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span
            style={{ width: 20, height: 1, background: '#00BFA5', display: 'inline-block' }}
          />
          Acesso
        </div>

        <h2
          className="pl-reveal pl-reveal-d1"
          style={{
            fontFamily: '"DM Serif Display", Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            color: '#F0F4F8',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Pronto para iniciar
          <br />
          seu estudo?
        </h2>

        <p
          className="pl-reveal pl-reveal-d2"
          style={{
            color: '#8A9BB0',
            fontSize: '0.95rem',
            marginBottom: 44,
            fontWeight: 300,
          }}
        >
          Acesso exclusivo a pesquisadores e administradores autorizados.
        </p>

        <button
          className="pl-reveal pl-reveal-d3"
          onClick={() => router.navigate(panelRoute)}
          style={{
            background: '#00BFA5',
            color: '#0A1628',
            border: 'none',
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '15px 48px',
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
          Entrar na Plataforma
        </button>
      </div>

      <LandingFooter />
    </div>
  )
}
