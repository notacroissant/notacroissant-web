"use client";
import { useState } from "react";

const EMPTY_ITEM = { type: "", qty: 1 };

const PRODUCTS = [
  { value: "clasicas-fresh", label: "🥐 Clásicas / Classic — fresh", labelShort: "Clásicas fresh", price: 25, unit: "dozen", priceLabel: "$25/dozen" },
  { value: "clasicas-frozen", label: "❄️ Clásicas / Classic — frozen", labelShort: "Clásicas frozen", price: 20, unit: "dozen", priceLabel: "$20/dozen" },
  { value: "rellenas-ddl-unit", label: "🍫 Rellenas dulce de leche — per unit", labelShort: "Rellenas DDL", price: 4, unit: "unit", priceLabel: "$4/unit" },
  { value: "rellenas-ddl-dozen", label: "🍫 Rellenas dulce de leche — per dozen", labelShort: "Rellenas DDL", price: 42, unit: "dozen", priceLabel: "$42/dozen" },
  { value: "rellenas-hq-unit", label: "🧀 Rellenas jamón & queso / Ham & cheese — per unit", labelShort: "Rellenas H&Q", price: 4, unit: "unit", priceLabel: "$4/unit" },
  { value: "rellenas-hq-dozen", label: "🧀 Rellenas jamón & queso / Ham & cheese — per dozen", labelShort: "Rellenas H&Q", price: 42, unit: "dozen", priceLabel: "$42/dozen" },
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
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>
          Product / Producto
        </label>
        <select value={item.type} onChange={e => onChange(index, "type", e.target.value)}
          style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
          <option value="">Select / Elegí un producto...</option>
          {PRODUCTS.map(p => (
            <option key={p.value} value={p.value}>{p.label} — {p.priceLabel}</option>
          ))}
        </select>
      </div>
      {item.type && (
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>
            {isDozen ? "Dozens / Docenas" : "Units / Unidades"}
          </label>
          <select value={item.qty} onChange={e => onChange(index, "qty", Number(e.target.value))}
            style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
            {isDozen
              ? [1,2,3,4,5].map(n => <option key={n} value={n}>{n} dozen{n>1?"s":""} / docena{n>1?"s":""} ({n*12} pcs) — ${n * (product?.price || 0)}</option>)
              : [1,2,3,4,6,8,10,12].map(n => <option key={n} value={n}>{n} unit{n>1?"s":""} / unidad{n>1?"es":""} — ${n * (product?.price || 0)}</option>)
            }
          </select>
        </div>
      )}
      {item.type && (
        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#6B1A2A" }}>
          → {product?.label} × {item.qty} = ${(product?.price || 0) * item.qty}
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

  const calcTotal = () => items.filter(i => i.type).reduce((total, item) => {
    const product = PRODUCTS.find(p => p.value === item.type);
    return total + (product?.price || 0) * item.qty;
  }, 0);

  const isValid = contact.name && contact.email && date && items.some(i => i.type !== "") &&
    (delivery === "pickup" || (delivery === "delivery" && address));

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    const newOrderNumber = `NAC-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
    setOrderNumber(newOrderNumber);

    const orderSummary = items.filter(i => i.type).map(item => {
      const product = PRODUCTS.find(p => p.value === item.type);
      return `${product?.labelShort} × ${item.qty} = $${(product?.price || 0) * item.qty}`;
    }).join(" | ");

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

  const total = calcTotal();
  const inp = { width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2", outline: "none", boxSizing: "border-box" as const };
  const lbl = { display: "block" as const, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" };

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

            {/* Left */}
            <div>
              <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>
                Place your order / Hacé tu pedido
              </p>
              <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410" }}>
                Want one?<br />Let's talk.
              </h2>
              <p style={{ color: "#6B5B4E", lineHeight: 1.8, marginTop: "1.5rem", fontSize: "0.95rem" }}>
                No checkout cart. No middleman.<br />
                <em>Sin carrito. Sin intermediarios.</em><br /><br />
                Fill out the form and we'll confirm your order personally — usually within a few hours.<br />
                <em>Completá el formulario y te confirmamos el pedido personalmente.</em>
              </p>
              <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                {[
                  { icon: "🥐", title: "Clásicas / Classic", desc: "Fresh $25/doz · Frozen $20/doz" },
                  { icon: "🍫", title: "Rellenas dulce de leche", desc: "$4/unit · $42/dozen" },
                  { icon: "🧀", title: "Rellenas jamón & queso / Ham & cheese", desc: "$4/unit · $42/dozen" },
                  { icon: "🚗", title: "Delivery / Envío", desc: "Subject to date & quantity / Según fecha y cantidad." },
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

            {/* Right - Form */}
            <div style={{ background: "white", padding: "2rem", borderRadius: 2, boxShadow: "0 2px 40px rgba(28,20,16,0.08)" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥐</div>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.8rem", color: "#1C1410", marginBottom: "0.5rem" }}>Order received. / Pedido recibido.</h3>
                  <div style={{ background: "#FAF7F2", border: "1px solid #E8E0D0", borderRadius: 2, padding: "0.75rem 1rem", margin: "1rem auto", display: "inline-block" }}>
                    <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.1em", color: "#6B5B4E", textTransform: "uppercase" as const }}>Order number / Número de pedido</span>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#6B1A2A", marginTop: "0.2rem", letterSpacing: "0.05em" }}>{orderNumber}</div>
                  </div>
                  <p style={{ color: "#6B5B4E", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    We'll confirm your order and {delivery === "delivery" ? "delivery" : "pickup"} details within a few hours.<br />
                    <em>Te confirmamos los detalles en unas horas. Revisá tu email.</em>
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.5rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>
                    Pre-order / Pre-pedido
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "#6B5B4E", marginBottom: "1.5rem" }}>
                    We'll confirm everything personally. No bots.<br />
                    <em>Te confirmamos todo en persona. Sin robots.</em>
                  </p>

                  <div className="order-form-row">
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={lbl}>Name / Nombre</label>
                      <input name="name" value={contact.name} onChange={handleContact} placeholder="Your name / Tu nombre" style={inp} />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={lbl}>Email</label>
                      <input name="email" type="email" value={contact.email} onChange={handleContact} placeholder="you@email.com" style={inp} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Phone / Teléfono (optional)</label>
                    <input name="phone" value={contact.phone} onChange={handleContact} placeholder="+1 (917) 000-0000" style={inp} />
                  </div>

                  <div style={{ borderTop: "1px solid #E8E0D0", margin: "1rem 0" }} />
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.75rem" }}>
                    What would you like? / ¿Qué querés pedir?
                  </div>

                  {items.map((item, idx) => (
                    <OrderLineItem key={idx} item={item} index={idx} onChange={handleItemChange} onRemove={removeItem} canRemove={items.length > 1} />
                  ))}

                  <button onClick={addItem} style={{ background: "none", border: "1px dashed #C8BEA8", borderRadius: 2, width: "100%", padding: "0.7rem", cursor: "pointer", color: "#6B5B4E", fontSize: "0.82rem", fontFamily: "inherit", marginBottom: "1rem" }}>
                    + Add another / Agregar otro producto
                  </button>

                  {total > 0 && (
                    <div style={{ background: "rgba(107,26,42,0.05)", border: "1px solid rgba(107,26,42,0.15)", borderRadius: 2, padding: "1rem", marginBottom: "1rem", fontSize: "0.82rem", lineHeight: 1.8 }}>
                      <div style={{ fontWeight: 500, color: "#6B1A2A", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>
                        Order summary / Resumen del pedido
                      </div>
                      {items.filter(i => i.type).map((item, idx) => {
                        const product = PRODUCTS.find(p => p.value === item.type);
                        return <div key={idx}>· {product?.labelShort} × {item.qty} = ${(product?.price || 0) * item.qty}</div>;
                      })}
                      <div style={{ borderTop: "1px solid rgba(107,26,42,0.15)", marginTop: "0.5rem", paddingTop: "0.5rem", fontWeight: 600, color: "#1C1410" }}>
                        Total estimado / Estimated total: ${total}
                      </div>
                      <div style={{ marginTop: "0.25rem", color: "#6B5B4E", fontSize: "0.75rem" }}>
                        Pricing confirmed when we coordinate. / Precios confirmados al coordinar.
                      </div>
                    </div>
                  )}

                  <div style={{ borderTop: "1px solid #E8E0D0", margin: "1rem 0" }} />

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Preferred date / Fecha preferida</label>
                    <input type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} style={inp} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6B5B4E", marginTop: "-0.75rem", marginBottom: "1rem" }}>
                    ⚠ We need at least 72 hours. / Necesitamos al menos 72 horas.
                  </p>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Fulfillment / Entrega</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {[
                        { val: "pickup", label: "📍 Pickup NYC" },
                        { val: "delivery", label: "🚗 Delivery (request)" },
                      ].map(opt => (
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
                        <label style={lbl}>Delivery address / Dirección</label>
                        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Your NYC address" style={inp} />
                      </div>
                      <p style={{ fontSize: "0.78rem", color: "#6B1A2A", marginTop: "-0.75rem", marginBottom: "1rem" }}>
                        Delivery subject to confirmation. / Sujeto a confirmación según fecha y cantidad.
                      </p>
                    </>
                  )}

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={lbl}>Notes / Notas (optional)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)}
                      placeholder="Allergies, special requests... / Alergias, pedidos especiales..."
                      style={{ ...inp, resize: "vertical" as const, minHeight: 80 }} />
                  </div>

                  <button onClick={handleSubmit} disabled={loading || !isValid}
                    style={{ width: "100%", background: !isValid ? "#C8BEA8" : "#6B1A2A", color: "#F5EFE0", padding: "1rem", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, border: "none", cursor: !isValid ? "not-allowed" : "pointer", borderRadius: 2 }}>
                    {loading ? "Sending... / Enviando..." : "Place pre-order / Hacer pedido →"}
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
