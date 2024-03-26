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
import Specifications from '@/components/content/cabinet/Specifications';
import AdminOnly from '../../components/AdminOnly';

export function Cabinet() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as WithImages<Tables<'cabinets'>>;

  return (
    <PageContainer>
      <StatusComponent />
      {cabinet && (
        <div>
          <ImageCaroussel images={cabinet.images} />
          <div className="flex justify-between">
            <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
            <AdminOnly>
              <Button as={Link} disabled to={'./edit'} color="primary">
                Edit
              </Button>
            </AdminOnly>
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
