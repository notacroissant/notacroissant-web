'use client'
import Image from 'next/image'
import AnimateIn from './AnimateIn'
import StaggerContainer from './StaggerContainer'

export default function Story() {
  return (
    <section id="story" style={{ background: '#f6ddbe', padding: '8rem 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>

        {/* ── Left: Text — staggered reveal ── */}
        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '0' }} staggerDelay={0.13} type="up">
          <AnimateIn style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }} type="up" delay={0}>
            <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#490000', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
              What is a Medialuna?
            </span>
            <div style={{ overflow: 'hidden' }}>
              <AnimateIn type="clipUp" duration={0.9} delay={0.05}>
                <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', color: '#490000', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
                  Different.
                </h2>
              </AnimateIn>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <AnimateIn type="clipUp" duration={0.9} delay={0.18}>
                <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', color: '#490000', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
                  On purpose.
                </h2>
              </AnimateIn>
            </div>
            <AnimateIn type="up" duration={0.7} delay={0.32}>
              <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(73,0,0,0.65)', maxWidth: '420px', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
                Flakier than a croissant. Lighter than a brioche. A little sweet, a little addictive. The medialuna is its own thing — and so are we. Our recipe, made from scratch in New York. No shortcuts. No exceptions.
              </p>
            </AnimateIn>
            <AnimateIn type="up" duration={0.7} delay={0.44}>
              <a
                href="https://instagram.com/notacroissantnyc"
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-block',
                  padding: '0.9rem 2.2rem',
                  background: '#490000',
                  color: '#f6ddbe',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: '3px',
                  transition: 'all 0.25s ease',
                  alignSelf: 'flex-start',
                  fontFamily: 'var(--font-montserrat-var), sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(73,0,0,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '' }}
              >
                Pre-order via DM
              </a>
            </AnimateIn>
          </AnimateIn>
        </StaggerContainer>

        {/* ── Right: Image — dramatic scale reveal ── */}
        <AnimateIn type="scaleDown" duration={1.2} delay={0.15}>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 24px 70px rgba(73,0,0,0.16)' }} className="group">
            <Image
              src="/detail.jpg"
              alt="Medialuna detail"
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }}
              className="group-hover:scale-105"
            />
            {/* Overlay shine on hover */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, transparent 40%, rgba(246,221,190,0.12) 60%, transparent 80%)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }} className="group-hover:opacity-100" />
          </div>
        </AnimateIn>

      </div>

      {/* ── Decorative background accent ── */}
      <AnimateIn type="scaleDown" duration={1.5} delay={0.3}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '40vw',
          height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(73,0,0,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
      </AnimateIn>
    </section>
  )
}
