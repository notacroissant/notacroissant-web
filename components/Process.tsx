'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

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
      <div className="process-grid">

        {/* Image */}
        <div ref={imgRef} className="process-img-col" style={{ position: 'relative', overflow: 'hidden' }}>
          <motion.div style={{ position: 'absolute', inset: '-8%', y: imgY, willChange: 'transform' }}>
            <Image src="/process.JPEG" alt="Dough being prepared" fill style={{ objectFit: 'cover', filter: 'brightness(0.7) saturate(0.85)' }} />
          </motion.div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 50%, rgba(73,0,0,0.7) 100%)', zIndex: 1 }} />
        </div>

        {/* Text */}
        <div className="process-text">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(246,221,190,0.6)',
              fontFamily: 'var(--font-montserrat-var), sans-serif',
            }}>
              The Process
            </span>

            <div>
              <h2 style={{
                fontFamily: 'var(--font-montserrat-var), sans-serif',
                fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                color: '#fff', lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0,
              }}>
                72 hours.
              </h2>
              <h2 style={{
                fontFamily: 'var(--font-montserrat-var), sans-serif',
                fontWeight: 800, fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                color: '#f6ddbe', lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0,
              }}>
                By hand.
              </h2>
            </div>

            <p style={{
              fontSize: '1rem', lineHeight: 1.85,
              color: 'rgba(246,221,190,0.75)',
              fontFamily: 'var(--font-montserrat-var), sans-serif',
              maxWidth: '360px',
            }}>
              Every medialuna takes 72 hours. Folded, proofed, and finished our way — from scratch, every time.
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '0',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(246,221,190,0.12)',
            }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  display: 'flex', flexDirection: 'column', gap: '0.3rem',
                  paddingRight: i < stats.length - 1 ? '2rem' : 0,
                  marginRight: i < stats.length - 1 ? '2rem' : 0,
                  borderRight: i < stats.length - 1 ? '1px solid rgba(246,221,190,0.2)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-montserrat-var), sans-serif',
                    fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    color: '#f6ddbe', lineHeight: 1, letterSpacing: '-0.02em',
                  }}>{s.num}</span>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(246,221,190,0.5)',
                    fontFamily: 'var(--font-montserrat-var), sans-serif',
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .process-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
          min-height: 88vh;
        }
        .process-img-col {
          min-height: 320px;
        }
        .process-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 5rem 4rem;
        }
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .process-img-col {
            height: 300px;
            min-height: 300px;
          }
          .process-text {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
