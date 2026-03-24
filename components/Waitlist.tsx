"use client";
import { useState, useRef } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    if (!email) return;
    setStatus("loading");
    formRef.current?.submit();
    setTimeout(() => setStatus("done"), 1500);
  };

  return (
    <section id="waitlist" style={{ background: "#6B1A2A", padding: "6rem 1.5rem", textAlign: "center" }}>

      {/* iframe oculto — Mailchimp redirige acá */}
      <iframe name="mc-iframe" style={{ display: "none" }} />

      {/* Form real de Mailchimp — oculto, lo submiteamos via JS */}
      <form
        ref={formRef}
        action="https://notacroissant.us16.list-manage.com/subscribe/post?u=dabdc0199473af2bdbc47335e&id=c88748c5a3&f_id=00a0c2e1f0"
        method="POST"
        target="mc-iframe"
        style={{ display: "none" }}
      >
        <input type="email" name="EMAIL" value={email} readOnly />
        <input type="text" name="b_dabdc0199473af2bdbc47335e_c88748c5a3" defaultValue="" />
      </form>

      <p style={{
        fontFamily: "var(--font-mono, monospace)", fontSize: "0.7rem",
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(245,239,224,0.5)", marginBottom: "1rem"
      }}>Stay in the loop</p>

      <h2 style={{
        fontFamily: "var(--font-display, serif)",
        fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 900,
        color: "#F5EFE0", lineHeight: 1.1, marginBottom: "1rem"
      }}>
        Regular orders.<br />Coming soon.
      </h2>

      <p style={{
        color: "rgba(245,239,224,0.65)", fontSize: "1rem", lineHeight: 1.7,
        maxWidth: 480, margin: "0 auto 2.5rem"
      }}>
        We're moving toward weekly batches and delivery. Be the first to know — no spam, just medialunas.
      </p>

      {status === "done" ? (
        <div style={{
          background: "rgba(245,239,224,0.1)", border: "1px solid rgba(245,239,224,0.2)",
          borderRadius: 4, padding: "1.25rem 2rem", color: "#F5EFE0",
          maxWidth: 440, margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.6,
        }}>
          ✓ You're on the list. We'll be in touch when regular orders open.
        </div>
      ) : (
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%", padding: "1rem 1.25rem",
                border: "1px solid rgba(245,239,224,0.2)",
                outline: "none", fontFamily: "inherit", fontSize: "0.9rem",
                color: "#1C1410", borderRadius: 4,
                background: "rgba(245,239,224,0.95)",
                boxSizing: "border-box" as const,
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={status === "loading" || !email}
              style={{
                width: "100%", background: "#1C1410", color: "#F5EFE0",
                padding: "1rem", border: "none",
                cursor: !email ? "not-allowed" : "pointer",
                fontFamily: "inherit", fontSize: "0.82rem", fontWeight: 600,
                letterSpacing: "0.1em", textTransform: "uppercase" as const,
                borderRadius: 4, opacity: !email ? 0.6 : 1,
                transition: "all 0.2s",
              }}
            >
              {status === "loading" ? "Subscribing..." : "Notify me"}
            </button>
          </div>
          <p style={{
            fontSize: "0.72rem", color: "rgba(245,239,224,0.35)",
            marginTop: "1rem", letterSpacing: "0.05em"
          }}>
            No spam. Unsubscribe anytime.
          </p>
        </div>
      )}
    </section>
  );
}
