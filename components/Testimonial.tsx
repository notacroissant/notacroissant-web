import FadeIn from './FadeIn'

export default function Testimonial() {
  return (
    <section style={{ background: '#490000', padding: '7rem 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
          <blockquote style={{ fontFamily: 'var(--font-playfair-var), serif', fontStyle: 'italic', color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2.25rem)', lineHeight: 1.5, position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-1.5rem', left: '-1rem', fontSize: '5rem', color: 'rgba(246,221,190,0.2)', fontFamily: 'var(--font-playfair-var), serif', lineHeight: 1 }}>&ldquo;</span>
            I&apos;ve had a lot of pastries. This one made me stop talking mid-bite.
          </blockquote>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.6)' }}>
            Early taster — Brooklyn, NY
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
