"use client";
import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="waitlist" style={{ background: "#6B1A2A", padding: "6rem 3rem", textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,239,224,0.5)", marginBottom: "1rem" }}>Stay in the loop</p>
      <h2 style={{ fontFamily: "var(--font-display, serif)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900, color: "#F5EFE0", lineHeight: 1.1, marginBottom: "1rem" }}>
        Regular orders.<br />Coming soon.
      </h2>
      <p style={{ color: "rgba(245,239,224,0.65)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2.5rem" }}>
        We're moving toward weekly batches and delivery. Be the first to know — no spam, just medialunas.
      </p>

      {done ? (
        <div style={{ background: "rgba(245,239,224,0.1)", border: "1px solid rgba(245,239,224,0.2)", borderRadius: 2, padding: "1rem 2rem", color: "#F5EFE0", maxWidth: 440, margin: "0 auto", fontSize: "0.9rem" }}>
          ✓ You're on the list. We'll be in touch when regular orders open.
        </div>
      ) : (
        <>
          <div style={{ display: "flex", maxWidth: 440, margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, padding: "1rem 1.25rem", border: "none", outline: "none", fontFamily: "inherit", fontSize: "0.9rem", color: "#1C1410", borderRadius: "2px 0 0 2px" }}
            />
            <button
              onClick={() => email && setDone(true)}
              style={{ background: "#1C1410", color: "#F5EFE0", padding: "1rem 1.5rem", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" as const, borderRadius: "0 2px 2px 0", whiteSpace: "nowrap" }}
            >
              Notify me
            </button>
          </div>
          <p style={{ fontSize: "0.72rem", color: "rgba(245,239,224,0.35)", marginTop: "1rem", letterSpacing: "0.05em" }}>
            No spam. Unsubscribe anytime.
          </p>
        </>
      )}
    </section>
  );
}
