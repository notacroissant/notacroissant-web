'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.88])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5], [0.035, 0.06])

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Content always visible - no scroll-based hiding
  const contentOpacity = 1
  const contentScale = 1

  return (
    <section id="hero" ref={sectionRef} style={{ position: 'relative', height: '100vh', minHeight: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 'env(safe-area-inset-top)', touchAction: 'pan-y' }}>
      {/* ── Video layer ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-shot-of-the-inside-of-a-mixer-when-mixing-50037-large.mp4" type="video/mp4" />
      </video>

      {/* ── Grain texture ── */}
      <motion.div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: grainOpacity,
      }} />

      {/* ── Parallax image layer ── */}
      <motion.div ref={bgRef} style={{ position: 'absolute', inset: 0, scale: bgScale, willChange: 'transform', zIndex: 2 }}>
        <Image src="/hero.jpg" alt="Medialuna" fill style={{ objectFit: 'cover' }} priority />
      </motion.div>

      {/* ── Cinematic color grade overlay ── */}
      <motion.div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(73,0,0,0.82) 0%, rgba(20,0,0,0.66) 55%, rgba(0,0,0,0.46) 100%)',
        opacity: overlayOpacity,
        zIndex: 3,
      }} />

      {/* ── Vignette ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />

      {/* ── Light sweep ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(105deg, transparent 30%, rgba(246,221,190,0.05) 50%, transparent 70%)',
        zIndex: 3,
        animation: 'lightSweep 9s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          gap: '1.5rem',
          y: contentY,
          opacity: contentOpacity,
          scale: contentScale,
        }}
      >
        {/* Badge — visible immediately */}
        <motion.div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '99px',
            border: '1px solid rgba(246,221,190,0.3)',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#f6ddbe',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 0 0 rgba(74,222,128,0.4)',
            animation: 'pulse 2s infinite',
            display: 'inline-block',
          }} />
          Pre-orders open — DM us on Instagram
        </motion.div>

        {/* Logo — visible immediately */}
        <motion.div>
          <Image src="/logo.png" alt="Not a Croissant™" width={180} height={70} style={{ filter: 'brightness(0) invert(1)' }} />
        </motion.div>

        {/* H1 — visible immediately */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              style={{
                fontFamily: 'var(--font-montserrat-var), sans-serif',
                fontWeight: 800,
                color: '#fff',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Not a croissant.
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              style={{
                fontFamily: 'var(--font-montserrat-var), sans-serif',
                fontWeight: 800,
                color: '#f6ddbe',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Better.
            </motion.h1>
          </div>
        </div>

        {/* Subtitle — visible immediately */}
        <motion.p
          style={{
            fontFamily: 'var(--font-playfair-var), serif',
            fontStyle: 'italic',
            color: 'rgba(246,221,190,0.88)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: 0,
          }}
        >
          Our own medialuna, made in New York.
        </motion.p>

        {/* CTAs — visible immediately */}
        <motion.div style={{
            display: 'flex',
            gap: '0.875rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '0.5rem',
          }}
        >
          <a
            href="https://instagram.com/notacroissantnyc"
            target="_blank"
            rel="noopener"
            style={{
              padding: '0.9rem 2.2rem',
              background: '#f6ddbe',
              color: '#490000',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '3px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            Pre-order via DM
          </a>
          <a
            href="#how"
            style={{
              padding: '0.9rem 2.2rem',
              border: '1.5px solid rgba(255,255,255,0.5)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '3px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#fff'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.transform = ''
            }}
          >
            How it works
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#story"
        style={{
          position: 'absolute',
          bottom: 'max(2.5rem, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(246,221,190,0.45)',
          transition: 'color 0.2s',
          animation: 'bounce 2.5s infinite',
          zIndex: 10,
          minWidth: '44px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </motion.a>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(9px); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          70% { box-shadow: 0 0 0 9px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
        @keyframes lightSweep {
          0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
