"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: scrolled ? "0.9rem 3rem" : "1.25rem 3rem",
      background: scrolled ? "rgba(250,247,242,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(107,26,42,0.1)" : "none",
      transition: "all 0.4s ease",
    }}>
      <a href="#hero" style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.15rem", fontWeight: 700, color: scrolled ? "#6B1A2A" : "#F5EFE0", textDecoration: "none", transition: "color 0.3s" }}>
        Not a Croissant™
      </a>
      <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
        {[
          { label: "Our Story", href: "#story" },
          { label: "Process", href: "#process" },
          { label: "Order", href: "#order" },
          { label: "FAQ", href: "#faq" },
        ].map(link => (
          <li key={link.label}>
            <a href={link.href} style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: scrolled ? "#6B5B4E" : "rgba(245,239,224,0.85)", textDecoration: "none" }}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#order" style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, background: scrolled ? "#6B1A2A" : "#F5EFE0", color: scrolled ? "#F5EFE0" : "#6B1A2A", padding: "0.5rem 1.2rem", borderRadius: 2, textDecoration: "none", transition: "all 0.3s" }}>
            Pre-order
          </a>
        </li>
      </ul>
    </nav>
  );
}
