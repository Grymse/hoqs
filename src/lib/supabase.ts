import { PostgrestSingleResponse, createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://vgtljajaxrfrybokahvz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZndGxqYWpheHJmcnlib2thaHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MTU4MTgsImV4cCI6MjAyMjI5MTgxOH0.slXBTlpcNh3XfVAjmiREdR5YvUAdq_Q9aeAapMHkaZg'
);

interface SimplePromise<T> {
  then: (fn: (out: T) => void) => void;
}

export function toPromise<T>(
  supabaseRequest: SimplePromise<PostgrestSingleResponse<T>>
) {
  return new Promise<T>((resolve, reject) => {
    supabaseRequest.then((out) => {
      if (out.error) {
        reject(out.error);
      } else {
        resolve(out.data);
      }
    });
  });
}
