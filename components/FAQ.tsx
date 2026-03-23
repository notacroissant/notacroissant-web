"use client";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "What exactly is a medialuna?",
    a: "A medialuna is Argentina's pastry — lighter than a croissant, with a subtle sweetness and a honey glaze finish. Made from scratch in New York using a 72-hour laminated dough process. No shortcuts."
  },
  {
    q: "What products do you offer?",
    a: "Two varieties: Dulce de Leche medialunas, sold per unit (fresh only) — and Tradicionales, sold by the dozen, available fresh or frozen to bake at home."
  },
  {
    q: "What's the difference between fresh and frozen?",
    a: "Fresh medialunas are made to order, honey-glazed and ready to eat at pickup. Frozen tradicionales are shaped then frozen raw — you proof and bake them at home whenever you want."
  },
  {
    q: "How does ordering work?",
    a: "Fill out the form on this page or DM us on Instagram @notacroissantnyc. We confirm your order personally — usually within a few hours. No bots, no automated replies."
  },
  {
    q: "How far in advance do I need to order?",
    a: "At least 72 hours. That's not a policy — it's the actual time the dough needs. We don't rush it."
  },
  {
    q: "Do you offer delivery?",
    a: "Yes, depending on the date and order size. Select Delivery in the order form and we'll confirm availability when we reach out. Pickup in NYC is always available."
  },
  {
    q: "Can I order for events or in bulk?",
    a: "Absolutely. We do corporate orders, brunch events, and larger batches for pop-ups or gifting. Use the notes field or DM us directly."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" style={{ padding: "7rem 3rem", background: "#FAF7F2" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>Questions</p>
        <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410", marginBottom: "3rem" }}>FAQ</h2>
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(107,26,42,0.12)" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "1rem", fontWeight: 500, color: open === i ? "#6B1A2A" : "#1C1410", textAlign: "left", gap: "1rem" }}
            >
              {item.q}
              <span style={{ flexShrink: 0, width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: open === i ? "#6B1A2A" : "#EDE4CE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: open === i ? "#F5EFE0" : "#6B1A2A", transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open === i ? 300 : 0, transition: "max-height 0.35s ease", paddingBottom: open === i ? "1.5rem" : 0 }}>
              <p style={{ fontSize: "0.95rem", color: "#6B5B4E", lineHeight: 1.8 }}>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
