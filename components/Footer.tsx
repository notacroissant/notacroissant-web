export default function Footer() {
  return (
    <footer style={{ background: "#1C1410", padding: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1.5rem" }}>
      <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "1rem", fontWeight: 700, color: "#F5EFE0" }}>
        Not a Croissant™
      </div>
      <nav style={{ display: "flex", gap: "2rem", flexWrap: "wrap" as const }}>
        {[
          { label: "Story", href: "#story" },
          { label: "Process", href: "#process" },
          { label: "Order", href: "#order" },
          { label: "FAQ", href: "#faq" },
          { label: "Instagram", href: "https://instagram.com/notacroissantnyc" },
        ].map(link => (
          <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            style={{ fontSize: "0.78rem", color: "rgba(245,239,224,0.4)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
            {link.label}
          </a>
        ))}
      </nav>
      <span style={{ fontSize: "0.72rem", color: "rgba(245,239,224,0.25)", letterSpacing: "0.05em" }}>
        © 2026 Not a Croissant™ · New York
      </span>
    </footer>
  );
}
