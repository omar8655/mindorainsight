/** Public env — never put service_role here */
export const env = {
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
}

export const isClerkConfigured = Boolean(env.clerkPublishableKey)
export const isSupabaseConfigured = Boolean(env.supabaseUrl && env.supabaseAnonKey)
