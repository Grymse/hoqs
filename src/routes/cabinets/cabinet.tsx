import { useSupabaseRequest } from '@/components/SupabaseRequest';
import PageContainer from '@/components/ui/PageContainer';
import { supabase } from '@/lib/supabase';
import { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageCaroussel from '@/components/content/ImageCaroussel';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import { Button } from '@nextui-org/react';
import Specifications from '@/components/content/cabinet/Specifications';
import FileList from '@/components/content/FileList';
import { CabinetBadgeList } from '@/components/content/cabinet/CabinetBadge';
import { SpeakerCabinet } from '@/types/types';
import ProtectedFeature from '@/components/auth/ProtectedFeature';
import Contributors from '@/components/content/cabinet/Contributors';

export function Cabinet() {
  const { id } = useParams();
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as SpeakerCabinet;

  return (
    <PageContainer>
      <StatusComponent />
      {cabinet?.active === false && (
        <div className="w-full flex justify-center bg-red-500">
          <Text className="my-0">NOT PUBLISHED</Text>
        </div>
      )}
      {cabinet && (
        <div>
          <ImageCaroussel images={cabinet.images} />
          <div className="flex justify-between">
            <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
            <ProtectedFeature>
              <Button as={Link} disabled to={'./edit'} color="primary">
                Edit
              </Button>
            </ProtectedFeature>
          </div>
          <CabinetBadgeList badges={cabinet.badges} />
          <Text variant="thick">{cabinet.short_description}</Text>
          <Text>{cabinet.description}</Text>
          <Specifications cabinet={cabinet} />
          {cabinet.measurements && 0 < cabinet.measurements.length && (
            <>
              <Header variant="subtitle">Measurements</Header>
              <ImageCaroussel images={cabinet.measurements} />
            </>
          )}

          {cabinet.contributors.length !== 0 && (
            <>
              <Header variant="subtitle">Contributors</Header>
              <Contributors contributors={cabinet.contributors} />
            </>
          )}
          <Header variant="subtitle">Files</Header>
          <FileList files={cabinet.files} />
        </div>
      )}
    </PageContainer>
  );
}

export default Cabinet;
