import { useAuth } from '@/lib/auth';
import { PropsWithChildren } from 'react';

export default function AdminOnly({ children }: PropsWithChildren<unknown>) {
  const user = useAuth();

  if (!user || user?.api_role !== 'admin') return null;

  return children;
}
