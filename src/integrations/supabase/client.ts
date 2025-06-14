
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mcmcfnwkwcanlgyilkgl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbWNmbndrd2NhbmxneWlsa2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzE3ODcsImV4cCI6MjA2NTUwNzc4N30.uoUMFm2oi_y_Dr_d3DB1cm2vLRX20siRVRCXruGm2Ws'

export const supabase = createClient(supabaseUrl, supabaseKey)
