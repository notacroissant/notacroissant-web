import Image from 'next/image'
import FadeIn from './FadeIn'

const stats = [
  { num: '72h', label: 'By hand' },
  { num: '0', label: 'Shortcuts' },
  { num: '100%', label: 'Scratch' },
]

export default function Process() {
  return (
    <section id="process" style={{ background: '#490000', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', minHeight: '75vh' }}>
      <FadeIn style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem', padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 4rem)' }}>
        <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.6)' }}>The Process</span>
        <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 3.5vw, 3.25rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
          72 hours.<br/>By hand.
        </h2>
        <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(246,221,190,0.65)', maxWidth: '380px' }}>
          Every medialuna takes 72 hours. Folded, proofed, and finished our way — from scratch, every time. Our recipe. You cannot rush it.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 0 }}>
                <span style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: '#f6ddbe', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</span>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.45)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
              {i < stats.length - 1 && <div style={{ width: '1px', height: '40px', background: 'rgba(246,221,190,0.18)', flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </FadeIn>

      <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
        <Image src="/process.jpg" alt="Dough being prepared" fill style={{ objectFit: 'cover', filter: 'brightness(0.65) saturate(0.8)' }} />
      </div>
    </section>
  )
}
