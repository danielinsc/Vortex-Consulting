"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const AVATARS = [
  "https://framerusercontent.com/images/QUuzHQ68NwZejrT2tm9GkWWCfs.jpg",
  "https://framerusercontent.com/images/CfT3n8NOghssCpbhbqq07uGjeQ.jpg",
  "https://framerusercontent.com/images/qtiiq4ylWBg6n6HkE6xkszfRMU.jpg",
  "https://framerusercontent.com/images/2QFUZg5KR3EqZsBaeH1IWTv3A.jpg",
  "https://framerusercontent.com/images/P9kQxXc4KGRfAl5cgxEYKcUCxXw.jpg",
  "https://framerusercontent.com/images/WVjzq4M9tCUPIftKMF6dF1BCWA.jpg",
  "https://framerusercontent.com/images/kMnTyVQHixI963Bw6Nk2ZZxc.jpg",
  "https://framerusercontent.com/images/tV3lCdEhNbDipRwd2jLzl7AfEKA.jpg",
  "https://framerusercontent.com/images/h6QNt3JCPGmyHVSKtu2FjXQrk.png",
  "https://framerusercontent.com/images/msTYoYYscxOBeeJIpRWzw6QKUM.png",
  "https://framerusercontent.com/images/PbFAcRr5Jyj1pZN7stWIjXl1z4.png",
  "https://framerusercontent.com/images/EaTPsO2VcDDsExLtOdjpYKyPs.png",
  "https://framerusercontent.com/images/diFR0oNLDIcWO3TOjCpn2lHI.png",
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const el = sectionRef.current?.querySelector(".testimonial-quote");
      if (el) gsap.fromTo(el,
        { opacity: 0.001, y: 32 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true } }
      );
    })();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "96px 0" }}>
      <div className="section-container">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "48px", textAlign: "center" }}>
          {/* Avatar grid */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", maxWidth: "480px" }}>
            {AVATARS.map((src, idx) => (
              <div
                key={idx}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #1a1a1a",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={src}
                  alt={`Founder ${idx + 1}`}
                  width={44}
                  height={44}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="testimonial-quote" style={{ maxWidth: "760px" }}>
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" style={{ marginBottom: "24px", opacity: 0.3 }}>
              <path d="M0 24V14.4C0 9.6 1.6 5.6 4.8 2.4C8 0 11.8667 0 16.4 1.6L14.4 5.6C12.2667 4.8 10.4 4.8 8.8 5.6C7.2 6.4 6.4 7.8667 6.4 10H12.8V24H0ZM19.2 24V14.4C19.2 9.6 20.8 5.6 24 2.4C27.2 0 31.0667 0 35.6 1.6L33.6 5.6C31.4667 4.8 29.6 4.8 28 5.6C26.4 6.4 25.6 7.8667 25.6 10H32V24H19.2Z" fill="white"/>
            </svg>

            <blockquote
              style={{
                fontFamily: "Geist, sans-serif",
                fontWeight: 300,
                fontSize: "28px",
                lineHeight: 1.3,
                letterSpacing: "-0.03em",
                color: "#fff",
                marginBottom: "32px",
              }}
            >
              "A Optimus me permitiu montar uma equipe de tecnologia e financeiro em minutos. Os agentes trabalham em paralelo, reportam progresso e pedem aprovação quando precisam. É exatamente o que uma empresa AI‑First deveria ser."
            </blockquote>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "15px", color: "#fff" }}>
                Rafael Souza
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(117,117,117,0.9)" }}>
                CEO em startup de SaaS, São Paulo
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
