import { useSupabaseRequest } from '@/components/SupabaseRequest';
import PageContainer from '@/components/ui/PageContainer';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Tables } from '../../types/supabase';
import ImageCaroussel from '@/components/ui/content/ImageCaroussel';
import { StorageImage } from '@/types/types';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';

export function Cabinet() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as Tables<'cabinets'>;

  return (
    <PageContainer>
      <StatusComponent />
      {cabinet && (
        <div>
          <ImageCaroussel images={cabinet.images as StorageImage[]} />
          <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
          <Text variant="thick">{cabinet.short_description}</Text>
          <Text variant="thick">{cabinet.description}</Text>
        </div>
      )}
    </PageContainer>
  );
}

export default Cabinet;
