import { PropsWithChildren, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { supabase } from './supabase';
import { AuthOtpResponse, User } from '@supabase/supabase-js';

const userAtom = atom<User | null>(null);

export const useAuth = () => {
  return useAtom(userAtom)[0];
};

/**
 * AuthProvider component that handles authentication state changes and updates the user state.
 * @param children - The child components to render.
 */
export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const setUser = useAtom(userAtom)[1];

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return children;
}

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
      emailRedirectTo: 'http://localhost:4200/',
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
