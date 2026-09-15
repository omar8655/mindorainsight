import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { env, isSupabaseConfigured } from '@/config/env'

let client: SupabaseClient | null = null

/**
 * Browser Supabase client for native Clerk third-party auth.
 * Pass getAccessToken from Clerk session (NOT deprecated JWT templates).
 */
export function getSupabaseBrowserClient(getAccessToken: () => Promise<string | null>) {
  if (!isSupabaseConfigured) return null
  if (client) return client

  client = createClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    accessToken: async () => (await getAccessToken()) ?? null,
  })
  return client
}
