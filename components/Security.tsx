"use client";
import { useEffect, useRef } from "react";

const FEATURES = [
  "Aprovações obrigatórias",
  "Audit trail imutável",
  "Orçamentos com hard-stop",
  "Você é o board",
  "Rollback de qualquer decisão",
  "Conformidade com LGPD",
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");

      ctx = gsap.context(() => {
        gsap.fromTo(".security-chip",
          { opacity: 0.001, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "framerEase",
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "96px 0" }}>
      <div className="section-container">
        <div
          style={{
            background: "#000",
            border: "1px solid #222",
            borderRadius: "24px",
            padding: "64px",
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Shield icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: "rgba(97,174,250,0.1)",
                  border: "1px solid rgba(97,174,250,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L4 7V12C4 16.4 7.6 20.5 12 21C16.4 20.5 20 16.4 20 12V7L12 3Z" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="h3-card">Governança e controle total</h3>
                <p style={{ fontSize: "13px", color: "rgba(117,117,117,0.9)", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>
                  Você aprova · Agentes executam · Auditoria em tudo
                </p>
              </div>
            </div>
          </div>

          {/* Feature chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {FEATURES.map((feat) => (
              <span
                key={feat}
                className="security-chip"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid #222",
                  borderRadius: "62px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  color: "rgba(184,184,184,0.9)",
                  letterSpacing: "-0.01em",
                }}
              >
                <span style={{ color: "#61aefa", marginRight: "8px" }}>✓</span>
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
