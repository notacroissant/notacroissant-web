'use client'
import { useState } from 'react'
import AnimateIn from './AnimateIn'
import StaggerContainer from './StaggerContainer'

const C = {
  champagne: '#f6ddbe',
  mahogany: '#490000',
}

export default function Order() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const FORM_ID = '1FAIpQLSc7UWnoCAWDZTO6DCBeEYMp0ey_79N5U9gV5k7IKNJvjS4aMQ'
  const ENTRY_ID = 'entry.262822966'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    const body = new FormData()
    body.append(ENTRY_ID, email)
    try {
      await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
    } catch (_) {}
    setLoading(false)
    setDone(true)
  }

  return (
    <section id="order" style={{ background: C.champagne, padding: '3rem 0', overflow: 'hidden', position: 'relative' }}>
      {/* Ambient glow top */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60vw',
        height: '40vw',
        background: 'radial-gradient(ellipse, rgba(73,0,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0', position: 'relative', zIndex: 1 }}>

        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }} staggerDelay={0.12} type="up">
          <AnimateIn type="up" delay={0}>
            <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(73,0,0,0.65)', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
              Pre-orders open
            </span>
          </AnimateIn>

          {/* H2 — dramatic per-line clip reveal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <div style={{ overflow: 'hidden' }}>
              <AnimateIn type="clipUp" duration={1.0} delay={0.08}>
                <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, color: C.mahogany, fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                  Want one?
                </h2>
              </AnimateIn>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <AnimateIn type="clipUp" duration={1.0} delay={0.22}>
                <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, color: C.mahogany, fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                  DM us.
                </h2>
              </AnimateIn>
            </div>
          </div>

          <AnimateIn type="blur" duration={1.0} delay={0.38}>
            <p style={{ fontFamily: 'var(--font-playfair-var), serif', fontStyle: 'italic', color: 'rgba(73,0,0,0.6)', fontSize: '1.2rem', margin: 0 }}>
              No website checkout. No middleman. Just a DM and 72 hours.
            </p>
          </AnimateIn>

          <AnimateIn type="scale" duration={0.8} delay={0.52}>
            <a
              href="https://instagram.com/notacroissantnyc"
              target="_blank"
              rel="noopener"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: C.mahogany,
                color: C.champagne,
                fontFamily: 'var(--font-montserrat-var), sans-serif',
                fontWeight: 700,
                fontSize: '0.82rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '3px',
                boxShadow: '0 8px 30px rgba(73,0,0,0.25)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(73,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(73,0,0,0.25)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @notacroissantnyc
            </a>
          </AnimateIn>

          <AnimateIn type="up" duration={0.6} delay={0.65} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '24rem', color: 'rgba(73,0,0,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
            <span style={{ flex: 1, height: '1px', background: 'rgba(73,0,0,0.22)' }} />
            <span>or drop your email</span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(73,0,0,0.22)' }} />
          </AnimateIn>

          <AnimateIn type="up" duration={0.7} delay={0.75} style={{ width: '100%', maxWidth: '24rem' }}>
            {done ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', border: `1px solid rgba(73,0,0,0.3)`, borderRadius: '3px', color: C.mahogany, fontWeight: 600, fontSize: '0.875rem', fontFamily: 'var(--font-montserrat-var), sans-serif', background: 'rgba(255,255,255,0.5)' }}>
                <span>✓</span> You&apos;re on the list. We&apos;ll be in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', border: `1px solid rgba(73,0,0,0.2)`, borderRadius: '3px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{ flex: '1 1 200px', minWidth: '140px', padding: '0.875rem 1.25rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.75)', border: 'none', outline: 'none', fontFamily: 'var(--font-montserrat-var), sans-serif', color: '#111110', transition: 'background 0.2s' }}
                  onFocus={e => (e.currentTarget.style.background = '#fff')}
                  onBlur={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.75)')}
                />
                <button
                  type="submit"
                  disabled={loading}
                  style={{ flex: '0 0 auto', minWidth: '100px', padding: '0.875rem 1.25rem', background: C.mahogany, color: C.champagne, fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s', minHeight: '44px' }}
                >
                  {loading ? '…' : 'Notify me'}
                </button>
              </form>
            )}
          </AnimateIn>
        </StaggerContainer>
      </div>
    </section>
  )
}
