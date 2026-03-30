"use client";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What is a medialuna? / ¿Qué es una medialuna?",
    a: "A medialuna is Argentina's pastry — lighter than a croissant, with a subtle sweetness and a signature glaze. The name means 'half moon.' Ours are made from scratch in New York using a 72-hour process. No shortcuts.\n\nLa medialuna es la factura argentina por excelencia — más liviana que un croissant, levemente dulce y con un glaze característico. Las nuestras se hacen desde cero en Nueva York. Sin atajos."
  },
  {
    q: "What do you offer? / ¿Qué ofrecen?",
    a: "Three varieties:\n\n🥐 Clásicas — por docena. Fresh $25 · Frozen $20\n🍫 Rellenas dulce de leche — por unidad $4 · por docena $42\n🧀 Rellenas jamón & queso — por unidad $4 · por docena $42"
  },
  {
    q: "How do I order? / ¿Cómo ordeno?",
    a: "Two ways:\n\n1. Fill out the form on this page — we'll confirm within a few hours.\n2. DM us on Instagram @notacroissantnyc.\n\nDos formas:\n1. Completá el formulario en esta página — confirmamos en pocas horas.\n2. Mandanos un DM en Instagram @notacroissantnyc."
  },
  {
    q: "How far in advance do I need to order? / ¿Con cuánta anticipación tengo que ordenar?",
    a: "At least 72 hours. That's not a policy — it's the actual time the dough needs. We don't rush it.\n\nAl menos 72 horas. No es una política — es el tiempo real que necesita la masa. No la apuramos."
  },
  {
    q: "What's the difference between fresh and frozen? / ¿Cuál es la diferencia entre fresh y frozen?",
    a: "Fresh clásicas are made to order and ready to eat at pickup.\n\nFrozen clásicas are shaped and frozen raw — you proof and bake them at home whenever you want. Perfect for having that just-baked moment on your schedule.\n\nLas fresh están listas para comer al retirar. Las frozen las proofás y horneás en casa cuando quieras."
  },
  {
    q: "Do you offer delivery? / ¿Hacen delivery?",
    a: "Yes, depending on the date and order size. Select 'Delivery' in the form and we'll confirm availability when we reach out. Pickup in NYC is always available.\n\nSí, dependiendo de la fecha y la cantidad. Elegí 'Delivery' en el formulario y te confirmamos al coordinar. El retiro en NYC siempre está disponible."
  },
  {
    q: "Can I order for events or in bulk? / ¿Puedo ordenar para eventos o en cantidad?",
    a: "Absolutely. We do corporate orders, brunches, pop-ups, and gifting. Use the notes field in the form or DM us directly.\n\nSí. Hacemos pedidos corporativos, brunches, pop-ups y regalos. Usá el campo de notas en el formulario o escribinos directamente."
  },
  {
    q: "How much does it cost? / ¿Cuánto cuesta?",
    a: "🥐 Clásicas fresh — $25/dozen\n❄️ Clásicas frozen — $20/dozen\n🍫 Rellenas dulce de leche — $4/unit · $42/dozen\n🧀 Rellenas jamón & queso — $4/unit · $42/dozen\n\nPricing is confirmed when we coordinate your order. / Los precios se confirman al coordinar el pedido."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "7rem 1.5rem", background: "#FAF7F2" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>
          Questions / Preguntas
        </p>
        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410", marginBottom: "3rem" }}>FAQ</h2>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(107,26,42,0.12)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.95rem", fontWeight: 500, color: open === i ? "#6B1A2A" : "#1C1410", textAlign: "left", gap: "1rem" }}
            >
              {item.q}
              <span style={{ flexShrink: 0, width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: open === i ? "#6B1A2A" : "#EDE4CE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: open === i ? "#F5EFE0" : "#6B1A2A", transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open === i ? 400 : 0, transition: "max-height 0.35s ease", paddingBottom: open === i ? "1.5rem" : 0 }}>
              <p style={{ fontSize: "0.92rem", color: "#6B5B4E", lineHeight: 1.85, whiteSpace: "pre-line" }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
