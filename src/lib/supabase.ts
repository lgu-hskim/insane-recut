import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://jpdvffedhgppdtxkskel.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZHZmZmVkaGdwcGR0eGtza2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg5ODYsImV4cCI6MjA2NzAxNDk4Nn0.3E2cz9QkxkZnd6OwGVDWKM5fXSwCyQq9pbRjMg65vkw"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 