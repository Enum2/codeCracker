import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xlrtkcnoxriwtzrjowzk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhscnRrY25veHJpd3R6cmpvd3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjYyOTYsImV4cCI6MjA2NTgwMjI5Nn0.6j_-kwUsj8PSXt8-kuPH_248UVVlk45fldjMg7zb93k"
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(supabaseUrl)
export default supabase;
