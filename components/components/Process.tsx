'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimateIn from './AnimateIn'
import StaggerContainer from './StaggerContainer'

const stats = [
  { num: '72h', label: 'By hand' },
  { num: '0', label: 'Shortcuts' },
  { num: '100%', label: 'Scratch' },
]

export default function Process() {
  const imgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="process" style={{ background: '#490000', position: 'relative', overflow: 'hidden' }}>

      {/* Wrapper: max-width + grid */}
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', minHeight: '80vh' }}>

        {/* ── Left: Text ── */}
        <StaggerContainer style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0', position: 'relative', zIndex: 2 }} staggerDelay={0.14} type="up">
          <AnimateIn style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} type="up" delay={0}>
            <span style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.8)', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
              The Process
            </span>

            {/* H2 — dramatic clip reveal per line */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ overflow: 'hidden' }}>
                <AnimateIn type="clipUp" duration={1.0} delay={0.08}>
                  <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 3.5vw, 3.25rem)', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
                    72 hours.
                  </h2>
                </AnimateIn>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <AnimateIn type="clipUp" duration={1.0} delay={0.22}>
                  <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 3.5vw, 3.25rem)', color: '#f6ddbe', lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
                    By hand.
                  </h2>
                </AnimateIn>
              </div>
            </div>

            <AnimateIn type="up" duration={0.7} delay={0.38}>
              <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'rgba(246,221,190,0.62)', maxWidth: '400px', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
                Every medialuna takes 72 hours. Folded, proofed, and finished our way — from scratch, every time. Our recipe. You cannot rush it.
              </p>
            </AnimateIn>

            {/* Stats — stagger in */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', paddingTop: '0.5rem', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                  <AnimateIn type="scale" duration={0.6} delay={0.5 + i * 0.12}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 0, paddingRight: i < stats.length - 1 ? '2rem' : 0, marginRight: i < stats.length - 1 ? '2rem' : 0, borderRight: i < stats.length - 1 ? '1px solid rgba(246,221,190,0.18)' : 'none' }}>
                      <span style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: '#f6ddbe', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</span>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.4)', whiteSpace: 'nowrap', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>{s.label}</span>
                    </div>
                  </AnimateIn>
                </div>
              ))}
            </div>
          </AnimateIn>
        </StaggerContainer>

        {/* ── Right: Image — parallax scroll ── */}
        <div ref={imgRef} style={{ position: 'relative', minHeight: '420px', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: '-12%', y: imgY, willChange: 'transform' }}>
            <Image src="/process.jpg" alt="Dough being prepared" fill style={{ objectFit: 'cover', filter: 'brightness(0.6) saturate(0.75)' }} />
          </motion.div>
          {/* Gradient fade to dark on left side */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(73,0,0,0.5) 0%, transparent 50%)', zIndex: 1 }} />
        </div>

      </div>
    </section>
  )
}
