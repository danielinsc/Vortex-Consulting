import Link from "next/link";

const PAGES = [
  { label: "Consultoria", href: "#consultoria" },
  { label: "Educação", href: "#educacao" },
  { label: "Produtos", href: "#produtos" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid #111", padding: "64px 0 40px" }}>
      <div className="section-container">
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "80px", marginBottom: "64px", flexWrap: "wrap" }}>
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
            <span style={{
              fontFamily: "Geist, sans-serif",
              fontWeight: 300,
              fontSize: "20px",
              letterSpacing: "-0.04em",
              color: "#fff",
            }}>
              Vortex
            </span>
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "rgba(117,117,117,0.9)",
              letterSpacing: "-0.01em",
            }}>
              Criamos produtos com IA e ajudamos você a fazer o mesmo. Da estratégia à execução, transformamos inteligência artificial em resultado real.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(117,117,117,0.6)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "20px" }}>
              Navegação
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {PAGES.map((p) => (
                <Link
                  key={p.label}
                  href={p.href}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "rgba(184,184,184,0.9)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          borderTop: "1px solid #111",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.6)", letterSpacing: "-0.01em" }}>
            &copy;2026 Vortex Consulting. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
