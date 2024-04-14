import { PropsWithChildren, useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { supabase } from './supabase';
import { AuthOtpResponse, User } from '@supabase/supabase-js';
import toast from 'react-hot-toast';

type UserWithRole = User & { api_role?: string };

const userAtom = atom<UserWithRole | null>(null);

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
      const newUser = session?.user as UserWithRole | null;
      setUser((user) => {
        if (user?.id === newUser?.id) {
          return user;
        }

        // Fetch role of user elsewhere
        if (newUser?.id) {
          supabase
            .from('users')
            .select('role')
            .eq('id', newUser?.id)
            .then(({ data }) => {
              if (data) {
                setUser({ ...newUser, api_role: data[0].role });
              }
            });
        }
        return newUser;
      });
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
  let origin = window.location.origin;

  if (origin.startsWith('https://grymse.github.io')) {
    origin = 'https://grymse.github.io/hoqs';
  }

  if (
    !origin.startsWith('http://localhost:4200') &&
    !origin.startsWith('https://hoqs.org') &&
    !origin.startsWith('https://grymse.github.io')
  ) {
    toast.error('Invalid origin. Contact administrators');
    console.error(origin);
    throw Error('Invalid origin. Contact administrators');
  }

  return await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: origin,
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
