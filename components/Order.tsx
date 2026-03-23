"use client";
import { useState } from "react";

const EMPTY_ITEM = { type: "", qty: 1, frozen: false };

function OrderLineItem({ item, index, onChange, onRemove, canRemove }: any) {
  const isDDL = item.type === "ddl";
  const isTradicional = item.type === "trad";
  return (
    <div style={{ background: "#FAF7F2", border: "1px solid #E8E0D0", borderRadius: 2, padding: "1.25rem", marginBottom: "0.75rem", position: "relative" }}>
      {canRemove && (
        <button onClick={() => onRemove(index)} style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "none", border: "none", cursor: "pointer", color: "#6B5B4E", fontSize: "1rem" }}>×</button>
      )}
      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>Product</label>
        <select value={item.type} onChange={e => onChange(index, "type", e.target.value)} style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
          <option value="">Select a product...</option>
          <option value="ddl">🍫 Dulce de Leche — per unit, fresh</option>
          <option value="trad">🥐 Tradicionales — per dozen</option>
        </select>
      </div>
      {item.type && (
        <div style={{ display: "grid", gridTemplateColumns: isTradicional ? "1fr 1fr" : "1fr", gap: "0.75rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>{isDDL ? "Units" : "Dozens"}</label>
            <select value={item.qty} onChange={e => onChange(index, "qty", Number(e.target.value))} style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
              {isDDL
                ? [1,2,3,4,6,8,10,12].map(n => <option key={n} value={n}>{n} unit{n > 1 ? "s" : ""}</option>)
                : [1,2,3,4,5].map(n => <option key={n} value={n}>{n} dozen{n > 1 ? "s" : ""} ({n * 12} pcs)</option>)
              }
            </select>
          </div>
          {isTradicional && (
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" }}>Condition</label>
              <select value={item.frozen ? "frozen" : "fresh"} onChange={e => onChange(index, "frozen", e.target.value === "frozen")} style={{ width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2" }}>
                <option value="fresh">🍯 Fresh</option>
                <option value="frozen">❄️ Frozen</option>
              </select>
            </div>
          )}
        </div>
      )}
      {item.type && (
        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "#6B1A2A", letterSpacing: "0.05em" }}>
          {isDDL && `→ ${item.qty} dulce de leche unit${item.qty > 1 ? "s" : ""}, fresh`}
          {isTradicional && `→ ${item.qty} dozen${item.qty > 1 ? "s" : ""} (${item.qty * 12} pcs), ${item.frozen ? "frozen" : "fresh"}`}
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

  const isValid = contact.name && contact.email && date &&
    items.some(i => i.type !== "") &&
    (delivery === "pickup" || (delivery === "delivery" && address));

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const totalDDL = items.filter(i => i.type === "ddl").reduce((s, i) => s + i.qty, 0);
  const totalFresh = items.filter(i => i.type === "trad" && !i.frozen).reduce((s, i) => s + i.qty, 0);
  const totalFrozen = items.filter(i => i.type === "trad" && i.frozen).reduce((s, i) => s + i.qty, 0);
  const hasItems = totalDDL + totalFresh + totalFrozen > 0;

  const inputStyle = { width: "100%", padding: "0.75rem 1rem", border: "1px solid #E8E0D0", borderRadius: 2, fontFamily: "inherit", fontSize: "0.9rem", background: "#FAF7F2", outline: "none" };
  const labelStyle = { display: "block" as const, fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.5rem" };

  return (
    <section id="order" style={{ padding: "7rem 3rem", background: "#EDE4CE" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "6rem", alignItems: "start" }}>
        {/* Left */}
        <div>
          <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B1A2A", marginBottom: "1rem" }}>Place your order</p>
          <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.05, color: "#1C1410" }}>Want one?<br />Let's talk.</h2>
          <p style={{ color: "#6B5B4E", lineHeight: 1.8, marginTop: "1.5rem" }}>No checkout cart. No middleman. Fill out the form and we'll confirm your order personally — usually within a few hours.</p>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
            {[
              { icon: "🍫", title: "Dulce de leche", desc: "Per unit — fresh only." },
              { icon: "🥐", title: "Tradicionales", desc: "Per dozen — fresh or frozen." },
              { icon: "❄️", title: "Frozen option", desc: "Proof and bake at home." },
              { icon: "🚗", title: "Delivery available", desc: "Depending on date & quantity." },
            ].map(p => (
              <div key={p.title} style={{ display: "flex", gap: "1rem", padding: "1rem 1.25rem", background: "white", borderLeft: "3px solid #6B1A2A", borderRadius: 2 }}>
                <span style={{ fontSize: "1.25rem" }}>{p.icon}</span>
                <div>
                  <strong style={{ display: "block", fontSize: "0.85rem", color: "#1C1410", marginBottom: "0.2rem" }}>{p.title}</strong>
                  <span style={{ fontSize: "0.8rem", color: "#6B5B4E" }}>{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div style={{ background: "white", padding: "2.5rem", borderRadius: 2, boxShadow: "0 2px 40px rgba(28,20,16,0.08)" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🥐</div>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.8rem", color: "#1C1410", marginBottom: "0.5rem" }}>Order received.</h3>
              <p style={{ color: "#6B5B4E", fontSize: "0.9rem", lineHeight: 1.6 }}>We'll confirm your order and {delivery === "delivery" ? "delivery" : "pickup"} details within a few hours.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: "var(--font-display, serif)", fontSize: "1.6rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>Pre-order</h3>
              <p style={{ fontSize: "0.85rem", color: "#6B5B4E", marginBottom: "2rem" }}>We'll confirm everything personally. No bots.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle}>Name</label>
                  <input name="name" value={contact.name} onChange={handleContact} placeholder="Your name" style={inputStyle} />
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={contact.email} onChange={handleContact} placeholder="you@email.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Phone (optional)</label>
                <input name="phone" value={contact.phone} onChange={handleContact} placeholder="+1 (917) 000-0000" style={inputStyle} />
              </div>

              <div style={{ borderTop: "1px solid #E8E0D0", margin: "1.25rem 0" }} />
              <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#6B5B4E", marginBottom: "0.75rem" }}>What would you like?</div>

              {items.map((item, idx) => (
                <OrderLineItem key={idx} item={item} index={idx} onChange={handleItemChange} onRemove={removeItem} canRemove={items.length > 1} />
              ))}

              <button onClick={addItem} style={{ background: "none", border: "1px dashed #C8BEA8", borderRadius: 2, width: "100%", padding: "0.7rem", cursor: "pointer", color: "#6B5B4E", fontSize: "0.82rem", fontFamily: "inherit", marginBottom: "1.25rem" }}>
                + Add another product
              </button>

              {hasItems && (
                <div style={{ background: "rgba(107,26,42,0.05)", border: "1px solid rgba(107,26,42,0.15)", borderRadius: 2, padding: "1rem 1.25rem", marginBottom: "1.25rem", fontSize: "0.82rem", lineHeight: 1.8 }}>
                  <div style={{ fontWeight: 500, color: "#6B1A2A", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "0.4rem" }}>Order summary</div>
                  {totalDDL > 0 && <div>· {totalDDL} dulce de leche unit{totalDDL > 1 ? "s" : ""} (fresh)</div>}
                  {totalFresh > 0 && <div>· {totalFresh} dozen{totalFresh > 1 ? "s" : ""} tradicionales fresh ({totalFresh * 12} pcs)</div>}
                  {totalFrozen > 0 && <div>· {totalFrozen} dozen{totalFrozen > 1 ? "s" : ""} tradicionales frozen ({totalFrozen * 12} pcs)</div>}
                  <div style={{ marginTop: "0.5rem", color: "#6B5B4E", fontSize: "0.75rem" }}>Pricing confirmed when we coordinate.</div>
                </div>
              )}

              <div style={{ borderTop: "1px solid #E8E0D0", margin: "1.25rem 0" }} />

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Preferred date</label>
                <input type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} style={inputStyle} />
              </div>
              <p style={{ fontSize: "0.78rem", color: "#6B5B4E", marginTop: "-0.75rem", marginBottom: "1.25rem" }}>⚠ We need at least 72 hours. We'll confirm availability.</p>

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Fulfillment</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {[{ val: "pickup", label: "📍 Pickup (NYC)" }, { val: "delivery", label: "🚗 Delivery (request)" }].map(opt => (
                    <button key={opt.val} onClick={() => setDelivery(opt.val)} style={{ padding: "0.75rem", border: delivery === opt.val ? "2px solid #6B1A2A" : "1px solid #E8E0D0", background: delivery === opt.val ? "rgba(107,26,42,0.05)" : "#FAF7F2", color: delivery === opt.val ? "#6B1A2A" : "#6B5B4E", fontFamily: "inherit", fontSize: "0.82rem", fontWeight: delivery === opt.val ? 500 : 400, cursor: "pointer", borderRadius: 2 }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {delivery === "delivery" && (
                <>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Delivery address</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Your NYC address" style={inputStyle} />
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#6B1A2A", marginTop: "-0.75rem", marginBottom: "1.25rem" }}>Delivery subject to confirmation based on date & quantity.</p>
                </>
              )}

              <div style={{ marginBottom: "1.25rem" }}>
                <label style={labelStyle}>Notes (optional)</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Allergies, special requests, event info..." style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} />
              </div>

              <button onClick={handleSubmit} disabled={loading || !isValid} style={{ width: "100%", background: !isValid ? "#C8BEA8" : "#6B1A2A", color: "#F5EFE0", padding: "1rem", fontFamily: "inherit", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, border: "none", cursor: !isValid ? "not-allowed" : "pointer", borderRadius: 2 }}>
                {loading ? "Sending..." : "Place pre-order →"}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
