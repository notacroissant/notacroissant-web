'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Our Story', href: '#story' },
    { label: 'Process', href: '#process' },
    { label: 'Join', href: '#order' },
  ]

  const linkStyle = (scrolled: boolean) => ({
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    color: scrolled ? '#111110' : 'rgba(255,255,255,0.9)',
    transition: 'color 0.2s',
  })

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          background: scrolled ? 'rgba(246,221,190,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'max(1rem, env(safe-area-inset-top))' }}>
          {/* Logo */}
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Not a Croissant™"
              width={160}
              height={62}
              style={{
                filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                transition: 'filter 0.3s ease',
              }}
            />
          </a>

          {/* Desktop links */}
          <ul className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {links.map(link => (
              <li key={link.href}>
                <a href={link.href} style={linkStyle(scrolled)}
                  onMouseEnter={e => (e.currentTarget.style.color = scrolled ? '#490000' : '#f6ddbe')}
                  onMouseLeave={e => (e.currentTarget.style.color = scrolled ? '#111110' : 'rgba(255,255,255,0.9)')}
                >{link.label}</a>
              </li>
            ))}
            <li>
              <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noopener"
                style={{ color: scrolled ? '#111110' : 'rgba(255,255,255,0.9)', transition: 'color 0.2s', display: 'flex' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </li>
          </ul>

          {/* Mobile: Instagram + Hamburger */}
          <div className="nav-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noopener"
              style={{ color: scrolled ? '#111110' : '#fff', display: 'flex' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '44px', minHeight: '44px', justifyContent: 'center', alignItems: 'center' }}
            >
              <span style={{ display: 'block', width: '24px', height: '2px', background: scrolled ? '#111110' : '#fff', transition: 'all 0.3s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: scrolled ? '#111110' : '#fff', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: scrolled ? '#111110' : '#fff', transition: 'all 0.3s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 40, background: '#490000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{ fontFamily: 'var(--font-montserrat-var), sans-serif', fontWeight: 800, fontSize: '2rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#f6ddbe', textDecoration: 'none' }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
