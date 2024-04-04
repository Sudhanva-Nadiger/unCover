
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABSE_PROJECT_URL!
const key = process.env.NEXT_PUBLIC_SUPABSE_PUBLIC_ANON_KEY!

export const supabase = createClient(url, key)