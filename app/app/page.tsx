'use client'

import { useEffect, useState, useRef } from 'react'

// Flour particles component
function FlourParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 2 + Math.random() * 4,
  }))

  return (
    <div className="flour-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="flour-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  )
}

// Mouse tracking for parallax
function useMouseParallax<T extends HTMLElement = HTMLDivElement>(
  ref: React.RefObject<T | null>,
  strength: number = 20
) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / centerX
      const y = (e.clientY - centerY) / centerY

      setOffset({
        x: x * strength,
        y: y * strength,
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    return () => element.removeEventListener('mousemove', handleMouseMove)
  }, [ref, strength])

  return offset
}

// Hero Section
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const parallax = useMouseParallax(imageRef, 15)

  return (
    <section className="hero" ref={heroRef}>
      <FlourParticles />
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">Not a</span>
          <span className="hero-title-main">Croissant</span>
        </h1>
        <p className="hero-subtitle">Medialunas, made in NYC</p>
      </div>
      <div
        className="hero-image-container"
        ref={imageRef}
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        }}
      >
        <img
          src="/hero.jpg"
          alt="Fresh medialunas"
          className="hero-image"
        />
      </div>
    </section>
  )
}

// Product Card Component
function ProductCard({
  name,
  price,
  image,
  description,
}: {
  name: string
  price: string
  image: string
  description: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const parallax = useMouseParallax(cardRef, 10)

  return (
    <div
      className="product-card"
      ref={cardRef}
      style={{
        transform: `translate(${parallax.x}px, ${parallax.y}px)`,
      }}
    >
      <div className="product-image-wrapper">
        <img src={image} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <span className="product-price">{price}</span>
      </div>
    </div>
  )
}

// Products Section
function Products() {
  return (
    <section className="products">
      <h2 className="section-title">Our Medialunas</h2>
      <div className="products-grid">
        <ProductCard
          name="Classic"
          price="$4"
          image="/detail.jpg"
          description="Butter laminated dough, golden exterior"
        />
        <ProductCard
          name="Dulce de Leche"
          price="$5"
          image="/process.jpg"
          description="Classic filled with Argentine caramel"
        />
      </div>
    </section>
  )
}

// Process Section
function Process() {
  return (
    <section className="process">
      <div className="process-content">
        <h2 className="process-title">72 hours.</h2>
        <p className="process-subtitle">Made by hand.</p>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="cta">
      <a
        href="https://instagram.com/notacroissantnyc"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button"
      >
        DM to order
      </a>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://instagram.com/notacroissantnyc"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        @notacroissantnyc
      </a>
    </footer>
  )
}

// Main Page
export default function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}
