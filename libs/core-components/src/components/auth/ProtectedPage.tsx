import { PropsWithChildren } from 'react';
import PageContainer from '../ui/PageContainer';
import Header from '../ui/Header';
import Text from '../ui/Text';
import { useAuth } from '@core/lib/auth';
import { Enums } from '@core/types/supabase';
import { CircularProgress } from '@nextui-org/progress';

type ProtectedPageProps = PropsWithChildren<{ roles?: Enums<'role'>[] }>;

export default function ProtectedPage({
  children,
  roles = ['admin'],
}: ProtectedPageProps) {
  const user = useAuth();
  if (user?.id !== undefined && user?.api_role === undefined) {
    return (
      <PageContainer>
        <div className="w-full h-full flex justify-center items-center">
          <CircularProgress size="md" aria-label="Loading..." />
        </div>
      </PageContainer>
    );
  }
  const hasRole = roles?.includes(user?.api_role as Enums<'role'>);

  if (!hasRole) {
    return (
      <PageContainer>
        <Header>You do not have access rights to this page</Header>

        <Text>
          You are not logged in or do not have the required access rights to
          view this page. Only users with the role(s) {roles.join(', ')} can
          view this page.
        </Text>
      </PageContainer>
    );
  }

  return children;
}
