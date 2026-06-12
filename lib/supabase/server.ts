import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente Supabase exclusivo de servidor (server actions / route handlers).
// Usa a service_role key — NUNCA importar este módulo em código de cliente.
// O guard "server-only" quebra o build se alguém tentar.

let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase não configurado: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente.",
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
