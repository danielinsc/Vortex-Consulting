import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vortex Consulting – IA, Consultoria & Educacao",
  description: "Criamos produtos com IA e ajudamos voce a fazer o mesmo. Da estrategia a execucao, transformamos inteligencia artificial em resultado real.",
  openGraph: {
    title: "Vortex Consulting – IA, Consultoria & Educacao",
    description: "Criamos produtos com IA e ajudamos voce a fazer o mesmo. Da estrategia a execucao, transformamos inteligencia artificial em resultado real.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vortex Consulting – IA, Consultoria & Educacao",
    description: "Criamos produtos com IA e ajudamos voce a fazer o mesmo. Da estrategia a execucao, transformamos inteligencia artificial em resultado real.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400&family=Geist+Mono:wght@300;400;500&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
