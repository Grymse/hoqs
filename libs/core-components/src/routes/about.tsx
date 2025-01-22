import { Link } from 'react-router-dom';
import PageContainer from '../components/ui/PageContainer';
import { useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useSupabaseRequest } from '../components/helpers/SupabaseRequest';
import ProtectedFeature from '../components/auth/ProtectedFeature';
import { Button } from '@nextui-org/react';
import Document from '../components/content/document/Document';
import { DocumentType } from '../types/types';


export function About() {
  const docRef = useRef(supabase.from('documents').select('*').eq('id', 'about'));
  const { StatusComponent, data } = useSupabaseRequest<DocumentType[]>(docRef.current);
  const document = data?.[0];
  
  return (
    <PageContainer>
      <StatusComponent />
        <ProtectedFeature>
          <div className="w-full relative mt-4 flex justify-end top-0 right-0">
            <Button className="absolute" as={Link} disabled to={'#/wiki/about/edit'} color="primary">
              Edit
            </Button>
          </div>
        </ProtectedFeature>
      {document && <Document document={document} />}
    </PageContainer>
  );
}

export default About;
