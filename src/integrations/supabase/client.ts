
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://vzpleqbhqixdovrdtfbx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cGxlcWJocWl4ZG92cmR0ZmJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzOTc1ODQsImV4cCI6MjA2Njk3MzU4NH0.NlZiaazHJsdLhi8yN0aEwBWuX8D-EW2qb7PwBd-H2Wc"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
