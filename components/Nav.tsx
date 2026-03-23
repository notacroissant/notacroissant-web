"use client";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Our Story", href: "#story" },
    { label: "Process", href: "#process" },
    { label: "Order", href: "#order" },
    { label: "FAQ", href: "#faq" },
  ];

  const bg = scrolled || menuOpen ? "rgba(250,247,242,0.97)" : "transparent";
  const logoColor = scrolled || menuOpen ? "#6B1A2A" : "#F5EFE0";
  const linkColor = scrolled || menuOpen ? "#6B5B4E" : "rgba(245,239,224,0.85)";

  return (
    <>
      <style>{`
        .nav-links-desktop { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1rem 1.5rem",
        background: bg,
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid rgba(107,26,42,0.1)" : "none",
        transition: "all 0.4s ease",
      }}>
        <a href="#hero" style={{ fontFamily: "var(--font-display, serif)", fontSize: "1rem", fontWeight: 700, color: logoColor, textDecoration: "none" }}>
          Not a Croissant™
        </a>

        {/* Desktop */}
        <ul className="nav-links-desktop" style={{ gap: "1.5rem", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: linkColor, textDecoration: "none" }}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#order" style={{ fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, background: scrolled ? "#6B1A2A" : "#F5EFE0", color: scrolled ? "#F5EFE0" : "#6B1A2A", padding: "0.45rem 1rem", borderRadius: 2, textDecoration: "none" }}>
              Pre-order
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column" as const, gap: "5px", padding: "4px" }}>
          <span style={{ display: "block", width: 24, height: 2, background: logoColor, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 2, background: logoColor, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 2, background: logoColor, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
          background: "rgba(250,247,242,0.97)", backdropFilter: "blur(12px)",
          paddingTop: "5rem", paddingBottom: "2rem",
          display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.25rem",
          borderBottom: "1px solid rgba(107,26,42,0.1)",
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" as const, color: "#1C1410", textDecoration: "none", padding: "0.85rem 2rem", width: "100%", textAlign: "center" as const }}>
              {l.label}
            </a>
          ))}
          <a href="#order" onClick={() => setMenuOpen(false)}
            style={{ marginTop: "0.75rem", background: "#6B1A2A", color: "#F5EFE0", padding: "0.85rem 2.5rem", borderRadius: 2, fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Pre-order now →
          </a>
        </div>
      )}
    </>
  );
}
