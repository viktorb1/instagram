
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gjtqpotrvjnnqavogfll.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqdHFwb3RydmpubnFhdm9nZmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgzMzU0NjAsImV4cCI6MTk5MzkxMTQ2MH0.MtRfWYHPVGQ6pRRV-nV0nxV_PqSUjg0SDX23nNPlkx0"
console.log(import.meta.env)
export const supabase = createClient(supabaseUrl, supabaseKey)

