import { useSupabaseRequest } from '@/components/SupabaseRequest';
import PageContainer from '@/components/ui/PageContainer';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tables } from '../../types/supabase';
import ImageCaroussel from '@/components/content/ImageCaroussel';
import { WithImages } from '@/types/types';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { Button } from '@nextui-org/react';
import { useAuth } from '@/lib/auth';
import Specifications from '@/components/content/cabinet/Specifications';

export function Cabinet() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as WithImages<Tables<'cabinets'>>;
  const user = useAuth();

  return (
    <PageContainer>
      <StatusComponent />
      {cabinet && (
        <div>
          <ImageCaroussel images={cabinet.images} />
          <div className="flex justify-between">
            <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
            {user?.api_role === 'admin' && (
              <Button as={Link} disabled to={'./edit'} color="primary">
                Edit
              </Button>
            )}
          </div>
          <Text variant="thick">{cabinet.short_description}</Text>
          <Text>{cabinet.description}</Text>
          <Specifications cabinet={cabinet} />
        </div>
      )}
    </PageContainer>
  );
}

export default Cabinet;
