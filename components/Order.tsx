'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

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
    <section id="order" style={{ background: C.champagne, padding: '8rem 0' }}>
      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>

        <FadeIn>
          <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(73,0,0,0.7)', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
            Pre-orders open
          </span>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, color: C.mahogany, fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
            Want one?<br/>DM us.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{ fontFamily: 'var(--font-playfair-var), serif', fontStyle: 'italic', color: 'rgba(73,0,0,0.65)', fontSize: '1.2rem', margin: 0 }}>
            No website checkout. No middleman. Just a DM and 72 hours.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <a
            href="https://instagram.com/notacroissantnyc"
            target="_blank"
            rel="noopener"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: C.mahogany, color: C.champagne, fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', boxShadow: '0 8px 30px rgba(73,0,0,0.25)', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(73,0,0,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(73,0,0,0.25)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            @notacroissantnyc
          </a>
        </FadeIn>

        <FadeIn delay={0.25} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '100%', maxWidth: '24rem', color: 'rgba(73,0,0,0.45)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
          <span style={{ flex: 1, height: '1px', background: 'rgba(73,0,0,0.25)' }} />
          <span>or drop your email</span>
          <span style={{ flex: 1, height: '1px', background: 'rgba(73,0,0,0.25)' }} />
        </FadeIn>

        <FadeIn delay={0.3} style={{ width: '100%', maxWidth: '24rem' }}>
          {done ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', border: `1px solid rgba(73,0,0,0.3)`, borderRadius: '3px', color: C.mahogany, fontWeight: 600, fontSize: '0.875rem' }}>
              ✓ You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', border: `1px solid rgba(73,0,0,0.2)`, borderRadius: '3px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{ flex: 1, padding: '0.875rem 1.25rem', fontSize: '0.875rem', background: 'rgba(255,255,255,0.75)', border: 'none', outline: 'none', fontFamily: 'var(--font-montserrat-var), sans-serif', color: '#111110' }}
                onFocus={e => (e.currentTarget.style.background = '#fff')}
                onBlur={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.75)')}
              />
              <button
                type="submit"
                disabled={loading}
                style={{ padding: '0.875rem 1.25rem', background: C.mahogany, color: C.champagne, fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s' }}
              >
                {loading ? '…' : 'Notify me'}
              </button>
            </form>
          )}
        </FadeIn>

      </div>
    </section>
  )
}
