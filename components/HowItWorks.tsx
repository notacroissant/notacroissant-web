import FadeIn from './FadeIn'

const steps = [
  { num: '01', title: 'DM us on Instagram', desc: null, hasLink: true },
  { num: '02', title: 'We get to work', desc: 'Every medialuna is made fresh, by hand. Allow 72 hours from order to pickup.', hasLink: false },
  { num: '03', title: 'Pick up & enjoy', desc: "We'll coordinate pickup details with you directly. Fresh, boxed, ready.", hasLink: false },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ background: '#f6ddbe', borderTop: '1px solid rgba(73,0,0,0.08)', padding: '7rem 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#490000' }}>Pre-orders</span>
          <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#490000', letterSpacing: '-0.025em', marginTop: '0.5rem' }}>How it works</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', transition: 'all 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.06),0 16px 40px rgba(73,0,0,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)'; }}
              >
                <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(73,0,0,0.5)' }}>{step.num}</span>
                <h3 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#490000', lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(73,0,0,0.65)' }}>
                  {step.hasLink ? (
                    <>Send us a message at <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noopener" style={{ color: '#490000', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>@notacroissantnyc</a> to place your order.</>
                  ) : step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
