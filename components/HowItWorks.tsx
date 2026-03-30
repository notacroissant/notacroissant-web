export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: "5rem 1.5rem", background: "#FAF7F2" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>
          How to order / Cómo ordenar
        </p>
        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410", marginBottom: "3rem" }}>
          Simple.<br />Personal.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {[
            {
              n: "01",
              title: "Order online or via DM",
              titleEs: "Ordená por la web o por DM",
              desc: "Fill out the form on this page or DM us on Instagram @notacroissantnyc. Tell us what you want, how many, and your preferred date.",
              descEs: "Completá el formulario o mandanos un DM en Instagram. Decinos qué querés, cuántos, y la fecha que preferís.",
            },
            {
              n: "02",
              title: "We confirm & get to work",
              titleEs: "Confirmamos y nos ponemos a trabajar",
              desc: "We'll confirm your order personally — usually within a few hours. Every medialuna is made fresh from scratch. Allow at least 72 hours.",
              descEs: "Te confirmamos el pedido personalmente, generalmente en pocas horas. Cada medialuna se hace desde cero. Necesitamos al menos 72 horas.",
            },
            {
              n: "03",
              title: "Pickup or delivery",
              titleEs: "Retiro o envío",
              desc: "Pick up in NYC at a confirmed location. Delivery available depending on your date and order size — we'll confirm when we reach out.",
              descEs: "Retirás en NYC en un punto confirmado. Delivery disponible según la fecha y la cantidad del pedido — te lo confirmamos al coordinar.",
            },
          ].map(step => (
            <div key={step.n}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "4rem", fontWeight: 900, color: "rgba(107,26,42,0.15)", lineHeight: 1, marginBottom: "1.25rem" }}>{step.n}</div>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.2rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.25rem" }}>{step.title}</h3>
              <h4 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1rem", fontWeight: 400, fontStyle: "italic", color: "#6B1A2A", marginBottom: "0.75rem" }}>{step.titleEs}</h4>
              <p style={{ fontSize: "0.88rem", color: "#6B5B4E", lineHeight: 1.7, marginBottom: "0.5rem" }}>{step.desc}</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(107,90,78,0.7)", lineHeight: 1.7, fontStyle: "italic" }}>{step.descEs}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "3.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" as const }}>
          <a href="#order" style={{ display: "inline-flex", alignItems: "center", background: "#6B1A2A", color: "#F5EFE0", padding: "0.9rem 2rem", borderRadius: 2, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            Order online / Ordenar →
          </a>
          <a href="https://instagram.com/notacroissantnyc" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1.5px solid #6B1A2A", color: "#6B1A2A", padding: "0.9rem 2rem", borderRadius: 2, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="3.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            DM on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
