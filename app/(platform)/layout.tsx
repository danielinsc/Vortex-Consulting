"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("optimus_onboarded")) {
      router.replace("/onboarding");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  return (
    <div style={{
      display: "flex",
      height: "100dvh",
      background: "#000",
      overflow: "hidden",
    }}>
      <AppSidebar companyName={localStorage.getItem("optimus_company") || "Optimus"} />
      <main style={{
        flex: 1,
        overflowY: "auto",
        background: "#050505",
        minWidth: 0,
      }}>
        {children}
      </main>
    </div>
  );
}
