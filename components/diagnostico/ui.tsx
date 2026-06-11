"use client";
import React from "react";
import { AMBER, TRANSITION, Option } from "./constants";

// ─── Field wrapper: label real + mensagem de erro ───────────────────────
export function Field({
  id, label, hint, optional, error, children,
}: {
  id: string; label: string; hint?: string; optional?: boolean;
  error?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "rgba(255,255,255,0.92)",
          marginBottom: 10,
        }}
      >
        {label}
        {optional && (
          <span style={{ color: "rgba(184,184,184,0.6)", fontWeight: 400 }}> (opcional)</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" style={{
          fontFamily: "Inter, sans-serif", fontSize: 13, color: "#ff5a4d",
          marginTop: 7, letterSpacing: "-0.01em",
        }}>
          {error}
        </p>
      )}
      {hint && !error && (
        <p style={{
          fontFamily: "Inter, sans-serif", fontSize: 13, color: "rgba(184,184,184,0.6)",
          marginTop: 7, letterSpacing: "-0.01em",
        }}>
          {hint}
        </p>
      )}
    </div>
  );
}

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid #262626",
  borderRadius: 12,
  padding: "15px 16px",
  fontFamily: "Inter, sans-serif",
  fontSize: 16, // 16px evita zoom no iOS
  fontWeight: 400,
  letterSpacing: "-0.01em",
  color: "#fff",
  outline: "none",
  transition: TRANSITION,
  WebkitAppearance: "none",
  MozAppearance: "none",
  appearance: "none",
};

export const TextInput = React.forwardRef<
  HTMLInputElement,
  { id: string; error?: boolean } & React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ id, error, ...props }, ref) {
  return (
    <input
      id={id}
      ref={ref}
      className="diag-input"
      style={{
        ...inputBase,
        borderColor: error ? "#ff5a4d" : inputBase.border as string,
      }}
      {...props}
    />
  );
});

export function TextArea({
  id, error, maxLength, value, ...props
}: { id: string; error?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const count = typeof value === "string" ? value.length : 0;
  return (
    <div style={{ position: "relative" }}>
      <textarea
        id={id}
        className="diag-input"
        rows={3}
        maxLength={maxLength}
        value={value}
        style={{
          ...inputBase,
          resize: "vertical",
          minHeight: 84,
          borderColor: error ? "#ff5a4d" : inputBase.border as string,
        }}
        {...props}
      />
      {maxLength && (
        <span style={{
          position: "absolute", bottom: 10, right: 12,
          fontFamily: "Geist Mono, monospace", fontSize: 12,
          color: count >= maxLength ? AMBER : "rgba(184,184,184,0.5)",
        }}>
          {count}/{maxLength}
        </span>
      )}
    </div>
  );
}

export function Select({
  id, error, value, onChange, placeholder, options,
}: {
  id: string; error?: boolean; value: string;
  onChange: (v: string) => void; placeholder: string; options: Option[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        id={id}
        className="diag-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputBase,
          paddingRight: 44,
          color: value ? "#fff" : "rgba(184,184,184,0.55)",
          borderColor: error ? "#ff5a4d" : inputBase.border as string,
          cursor: "pointer",
        }}
      >
        <option value="" disabled style={{ color: "#888" }}>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ color: "#111", background: "#fff" }}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        width="12" height="8" viewBox="0 0 12 8" fill="none"
        style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <path d="M1 1L6 6L11 1" stroke="rgba(184,184,184,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Radio group (cards) ────────────────────────────────────────────────
export function RadioGroup({
  name, value, onChange, options,
}: {
  name: string; value: string; onChange: (v: string) => void; options: Option[];
}) {
  return (
    <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map((o) => {
        const active = value === o.value;
        return (
          <label
            key={o.value}
            className="diag-radio"
            style={{
              display: "flex", alignItems: "center", gap: 13,
              padding: "15px 16px", borderRadius: 12, cursor: "pointer",
              border: active ? `1px solid ${AMBER}` : "1px solid #262626",
              background: active ? "rgba(255,106,26,0.07)" : "rgba(255,255,255,0.02)",
              transition: TRANSITION,
            }}
          >
            <input
              type="radio" name={name} value={o.value} checked={active}
              onChange={() => onChange(o.value)}
              style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
            />
            <span style={{
              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
              border: active ? `5px solid ${AMBER}` : "2px solid #555",
              background: active ? "#fff" : "transparent",
              transition: TRANSITION,
            }} />
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 15, letterSpacing: "-0.01em",
              color: active ? "#fff" : "rgba(220,220,220,0.85)", lineHeight: 1.35,
            }}>
              {o.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ─── Checkbox (consent) ─────────────────────────────────────────────────
export function Checkbox({
  id, checked, onChange, children,
}: {
  id: string; checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer" }}>
      <input
        id={id} type="checkbox" checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
      />
      <span style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
        border: checked ? "none" : "2px solid #555",
        background: checked ? AMBER : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: TRANSITION,
      }}>
        {checked && (
          <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
            <path d="M1 4.5L4.2 7.5L11 1" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{
        fontFamily: "Inter, sans-serif", fontSize: 13.5, lineHeight: 1.45,
        color: "rgba(184,184,184,0.9)", letterSpacing: "-0.01em",
      }}>
        {children}
      </span>
    </label>
  );
}
