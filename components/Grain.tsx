"use client";
import { useEffect, useRef } from "react";

export default function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Only resize if dimensions changed
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }

      const ctx = canvas!.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        // Random grayscale grain pixel
        const v = (Math.random() * 255) | 0;
        data[i]     = v;  // R
        data[i + 1] = v;  // G
        data[i + 2] = v;  // B
        // Alpha ~22 out of 255 ≈ 8.5% — matches Framer's opacity:0.15 at blend
        data[i + 3] = 22;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // Draw immediately (static grain — no animation overhead)
    draw();

    // Redraw on resize so grain covers full viewport
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9997,
        // screen: adds grain values directly on top of dark backgrounds
        // (1 - (1-bg)(1-grain)) — shows on black, imperceptible on white
        mixBlendMode: "screen",
      }}
    />
  );
}
