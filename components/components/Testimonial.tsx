'use client'
import AnimateIn from './AnimateIn'

export default function Testimonial() {
  return (
    <section style={{ background: '#490000', padding: '5rem 0', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        maxWidth: '900px',
        maxHeight: '900px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(246,221,190,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 1 }}>
        <AnimateIn type="scaleDown" duration={1.1} delay={0}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0' }}>
            {/* Big quotation mark */}
            <AnimateIn type="up" duration={0.8} delay={0.1}>
              <div style={{
                fontFamily: 'var(--font-playfair-var), serif',
                fontSize: '8rem',
                color: 'rgba(246,221,190,0.15)',
                lineHeight: 0.7,
                marginBottom: '-0.5rem',
                userSelect: 'none',
                fontStyle: 'italic',
              }}>
                &ldquo;
              </div>
            </AnimateIn>

            {/* Quote — dramatic blur reveal */}
            <AnimateIn type="blur" duration={1.1} delay={0.2}>
              <blockquote style={{
                fontFamily: 'var(--font-playfair-var), serif',
                fontStyle: 'italic',
                color: '#fff',
                fontSize: 'clamp(1.4rem, 3vw, 2.25rem)',
                lineHeight: 1.5,
                margin: 0,
                padding: '0 1rem',
              }}>
                I&apos;ve had a lot of pastries. This one made me stop talking mid-bite.
              </blockquote>
            </AnimateIn>

            {/* Divider line */}
            <AnimateIn type="clipUp" duration={0.8} delay={0.5}>
              <div style={{ width: '60px', height: '2px', background: 'rgba(246,221,190,0.35)', margin: '2rem 0 1.5rem' }} />
            </AnimateIn>

            {/* Attribution */}
            <AnimateIn type="up" duration={0.7} delay={0.62}>
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(246,221,190,0.55)',
                fontFamily: 'var(--font-montserrat-var), sans-serif',
              }}>
                Early taster — Brooklyn, NY
              </p>
            </AnimateIn>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
