import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Check your .env file (see .env.example)."
  );
}

// Safe to use in the browser — the anon key is protected by Row Level Security
// on the database side. Never put the service_role key here.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);