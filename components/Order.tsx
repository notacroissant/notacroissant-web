"use client";
import { useState } from "react";

const EMPTY_ITEM = { type: "", qty: 1, frozen: false };

const PRODUCTS = [
  { value: "clasicas-docena", label: "🥐 Clásicas — por docena", price: "$25/docena", unit: "dozen", canFreeze: true },
  { value: "rellenas-ddl-unidad", label: "🍫 Rellenas dulce de leche — por unidad", price: "$4/unidad", unit: "unit", canFreeze: false },
  { value: "rellenas-ddl-docena", label: "🍫 Rellenas dulce de leche — por docena", price: "$42/docena", unit: "dozen", canFreeze: false },
  { value: "rellenas-hq-unidad", label: "🧀 Rellenas jamón y queso — por unidad", price: "$4/unidad", unit: "unit", canFreeze: false },
  { value: "rellenas-hq-docena", label: "🧀 Rellenas jamón y queso — por docena", price: "$42/docena", unit: "dozen", canFreeze: false },
];

function OrderLineItem({ item, index, onChange, onRemove, canRemove }: any) {
  const product = PRODUCTS.find(p => p.value === item.type);
  const isDozen = product?.unit === "dozen";

  return (
    <div style={{ background: "#FAF7F2", border: "1px solid #E8E0D0", borderRadius: 2, padding: "1.25rem", marginBottom: "0.75rem", position: "relative" }}>
      {canRemove && (
        <button onClick={() => onRemove(index)} style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "none", cursor: "pointer", color: "#6B5B4E", fontSize: "1rem" }}>×</button>
      )}
      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>Product</label>
        <select value={item.type} onChange={e => onChange(index, "type", e.target.value)}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
          <option value="">Select a product...</option>
          {PRODUCTS.map(p => (
            <option key={p.value} value={p.value}>{p.label} — {p.price}</option>
          ))}
        </select>
      </div>
      {item.type && (
        <div style={{ display: "grid", gridTemplateColumns: product?.canFreeze ? "1fr 1fr" : "1fr", gap: "0.75rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>
              {isDozen ? "Dozens" : "Units"}
            </label>
            <select value={item.qty} onChange={e => onChange(index, "qty", Number(e.target.value))}
              style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
              {isDozen
                ? [1,2,3,4,5].map(n => <option key={n} value={n}>{n} dozen{n>1?"s":""} ({n*12} pcs) — ${n*parseInt(product?.price||"0")}</option>)
                : [1,2,3,4,6,8,10,12].map(n => <option key={n} value={n}>{n} unit{n>1?"s":""} — ${n*4}</option>)
              }
            </select>
          </div>
          {product?.canFreeze && (
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>Condition</label>
              <select value={item.frozen ? "frozen" : "fresh"} onChange={e => onChange(index, "frozen", e.target.value === "frozen")}
                style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
                <option value="fresh">🍯 Fresh</option>
                <option value="frozen">❄️ Frozen</option>
              </select>
            </div>
          )}
        </div>
      )}
      {item.type && (
        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#6B1A2A" }}>
          → {product?.label} × {item.qty} {product?.canFreeze ? `(${item.frozen ? "frozen" : "fresh"})` : ""}
        </div>
      )}
    </div>
  );
}

