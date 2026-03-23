export default function HowItWorks() {
  return (
    <section id="how" style={{ padding: "7rem 3rem", background: "#FAF7F2" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>Pre-orders</p>
        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410", marginBottom: "4rem" }}>How it works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "3rem" }}>
          {[
            { n: "01", title: "Choose your order", desc: "Dulce de leche by the unit, tradicionales by the dozen — fresh or frozen. Fill out the form or DM us on Instagram @notacroissantnyc." },
            { n: "02", title: "We confirm & get to work", desc: "We'll confirm your order, pricing, and pickup or delivery details personally. Every medialuna is made fresh — allow 72 hours." },
            { n: "03", title: "Pick up & enjoy", desc: "We coordinate pickup in NYC, or confirm delivery depending on your date and quantity. Fresh, boxed, ready." },
          ].map(step => (
            <div key={step.n}>
              <div style={{ fontFamily: "var(--font-display, serif)", fontSize: "4rem", fontWeight: 900, color: "rgba(107,26,42,0.15)", lineHeight: 1, marginBottom: "1.25rem" }}>{step.n}</div>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.3rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.75rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#6B5B4E", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
