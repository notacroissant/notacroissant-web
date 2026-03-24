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
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="process" style={{ background: '#490000', position: 'relative', overflow: 'hidden' }}>

      {/* ── Desktop: side-by-side | Mobile: image top ── */}
      <div className="process-grid" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', alignItems: 'stretch', minHeight: '85vh' }}>

        {/* ── Left: Image ── */}
        <div ref={imgRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }} className="process-img-col">
          <motion.div style={{ position: 'absolute', inset: '-8%', y: imgY, willChange: 'transform' }}>
            <Image src="/process.JPEG" alt="Dough being prepared" fill style={{ objectFit: 'cover', filter: 'brightness(0.65) saturate(0.8)' }} />
          </motion.div>
          {/* Gradient fade right side */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, rgba(73,0,0,0.6) 100%)', zIndex: 1 }} />
        </div>

        {/* ── Right: Text ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2.5rem', gap: '0', position: 'relative', zIndex: 2 }}>
          <StaggerContainer style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} staggerDelay={0.14} type="up">

            <AnimateIn type="up" delay={0}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.75)', fontFamily: 'var(--font-montserrat-var), sans-serif', display: 'block', marginBottom: '0.5rem' }}>
                The Process
              </span>
            </AnimateIn>

            {/* H2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              <div style={{ overflow: 'hidden' }}>
                <AnimateIn type="clipUp" duration={1.0} delay={0.08}>
                  <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 8vw, 4rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                    72 hours.
                  </h2>
                </AnimateIn>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <AnimateIn type="clipUp" duration={1.0} delay={0.22}>
                  <h2 style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(2.8rem, 8vw, 4rem)', color: '#f6ddbe', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
                    By hand.
                  </h2>
                </AnimateIn>
              </div>
            </div>

            <AnimateIn type="up" duration={0.7} delay={0.38}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(246,221,190,0.8)', maxWidth: '380px', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>
                Every medialuna takes 72 hours. Folded, proofed, and finished our way — from scratch, every time.
              </p>
            </AnimateIn>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', paddingTop: '2rem', flexWrap: 'wrap' }}>
              {stats.map((s, i) => (
                <AnimateIn key={s.label} type="scale" duration={0.6} delay={0.5 + i * 0.12}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minWidth: 0, paddingRight: i < stats.length - 1 ? '1.5rem' : 0, marginRight: i < stats.length - 1 ? '1.5rem' : 0, borderRight: i < stats.length - 1 ? '1px solid rgba(246,221,190,0.25)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', color: '#f6ddbe', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</span>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(246,221,190,0.6)', whiteSpace: 'nowrap', fontFamily: 'var(--font-montserrat-var), sans-serif' }}>{s.label}</span>
                  </div>
                </AnimateIn>
              ))}
            </div>

          </StaggerContainer>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .process-img-col {
            min-height: 260px !important;
            height: 260px !important;
          }
          .process-grid > div:last-child {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
