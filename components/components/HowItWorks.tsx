'use client'
import AnimateIn from './AnimateIn'
import StaggerContainer from './StaggerContainer'

const steps = [
  { num: '01', title: 'DM us on Instagram', hasLink: true },
  { num: '02', title: 'We get to work', desc: 'Every medialuna is made fresh, by hand. Allow 72 hours from order to pickup.', hasLink: false },
  { num: '03', title: 'Pick up & enjoy', desc: "We'll coordinate pickup details with you directly. Fresh, boxed, ready.", hasLink: false },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ background: '#f6ddbe', borderTop: '1px solid rgba(73,0,0,0.08)', padding: '5rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* ── Section header ── */}
        <StaggerContainer style={{ marginBottom: '3.5rem' }} staggerDelay={0.1} type="up">
          <AnimateIn type="up" delay={0}>
            <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#490000', display: 'block', textAlign: 'center', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
              Pre-orders
            </span>
          </AnimateIn>
          <AnimateIn type="clipUp" duration={0.9} delay={0.1}>
            <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#490000', letterSpacing: '-0.025em', marginTop: '0.5rem', textAlign: 'center' }}>
              How it works
            </h2>
          </AnimateIn>
        </StaggerContainer>

        {/* ── Cards — staggered entrance with scale ── */}
        <StaggerContainer
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
          staggerDelay={0.15}
          type="scale"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                background: '#fff',
                borderRadius: '8px',
                padding: '2.5rem 2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                height: '100%',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)'
                e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.06),0 20px 50px rgba(73,0,0,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)'
              }}
            >
              {/* Subtle top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #490000, rgba(73,0,0,0.3))', opacity: 0, transition: 'opacity 0.3s ease' }}
                className="card-accent"
              />

              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(73,0,0,0.4)', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
                {step.num}
              </span>

              <h3 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#490000', lineHeight: 1.3, margin: 0 }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(73,0,0,0.6)', margin: 0, fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
                {step.hasLink ? (
                  <>Send us a message at <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noopener" style={{ color: '#490000', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>@notacroissantnyc</a> to place your order.</>
                ) : step.desc}
              </p>

              {/* Arrow icon on hover */}
              <div style={{
                marginTop: 'auto',
                opacity: 0.25,
                transition: 'opacity 0.3s, transform 0.3s',
                transform: 'translateX(-4px)',
              }} className="card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#490000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </StaggerContainer>

      </div>

      <style>{`
        div:hover .card-accent { opacity: 1 !important; }
        div:hover .card-arrow { opacity: 0.6 !important; transform: translateX(0) !important; }
      `}</style>
    </section>
  )
}
