"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const AVATARS = [
  "https://framerusercontent.com/images/QUuzHQ68NwZejrT2tm9GkWWCfs.jpg",
  "https://framerusercontent.com/images/CfT3n8NOghssCpbhbqq07uGjeQ.jpg",
  "https://framerusercontent.com/images/qtiiq4ylWBg6n6HkE6xkszfRMU.jpg",
  "https://framerusercontent.com/images/2QFUZg5KR3EqZsBaeH1IWTv3A.jpg",
  "https://framerusercontent.com/images/P9kQxXc4KGRfAl5cgxEYKcUCxXw.jpg",
];

const PERKS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L13.5 8H20L14.5 12L16.5 18L11 14.5L5.5 18L7.5 12L2 8H8.5L11 2Z" stroke="#61aefa" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Acesso prioritário ao ClipMart",
    description: "Entre antes de todos no marketplace com 28+ agentes prontos: CFO, CMO, CTO, Devs e mais.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="#61aefa" strokeWidth="1.5"/>
        <path d="M7 11L10 14L15 8" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "3 meses do Starter grátis",
    description: "Early adopters ganham acesso completo à plataforma sem custo nos primeiros três meses.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#61aefa" strokeWidth="1.5"/>
        <path d="M11 7V11L14 13" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Feedback direto com o time",
    description: "Canal exclusivo para moldar o roadmap. Sua empresa real ajuda a construir a plataforma.",
  },
];

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const perksRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { CustomEase } = await import("gsap/CustomEase");
      gsap.registerPlugin(ScrollTrigger, CustomEase);
      CustomEase.create("framerEase", "0.12, 0.23, 0.17, 0.99");
      CustomEase.create("framerScale", "0.12, 0.23, 0.5, 1");

      ctx = gsap.context(() => {
        // Hero content stagger
        gsap.fromTo(".wl-badge",
          { opacity: 0.001, y: 16 },
          { opacity: 1, y: 0, duration: 1.2, ease: "framerEase", delay: 0.1 }
        );
        gsap.fromTo(".wl-h1",
          { opacity: 0.001, y: 24 },
          { opacity: 1, y: 0, duration: 1.5, ease: "framerEase", delay: 0.25 }
        );
        gsap.fromTo(".wl-body",
          { opacity: 0.001, y: 20 },
          { opacity: 1, y: 0, duration: 1.4, ease: "framerEase", delay: 0.4 }
        );
        gsap.fromTo(".wl-form",
          { opacity: 0.001, y: 20 },
          { opacity: 1, y: 0, duration: 1.4, ease: "framerEase", delay: 0.55 }
        );
        gsap.fromTo(".wl-social",
          { opacity: 0.001, y: 16 },
          { opacity: 1, y: 0, duration: 1.2, ease: "framerEase", delay: 0.7 }
        );

        // Perks on scroll
        gsap.fromTo(".perk-card",
          { opacity: 0.001, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "framerEase",
            scrollTrigger: { trigger: perksRef.current, start: "top 85%", once: true }
          }
        );
      }, sectionRef);
    })();
    return () => { ctx?.revert(); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main ref={sectionRef} style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "128px 24px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow top-center */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "500px",
            background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(97,174,250,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "32px",
            maxWidth: "680px",
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            className="wl-badge"
            style={{
              opacity: 0.001,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(97,174,250,0.08)",
              border: "1px solid rgba(97,174,250,0.2)",
              borderRadius: "62px",
              padding: "8px 18px",
            }}
          >
            {/* Pulsing dot */}
            <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#61aefa",
                }}
              />
              <span className="badge-dot-pulse" />
            </span>
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#61aefa",
              letterSpacing: "-0.01em",
            }}>
              Acesso antecipado · vagas limitadas
            </span>
          </div>

          {/* H1 */}
          <h1
            className="wl-h1"
            style={{
              opacity: 0.001,
              fontFamily: "Geist, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "#fff",
            }}
          >
            Entre na fila para o futuro{" "}
            <span style={{ color: "rgba(184,184,184,0.5)" }}>AI&#8209;First</span>
          </h1>

          {/* Body */}
          <p
            className="wl-body"
            style={{
              opacity: 0.001,
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: 1.6,
              letterSpacing: "-0.02em",
              color: "rgba(184,184,184,0.8)",
              maxWidth: "520px",
            }}
          >
            Seja um dos primeiros a operar com agentes autônomos de IA. Acesso exclusivo ao ClipMart,
            Escritório Virtual e controle total de orçamentos, antes de todo mundo.
          </p>

          {/* Form */}
          <div className="wl-form" style={{ opacity: 0.001, width: "100%", maxWidth: "520px" }}>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  gap: "8px",
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${focused ? "rgba(97,174,250,0.4)" : "#222"}`,
                  borderRadius: "62px",
                  padding: "6px 6px 6px 24px",
                  transition: "border-color 0.25s ease",
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="seu@email.com"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-glass"
                  style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    background: loading ? "rgba(97,174,250,0.1)" : "rgba(97,174,250,0.15)",
                    border: "1px solid rgba(97,174,250,0.3)",
                    color: "#61aefa",
                    flexShrink: 0,
                    opacity: loading ? 0.7 : 1,
                    transition: "all 0.25s ease",
                  }}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                        <circle cx="7" cy="7" r="5" stroke="rgba(97,174,250,0.4)" strokeWidth="1.5"/>
                        <path d="M7 2A5 5 0 0 1 12 7" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Entrando...
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      Entrar na fila
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            ) : (
              /* Success state */
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  background: "rgba(97,174,250,0.08)",
                  border: "1px solid rgba(97,174,250,0.25)",
                  borderRadius: "62px",
                  padding: "18px 32px",
                }}
              >
                <span style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(97,174,250,0.15)",
                  border: "1px solid rgba(97,174,250,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#61aefa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "rgba(184,184,184,0.9)",
                  letterSpacing: "-0.01em",
                }}>
                  Você está na lista!{" "}
                  <span style={{ color: "#61aefa" }}>Avisaremos quando abrir.</span>
                </p>
              </div>
            )}

            <p style={{
              marginTop: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "rgba(117,117,117,0.6)",
              letterSpacing: "-0.01em",
            }}>
              Sem spam. Cancele quando quiser.
            </p>
          </div>

          {/* Social proof */}
          <div
            className="wl-social"
            style={{
              opacity: 0.001,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Avatar stack */}
            <div style={{ display: "flex" }}>
              {AVATARS.map((src, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #000",
                    marginLeft: idx === 0 ? 0 : -10,
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Founder ${idx + 1}`}
                    width={32}
                    height={32}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(117,117,117,0.8)",
              letterSpacing: "-0.01em",
            }}>
              <span style={{ color: "rgba(184,184,184,0.9)" }}>+240 founders</span> já na lista
            </p>
          </div>
        </div>
      </section>

      {/* ── PERKS SECTION ────────────────────────────────────── */}
      <section
        ref={perksRef}
        style={{
          background: "#000",
          borderTop: "1px solid #111",
          padding: "96px 0 128px",
        }}
      >
        <div className="section-container">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(117,117,117,0.7)",
              marginBottom: "16px",
            }}>
              Early Adopters
            </p>
            <h2 className="h2-section">
              O que você ganha entrando agora.
            </h2>
          </div>

          {/* Perks grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
            }}
          >
            {PERKS.map((perk, idx) => (
              <div
                key={idx}
                className="card-feature perk-card"
                style={{
                  opacity: 0.001,
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    background: "rgba(97,174,250,0.08)",
                    border: "1px solid rgba(97,174,250,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {perk.icon}
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontFamily: "Geist, sans-serif",
                      fontWeight: 300,
                      fontSize: "20px",
                      letterSpacing: "-0.03em",
                      color: "#fff",
                      marginBottom: "10px",
                      lineHeight: 1.3,
                    }}
                  >
                    {perk.title}
                  </h3>
                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    color: "rgba(117,117,117,0.9)",
                  }}>
                    {perk.description}
                  </p>
                </div>

                {/* Index marker */}
                <div style={{ marginTop: "auto" }}>
                  <span style={{
                    fontFamily: "Geist Mono, monospace",
                    fontSize: "11px",
                    color: "rgba(97,174,250,0.5)",
                    letterSpacing: "0.04em",
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            style={{
              marginTop: "48px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(97,174,250,0.5)", display: "inline-block" }} />
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "rgba(117,117,117,0.6)",
              letterSpacing: "-0.01em",
            }}>
              Construído sobre o{" "}
              <span style={{ color: "rgba(184,184,184,0.6)" }}>Paperclip</span>
              {" "}· open source MIT · Sem lock-in de provedor
            </p>
          </div>
        </div>
      </section>

      {/* Spin keyframe for loading icon */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 809px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 810px) and (max-width: 1199px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </main>
  );
}