export default function Order() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [items, setItems] = useState([{ ...EMPTY_ITEM }]);
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState("pickup");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const handleContact = (e: any) => setContact(c => ({ ...c, [e.target.name]: e.target.value }));
  const handleItemChange = (idx: number, field: string, val: any) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      if (field === "type") return { ...EMPTY_ITEM, type: val };
      return { ...item, [field]: val };
    }));
  };
  const addItem = () => setItems(prev => [...prev, { ...EMPTY_ITEM }]);
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));

  const minDate = (() => {
    const d = new Date(); d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  })();

  const isValid = contact.name && contact.email && date && items.some(i => i.type !== "") &&
    (delivery === "pickup" || (delivery === "delivery" && address));

  const calcTotal = () => {
    return items.filter(i => i.type).reduce((total, item) => {
      const product = PRODUCTS.find(p => p.value === item.type);
      if (!product) return total;
      const basePrice = product.unit === "dozen" ? (product.value.includes("clasicas") ? 25 : 42) : 4;
      return total + (basePrice * item.qty);
    }, 0);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    const newOrderNumber = `NAC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    setOrderNumber(newOrderNumber);

    const orderSummary = items.filter(i => i.type).map(item => {
      const product = PRODUCTS.find(p => p.value === item.type);
      return `${product?.label} × ${item.qty}${product?.canFreeze ? ` (${item.frozen ? "frozen" : "fresh"})` : ""}`;
    }).join(", ");

    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "3fafd8fd-0684-4b5f-ac50-5efb49598cee",
        subject: `[${newOrderNumber}] New pre-order from ${contact.name}`,
        from_name: "Not a Croissant™",
        replyto: contact.email,
        order_number: newOrderNumber,
        name: contact.name,
        email: contact.email,
        phone: contact.phone || "N/A",
        order: orderSummary,
        total: `$${calcTotal()}`,
        date: date,
        fulfillment: delivery,
        address: delivery === "delivery" ? address : "Pickup",
        notes: notes || "N/A",
      }),
    });

    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const inp = { width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2", outline: "none", boxSizing: "border-box" as const };
  const lbl = { display: "block" as const, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" };

  const total = calcTotal();

  return (
    <>
      <style>{`
        .order-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start; }
        .order-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 768px) {
          .order-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .order-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <section id="order" style={{ padding: "5rem 1.5rem", background: "#EDE4CE" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="order-grid">
            <div>
              <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>Place your order</p>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410" }}>Want one?<br />Let's talk.</h2>
              <p style={{ color: "#6B5B4E", lineHeight: 1.8, marginTop: "1.5rem", fontSize: "0.95rem" }}>No checkout cart. No middleman. Fill out the form and we'll confirm your order personally — usually within a few hours.</p>
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                {[
                  { icon: "🥐", title: "Clásicas", desc: "Por docena — $25. Fresh or frozen." },
                  { icon: "🍫", title: "Rellenas dulce de leche", desc: "Por unidad $4 · Por docena $42." },
                  { icon: "🧀", title: "Rellenas jamón y queso", desc: "Por unidad $4 · Por docena $42." },
                  { icon: "🚗", title: "Delivery available", desc: "Depending on date & quantity." },
                ].map(p => (
                  <div key={p.title} style={{ display: "flex", gap: "1rem", padding: "1rem 1.25rem", background: "white", borderLeft: "3px solid #6B1A2A", borderRadius: 2 }}>
                    <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>{p.icon}</span>
                    <div>
                      <strong style={{ display: "block", fontSize: "0.85rem", color: "#1C1410", marginBottom: "0.2rem" }}>{p.title}</strong>
                      <span style={{ fontSize: "0.8rem", color: "#6B5B4E" }}>{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "white", padding: "2rem", borderRadius: 2, boxShadow: "0 2px 40px rgba(28,20,16,0.08)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥐</div>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.8rem", color: "#1C1410", marginBottom: "0.5rem" }}>Order received.</h3>
                  <div style={{ background: "#FAF7F2", border: "1px solid #E8E0D0", borderRadius: 2, padding: "0.75rem 1rem", margin: "1rem auto", display: "inline-block" }}>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.1em", color: "#6B5B4E", textTransform: "uppercase" as const }}>Order number</span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B1A2A", marginTop: "0.2rem", letterSpacing: "0.05em" }}>{orderNumber}</div>
                  </div>
                  <p style={{ color: "#6B5B4E", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    We'll confirm your order and {delivery === "delivery" ? "delivery" : "pickup"} details within a few hours. Check your email for confirmation.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.5rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>Pre-order</h3>
                  <p style={{ fontSize: "0.85rem", color: "#6B5B4E", marginBottom: "1.5rem" }}>We'll confirm everything personally. No bots.</p>

                  <div className="order-form-row">
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={lbl}>Name</label>
                      <input name="name" value={contact.name} onChange={handleContact} placeholder="Your name" style={inp} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={lbl}>Email</label>
                      <input name="email" type="email" value={contact.email} onChange={handleContact} placeholder="you@email.com" style={inp} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Phone (optional)</label>
                    <input name="phone" value={contact.phone} onChange={handleContact} placeholder="+1 (917) 000-0000" style={inp} />
                  </div>

                  <div style={{ borderTop: "1px solid #E8E0D0", margin: "1rem 0" }} />
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.75rem" }}>What would you like?</div>

                  {items.map((item, idx) => (
                    <OrderLineItem key={idx} item={item} index={idx} onChange={handleItemChange} onRemove={removeItem} canRemove={items.length > 1} />
                  ))}

                  <button onClick={addItem} style={{ background: "none", border: "1px dashed #C8BEA8", borderRadius: 2, width: "100%", padding: "0.7rem", cursor: "pointer", color: "#6B5B4E", fontSize: "0.82rem", fontFamily: "inherit", marginBottom: "1rem" }}>
                    + Add another product
                  </button>

                  {total > 0 && (
                    <div style={{ background: "rgba(107,26,42,0.05)", border: "1px solid rgba(107,26,42,0.15)", borderRadius: 2, padding: "1rem", marginBottom: "1rem", fontSize: "0.82rem", lineHeight: 1.8 }}>
                      <div style={{ fontWeight: 500, color: "#6B1A2A", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>Order summary</div>
                      {items.filter(i => i.type).map((item, idx) => {
                        const product = PRODUCTS.find(p => p.value === item.type);
                        const basePrice = product?.unit === "dozen" ? (product.value.includes("clasicas") ? 25 : 42) : 4;
                        return (
                          <div key={idx}>· {product?.label} × {item.qty} = ${basePrice * item.qty}</div>
                        );
                      })}
                      <div style={{ borderTop: "1px solid rgba(107,26,42,0.15)", marginTop: "0.5rem", paddingTop: "0.5rem", fontWeight: 600, color: "#1C1410" }}>
                        Total estimado: ${total}
                      </div>
                      <div style={{ marginTop: "0.25rem", color: "#6B5B4E", fontSize: "0.75rem" }}>Precios confirmados al coordinar.</div>
                    </div>
                  )}

                  <div style={{ borderTop: "1px solid #E8E0D0", margin: "1rem 0" }} />

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Preferred date</label>
                    <input type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} style={inp} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6B5B4E", marginTop: "-0.75rem", marginBottom: "1rem" }}>⚠ We need at least 72 hours. We'll confirm availability.</p>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Fulfillment</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[{ val: "pickup", label: "📍 Pickup (NYC)" }, { val: "delivery", label: "🚗 Delivery (request)" }].map(opt => (
                        <button key={opt.val} onClick={() => setDelivery(opt.val)}
                          style={{ padding: "0.75rem", border: delivery === opt.val ? "2px solid #6B1A2A" : "1px solid #E8E0D0", background: delivery === opt.val ? "rgba(107,26,42,0.05)" : "#FAF7F2", color: delivery === opt.val ? "#6B1A2A" : "#6B5B4E", fontFamily: "inherit", fontSize: "0.82rem", fontWeight: delivery === opt.val ? 500 : 400, cursor: "pointer", borderRadius: 2 }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {delivery === "delivery" && (
                    <>
                      <div style={{ marginBottom: "1rem" }}>
                        <label style={lbl}>Delivery address</label>
                        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Your NYC address" style={inp} />
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "#6B1A2A", marginTop: "-0.75rem", marginBottom: "1rem" }}>Delivery subject to confirmation based on date & quantity.</p>
                    </>
                  )}

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Notes (optional)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Allergies, special requests, event info..."
                      style={{ ...inp, resize: "vertical" as const, minHeight: 80 }} />
                  </div>

                  <button onClick={handleSubmit} disabled={loading || !isValid}
                    style={{ width: "100%", background: !isValid ? "#C8BEA8" : "#6B1A2A", color: "#F5EFE0", padding: "1rem", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, border: "none", cursor: !isValid ? "not-allowed" : "pointer", borderRadius: 2 }}>
                    {loading ? "Sending..." : "Place pre-order →"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
