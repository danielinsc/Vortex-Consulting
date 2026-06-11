import DiagnosticoForm from "@/components/diagnostico/DiagnosticoForm";

export default function DiagnosticoPage() {
  return (
    <main style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow âmbar atmosférico no topo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)",
          width: 720, height: 520, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(255,106,26,0.16) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      <div style={{
        position: "relative", maxWidth: 620, margin: "0 auto",
        padding: "20px 20px 80px",
      }}>
        {/* Hero */}
        <div className="diag-hero" style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={{
            fontFamily: "Geist Mono, monospace", fontSize: 12, fontWeight: 500,
            letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(184,184,184,0.7)",
          }}>
            Diagnóstico Gratuito
          </span>
          <h1 style={{
            fontFamily: "Geist, sans-serif", fontWeight: 300, fontSize: 40,
            lineHeight: 1.12, letterSpacing: "-0.04em", color: "#fff",
            margin: "16px auto 18px", maxWidth: 520,
          }}>
            Onde a IA gera resultado primeiro na sua operação.
          </h1>
          <p style={{
            fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16.5,
            lineHeight: 1.5, letterSpacing: "-0.01em", color: "rgba(184,184,184,0.9)",
            maxWidth: 480, margin: "0 auto",
          }}>
            Responda em 2 minutos. Em até 24h você recebe um diagnóstico com os
            pontos de maior retorno — priorizados por ROI e viabilidade.
          </p>
        </div>

        <DiagnosticoForm />
      </div>
    </main>
  );
}
