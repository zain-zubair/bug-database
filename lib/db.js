import { createClient } from "@supabase/supabase-js";

// BugReportSystem(BRS)
const supabaseUrl = "https://upymmfywkjqrllpxgvhg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweW1tZnl3a2pxcmxscHhndmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTE2MjgsImV4cCI6MjAyNjQyNzYyOH0.jO-hMLeQySdpTZ-Ony4tTcrgMadwnvB8EDjopKV5s6A";
export const db = createClient(supabaseUrl, supabaseKey);
