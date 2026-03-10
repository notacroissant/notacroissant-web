'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Parallax bg */}
      <div ref={bgRef} style={{ position: 'absolute', inset: '-10%', willChange: 'transform' }}>
        <Image src="/hero.jpg" alt="Medialuna" fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(73,0,0,0.72) 0%, rgba(20,0,0,0.55) 60%, rgba(0,0,0,0.35) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 1.5rem', gap: '1.5rem' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.1rem', borderRadius: '99px', border: '1px solid rgba(246,221,190,0.3)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)', color: '#f6ddbe', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 0 0 rgba(74,222,128,0.4)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          Pre-orders open — DM us on Instagram
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22,1,0.36,1] }}
        >
          <Image src="/logo.png" alt="Not a Croissant™" width={180} height={70} style={{ filter: 'brightness(0) invert(1)' }} />
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22,1,0.36,1] }}
          style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}
        >
          Not a croissant.<br/>Better.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22,1,0.36,1] }}
          style={{ fontFamily: 'var(--font-playfair-var), serif', fontStyle: 'italic', color: 'rgba(246,221,190,0.9)', fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', margin: 0 }}
        >
          Our own medialuna, made in New York.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="https://instagram.com/notacroissantnyc"
            target="_blank"
            rel="noopener"
            style={{ padding: '0.9rem 2.2rem', background: '#f6ddbe', color: '#490000', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Pre-order via DM
          </a>
          <a
            href="#how"
            style={{ padding: '0.9rem 2.2rem', border: '1.5px solid rgba(255,255,255,0.5)', color: '#fff', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '3px', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = ''; }}
          >
            How it works
          </a>
        </motion.div>
      </div>

      {/* Scroll arrow */}
      <a href="#story" style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(246,221,190,0.5)', transition: 'color 0.2s', animation: 'bounce 2.5s infinite', zIndex: 1 }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </a>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
      `}</style>
    </section>
  )
}
