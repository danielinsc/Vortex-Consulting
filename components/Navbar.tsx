"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L2 15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M11 1L7 15" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M16 1L12 15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontFamily: "Geist, sans-serif",
            fontWeight: 300,
            fontSize: "17px",
            letterSpacing: "-0.03em",
            color: "#fff",
          }}>
            Vortex
          </span>
        </Link>

        {/* Center links */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="hide-mobile">
          {["Consultoria", "Educacao", "Produtos"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">{item === "Educacao" ? "Educacao" : item}</a>
          ))}
        </div>

        {/* Right: CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {["Contato"].map((item) => (
            <a key={item} href="#contato" className="nav-link-dim hide-mobile">{item}</a>
          ))}
          <a href="#contato" className="btn-glass" style={{ padding: "10px 20px", fontSize: "14px", marginLeft: "4px" }}>
            Comece agora
          </a>
        </div>
      </div>
    </nav>
  );
}
