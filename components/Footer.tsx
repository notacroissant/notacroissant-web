"use client";
export default function Footer() {
  const links = [
    { label: "Our Story", href: "#story" },
    { label: "Process", href: "#process" },
    { label: "Order", href: "#order" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <footer style={{ background: "#1C1410", padding: "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: "3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(245,239,224,0.08)" }}>

          {/* Logo + tagline */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem", maxWidth: 280 }}>
            <img src="/logo-light.png" alt="Not a Croissant™" style={{ height: 40, width: "auto" }} />
            <p style={{ fontSize: "0.85rem", color: "rgba(245,239,224,0.45)", lineHeight: 1.7, fontFamily: "var(--font-display, serif)", fontStyle: "italic" }}>
              Medialunas, made in New York.<br />72 hours. By hand. No shortcuts.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,239,224,0.3)", marginBottom: "0.25rem" }}>
              Navigate
            </span>
            {links.map(link => (
              <a key={link.label} href={link.href} style={{ fontSize: "0.85rem", color: "rgba(245,239,224,0.6)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#F5EFE0"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,239,224,0.6)"}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Social + CTA */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(245,239,224,0.3)" }}>
              Follow us
            </span>
            <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "rgba(245,239,224,0.6)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#F5EFE0"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,239,224,0.6)"}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="3.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              @notacroissantnyc
            </a>
            <a href="#order" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#6B1A2A", color: "#F5EFE0", padding: "0.75rem 1.5rem", borderRadius: 2, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#8B2A3A"}
              onMouseLeave={e => e.currentTarget.style.background = "#6B1A2A"}>
              Pre-order now →
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem", paddingTop: "1.5rem" }}>
          <span style={{ fontSize: "0.72rem", color: "rgba(245,239,224,0.2)", letterSpacing: "0.05em" }}>
            © 2026 Not a Croissant™ · New York
          </span>
          <span style={{ fontSize: "0.72rem", color: "rgba(245,239,224,0.2)", letterSpacing: "0.05em" }}>
            Made with love in NYC 🥐
          </span>
        </div>
      </div>
    </footer>
  );
}
