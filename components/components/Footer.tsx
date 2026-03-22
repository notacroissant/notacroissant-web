'use client'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: '#1c1c1a', padding: '3.5rem 0' }}>
      <div className="footer-grid" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '2rem' }}>
        <a href="#hero">
          <Image src="/logo-light.png" alt="Not a Croissant™" width={130} height={50} style={{ opacity: 0.85, display: 'block', maxWidth: '100%', height: 'auto' }} />
        </a>

        <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[['#story', 'Story'], ['#process', 'Process'], ['#order', 'Join']].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.4)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'var(--font-montserrat-var), sans-serif', padding: '8px', minHeight: '44px', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f6ddbe')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(246,221,190,0.4)')}
            >{label}</a>
          ))}
        </nav>

        <p style={{ fontSize: '0.72rem', color: 'rgba(246,221,190,0.3)', letterSpacing: '0.04em', fontFamily: 'var(--font-montserrat-var), sans-serif', textAlign: 'right' }}>© 2026 Not a Croissant™ · New York</p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            justify-items: center !important;
            gap: 1.5rem !important;
          }
          .footer-grid nav {
            gap: 1rem !important;
          }
        }
      `}</style>
    </footer>
  )
}
