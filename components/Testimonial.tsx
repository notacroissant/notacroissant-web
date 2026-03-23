export default function Testimonial() {
  return (
    <section style={{ background: "#EDE4CE", padding: "6rem 3rem", textAlign: "center" }}>
      <blockquote style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontStyle: "italic", color: "#1C1410", maxWidth: 700, margin: "0 auto 1.5rem", lineHeight: 1.4 }}>
        "I've had a lot of pastries. This one made me stop talking mid-bite."
      </blockquote>
      <cite style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#6B5B4E", fontStyle: "normal" }}>
        Early taster — Brooklyn, NY
      </cite>
    </section>
  );
}
