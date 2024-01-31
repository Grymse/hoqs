import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vgtljajaxrfrybokahvz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndGxqYWpheHJmcnlib2thaHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MTU4MTgsImV4cCI6MjAyMjI5MTgxOH0.slXBTlpcNh3XfVAjmiREdR5YvUAdq_Q9aeAapMHkaZg'
);
