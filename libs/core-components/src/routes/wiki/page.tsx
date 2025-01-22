import { Link, useParams } from 'react-router-dom';
import Document from '../../components/content/document/Document';
import PageContainer from '../../components/ui/PageContainer';
import { useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { useSupabaseRequest } from '../../components/helpers/SupabaseRequest';
import { DocumentType } from '../../types/types';
import UnpublishedBanner from '../../components/helpers/UnpublishedBanner';
import ProtectedFeature from '../../components/auth/ProtectedFeature';
import { Button } from '@nextui-org/react';

export function WikiPage() {
  const { id } = useParams();
  const docRef = useRef(supabase.from('documents').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest<DocumentType[]>(docRef.current);
  const document = data?.[0];
  
  return (
    <PageContainer>
      <StatusComponent />
      <UnpublishedBanner show={document?.published === false} />
        <ProtectedFeature>
          <div className="w-full relative mt-4 flex justify-end top-0 right-0">
            <Button className="absolute" as={Link} disabled to={'./edit'} color="primary">
              Edit
            </Button>
          </div>
        </ProtectedFeature>
      {document && <Document document={document} />}
    </PageContainer>
  );
}
