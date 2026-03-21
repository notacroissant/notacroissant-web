'use client'
import Image from 'next/image'
import AnimateIn from './AnimateIn'

export default function Footer() {
  return (
    <footer style={{ background: '#1c1c1a', padding: '3.5rem 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <AnimateIn type="left" duration={0.7} delay={0}>
          <a href="#hero">
            <Image src="/logo-light.png" alt="Not a Croissant™" width={130} height={50} style={{ opacity: 0.85, display: 'block' }} />
          </a>
        </AnimateIn>

        <AnimateIn type="up" duration={0.7} delay={0.08}>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {[['#story', 'Story'], ['#process', 'Process'], ['#order', 'Join']].map(([href, label]) => (
              <a key={href} href={href} style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.4)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'var(--font-montserrat-var), sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f6ddbe')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(246,221,190,0.4)')}
              >{label}</a>
            ))}
          </nav>
        </AnimateIn>

        <AnimateIn type="up" duration={0.7} delay={0.16}>
          <p style={{ fontSize: '0.72rem', color: 'rgba(246,221,190,0.3)', letterSpacing: '0.04em', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>© 2026 Not a Croissant™ · New York</p>
        </AnimateIn>

        <AnimateIn type="right" duration={0.7} delay={0.08}>
          <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noopener" style={{ color: 'rgba(246,221,190,0.45)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f6ddbe')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(246,221,190,0.45)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </AnimateIn>
      </div>
    </footer>
  )
}
