import { AuthOtpResponse, createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://<project>.supabase.co',
  '<your-anon-key>'
);

/**
 * @param email login email
 * @param redirect redirect url
 */
export async function signInWithEmail(
  email: string,
  redirect: string
): Promise<AuthOtpResponse> {
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirect,
    },
  });
}

/**
 * @param email login email
 * @param password login password
 * @returns
 */
export async function signOut() {
  return await supabase.auth.signOut();
}
