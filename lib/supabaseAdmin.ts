import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

// Security Note: This client uses SERVICE_ROLE_KEY which should NEVER be exposed to the client.
// It's only for server-side operations requiring elevated privileges.
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
}

export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)