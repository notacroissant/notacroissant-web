import Image from 'next/image'
import FadeIn from './FadeIn'

export default function Story() {
  return (
    <section id="story" style={{ background: '#f6ddbe', padding: '7rem 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
        <FadeIn style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#490000' }}>What is a Medialuna?</span>
          <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)', color: '#490000', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
            Different.<br/>On purpose.
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'rgba(73,0,0,0.65)', maxWidth: '420px' }}>
            Flakier than a croissant. Lighter than a brioche. A little sweet, a little addictive. The medialuna is its own thing — and so are we. Our recipe, made from scratch in New York. No shortcuts. No exceptions.
          </p>
          <a
            href="https://instagram.com/notacroissantnyc"
            target="_blank"
            rel="noopener"
            style={{ display: 'inline-block', padding: '0.9rem 2.2rem', background: '#490000', color: '#f6ddbe', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', transition: 'all 0.2s ease', alignSelf: 'flex-start' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            Pre-order via DM
          </a>
        </FadeIn>

        <FadeIn direction="right">
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(73,0,0,0.12)' }} className="group">
            <Image src="/detail.jpg" alt="Medialuna detail" fill style={{ objectFit: 'cover', transition: 'transform 0.7s ease' }} className="group-hover:scale-105" />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
